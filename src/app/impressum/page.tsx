export default function ImpressumPage() {
  return (
    <main className="pt-32 pb-24">
      <section className="max-w-4xl mx-auto px-6 md:px-12">
        <h1 className="text-5xl font-black italic mb-12">Impressum</h1>
        <div className="space-y-12 text-brand-navy/70 leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-brand-navy mb-4">
              Angaben gemäß § 5 TMG:
            </h2>
            <p>OsiTech Smart Repair</p>
            <p>Deichstraße 5</p>
            <p>46414 Rhede</p>
            <p>Deutschland</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-brand-navy mb-4">
              Vertreten durch:
            </h2>
            <p>Osman Habib El-Molla</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-brand-navy mb-4">Kontakt:</h2>
            <p>Telefon: 0157 5644106</p>
            <p>E-Mail: info@osi-tech.de</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-brand-navy mb-4">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:
            </h2>
            <p>Osman Habib El-Molla</p>
            <p>Deichstraße 5</p>
            <p>46414 Rhede</p>
          </div>
          <div className="pt-12 border-t border-brand-grey">
            <p className="text-sm">
              Haftungsausschluss: Trotz sorgfältiger inhaltlicher Kontrolle
              übernehmen wir keine Haftung für die Inhalte externer Links. Für
              den Inhalt der verlinkten Seiten sind ausschließlich deren
              Betreiber verantwortlich.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
