import type {Metadata} from 'next';
import Link from 'next/link';
import PricingTable from '@/components/pricing/PricingTable';

export const metadata: Metadata = {
  title: 'Preise für iPhone Reparatur und Akkuwechsel',
  description:
    'Transparente Reparaturpreise für iPhone Display, Akku und weitere Smartphone-Services bei OsiTech Smart Repair in Rhede.',
  alternates: {
    canonical: '/preise',
  },
};

export default function PricingPage() {
  return (
    <main className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <span className="text-blue-600 text-[10px] font-bold tracking-[0.2em] uppercase">
          SMART RECHNER
        </span>
        <h1 className="text-5xl md:text-6xl font-bold mt-4 italic">
          Transparente <span className="text-blue-600 not-italic">Preiseliste</span>
        </h1>
        <p className="text-brand-navy/60 mt-4 max-w-2xl text-lg leading-relaxed">
          Wählen Sie Ihr Modell und die gewünschte Qualität, um den finalen
          Preis inkl. Einbau zu sehen. Samsung-Preise sind Circa-Angaben, weil
          Ersatzteilpreise je nach Farbe, Display-Version und Lieferbarkeit oft
          variieren. Bei Wasserschäden, Platinenschäden und nicht gelisteten
          Modellen erstellen wir ein individuelles Angebot.
        </p>
      </div>
      <div className="max-w-5xl mx-auto px-6">
        <PricingTable />
      </div>
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Display-Reparatur',
              text: 'Preis abhängig von Modell, Displayqualität und bei Samsung häufig auch von Farbe und Teileverfügbarkeit.',
            },
            {
              title: 'Akku-Austausch',
              text: 'Ideal bei kurzer Laufzeit, Abschaltungen oder gealterter Batterie. Der Einbau ist bei gelisteten Geräten im Preis enthalten.',
            },
            {
              title: 'Diagnose & Sonderfälle',
              text: 'Bei Flüssigkeitsschäden, Datenrettung oder Platinenarbeit nennen wir Kosten nach Prüfung des Geräts transparent vorab.',
            },
          ].map((item) => (
            <article key={item.title} className="bg-brand-grey p-8 rounded-[28px]">
              <h2 className="text-xl font-bold mb-3">{item.title}</h2>
              <p className="text-sm text-brand-navy/60 leading-relaxed">
                {item.text}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/termine"
            className="inline-flex bg-brand-navy text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-600 transition-colors"
          >
            Reparatur-Termin anfragen
          </Link>
        </div>
      </section>
    </main>
  );
}
