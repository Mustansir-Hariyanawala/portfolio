import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

import './PillNav.css';

const PillNav = ({
  logo,
  logoAlt = 'Logo',
  items = [],
  activeHref,
  className = '',
  ease = 'power3.easeOut',
  baseColor = '#fff',
  pillColor = '#120F17',
  hoveredPillTextColor = '#120F17',
  pillTextColor,
  onMobileMenuClick,
  initialLoadAnimation = true,
  hideLogo = false
}) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const circleRefs = useRef([]);
  const tlRefs = useRef([]);
  const activeTweenRefs = useRef([]);
  const logoImgRef = useRef(null);
  const logoTweenRef = useRef(null);
  const hamburgerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navItemsRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach(circle => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`
        });

        const label = pill.querySelector('.pill-label');
        const white = pill.querySelector('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();

    const onResize = () => layout();
    window.addEventListener('resize', onResize);

    if (document.fonts?.ready) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    const menu = mobileMenuRef.current;
    if (menu) {
      gsap.set(menu, { visibility: 'hidden', opacity: 0, scaleY: 1, y: 0 });
    }

    if (initialLoadAnimation) {
      const logo = logoRef.current;
      const navItems = navItemsRef.current;

      if (logo) {
        gsap.set(logo, { scale: 0 });
        gsap.to(logo, {
          scale: 1,
          duration: 0.6,
          ease
        });
      }

      if (navItems) {
        gsap.set(navItems, { width: 0, overflow: 'hidden' });
        gsap.to(navItems, {
          width: 'auto',
          duration: 0.6,
          ease
        });
      }
    }

    return () => window.removeEventListener('resize', onResize);
  }, [items, ease, initialLoadAnimation]);

  // Escape closes the mobile menu. Goes through the button so the close
  // animation and state stay in one code path.
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKeyDown = e => {
      if (e.key === 'Escape') hamburgerRef.current?.click();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMobileMenuOpen]);

  const handleEnter = i => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: 'auto'
    });
  };

  const handleLeave = i => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: 'auto'
    });
  };

  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
    logoTweenRef.current?.kill();
    gsap.set(img, { rotate: 0 });
    logoTweenRef.current = gsap.to(img, {
      rotate: 360,
      duration: 0.2,
      ease,
      overwrite: 'auto'
    });
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll('.hamburger-line');
      if (newState) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
      }
    }

    if (menu) {
      const rows = menu.querySelectorAll('.mobile-menu-item');
      const instant =
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
      // panel shape when collapsed into the menu button's corner
      const folded = 'inset(0% 0% 100% 100% round 24px)';

      gsap.killTweensOf([menu, ...rows]);

      if (newState) {
        gsap.set(menu, { visibility: 'visible' });

        // panel unfolds out of the top-right corner, where the button is
        gsap.fromTo(
          menu,
          { opacity: 0, clipPath: folded },
          {
            opacity: 1,
            clipPath: 'inset(0% 0% 0% 0% round 24px)',
            duration: instant ? 0 : 0.45,
            ease: 'power3.out'
          }
        );

        // then the rows slide in one after another
        gsap.fromTo(
          rows,
          { opacity: 0, x: 24 },
          {
            opacity: 1,
            x: 0,
            duration: instant ? 0 : 0.4,
            ease: 'power3.out',
            stagger: instant ? 0 : 0.06,
            delay: instant ? 0 : 0.12
          }
        );
      } else {
        gsap.to(rows, {
          opacity: 0,
          x: 12,
          duration: instant ? 0 : 0.15,
          stagger: { each: instant ? 0 : 0.03, from: 'end' }
        });

        gsap.to(menu, {
          opacity: 0,
          clipPath: folded,
          duration: instant ? 0 : 0.3,
          delay: instant ? 0 : 0.08,
          ease: 'power3.in',
          onComplete: () => {
            gsap.set(menu, { visibility: 'hidden' });
          }
        });
      }
    }

    onMobileMenuClick?.();
  };

  // Links in the mobile menu must run the full close animation, not just
  // flip the state flag, or the menu stays visible after navigating.
  const closeMobileMenu = () => {
    if (isMobileMenuOpen) toggleMobileMenu();
  };

  const isExternalLink = href =>
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('//') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('#');

  const isRouterLink = href => href && !isExternalLink(href);

  const cssVars = {
    ['--base']: baseColor,
    ['--pill-bg']: pillColor,
    ['--hover-text']: hoveredPillTextColor,
    ['--pill-text']: resolvedPillTextColor,
    ['--nav-h']: '42px',
    ['--logo']: '36px',
    ['--pill-pad-x']: '18px',
    ['--pill-gap']: '3px'
  };

  return (
    // Styles in PillNav.css. The parent <header> (Navbar.jsx) owns fixed
    // positioning + z-index for the whole bar, so this just flows inside
    // .navbar-container's grid (centred on desktop).
    <div className="pill-nav-wrap">
      <nav
        className={`pill-nav ${className}`}
        aria-label="Primary"
        style={cssVars}
      >
        {!hideLogo && (
          isRouterLink(items?.[0]?.href) ? (
            <Link
              to={items[0].href}
              aria-label="Home"
              onMouseEnter={handleLogoEnter}
              role="menuitem"
              ref={el => {
                logoRef.current = el;
              }}
              className="pill-nav-logo"
            >
              <img src={logo} alt={logoAlt} ref={logoImgRef} />
            </Link>
          ) : (
            <a
              href={items?.[0]?.href || '#'}
              aria-label="Home"
              onMouseEnter={handleLogoEnter}
              ref={el => {
                logoRef.current = el;
              }}
              className="pill-nav-logo"
            >
              <img src={logo} alt={logoAlt} ref={logoImgRef} />
            </a>
          )
        )}

        <div
          ref={navItemsRef}
          className="pill-nav-items"
        >
          <ul
            role="menubar"
            className="pill-nav-list"
          >
            {items.map((item, i) => {
              const isActive = activeHref === item.href;

              const PillContent = (
                <>
                  <span
                    className="hover-circle"
                    aria-hidden="true"
                    ref={el => {
                      circleRefs.current[i] = el;
                    }}
                  />
                  <span className="label-stack">
                    <span
                      className="pill-label"
                    >
                      {item.label}
                    </span>
                    <span
                      className="pill-label-hover"
                      aria-hidden="true"
                    >
                      {item.label}
                    </span>
                  </span>
                  {isActive && (
                    <span
                      className="pill-active-dot"
                      aria-hidden="true"
                    />
                  )}
                </>
              );

              return (
                <li key={item.href} role="none">
                  {isRouterLink(item.href) ? (
                    <Link
                      role="menuitem"
                      to={item.href}
                      className="pill"
                      aria-label={item.ariaLabel || item.label}
                      onMouseEnter={() => handleEnter(i)}
                      onMouseLeave={() => handleLeave(i)}
                    >
                      {PillContent}
                    </Link>
                  ) : (
                    <a
                      role="menuitem"
                      href={item.href}
                      className="pill"
                      aria-label={item.ariaLabel || item.label}
                      onMouseEnter={() => handleEnter(i)}
                      onMouseLeave={() => handleLeave(i)}
                    >
                      {PillContent}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <button
          ref={hamburgerRef}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          className="pill-nav-toggle"
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </nav>

      {/* Mobile menu — styles in NavBar/Navbar.css (.mobile-menu-*) */}
      <div
        ref={mobileMenuRef}
        className="mobile-menu"
        style={cssVars}
      >
        <p className="mobile-menu-label">
          Navigate
        </p>

        <ul className="mobile-menu-list">
          {items.map((item, i) => {
            const isActive = activeHref === item.href;

            const linkProps = {
              className: `mobile-menu-link ${isActive ? 'is-active' : ''}`,
              'aria-current': isActive ? 'page' : undefined,
              onClick: closeMobileMenu
            };

            const content = (
              <>
                <span className="mobile-menu-index">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="mobile-menu-text">
                  {item.label}
                </span>
                <span className="mobile-menu-arrow" aria-hidden="true">
                  →
                </span>
              </>
            );

            return (
              <li key={item.href} className="mobile-menu-item">
                {isRouterLink(item.href) ? (
                  <Link to={item.href} {...linkProps}>
                    {content}
                  </Link>
                ) : (
                  <a href={item.href} {...linkProps}>
                    {content}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Dims and blurs the page behind the open menu; tap it to close.
          Portalled to <body> because the scrolled navbar has a
          backdrop-filter, which would trap a fixed child inside the bar. */}
      {createPortal(
        <div
          className={`mobile-menu-backdrop ${isMobileMenuOpen ? 'is-open' : ''}`}
          onClick={closeMobileMenu}
          aria-hidden="true"
        />,
        document.body
      )}
    </div>
  );
};

export default PillNav;