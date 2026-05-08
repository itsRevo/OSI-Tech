import type {Metadata} from 'next';
import Link from 'next/link';
import {ArrowRight, Battery, CheckCircle2, Clock, MapPin, Monitor, Smartphone} from 'lucide-react';
import {notFound} from 'next/navigation';

const cityPages = {
  rhede: {
    city: 'Rhede',
    title: 'Handy Reparatur Rhede',
    description:
      'Handy Reparatur in Rhede: iPhone Display, Samsung Akku, Tablet- und Laptop-Service direkt bei OsiTech Smart Repair.',
    intro:
      'Unsere Werkstatt in Rhede ist die direkte Anlaufstelle für schnelle Smartphone-, Tablet- und Laptop-Reparaturen. Viele Standardreparaturen können nach Teileverfügbarkeit noch am selben Tag erledigt werden.',
    distance: 'direkt vor Ort',
    localText:
      'Für Kunden aus Rhede ist der Bring-In-Service besonders unkompliziert: Gerät vorbeibringen, Fehlerbild prüfen lassen und vor der Reparatur eine transparente Einschätzung erhalten.',
  },
  bocholt: {
    city: 'Bocholt',
    title: 'Handy Reparatur Bocholt',
    description:
      'Smartphone Reparatur nahe Bocholt: iPhone, Samsung, Display, Akku, Datenrettung und Laptop-Service bei OsiTech in Rhede.',
    intro:
      'Von Bocholt aus erreichen Sie OsiTech Smart Repair in Rhede schnell für Displaybruch, schwache Akkus, Ladeprobleme, Datenrettung und Softwarefehler.',
    distance: 'schnell aus Bocholt erreichbar',
    localText:
      'Viele Kunden aus Bocholt nutzen unseren Bring-In-Service, weil Diagnose, Preisabsprache und Reparatur in einem klaren Ablauf stattfinden. Auf Wunsch besprechen wir vorab per Telefon oder E-Mail, ob ein Ersatzteil verfügbar ist.',
  },
  borken: {
    city: 'Borken',
    title: 'Handy Reparatur Borken',
    description:
      'Handy Reparatur nahe Borken: OsiTech repariert iPhone, Samsung, Tablets und Laptops mit klaren Preisen und Garantie.',
    intro:
      'Auch für Kunden aus Borken ist OsiTech Smart Repair eine regionale Werkstatt für Smartphone-Reparatur, Akkuwechsel, Displayschäden und technische Diagnose.',
    distance: 'gut aus Borken erreichbar',
    localText:
      'Wenn Sie aus Borken kommen, können Sie vorab einen Termin anfragen und Ihr Gerät gezielt zur Prüfung abgeben. So lassen sich Wartezeit und Ersatzteilbedarf besser planen.',
  },
} as const;

type CitySlug = keyof typeof cityPages;
type PageProps = {
  params: Promise<{city: string}>;
};

function getCityPage(slug: string) {
  return cityPages[slug as CitySlug];
}

export function generateStaticParams() {
  return Object.keys(cityPages).map((city) => ({city}));
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {city} = await params;
  const page = getCityPage(city);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `/${city}`,
    },
    openGraph: {
      title: `${page.title} | OsiTech Smart Repair`,
      description: page.description,
      url: `https://osi-tech.de/${city}`,
      type: 'website',
      locale: 'de_DE',
    },
  };
}

export default async function CityPage({params}: PageProps) {
  const {city: slug} = await params;
  const page = getCityPage(slug);

  if (!page) {
    notFound();
  }

  const services = [
    {
      icon: <Monitor size={24} />,
      title: 'Display-Reparatur',
      text: 'Austausch bei Glasbruch, Touch-Problemen, Pixelfehlern oder flackernder Anzeige.',
    },
    {
      icon: <Battery size={24} />,
      title: 'Akku-Austausch',
      text: 'Neue Laufzeit bei schneller Entladung, Abschaltungen und gealterten Akkus.',
    },
    {
      icon: <Smartphone size={24} />,
      title: 'Smartphone-Service',
      text: 'Diagnose, Ladebuchse, Backcover, Software, Datenübertragung und Geräteeinrichtung.',
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'OsiTech Smart Repair',
    image: 'https://osi-tech.de/og-image.jpg',
    url: `https://osi-tech.de/${slug}`,
    telephone: '+491575644106',
    email: 'info@osi-tech.de',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Deichstraße 5',
      postalCode: '46414',
      addressLocality: 'Rhede',
      addressCountry: 'DE',
    },
    areaServed: page.city,
    priceRange: '€€',
    description: page.description,
  };

  return (
    <main className="pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
      />
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-blue-600 text-[10px] font-bold tracking-[0.2em] uppercase">
              {page.distance}
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-brand-navy leading-tight italic mt-4">
              {page.title}
            </h1>
            <p className="text-brand-navy/60 text-lg leading-relaxed mt-8 max-w-xl">
              {page.intro}
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                href="/termine"
                className="bg-brand-navy text-white px-8 py-4 rounded-2xl font-bold inline-flex items-center"
              >
                Termin anfragen <ArrowRight size={18} className="ml-3" />
              </Link>
              <Link
                href="/preise"
                className="bg-brand-grey text-brand-navy px-8 py-4 rounded-2xl font-bold"
              >
                Preise ansehen
              </Link>
            </div>
          </div>
          <div className="bg-brand-grey rounded-[36px] p-8 md:p-12">
            <MapPin className="text-blue-600 mb-8" size={36} />
            <h2 className="text-3xl font-bold italic mb-6">
              Reparatur-Service für {page.city}
            </h2>
            <p className="text-brand-navy/60 leading-relaxed">
              {page.localText}
            </p>
            <div className="mt-8 space-y-4">
              {[
                'Klare Diagnose vor Reparaturbeginn',
                'Display, Akku, Backglass und Software-Service',
                'Service für iPhone, Samsung, Google Pixel, iPad und Laptop',
              ].map((item) => (
                <div key={item} className="flex items-center text-sm font-semibold">
                  <CheckCircle2 className="text-blue-600 mr-3" size={18} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-24">
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <article key={service.title} className="bg-white border border-brand-grey rounded-[28px] p-8">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h2 className="text-xl font-bold mb-3">
                {service.title} für {page.city}
              </h2>
              <p className="text-brand-navy/60 text-sm leading-relaxed">
                {service.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-24">
        <div className="bg-brand-navy text-white rounded-[36px] p-10 md:p-14 grid lg:grid-cols-3 gap-10 items-center">
          <div className="lg:col-span-2">
            <Clock className="text-brand-lime mb-6" size={32} />
            <h2 className="text-3xl md:text-4xl font-black italic">
              Kurze Wege, klare Preise, planbare Reparatur.
            </h2>
            <p className="text-white/60 mt-5 leading-relaxed max-w-3xl">
              Nennen Sie Modell und Schaden vorab. Wir prüfen, ob das passende
              Ersatzteil verfügbar ist und welches Zeitfenster für Ihre
              Reparatur realistisch ist.
            </p>
          </div>
          <Link
            href="/contact"
            className="bg-brand-lime text-brand-navy px-8 py-4 rounded-2xl font-bold text-center"
          >
            Kontakt aufnehmen
          </Link>
        </div>
      </section>
    </main>
  );
}
