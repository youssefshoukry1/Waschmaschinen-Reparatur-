"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type ServiceIcon =
  | "washer"
  | "dishwasher"
  | "fridge"
  | "microwave"
  | "coffee"
  | "tv"
  | "speaker";

type ServiceLink = {
  href: string;
  label: string;
  description: string;
  icon: ServiceIcon;
};

type NavItem =
  | { kind: "link"; href: string; label: string }
  | { kind: "menu"; label: string; items: ServiceLink[] };

/** Die sieben Geraeteseiten - gleiche Reihenfolge wie in der DeviceNav. */
const serviceLinks: ServiceLink[] = [
  {
    href: "/leistungen",
    label: "Waschmaschine",
    description: "Pumpe, Trommel, Heizung & Elektronik",
    icon: "washer",
  },
  {
    href: "/Afwasmachine",
    label: "Spülmaschine",
    description: "Zulauf, Spülergebnis & Fehlercodes",
    icon: "dishwasher",
  },
  {
    href: "/Koelkast",
    label: "Kühlschrank",
    description: "Kompressor, Thermostat & Dichtung",
    icon: "fridge",
  },
  {
    href: "/Magnetron",
    label: "Mikrowelle",
    description: "Magnetron, Türkontakt & Drehteller",
    icon: "microwave",
  },
  {
    href: "/Koffiezetapparaat",
    label: "Kaffeemaschine",
    description: "Brühgruppe, Pumpe & Entkalkung",
    icon: "coffee",
  },
  {
    href: "/TV",
    label: "Fernseher",
    description: "Netzteil, Panel & Platine",
    icon: "tv",
  },
  {
    href: "/Sprekerstudio",
    label: "Lautsprecher",
    description: "Verstärker, Chassis & Verkabelung",
    icon: "speaker",
  },
];

const navItems: NavItem[] = [
  { kind: "link", href: "/#home", label: "Startseite" },
  { kind: "menu", label: "Leistungen", items: serviceLinks },
  { kind: "link", href: "/#unternehmen", label: "Über uns" },
  { kind: "link", href: "/#contact", label: "Kontakt" },
];

function ServiceGlyph({ icon }: { icon: ServiceIcon }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (icon) {
    case "washer":
      return (
        <svg {...common}>
          <rect x="4" y="2.75" width="16" height="18.5" rx="3" />
          <circle cx="12" cy="14" r="4.75" />
          <circle cx="12" cy="14" r="1.75" />
          <path d="M7.5 6.25h1.5M15 6.25h1.5" />
        </svg>
      );
    case "dishwasher":
      return (
        <svg {...common}>
          <rect x="4" y="2.75" width="16" height="18.5" rx="3" />
          <path d="M4 8h16M7 5.4h2" />
          <circle cx="12" cy="14.6" r="3.6" />
          <path d="M12 11v3.6" />
        </svg>
      );
    case "fridge":
      return (
        <svg {...common}>
          <rect x="5" y="2.75" width="14" height="18.5" rx="3" />
          <path d="M5 9.5h14M8 5.75v2M8 12.25v3" />
        </svg>
      );
    case "microwave":
      return (
        <svg {...common}>
          <rect x="2.75" y="5" width="18.5" height="14" rx="3" />
          <rect x="5.5" y="8" width="9" height="8" rx="1.6" />
          <path d="M17.75 8.5v.01M17.75 12v.01M17.75 15.5v.01" />
        </svg>
      );
    case "coffee":
      return (
        <svg {...common}>
          <path d="M5 8h12v5a6 6 0 0 1-6 6h-.5A5.5 5.5 0 0 1 5 13.5V8Z" />
          <path d="M17 9.5h1.5a2.5 2.5 0 0 1 0 5H17" />
          <path d="M8.5 4.5v1.5M12 3.75V6M15.5 4.5v1.5" />
        </svg>
      );
    case "tv":
      return (
        <svg {...common}>
          <rect x="2.75" y="4" width="18.5" height="13" rx="2.5" />
          <path d="M8.5 20.25h7M12 17v3.25" />
        </svg>
      );
    case "speaker":
      return (
        <svg {...common}>
          <rect x="5.5" y="2.75" width="13" height="18.5" rx="2.8" />
          <circle cx="12" cy="15" r="3.4" />
          <circle cx="12" cy="7" r="1.4" />
        </svg>
      );
  }
}

