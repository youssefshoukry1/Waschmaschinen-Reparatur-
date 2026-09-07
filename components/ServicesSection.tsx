import Image from "next/image";
import { AnimatedSectionTitle } from "./HeroTitle";
import DefectsSection from "./DefectsSection";

import { business } from "@/lib/business";

type ServiceIcon =
  | "washer"
  | "fridge"
  | "dishwasher"
  | "dryer"
  | "oven"
  | "coffee"
  | "tv";

type Service = {
  slug: string;
  title: string;
  description: string;
  icon: ServiceIcon;
  image?: string;
  imageAlt?: string;
  featured?: boolean;
};

const services: Service[] = [
  {
    slug: "waschmaschinen-reparatur",
    title: "Waschmaschinen Reparatur",
    description:
      "Pumpe, Trommel, Heizung oder Elektronik – wir reparieren vor Ort in ganz Berlin.",
    icon: "washer",
    image: "/images/repair/img10.png",
    imageAlt: "Techniker repariert eine Waschmaschine beim Kunden vor Ort",
    featured: true,
  },
  {
    slug: "kuehlschrank-reparatur",
    title: "Kühlschrank Reparatur",
    description:
      "Gerät kühlt nicht mehr oder vereist? Wir prüfen Kompressor, Thermostat und Dichtung.",
    icon: "fridge",
    image: "/images/repair/img3.png",
    imageAlt: "Kühlschrank wird vom Techniker geprüft",
  },
  {
    slug: "spuelmaschinen-reparatur",
    title: "Spülmaschinen Reparatur",
    description:
      "Kein Wasserzulauf, schlechtes Spülergebnis oder Fehlercode – schnell behoben.",
    icon: "dishwasher",
    image: "/images/repair/img4.png",
    imageAlt: "Geschirrspüler wird instand gesetzt",
  },
  {
    slug: "trockner-reparatur",
    title: "Trockner Reparatur",
    description:
      "Wäsche bleibt feucht oder das Gerät bleibt stehen? Wir bringen den Trockner wieder in Gang.",
    icon: "dryer",
    image: "/images/repair/img1.png",
    imageAlt: "Wäschetrockner wird repariert",
  },
  {
    slug: "herd-backofen-reparatur",
    title: "Herd & Backofen Reparatur",
    description:
      "Cerankochfeld, Heizspirale oder Thermostat – Reparatur mit Original-Ersatzteilen.",
    icon: "oven",
    image: "/images/repair/img7.png",
    imageAlt: "Backofen wird vom Techniker instand gesetzt",
  },
  {
    slug: "kaffeemaschinen-reparatur",
    title: "Kaffeemaschinen Reparatur",
    description:
      "Vollautomat entkalken, Brühgruppe tauschen oder Pumpe erneuern – schnell erledigt.",
    icon: "coffee",
    image: "/images/repair/img5.png",
    imageAlt: "Kaffeevollautomat wird gewartet",
  },
  {
    slug: "tv-elektronik-reparatur",
    title: "TV & Elektronik Reparatur",
    description:
      "Kein Bild, kein Ton oder Streifen im Display? Wir prüfen Netzteil, Panel und Platine.",
    icon: "tv",
    image: "/images/repair/img6.png",
    imageAlt: "Fernsehgerät wird repariert",
  },
];

