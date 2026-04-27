import PricingTable from '@/components/pricing/PricingTable';

export default function PricingPage() {
  return (
    <main className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <span className="text-blue-600 text-[10px] font-bold tracking-[0.2em] uppercase">
          SMART RECHNER
        </span>
        <h2 className="text-6xl font-bold mt-4 italic">
          Transparente <span className="text-blue-600 not-italic">Preiseliste</span>
        </h2>
        <p className="text-brand-navy/60 mt-4 max-w-md">
          Wählen Sie Ihr Modell und die gewünschte Qualität, um den finalen
          Preis inkl. Einbau zu sehen.
        </p>
      </div>
      <div className="max-w-5xl mx-auto px-6">
        <PricingTable />
      </div>
    </main>
  );
}
