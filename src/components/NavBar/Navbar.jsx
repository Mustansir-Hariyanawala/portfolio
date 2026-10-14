import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import PillNav from "./PillNav/PillNav";

import "./Navbar.css";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-container">

        {/* Brand / logo — plain text, no particle/goo effect */}
        <Link to="/" className="navbar-brand">
          Your Name
        </Link>

        {/* Real navigation — PillNav owns desktop pills + its own mobile menu.
            hideLogo is set because navbar-brand already fills that slot. */}
        <PillNav
          items={navItems}
          activeHref={location.pathname}
          hideLogo
          baseColor="#000000"
          pillColor="#ffffff"
          hoveredPillTextColor="#ffffff"
          pillTextColor="#000000"
          initialLoadAnimation={false}
        />

      </div>
    </header>
  );
}

export default Navbar;