function ChevronDown() {
  return (
    <svg
      className="navbar__chevron"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function Navbar({ variant = "default" }: { variant?: "default" | "dark" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [compact, setCompact] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);
  /** Desktop-Flyout: haengt am Hover und an der Tastatur. */
  const [servicesOpen, setServicesOpen] = useState(false);
  /** Mobiles Akkordeon - unabhaengig vom Desktop-Flyout. */
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const pathname = usePathname();
  const closeTimer = useRef<number | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openServices = useCallback(() => {
    clearCloseTimer();
    setServicesOpen(true);
  }, [clearCloseTimer]);

  /** Kurzer Puffer, damit der Weg vom Trigger zum Panel das Menue nicht schliesst. */
  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => setServicesOpen(false), 140);
  }, [clearCloseTimer]);

  useEffect(() => clearCloseTimer, [clearCloseTimer]);

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
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      setServicesOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  /** Beim Seitenwechsel faellt jedes offene Menue zu. */
  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  const servicesActive = serviceLinks.some((service) => service.href === pathname);

  const states = [
    scrolled && "is-scrolled",
    compact && "is-compact",
    scrollingDown && "is-scrolling-down",
    menuOpen && "is-menu-open",
    servicesOpen && "is-services-open",
  ].filter(Boolean).join(" ");

  const closeMobileMenu = () => {
    setMenuOpen(false);
    setMobileServicesOpen(false);
  };

  return (
    <header className={`site-header ${variant === "dark" ? "site-header--dark" : ""} ${states}`}>
      <nav className="navbar" aria-label="Hauptnavigation">
        <div className="navbar__row">
          <Link className="navbar__brand" href="/#home">
            <Image className="navbar__logo" src="/images/logo.png" alt={'ALEX_LOGO'} width={2172} height={724} sizes="(max-width: 767px) 160px, 220px" priority />

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
            {navItems.map((item) => {
              if (item.kind === "link") {
                return (
                  <Link className="navbar__link" href={item.href} key={item.href}>
                    {item.label}
                  </Link>
                );
              }

              return (
                <div
                  className="navbar__dropdown"
                  key={item.label}
                  onMouseEnter={openServices}
                  onMouseLeave={scheduleClose}
                  onFocus={openServices}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                      setServicesOpen(false);
                    }
                  }}
                >
                  <button
                    className={`navbar__link navbar__link--trigger${servicesActive ? " is-active" : ""}`}
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={servicesOpen}
                    aria-controls="services-flyout"
                    onClick={() => (servicesOpen ? setServicesOpen(false) : openServices())}
                  >
                    {item.label}
                    <ChevronDown />
                  </button>

                  <div className="navbar__flyout" id="services-flyout">
                    <div className="navbar__mega">
                      <p className="navbar__mega-kicker">Reparatur &amp; Notdienst · Berlin</p>
                      <ul className="navbar__mega-list">
                        {item.items.map((service) => {
                          const active = pathname === service.href;
                          return (
                            <li key={service.href}>
                              <Link
                                className={`navbar__mega-link${active ? " is-active" : ""}`}
                                href={service.href}
                                tabIndex={servicesOpen ? undefined : -1}
                                aria-current={active ? "page" : undefined}
                                onClick={() => setServicesOpen(false)}
                              >
                                <span className="navbar__mega-icon" aria-hidden="true">
                                  <ServiceGlyph icon={service.icon} />
                                </span>
                                <span className="navbar__mega-text">
                                  <span className="navbar__mega-title">{service.label}</span>
                                  <span className="navbar__mega-desc">{service.description}</span>
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="navbar__mobile-menu" id="mobile-navigation">
          <div className="navbar__mobile-inner">
            <div className="navbar__mobile-links">
              {navItems.map((item) => {
                if (item.kind === "link") {
                  return (
                    <Link className="navbar__link" href={item.href} key={item.href} onClick={closeMobileMenu}>
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <div
                    className={`navbar__accordion${mobileServicesOpen ? " is-open" : ""}`}
                    key={item.label}
                  >
                    <button
                      className={`navbar__link navbar__link--trigger${servicesActive ? " is-active" : ""}`}
                      type="button"
                      aria-expanded={mobileServicesOpen}
                      aria-controls="mobile-services"
                      onClick={() => setMobileServicesOpen((open) => !open)}
                    >
                      {item.label}
                      <ChevronDown />
                    </button>

                    <div className="navbar__accordion-panel" id="mobile-services">
                      <div className="navbar__accordion-inner">
                        <ul className="navbar__accordion-list">
                          {item.items.map((service) => {
                            const active = pathname === service.href;
                            return (
                              <li key={service.href}>
                                <Link
                                  className={`navbar__sublink${active ? " is-active" : ""}`}
                                  href={service.href}
                                  tabIndex={mobileServicesOpen ? undefined : -1}
                                  aria-current={active ? "page" : undefined}
                                  onClick={closeMobileMenu}
                                >
                                  <span className="navbar__mega-icon" aria-hidden="true">
                                    <ServiceGlyph icon={service.icon} />
                                  </span>
                                  <span className="navbar__mega-text">
                                    <span className="navbar__mega-title">{service.label}</span>
                                    <span className="navbar__mega-desc">{service.description}</span>
                                  </span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
