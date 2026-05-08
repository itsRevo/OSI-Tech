import {Battery, Cpu, Layers, Monitor, PenTool, Shield, Smartphone} from 'lucide-react';
import type {Metadata} from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Services für Handy, Tablet und Laptop Reparatur',
  description:
    'Display-Reparatur, Akku-Tausch, Wasserschaden-Service, Datenrettung und Micro-Soldering bei OsiTech Smart Repair in Rhede.',
  alternates: {
    canonical: '/services',
  },
};

export default function ServicesPage() {
  const services = [
    {
      icon: <Monitor size={32} />,
      name: 'Display-Reparatur',
      time: '< 60 Min',
      desc: 'Schneller Austausch bei Glasbruch oder Pixelfehlern mit kalibrierten Displays.',
      details:
        'Wir prüfen Touch, Helligkeit, True-Tone- beziehungsweise Farbverhalten und verbauen je nach Gerät Standard-, Premium- oder Originalqualität.',
    },
    {
      icon: <Battery size={32} />,
      name: 'Akku-Austausch',
      time: '< 45 Min',
      desc: 'Wiederherstellung der originalen Laufzeit mit zertifizierten Hochleistungszellen.',
      details:
        'Geeignet bei schneller Entladung, Abschaltungen unter Last, aufgeblähtem Akku oder deutlich reduzierter Kapazität.',
    },
    {
      icon: <Shield size={32} />,
      name: 'Wasserschäden',
      time: '1-3 Tage',
      desc: 'Professionelle Ultraschallreinigung und Korrosionsschutz für Ihre Hardware.',
      details:
        'Nach Feuchtigkeitseintritt zählt Tempo: Wir öffnen, reinigen und messen betroffene Baugruppen, bevor Korrosion Folgeschäden verursacht.',
    },
    {
      icon: <Cpu size={32} />,
      name: 'Platinen-Service',
      time: '2-5 Tage',
      desc: 'Micro-Soldering für komplexe Bauteil-Reparaturen auf Chipebene.',
      details:
        'Für Ladeprobleme, Kurzschlüsse, Audio-IC-Fehler, Face-ID-nahe Diagnosen und Fälle, bei denen ein normaler Teiletausch nicht reicht.',
    },
    {
      icon: <Layers size={32} />,
      name: 'Backglass-Tausch',
      time: '90 Min',
      desc: 'Präziser Laser-Austausch der Rückseite ohne Gehäuseschaden.',
      details:
        'Die beschädigte Rückseite wird sauber entfernt und ersetzt, ohne direkt das komplette Gerät tauschen zu müssen.',
    },
    {
      icon: <Smartphone size={32} />,
      name: 'Software-Service',
      time: '60 Min',
      desc: 'Datenrettung, Updates und Optimierung Ihres Betriebssystems.',
      details:
        'Wir helfen bei Startproblemen, Speicherwarnungen, Updatefehlern, Datenübertragung und Einrichtung neuer Geräte.',
    },
  ];

  return (
    <main className="pt-32 pb-24">
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-20 max-w-3xl">
          <span className="text-blue-600 text-[10px] font-bold tracking-[0.2em] uppercase">
            UNSERE EXPERTISE
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mt-4 italic">
            Dienstleistungen <span className="text-blue-600 not-italic">& Support</span>
          </h1>
          <p className="text-brand-navy/60 mt-6 text-lg leading-relaxed">
            OsiTech Smart Repair ist auf schnelle Diagnose und fachgerechte
            Reparaturen für Smartphones, iPhones, Samsung Galaxy Geräte,
            Tablets, MacBooks und Windows-Laptops spezialisiert. Sie erhalten
            vor der Reparatur eine klare Einschätzung zu Aufwand, Ersatzteilen
            und Kosten.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <article
              key={i}
              className="bg-white border-2 border-brand-grey p-8 md:p-10 rounded-[32px] hover:border-blue-600 transition-all group"
            >
              <div className="w-16 h-16 bg-brand-grey rounded-2xl flex items-center justify-center text-brand-navy mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all">
                {service.icon}
              </div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">{service.name}</h3>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase italic">
                  {service.time}
                </span>
              </div>
              <p className="text-brand-navy/60 leading-relaxed text-sm">
                {service.desc}
              </p>
              <p className="text-brand-navy/50 leading-relaxed text-sm mt-4">
                {service.details}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-20 grid lg:grid-cols-3 gap-8">
          {[
            {
              title: 'Diagnose vor der Reparatur',
              text: 'Wir prüfen Gerät, Fehlerbild und Ersatzteilbedarf. Bei unklaren Schäden erklären wir die nächsten Schritte, bevor Kosten entstehen.',
            },
            {
              title: 'Transparente Teilequalität',
              text: 'Je nach Modell bieten wir passende Qualitätsstufen an. Sie entscheiden bewusst zwischen günstiger, Premium- und Originalqualität.',
            },
            {
              title: 'Service für die Region',
              text: 'Unsere Werkstatt in Rhede ist schnell erreichbar aus Bocholt, Borken, Isselburg, Velen und Umgebung.',
            },
          ].map((item) => (
            <div key={item.title} className="bg-brand-grey p-8 rounded-[28px]">
              <PenTool className="text-blue-600 mb-5" size={24} />
              <h2 className="text-xl font-bold mb-3">{item.title}</h2>
              <p className="text-sm text-brand-navy/60 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-20 bg-brand-navy text-white rounded-[36px] p-10 md:p-14 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-black italic">
              Problem beschreiben, Einschätzung erhalten.
            </h2>
            <p className="text-white/60 mt-4 max-w-2xl">
              Senden Sie Gerät, Modell und Fehlerbild. Wir melden uns mit einer
              realistischen Einschätzung zu Preis, Dauer und Ersatzteiloptionen.
            </p>
          </div>
          <Link
            href="/termine"
            className="bg-brand-lime text-brand-navy px-8 py-4 rounded-2xl font-bold text-center shrink-0"
          >
            Termin anfragen
          </Link>
        </div>
      </section>
    </main>
  );
}
