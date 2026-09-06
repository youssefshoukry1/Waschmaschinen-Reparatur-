import Image from "next/image";
import { AnimatedSectionTitle } from "./HeroTitle";
import Section45a from "./Section45a";

type ServiceIcon =
  | "household"
  | "cleaning"
  | "windows"
  | "garden"
  | "companion"
  | "shopping"
  | "senior";

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
    slug: "haushaltshilfe-45a",
    title: "Haushaltshilfe nach § 45a SGB XI",
    description:
      "Verlässliche Entlastung im Haushalt in Bernau bei Berlin und im Umkreis von 20 km.",
    icon: "household",
    image: "/images/services/7.webp",
    imageAlt: "Alltagshelferin unterstützt eine Seniorin bei der Haushaltshilfe",
    featured: true,
  },
  {
    slug: "reinigungsdienste",
    title: "Reinigungsdienste",
    description:
      "Gründliche Reinigung für ein gepflegtes Zuhause und spürbar mehr freie Zeit.",
    icon: "cleaning",
    image: "/images/services/4.webp",
    imageAlt: "Alltagshelferin bei der gründlichen Reinigung",
  },
  {
    slug: "glas-fensterreinigung",
    title: "Glas- & Fensterreinigung",
    description:
      "Klare Sicht für Wohnungen, Häuser und Gewerbe – in ganz Berlin und Brandenburg.",
    icon: "windows",
    image: "/images/services/2.webp",
    imageAlt: "Fensterreinigerin mit Abzieher und Sprühflasche",
  },
  {
    slug: "gartenarbeit",
    title: "Gartenarbeit",
    description:
      "Zuverlässige Pflege rund ums Haus – vom Rasenmähen bis zum Heckenschnitt.",
    icon: "garden",
    image: "/images/services/5.webp",
    imageAlt: "Alltagshelferin bei der Gartenarbeit",
  },
  {
    slug: "begleit-fahrdienste",
    title: "Begleit- & Fahrdienste",
    description:
      "Sicher und persönlich begleitet zu Terminen, Besorgungen oder wichtigen Wegen.",
    icon: "companion",
    image: "/images/services/6.webp",
    imageAlt: "Alltagshelferin begleitet eine Seniorin beim Fahrdienst",
  },
  {
    slug: "einkaufsservice",
    title: "Einkaufsservice",
    description:
      "Wir übernehmen Einkäufe oder erledigen sie gemeinsam mit Ihnen – unkompliziert und zuverlässig.",
    icon: "shopping",
    image: "/images/services/3.webp",
    imageAlt: "Alltagshelferin mit einem gefüllten Einkaufsbeutel",
  },
  {
    slug: "seniorenbetreuung",
    title: "Seniorenbetreuung zu Hause",
    description:
      "Zeit, Gesellschaft und praktische Unterstützung für einen selbstbestimmten Alltag.",
    icon: "senior",
    image: "/images/services/1.webp",
    imageAlt: "Alltagshelferin begleitet eine Seniorin zu Hause",
  },
];

function ServiceArtwork({ icon }: { icon: ServiceIcon }) {
  if (icon === "senior") {
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

      {icon === "household" && (
        <>
          <path className="service-artwork__tool" d="M55 177h70l9 34H47l8-34Z" />
          <path className="service-artwork__detail" d="M65 177v-14h48v14M78 163v-12h26v12" />
        </>
      )}
      {icon === "cleaning" && (
        <>
          <path className="service-artwork__tool" d="M201 119h28l7 82h-42l7-82ZM205 119v-20h20l8 12" />
          <path className="service-artwork__detail" d="m70 186 42-35M73 169l22 24" />
        </>
      )}
      {icon === "windows" && (
        <>
          <rect className="service-artwork__tool" x="202" y="99" width="70" height="103" rx="5" />
          <path className="service-artwork__detail" d="M237 99v103M202 150h70M176 150h42M176 140v20" />
        </>
      )}
      {icon === "garden" && (
        <>
          <path className="service-artwork__tool" d="M207 197c31-15 48-42 48-77-35 0-64 30-58 66" />
          <path className="service-artwork__detail" d="m193 208 45-65M69 183h57M78 172l39 22" />
        </>
      )}
      {icon === "companion" && (
        <>
          <circle className="service-artwork__tool" cx="229" cy="96" r="22" />
          <path className="service-artwork__tool" d="M198 202v-47c0-27 13-40 31-40s31 13 31 40v47M206 149l-26 31" />
          <path className="service-artwork__detail" d="m181 180 13 4M188 173l5 15" />
        </>
      )}
      {icon === "shopping" && (
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
          <p>Unsere Leistungen</p>
          <AnimatedSectionTitle id="services-heading" parts={[{ text: "Unterstützung, die " }, { text: "zu Ihrem Alltag", emphasized: true }, { text: " passt" }]} />
          <div>
            Von der Haushaltshilfe bis zur Begleitung im Alltag: Wir unterstützen
            Sie zuverlässig, persönlich und genau dort, wo Sie Entlastung brauchen.
          </div>
        </header>

        <div className="service-showcase__featured">
          <ServiceCard service={featuredService} />

          <aside className="care-fund" aria-labelledby="care-fund-heading">
            <span>Anerkannter Dienstleister</span>
            <h3 id="care-fund-heading">Entlastungsbetrag nutzen</h3>
            <p>
              Wenn die persönlichen Voraussetzungen erfüllt sind, können Leistungen
              über den Entlastungsbetrag der Pflegekasse abgerechnet werden. Wir
              beraten Sie gern persönlich zu den nächsten Schritten.
            </p>
            <a className="split-hover-cta" href="#contact"><span>Persönlich beraten lassen</span></a>
          </aside>
        </div>

        <Section45a />

        <div className="service-showcase__grid">
          {standardServices.map((service) => (
            <ServiceCard service={service} key={service.slug} />
          ))}
        </div>
      </div>
    </section>
  );
}
