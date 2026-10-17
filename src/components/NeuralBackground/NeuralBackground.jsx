import { useEffect, useRef } from "react";

import "./NeuralBackground.css";

/**
 * NeuralBackground
 * -----------------
 * A React port of particles.js (https://github.com/VincentGarreau/particles.js,
 * MIT © 2015 Vincent Garreau), set up like its bundled demo config:
 * white circles drifting in random directions, linked by lines when close,
 * pushed away from the cursor on hover, and new particles spawned on click.
 *
 * Only the features that config uses are ported (circle shape, linked lines,
 * "out" edge mode, repulse on hover, push on click, density-based count).
 *
 * Fixed, full-viewport canvas. Mount once, high in the tree (in App.jsx,
 * outside <Routes>) so it survives route changes without unmounting.
 * Pointer events are read from `window` because the canvas sits behind
 * the page with pointer-events disabled.
 *
 * Props:
 *   pushOnClick  true: every click spawns PUSH_COUNT particles (capped at
 *                MAX_PUSHED extra, oldest removed first). false: clicks do
 *                nothing. Defaults to PUSH_ON_CLICK.
 */

// ---- tune these to change the look/feel (defaults = particles.js demo) ----
const PARTICLE_COUNT = 80; // particles per DENSITY_AREA
const DENSITY_AREA = 800; // larger = sparser; count scales with screen area
const PARTICLE_COLOR = "255, 255, 255";
const PARTICLE_OPACITY = 0.5;
const PARTICLE_SIZE = 5; // px, max radius
const PARTICLE_SIZE_RANDOM = true; // radius = random 0..PARTICLE_SIZE

const LINK_DISTANCE = 150; // px, particles closer than this are linked
const LINK_COLOR = "255, 255, 255";
const LINK_OPACITY = 0.4; // opacity of a link between two touching particles
const LINK_WIDTH = 1; // px

const MOVE_SPEED = 6;

const REPULSE_ON_HOVER = true;
const REPULSE_DISTANCE = 200; // px
const PUSH_ON_CLICK = true; // default for the pushOnClick prop
const PUSH_COUNT = 4; // particles spawned per click
// Most extra particles clicks can add. Linking is O(n²), so without a cap
// every click made each frame slower.
const MAX_PUSHED = 24;

function createParticle(width, height, position) {
  const radius = (PARTICLE_SIZE_RANDOM ? Math.random() : 1) * PARTICLE_SIZE;

  let x = position ? position.x : Math.random() * width;
  let y = position ? position.y : Math.random() * height;

  // nudge particles spawned on the very edge back inside the canvas
  if (x > width - radius * 2) x -= radius;
  else if (x < radius * 2) x += radius;
  if (y > height - radius * 2) y -= radius;
  else if (y < radius * 2) y += radius;

  return {
    x,
    y,
    radius,
    vx: Math.random() - 0.5,
    vy: Math.random() - 0.5,
  };
}

export default function NeuralBackground({ pushOnClick = PUSH_ON_CLICK }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = 0;
    let height = 0;
    let particles = [];
    let baseCount = 0; // density-based count, before click-pushes
    let mouse = { x: 0, y: 0, active: false };
    let rafId = null;

    // Keep the particle count proportional to screen area, adding or
    // removing particles as needed (also undoes click-pushes on resize).
    function matchDensity() {
      const target = Math.round(((width * height) / 1000) * (PARTICLE_COUNT / DENSITY_AREA));
      baseCount = target;
      while (particles.length < target) particles.push(createParticle(width, height));
      if (particles.length > target) particles.splice(0, particles.length - target);
    }

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      matchDensity();
    }

    function handlePointerMove(e) {
      mouse = { x: e.clientX, y: e.clientY, active: true };
    }

    function handlePointerLeave() {
      mouse.active = false;
    }

    function handleClick(e) {
      for (let i = 0; i < PUSH_COUNT; i++) {
        particles.push(createParticle(width, height, { x: e.clientX, y: e.clientY }));
      }

      // Over the cap: drop the oldest particles so the total stays bounded.
      const excess = particles.length - (baseCount + MAX_PUSHED);
      if (excess > 0) particles.splice(0, excess);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("mouseleave", handlePointerLeave);
    if (pushOnClick) window.addEventListener("click", handleClick);

    function repulse(p) {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist === 0) return;

      // strongest right under the cursor, zero at REPULSE_DISTANCE, capped at 50px
      const factor = Math.min(Math.max((1 - (dist / REPULSE_DISTANCE) ** 2) * 100, 0), 50);
      p.x += (dx / dist) * factor;
      p.y += (dy / dist) * factor;
    }

    function link(p1, p2) {
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      // Cheap rejection first: most pairs are far apart.
      if (Math.abs(dx) > LINK_DISTANCE || Math.abs(dy) > LINK_DISTANCE) return;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > LINK_DISTANCE) return;

      // fades linearly from LINK_OPACITY at 0 distance to 0 at LINK_DISTANCE
      const opacity = LINK_OPACITY * (1 - dist / LINK_DISTANCE);
      if (opacity <= 0) return;

      ctx.strokeStyle = `rgba(${LINK_COLOR}, ${opacity})`;
      ctx.lineWidth = LINK_WIDTH;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }

    function step() {
      ctx.clearRect(0, 0, width, height);

      const ms = MOVE_SPEED / 2;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx * ms;
        p.y += p.vy * ms;

        // "out" mode: leaving one side re-enters from the opposite side
        // at a random point along it
        if (p.x - p.radius > width) {
          p.x = -p.radius;
          p.y = Math.random() * height;
        } else if (p.x + p.radius < 0) {
          p.x = width + p.radius;
          p.y = Math.random() * height;
        }
        if (p.y - p.radius > height) {
          p.y = -p.radius;
          p.x = Math.random() * width;
        } else if (p.y + p.radius < 0) {
          p.y = height + p.radius;
          p.x = Math.random() * width;
        }

        if (REPULSE_ON_HOVER && mouse.active) repulse(p);

        for (let j = i + 1; j < particles.length; j++) {
          link(p, particles[j]);
        }
      }

      ctx.fillStyle = `rgba(${PARTICLE_COLOR}, ${PARTICLE_OPACITY})`;
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(step);
    }

    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
      window.removeEventListener("click", handleClick);
    };
  }, [pushOnClick]);

  return (
    <canvas
      ref={canvasRef}
      className="neural-background"
      aria-hidden="true"
    />
  );
}
