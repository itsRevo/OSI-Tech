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
    faqs: [
      {
        q: 'Wie schnell ist eine Handy Reparatur in Rhede möglich?',
        a: 'Viele Display- und Akku-Reparaturen sind bei verfügbaren Teilen kurzfristig möglich. Für eine genaue Einschätzung reicht meist Modell + Schaden.',
      },
      {
        q: 'Welche Geräte repariert ihr?',
        a: 'Wir reparieren u.a. iPhone, Samsung, Google Pixel sowie viele Tablets und Laptops. Wenn du unsicher bist, frag kurz an.',
      },
      {
        q: 'Bekomme ich vorab einen Preis?',
        a: 'Ja. Vor Reparaturbeginn gibt es eine transparente Einschätzung. Richtwerte findest du außerdem auf der Preisseite.',
      },
    ],
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
    faqs: [
      {
        q: 'Lohnt sich eine Handy Reparatur aus Bocholt?',
        a: 'Ja – viele Kunden aus Bocholt kommen für Display-, Akku- und Ladebuchsen-Reparaturen zu uns nach Rhede, weil der Ablauf klar und planbar ist.',
      },
      {
        q: 'Kann ich vorab klären, ob Teile verfügbar sind?',
        a: 'Ja. Sende Modell + Problem, dann prüfen wir die Verfügbarkeit und nennen dir ein realistisches Zeitfenster.',
      },
      {
        q: 'Kann ich auch ohne Termin vorbeikommen?',
        a: 'Grundsätzlich ja. Für weniger Wartezeit ist eine kurze Termin-/Kontaktanfrage empfehlenswert.',
      },
    ],
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
    faqs: [
      {
        q: 'Welche Reparaturen sind besonders häufig?',
        a: 'Sehr häufig sind Displaytausch, Akkuwechsel, Ladebuchse/Charging-Probleme sowie Diagnose bei Wasser- oder Sturzschäden.',
      },
      {
        q: 'Wie läuft die Reparatur ab?',
        a: 'Du fragst kurz an oder bringst das Gerät vorbei. Wir prüfen den Schaden, sprechen den Preis ab und reparieren nach Freigabe.',
      },
      {
        q: 'Gibt es Garantie auf die Reparatur?',
        a: 'Auf viele Arbeiten gibt es Garantie – Details hängen von Gerät und Reparaturart ab. Frag gerne kurz nach.',
      },
    ],
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

  const baseUrl = 'https://osi-tech.de';
  const canonicalUrl = `${baseUrl}/${city}`;
  const title = `${page.title} | OsiTech Smart Repair`;
  const keywords = [
    page.title,
    `Smartphone Reparatur ${page.city}`,
    `iPhone Reparatur ${page.city}`,
    `Samsung Reparatur ${page.city}`,
    `Display Reparatur ${page.city}`,
    `Akku Wechsel ${page.city}`,
  ];

  return {
    title: title,
    description: page.description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      title: title,
      description: page.description,
      url: canonicalUrl,
      type: 'website',
      locale: 'de_DE',
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'OsiTech Smart Repair',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: page.description,
      images: [`${baseUrl}/og-image.jpg`],
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

  const baseUrl = 'https://osi-tech.de';
  const pageUrl = `${baseUrl}/${slug}`;

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${baseUrl}/#business`,
    name: 'OsiTech Smart Repair',
    image: 'https://osi-tech.de/og-image.jpg',
    url: pageUrl,
    telephone: '+4915756441016',
    email: 'info@osi-tech.de',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Wibbeltstraße 35',
      postalCode: '46414',
      addressLocality: 'Rhede',
      addressCountry: 'DE',
    },
    areaServed: page.city,
    priceRange: '€€',
    description: page.description,
  };

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    url: pageUrl,
    description: page.description,
    inLanguage: 'de-DE',
    about: {
      '@type': 'Service',
      name: `Handy Reparatur ${page.city}`,
      provider: {
        '@id': `${baseUrl}/#business`,
      },
      areaServed: page.city,
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <main className="pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(localBusinessJsonLd)}}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(webPageJsonLd)}}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(faqJsonLd)}}
      />
      <section className="pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-blue-600 font-bold tracking-[0.2em] text-[10px] uppercase block mb-4 italic">
              {page.distance}
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-brand-navy leading-[0.9] italic mb-8">
              Handy <span className="text-blue-600 not-italic">Reparatur</span>
              <br />
              {page.city}
            </h1>
            <p className="text-brand-navy/60 text-lg max-w-md leading-relaxed mb-10">
              {page.intro}
            </p>
            <div className="mb-6 inline-flex items-center gap-3 rounded-2xl bg-blue-50 text-blue-700 px-5 py-3 font-bold text-sm border border-blue-100">
              <MapPin size={18} />
              Werkstatt in Rhede – Wibbeltstraße 35
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/termine"
                className="bg-brand-navy text-white px-7 py-4 sm:px-10 sm:py-5 rounded-2xl font-bold text-base sm:text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center"
              >
                Termin anfragen <ArrowRight size={20} className="ml-3" />
              </Link>
              <Link
                href="/preise"
                className="bg-white border-2 border-brand-grey px-7 py-4 sm:px-10 sm:py-5 rounded-2xl font-bold text-base sm:text-lg text-brand-navy hover:bg-brand-grey transition-all"
              >
                Preise prüfen
              </Link>
              <Link
                href="/services"
                className="bg-white border-2 border-brand-grey px-7 py-4 sm:px-10 sm:py-5 rounded-2xl font-bold text-base sm:text-lg text-brand-navy hover:bg-brand-grey transition-all"
              >
                Leistungen
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl">
              {[
                {value: '60 Min.', label: 'typische Express-Reparatur'},
                {value: '3 Mon.', label: 'Garantie auf viele Arbeiten'},
                {value: page.city, label: 'regionaler Service'},
              ].map((item) => (
                <div
                  key={item.value}
                  className="bg-brand-grey/70 rounded-2xl p-4 border border-brand-grey"
                >
                  <div className="text-2xl font-black text-brand-navy">
                    {item.value}
                  </div>
                  <div className="text-[10px] uppercase tracking-wide text-brand-navy/40 font-bold mt-1 leading-tight">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-blue-600 rounded-[60px] rotate-6 opacity-5 blur-3xl" />
            <div className="relative bg-white rounded-[60px] p-3 sm:p-4 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1597740985671-2a8a3b80502e?auto=format&fit=crop&q=80&w=1000"
                className="rounded-[50px] w-full aspect-[4/5] object-cover"
                alt="Repair Tech"
                referrerPolicy="no-referrer"
              />
              <div className="hidden md:block absolute -bottom-10 -left-10 bg-brand-lime p-8 rounded-[40px] shadow-xl max-w-[260px]">
                <h3 className="text-3xl font-black text-brand-navy leading-tight">
                  Reparatur-Service für {page.city}
                </h3>
              </div>
              <div className="hidden md:block absolute top-10 -right-10 bg-brand-navy text-white p-8 rounded-[40px] shadow-xl italic max-w-[300px]">
                <CheckCircle2 size={40} className="text-brand-lime mb-2" />
                <h4 className="font-bold text-sm">Transparente Diagnose</h4>
                <p className="text-white/60 text-sm mt-2 leading-relaxed">
                  {page.localText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mt-24">
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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mt-24">
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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mt-24">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <span className="text-blue-600 text-[10px] font-bold tracking-[0.2em] uppercase">
              Fragen & Antworten
            </span>
            <h2 className="text-3xl md:text-4xl font-black italic text-brand-navy mt-4">
              Häufige Fragen zur Handy Reparatur in {page.city}
            </h2>
            <p className="text-brand-navy/60 mt-6 leading-relaxed">
              Wenn du über Google auf diese Seite kommst: Hier findest du die
              wichtigsten Infos zu Ablauf, typischen Reparaturen und dem
              schnellsten Weg zur Anfrage.
            </p>
          </div>
          <div className="lg:col-span-7 space-y-5">
            {page.faqs.map((faq) => (
              <article
                key={faq.q}
                className="bg-white border border-brand-grey rounded-[28px] p-7"
              >
                <h3 className="text-lg font-bold text-brand-navy">{faq.q}</h3>
                <p className="text-brand-navy/60 text-sm leading-relaxed mt-3">
                  {faq.a}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
