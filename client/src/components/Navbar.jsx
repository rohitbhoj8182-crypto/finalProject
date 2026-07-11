import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar({ ready }) {
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);

  useLayoutEffect(() => {
    if (!ready) return;
    gsap.from(navRef.current, {
      y: -30,
      opacity: 0,
      duration: 0.7,
      delay: 0.3,
      ease: "power3.out",
    });
  }, [ready]);

  return (
    <>
      <header className="nav" ref={navRef}>
        <a href="#top" className="nav-logo">
          RB<span className="dot">.</span>
        </a>
        <nav className="nav-links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} data-hover={l.label.toUpperCase()}>
              <span>{l.label}</span>
            </a>
          ))}
        </nav>
        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      <div className={`mobile-menu${open ? " open" : ""}`}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}
