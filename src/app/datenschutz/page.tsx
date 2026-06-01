import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description:
    'Datenschutzerklärung von OsiTech Smart Repair (DSGVO): Informationen zur Verarbeitung personenbezogener Daten auf osi-tech.de.',
  alternates: {
    canonical: '/datenschutz',
  },
};

export default function DatenschutzPage() {
  return (
    <main className="pt-32 pb-24">
      <section className="max-w-4xl mx-auto px-6 md:px-12">
        <h1 className="text-5xl font-black italic mb-12">Datenschutzerklärung</h1>

        <div className="space-y-12 text-brand-navy/70 leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-brand-navy mb-4">
              1. Verantwortlicher
            </h2>
            <p>OsiTech Smart Repair</p>
            <p>Wibbeltstraße 35</p>
            <p>46414 Rhede</p>
            <p>Deutschland</p>
            <p>Telefon: 0157 56441016</p>
            <p>E-Mail: info@osi-tech.de</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-navy mb-4">
              2. Allgemeine Hinweise
            </h2>
            <p>
              Wir nehmen den Schutz Ihrer personenbezogenen Daten sehr ernst.
              Personenbezogene Daten sind alle Daten, mit denen Sie persönlich
              identifiziert werden können. Diese Datenschutzerklärung informiert
              Sie darüber, welche Daten wir auf dieser Website erheben und wofür
              wir sie nutzen.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-navy mb-4">
              3. Bereitstellung der Website und Server-Logfiles
            </h2>
            <p>
              Beim Aufruf unserer Website werden durch den Hosting-Provider
              automatisch Informationen in sogenannten Server-Logfiles erfasst.
              Dies können insbesondere sein:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>IP-Adresse</li>
              <li>Datum und Uhrzeit der Anfrage</li>
              <li>Aufgerufene Seite/Datei</li>
              <li>Referrer-URL</li>
              <li>Browsertyp und -version</li>
              <li>Betriebssystem</li>
            </ul>
            <p className="mt-4">
              Die Verarbeitung erfolgt zur technischen Bereitstellung, Sicherheit
              und Stabilität der Website. Rechtsgrundlage ist Art. 6 Abs. 1 lit.
              f DSGVO (berechtigtes Interesse).
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-navy mb-4">
              4. Kontaktaufnahme (Kontaktformular, Termin-Anfrage, Express-Anfrage)
            </h2>
            <p>
              Wenn Sie uns über das Kontaktformular, die Termin-Anfrage oder eine
              Express-Anfrage kontaktieren, verarbeiten wir die von Ihnen
              übermittelten Daten (z.B. Name, Telefonnummer, E-Mail-Adresse,
              Geräteangaben, Problembeschreibung), um Ihre Anfrage zu bearbeiten
              und zu beantworten.
            </p>
            <p className="mt-4">
              Rechtsgrundlagen sind Art. 6 Abs. 1 lit. b DSGVO (Vertrag/
              vorvertragliche Maßnahmen), soweit die Anfrage auf die Anbahnung
              oder Durchführung einer Reparatur gerichtet ist, sowie Art. 6 Abs.
              1 lit. f DSGVO (berechtigtes Interesse an effizienter
              Kommunikation) für sonstige Anfragen.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-navy mb-4">
              5. E-Mail-Versand / Dienstleister für den Mailversand
            </h2>
            <p>
              Zur Bearbeitung Ihrer Anfragen werden Formularinhalte per E-Mail an
              unsere Kontaktadresse (info@osi-tech.de) übermittelt. Der Versand
              kann über einen technischen Dienstleister (SMTP-Mailserver)
              erfolgen. Dabei werden die von Ihnen eingegebenen Daten sowie
              technische Metadaten (z.B. Zeitstempel) verarbeitet.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-navy mb-4">
              6. Cookies, Tracking und Analyse
            </h2>
            <p>
              Auf dieser Website setzen wir derzeit keine Tracking- oder
              Analyse-Tools (z.B. Google Analytics) ein. Technisch notwendige
              Cookies können durch Framework/Hosting entstehen, um die Website
              sicher und funktionsfähig bereitzustellen.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-navy mb-4">
              7. Empfänger von Daten
            </h2>
            <p>
              Wir geben personenbezogene Daten nur weiter, wenn dies zur
              Bearbeitung Ihrer Anfrage erforderlich ist oder eine rechtliche
              Verpflichtung besteht. Mögliche Empfänger sind:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Hosting-Provider (Bereitstellung der Website)</li>
              <li>E-Mail-/SMTP-Dienstleister (Versand und Empfang von Anfragen)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-navy mb-4">
              8. Speicherdauer
            </h2>
            <p>
              Wir speichern personenbezogene Daten nur so lange, wie es für die
              Bearbeitung der Anfrage erforderlich ist oder gesetzliche
              Aufbewahrungspflichten bestehen. Danach werden die Daten gelöscht
              bzw. anonymisiert.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-navy mb-4">
              9. Ihre Rechte
            </h2>
            <p>Sie haben im Rahmen der DSGVO grundsätzlich folgende Rechte:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Auskunft (Art. 15 DSGVO)</li>
              <li>Berichtigung (Art. 16 DSGVO)</li>
              <li>Löschung (Art. 17 DSGVO)</li>
              <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruch gegen Verarbeitung (Art. 21 DSGVO)</li>
              <li>Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
            </ul>
            <p className="mt-4">
              Zur Ausübung Ihrer Rechte genügt eine formlose Mitteilung an
              info@osi-tech.de.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-navy mb-4">
              10. Änderung dieser Datenschutzerklärung
            </h2>
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit
              sie stets den aktuellen rechtlichen Anforderungen entspricht oder
              um Änderungen unserer Leistungen in der Datenschutzerklärung
              umzusetzen.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
