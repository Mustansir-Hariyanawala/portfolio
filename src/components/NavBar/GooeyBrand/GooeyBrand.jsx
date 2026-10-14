import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * GooeyBrand
 * ----------
 * A single-target adaptation of ReactBits' GooeyNav.
 *
 * The original GooeyNav is built to switch an "active" blob between several
 * list items on click. We only have one thing for it to point at — your
 * name/logo — so this strips it down to one element and fires the liquid
 * blob + particle-burst effect on HOVER instead of click, reversing it on
 * mouse-leave. Clicking still navigates home via React Router.
 *
 * Mount this next to <PillNav hideLogo /> inside Navbar.jsx: GooeyBrand
 * takes the logo's spot, PillNav handles the rest of the navigation.
 */
const GooeyBrand = ({
  label = 'Your Name',
  href = '/',
  animationTime = 500,
  particleCount = 12,
  particleDistances = [70, 8],
  particleR = 90,
  timeVariance = 250,
  colors = [1, 2, 3, 1]
}) => {
  const containerRef = useRef(null);
  const itemRef = useRef(null);
  const filterRef = useRef(null);
  const textRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  const noise = (n = 1) => n / 2 - Math.random() * n;

  const getXY = (distance, pointIndex, totalPoints) => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (i, t, d, r) => {
    const rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10
    };
  };

  const makeParticles = element => {
    const d = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty('--time', `${bubbleTime}ms`);

    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);

      setTimeout(() => {
        const particle = document.createElement('span');
        const point = document.createElement('span');

        particle.classList.add('gb-particle');
        particle.style.setProperty('--start-x', `${p.start[0]}px`);
        particle.style.setProperty('--start-y', `${p.start[1]}px`);
        particle.style.setProperty('--end-x', `${p.end[0]}px`);
        particle.style.setProperty('--end-y', `${p.end[1]}px`);
        particle.style.setProperty('--time', `${p.time}ms`);
        particle.style.setProperty('--scale', `${p.scale}`);
        particle.style.setProperty('--color', `var(--gb-color-${p.color}, white)`);
        particle.style.setProperty('--rotate', `${p.rotate}deg`);

        point.classList.add('gb-point');
        particle.appendChild(point);
        element.appendChild(particle);

        requestAnimationFrame(() => element.classList.add('active'));

        setTimeout(() => {
          try {
            element.removeChild(particle);
          } catch {
            // already removed (e.g. rapid re-hover)
          }
        }, t);
      }, 20);
    }
  };

  const updateEffectPosition = () => {
    if (!containerRef.current || !filterRef.current || !textRef.current || !itemRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = itemRef.current.getBoundingClientRect();
    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`
    };

    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = label;
  };

  const handleEnter = () => {
    setIsActive(true);
    updateEffectPosition();

    if (filterRef.current) {
      filterRef.current.querySelectorAll('.gb-particle').forEach(p => filterRef.current.removeChild(p));
      makeParticles(filterRef.current);
    }

    if (textRef.current) {
      textRef.current.classList.remove('active');
      void textRef.current.offsetWidth; // restart the CSS transition
      textRef.current.classList.add('active');
    }
  };

  const handleLeave = () => {
    setIsActive(false);
    if (textRef.current) textRef.current.classList.remove('active');
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver(updateEffectPosition);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Same styling trick as the original GooeyNav: the blob filter effect
          is very hard to express cleanly in Tailwind utilities, so a scoped
          <style> tag stays the pragmatic choice here. */}
      <style>{`
        :root {
          --gb-color-1: #ffffff;
          --gb-color-2: #d4d4d4;
          --gb-color-3: #a3a3a3;
        }
        .gb-effect {
          position: absolute;
          opacity: 1;
          pointer-events: none;
          display: grid;
          place-items: center;
          z-index: 1;
        }
        .gb-effect.text {
          color: white;
          transition: color 0.25s ease;
        }
        .gb-effect.text.active {
          color: black;
        }
        .gb-effect.filter {
          filter: blur(6px) contrast(100) blur(0);
          mix-blend-mode: lighten;
        }
        .gb-effect.filter::before {
          content: "";
          position: absolute;
          inset: -60px;
          z-index: -2;
          background: black;
        }
        .gb-effect.filter::after {
          content: "";
          position: absolute;
          inset: 0;
          background: white;
          transform: scale(0);
          opacity: 0;
          z-index: -1;
          border-radius: 9999px;
        }
        .gb-effect.filter.active::after {
          animation: gb-pill 0.3s ease both;
        }
        @keyframes gb-pill {
          to { transform: scale(1); opacity: 1; }
        }
        .gb-particle, .gb-point {
          display: block;
          opacity: 0;
          width: 14px;
          height: 14px;
          border-radius: 9999px;
          transform-origin: center;
        }
        .gb-particle {
          --time: 4s;
          position: absolute;
          top: calc(50% - 6px);
          left: calc(50% - 6px);
          animation: gb-particle calc(var(--time)) ease 1 -300ms;
        }
        .gb-point {
          background: var(--color);
          opacity: 1;
          animation: gb-point calc(var(--time)) ease 1 -300ms;
        }
        @keyframes gb-particle {
          0% { transform: rotate(0deg) translate(var(--start-x), var(--start-y)); opacity: 1; animation-timing-function: cubic-bezier(0.55,0,1,0.45); }
          70% { transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2)); opacity: 1; }
          85% { transform: rotate(calc(var(--rotate) * 0.66)) translate(var(--end-x), var(--end-y)); opacity: 1; }
          100% { transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5)); opacity: 1; }
        }
        @keyframes gb-point {
          0% { transform: scale(0); opacity: 0; animation-timing-function: cubic-bezier(0.55,0,1,0.45); }
          25% { transform: scale(calc(var(--scale) * 0.25)); }
          38% { opacity: 1; }
          65% { transform: scale(var(--scale)); opacity: 1; }
          85% { transform: scale(var(--scale)); opacity: 1; }
          100% { transform: scale(0); opacity: 0; }
        }
      `}</style>

      <div className="relative inline-block" ref={containerRef}>
        <Link
          to={href}
          ref={itemRef}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          className="relative z-[3] inline-block px-2 py-1 text-xl font-extrabold tracking-tight text-white no-underline"
          style={{ textShadow: '0 1px 1px hsl(205deg 30% 10% / 0.2)' }}
        >
          {label}
        </Link>
        <span className={`gb-effect filter ${isActive ? 'active' : ''}`} ref={filterRef} />
        <span className="gb-effect text" ref={textRef} />
      </div>
    </>
  );
};

export default GooeyBrand;