import type {Metadata} from 'next';
import Link from 'next/link';
import {Clock, Mail, Phone, Truck} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kontakt & Öffnungszeiten',
  description:
    'Telefon, E-Mail und Öffnungszeiten von OsiTech Smart Repair. Termin vereinbaren & kostenloser Lieferservice.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <main className="pt-32 pb-24">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <span className="text-blue-600 text-[10px] font-bold tracking-[0.2em] uppercase">
              KONTAKT
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mt-4 italic">
              Kontakt <span className="text-blue-600 not-italic">& Öffnungszeiten</span>
            </h1>
            <p className="text-brand-navy/60 mt-8 text-lg leading-relaxed max-w-md">
              Wir arbeiten mobil – auf Wunsch mit kostenlosem Lieferservice.
              Vereinbaren Sie einfach einen Termin.
            </p>

            <div className="mt-12 space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-brand-grey rounded-xl flex items-center justify-center text-brand-navy mr-6">
                  <Truck size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Kostenloser Lieferservice</h4>
                  <Link
                    href="/termine"
                    className="inline-flex items-center justify-center bg-brand-navy text-white px-5 py-3 rounded-xl font-bold hover:bg-opacity-90 transition-all"
                  >
                    Jetzt Termin vereinbaren
                  </Link>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 bg-brand-grey rounded-xl flex items-center justify-center text-brand-navy mr-6">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Telefon</h4>
                  <p className="text-brand-navy/60">0157 56441016</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 bg-brand-grey rounded-xl flex items-center justify-center text-brand-navy mr-6">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">E-Mail</h4>
                  <p className="text-brand-navy/60">info@osi-tech.de</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 bg-brand-grey rounded-xl flex items-center justify-center text-brand-navy mr-6">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Öffnungszeiten</h4>
                  <p className="text-brand-navy/60">
                    Mo - Fr: 10:00 - 13:00 Uhr / 14:00 - 18:00 Uhr
                    <br />
                    Sa: 10:00 - 15:00 Uhr
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-brand-grey rounded-[40px] overflow-hidden shadow-sm p-7 sm:p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-bold">Kontakt aufnehmen</h2>
            <p className="text-brand-navy/60 mt-4 text-lg leading-relaxed max-w-md">
              Schreib uns kurz die Geräteinfos oder deine Frage – wir melden uns
              schnellstmöglich zurück.
            </p>
            <form action="/api/inquiry" method="POST" className="mt-8 space-y-5">
              <input type="hidden" name="source" value="kontakt" />

              <div>
                <label className="block text-[10px] font-bold text-brand-navy/40 tracking-widest mb-2 uppercase">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Ihr Name"
                  className="w-full bg-white/70 border border-brand-navy/10 rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-brand-navy/40 tracking-widest mb-2 uppercase">
                    Telefon
                  </label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="0157 56441016"
                    className="w-full bg-white/70 border border-brand-navy/10 rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-brand-navy/40 tracking-widest mb-2 uppercase">
                    E-Mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="beispiel@mail.de"
                    className="w-full bg-white/70 border border-brand-navy/10 rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-brand-navy/40 tracking-widest mb-2 uppercase">
                  Gerät (optional)
                </label>
                <input
                  type="text"
                  name="device"
                  placeholder="z.B. iPhone 14 Pro"
                  className="w-full bg-white/70 border border-brand-navy/10 rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-brand-navy/40 tracking-widest mb-2 uppercase">
                  Nachricht
                </label>
                <textarea
                  name="issue"
                  placeholder="Worum geht es? (z.B. Preis anfragen, Display defekt, Akku schnell leer ...)"
                  className="w-full bg-white/70 border border-brand-navy/10 rounded-xl px-5 py-4 h-28 focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-navy text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-600 transition-all shadow-xl"
              >
                Anfrage senden
              </button>

              <p className="text-center text-brand-navy/30 text-xs">
                Durch das Absenden akzeptieren Sie unsere Datenschutzbestimmungen.
              </p>
            </form>

            <Link
              href="/termine"
              className="mt-6 inline-flex items-center justify-center bg-white border-2 border-brand-grey px-6 py-4 rounded-2xl font-bold text-brand-navy hover:bg-brand-grey transition-all"
            >
              Lieber Termin buchen
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
