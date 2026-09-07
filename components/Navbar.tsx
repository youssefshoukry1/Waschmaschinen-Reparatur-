"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { business } from "@/lib/business";

const links = [
  ["/#home", "Startseite"],
  ["/#services", "Leistungen"],
  ["/#unternehmen", "Über uns"],
  ["/#contact", "Kontakt"],
] as const;

export default function Navbar({ variant = "default" }: { variant?: "default" | "dark" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [compact, setCompact] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let frame = 0;

    const update = () => {
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY;
      setScrolled(scrollY > 32);
      setCompact(scrollY > 120);
      if (Math.abs(delta) > 2) setScrollingDown(delta > 0 && scrollY > 120);
      if (scrollY < 32) setScrollingDown(false);
      lastScrollY = scrollY;
      frame = 0;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const states = [
    scrolled && "is-scrolled",
    compact && "is-compact",
    scrollingDown && "is-scrolling-down",
    menuOpen && "is-menu-open",
  ].filter(Boolean).join(" ");

  return (
    <header className={`site-header ${variant === "dark" ? "site-header--dark" : ""} ${states}`}>
      <nav className="navbar" aria-label="Hauptnavigation">
        <div className="navbar__row">
          <Link className="navbar__brand" href="/#home">
            <Image className="navbar__logo" src="/images/logo.png" alt={'ALEX_LOGO'} width={1254} height={1254} priority />
            <span className="navbar__wordmark">ALE<span className="navbar__wordmark-x">X</span></span>
          </Link>

          <button
            className="navbar__toggle"
            type="button"
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="navbar__toggle-lines" aria-hidden="true">
              <span className="navbar__toggle-line" />
              <span className="navbar__toggle-line" />
              <span className="navbar__toggle-line" />
            </span>
          </button>

          <div className="navbar__desktop-links">
            {links.map(([href, label]) => <Link className="navbar__link" href={href} key={href}>{label}</Link>)}
          </div>
        </div>

        <div className="navbar__mobile-menu" id="mobile-navigation">
          <div className="navbar__mobile-inner">
            <div className="navbar__mobile-links">
              {links.map(([href, label]) => (
                <Link className="navbar__link" href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
