import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { profile } from "../../data/profile";

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

        {/* Logo — links home */}
        <Link to="/" className="navbar-logo">
          <img
            src={profile.logo}
            alt="Home"
          />
        </Link>

        {/* Real navigation — PillNav owns desktop pills + its own mobile menu.
            hideLogo is set because .navbar-logo already fills that slot. */}
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