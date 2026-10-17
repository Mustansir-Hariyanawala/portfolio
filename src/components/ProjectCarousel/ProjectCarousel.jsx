import { useEffect, useRef } from "react";

import ProjectCard from "../ProjectCard/ProjectCard";
import Specular from "../Specular/Specular";

import "./ProjectCarousel.css";

// Pixels per second of the constant drift.
const SPEED = 40;

// How long the drift waits after the visitor scrolls, swipes, drags or uses
// the arrows before it carries on.
const RESUME_AFTER_MS = 1500;

// Mouse movement (px) before a press counts as a drag rather than a click.
const DRAG_THRESHOLD = 5;

// An endless, constantly drifting row of ProjectCards, e-commerce style.
//
// The track is a normal horizontal scroller, so visitors can also swipe,
// scroll with a trackpad, drag with the mouse or use the arrows. The cards
// are rendered three times so the scroll position can wrap seamlessly in
// either direction. The middle copy is the real one; the outer copies are
// hidden from screen readers and skipped by Tab, but still clickable, since
// they are often the ones on screen. The drift pauses on hover and while the
// visitor is scrolling, and is off for people who prefer reduced motion.
function ProjectCarousel({ projects }) {
  const trackRef = useRef(null);

  // Shared between the animation loop and the event handlers.
  const motion = useRef({
    hovered: false,
    lastInteraction: 0,
    drag: null,
  });

  useEffect(() => {
    const track = trackRef.current;
    const state = motion.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Width of one copy of the cards.
    const loopWidth = () => {
      const slides = track.children;
      return slides[projects.length].offsetLeft - slides[0].offsetLeft;
    };

    // Kept as a float: browsers round scrollLeft, which would swallow the
    // sub-pixel steps of a slow drift.
    let position = loopWidth();
    track.scrollLeft = position;

    // Keyboard users only tab through the middle copy.
    track
      .querySelectorAll("[data-copy] a, [data-copy] button")
      .forEach((element) => (element.tabIndex = -1));

    let frame = 0;
    let lastTime = performance.now();
    let visible = true;

    const tick = (now) => {
      const elapsed = Math.min(now - lastTime, 100) / 1000;
      lastTime = now;

      const width = loopWidth();
      const idle = now - state.lastInteraction > RESUME_AFTER_MS;

      if (!reduceMotion && visible && idle && !state.hovered && !state.drag) {
        position += SPEED * elapsed;
      } else {
        position = track.scrollLeft;
      }

      // Stay inside the middle copy; jumping by exactly one copy is invisible.
      // Not mid-drag, though: the drag measures from where it started.
      if (!state.drag) {
        if (position >= 2 * width) {
          position -= width;
        } else if (position < width) {
          position += width;
        }
      }

      if (Math.abs(track.scrollLeft - position) >= 0.5) {
        track.scrollLeft = position;
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    // No need to animate while the carousel is off-screen.
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(track);

    const markInteraction = () => {
      state.lastInteraction = performance.now();
    };

    track.addEventListener("wheel", markInteraction, { passive: true });
    track.addEventListener("touchstart", markInteraction, { passive: true });
    track.addEventListener("touchmove", markInteraction, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      track.removeEventListener("wheel", markInteraction);
      track.removeEventListener("touchstart", markInteraction);
      track.removeEventListener("touchmove", markInteraction);
    };
  }, [projects.length]);


  // Mouse drag-to-scroll (touch already scrolls natively).
  const handlePointerDown = (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0) {
      return;
    }

    motion.current.drag = {
      startX: event.clientX,
      startScroll: trackRef.current.scrollLeft,
      moved: false,
    };
  };

  const handlePointerMove = (event) => {
    const drag = motion.current.drag;

    if (!drag) {
      return;
    }

    const distance = event.clientX - drag.startX;

    if (!drag.moved && Math.abs(distance) > DRAG_THRESHOLD) {
      drag.moved = true;
      trackRef.current.setPointerCapture(event.pointerId);
      trackRef.current.classList.add("is-dragging");
    }

    if (drag.moved) {
      trackRef.current.scrollLeft = drag.startScroll - distance;
    }
  };

  const endDrag = () => {
    const drag = motion.current.drag;

    if (!drag) {
      return;
    }

    trackRef.current.classList.remove("is-dragging");
    motion.current.lastInteraction = performance.now();

    if (!drag.moved) {
      motion.current.drag = null;
      return;
    }

    // Keep the drag until the click that follows it has been cancelled.
    setTimeout(() => {
      motion.current.drag = null;
    }, 0);
  };

  // A drag shouldn't also open the card that was under the mouse.
  const handleClickCapture = (event) => {
    if (motion.current.drag?.moved) {
      event.preventDefault();
      event.stopPropagation();
    }
  };


  const nudge = (direction) => {
    const track = trackRef.current;
    const slides = track.children;
    const step = slides[1].offsetLeft - slides[0].offsetLeft;

    motion.current.lastInteraction = performance.now();
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  };


  const copies = [0, 1, 2];

  return (
    <div className="project-carousel">

      <ul
        ref={trackRef}
        className="project-carousel-track"
        aria-label="Projects"
        onMouseEnter={() => (motion.current.hovered = true)}
        onMouseLeave={() => (motion.current.hovered = false)}
        onFocus={() => (motion.current.lastInteraction = Infinity)}
        onBlur={() => (motion.current.lastInteraction = performance.now())}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={handleClickCapture}
        onDragStart={(event) => event.preventDefault()}
      >
        {copies.map((copy) =>
          projects.map((project) => (
            <li
              key={`${copy}-${project.id}`}
              className="project-carousel-slide"
              aria-hidden={copy !== 1 || undefined}
              data-copy={copy !== 1 || undefined}
            >
              <ProjectCard project={project} />
            </li>
          ))
        )}
      </ul>


      <div className="project-carousel-controls">

        <p className="project-carousel-hint">
          Drag or swipe to explore
        </p>

        <div className="project-carousel-arrows">
          <Specular
            as="button"
            type="button"
            className="project-carousel-arrow"
            aria-label="Previous project"
            onClick={() => nudge(-1)}
          >
            ←
          </Specular>

          <Specular
            as="button"
            type="button"
            className="project-carousel-arrow"
            aria-label="Next project"
            onClick={() => nudge(1)}
          >
            →
          </Specular>
        </div>

      </div>

    </div>
  );
}

export default ProjectCarousel;