function ServiceArtwork({ icon }: { icon: ServiceIcon }) {
  if (icon === "tv") {
    return (
      <Image
        className="service-artwork service-artwork--ui-icon"
        src="/images/ui/senior-assistance.svg"
        alt=""
        width={180}
        height={180}
        aria-hidden="true"
      />
    );
  }

  return (
    <svg
      className="service-artwork"
      viewBox="0 0 320 250"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path className="service-artwork__pattern" d="M-20 52h76V-8M32 258v-64h64v-64h64V66h64V2M246 258v-64h92" />
      <circle className="service-artwork__accent" cx="242" cy="58" r="30" />
      <circle className="service-artwork__person" cx="145" cy="76" r="27" />
      <path className="service-artwork__person" d="M102 202v-53c0-32 19-49 43-49s43 17 43 49v53M112 143l-36 42M178 143l33 39" />

      {icon === "washer" && (
        <>
          <path className="service-artwork__tool" d="M55 177h70l9 34H47l8-34Z" />
          <path className="service-artwork__detail" d="M65 177v-14h48v14M78 163v-12h26v12" />
        </>
      )}
      {icon === "dishwasher" && (
        <>
          <path className="service-artwork__tool" d="M201 119h28l7 82h-42l7-82ZM205 119v-20h20l8 12" />
          <path className="service-artwork__detail" d="m70 186 42-35M73 169l22 24" />
        </>
      )}
      {icon === "fridge" && (
        <>
          <rect className="service-artwork__tool" x="202" y="99" width="70" height="103" rx="5" />
          <path className="service-artwork__detail" d="M237 99v103M202 150h70M176 150h42M176 140v20" />
        </>
      )}
      {icon === "dryer" && (
        <>
          <path className="service-artwork__tool" d="M207 197c31-15 48-42 48-77-35 0-64 30-58 66" />
          <path className="service-artwork__detail" d="m193 208 45-65M69 183h57M78 172l39 22" />
        </>
      )}
      {icon === "oven" && (
        <>
          <circle className="service-artwork__tool" cx="229" cy="96" r="22" />
          <path className="service-artwork__tool" d="M198 202v-47c0-27 13-40 31-40s31 13 31 40v47M206 149l-26 31" />
          <path className="service-artwork__detail" d="m181 180 13 4M188 173l5 15" />
        </>
      )}
      {icon === "coffee" && (
        <>
          <path className="service-artwork__tool" d="M198 138h67l-8 65h-51l-8-65Z" />
          <path className="service-artwork__detail" d="M213 138c0-15 7-25 19-25s19 10 19 25M218 119c-4-16 6-28 19-31M239 105c5-13 18-18 29-13-2 13-13 21-29 13Z" />
        </>
      )}
    </svg>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <article
      className={`service-card${service.featured ? " service-card--featured" : ""}`}
      id={service.slug}
    >
      <div
        className={`service-card__stage service-card__stage--${service.slug}${
          service.image ? " service-card__stage--cutout" : ""
        }`}
      >
        {service.image ? (
          <Image
            className={`service-card__image service-card__image--${service.slug}`}
            src={service.image}
            alt={service.imageAlt ?? ""}
            width={2000}
            height={2000}
            sizes="(max-width: 575px) calc(100vw - 32px), (max-width: 991px) 50vw, 400px"
          />
        ) : (
          <ServiceArtwork icon={service.icon} />
        )}
      </div>
      <div className="service-card__content">
        <div>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </div>
        <a href="#contact" aria-label={`${service.title} anfragen`}>
          <span>Anfragen</span>
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M4 10h12M11 5l5 5-5 5" />
          </svg>
        </a>
      </div>
    </article>
  );
}

export default function ServicesSection() {
  const featuredService = services.find((service) => service.featured)!;
  const standardServices = services.filter((service) => !service.featured);

  return (
    <section className="service-showcase" id="services" aria-labelledby="services-heading">
      <div className="service-showcase__inner">
        <header className="service-showcase__heading">
          <p>Unsere Leistungen im Überblick</p>
          <AnimatedSectionTitle id="services-heading" parts={[{ text: "Haushaltsgeräte " }, { text: "Reparatur & Verkauf", emphasized: true }, { text: " in Berlin" }]} />
          <div>
            Von der Waschmaschine über den Kühlschrank bis zum Fernseher: Wir reparieren
            Ihr Gerät direkt bei Ihnen zu Hause – zum Festpreis und mit {business.warrantyMonths} Monaten Garantie.
          </div>
        </header>

        <div className="service-showcase__featured">
          <ServiceCard service={featuredService} />

          <aside className="care-fund" aria-labelledby="financing-heading">
            <span>{business.financing.interestRate} % Finanzierung</span>
            <h3 id="financing-heading">Jetzt reparieren, bequem zahlen</h3>
            <p>
              Größere Reparaturen und Neugeräte können Sie über die {business.financing.partner}{" "}
              in bis zu {business.financing.maxMonths} Monatsraten zahlen – zu {business.financing.interestRate} %
              effektivem Jahreszins. Wir stellen den Antrag gemeinsam mit Ihnen vor Ort.
            </p>
            <a className="split-hover-cta" href="#contact"><span>Finanzierung anfragen</span></a>
          </aside>
        </div>

        <DefectsSection />

        <div className="service-showcase__grid">
          {standardServices.map((service) => (
            <ServiceCard service={service} key={service.slug} />
          ))}
        </div>
      </div>
    </section>
  );
}
