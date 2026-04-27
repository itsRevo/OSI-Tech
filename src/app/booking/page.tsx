import {Calendar, Mail, MapPin, Truck, Zap} from 'lucide-react';

export default function BookingPage() {
  return (
    <main className="pt-32 pb-24">
      <section id="booking" className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 bg-white rounded-[40px] p-8 md:p-16 shadow-sm border border-brand-grey">
            <div className="flex items-center space-x-4 mb-12">
              <div className="w-12 h-12 bg-brand-navy text-white rounded-xl flex items-center justify-center">
                <Calendar size={24} />
              </div>
              <h3 className="text-3xl font-bold">Buchungsformular</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div>
                <label className="block text-[10px] font-bold text-brand-navy/40 tracking-widest mb-2 uppercase">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Ihr vollständiger Name"
                  className="w-full bg-brand-grey border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-brand-navy/40 tracking-widest mb-2 uppercase">
                  Telefon
                </label>
                <input
                  type="text"
                  placeholder="+49 000 000000"
                  className="w-full bg-brand-grey border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                />
              </div>
            </div>

            <div className="mb-10">
              <label className="block text-[10px] font-bold text-brand-navy/40 tracking-widest mb-2 uppercase">
                E-Mail
              </label>
              <input
                type="email"
                placeholder="beispiel@mail.de"
                className="w-full bg-brand-grey border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 transition-all font-medium"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div>
                <label className="block text-[10px] font-bold text-brand-navy/40 tracking-widest mb-2 uppercase">
                  Gerät
                </label>
                <select className="w-full bg-brand-grey border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 transition-all font-medium">
                  <option>iPhone 15 Pro Max</option>
                  <option>Samsung Galaxy S24</option>
                  <option>Anderes Modell</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-brand-navy/40 tracking-widest mb-2 uppercase">
                  Wunschtermin
                </label>
                <input
                  type="date"
                  className="w-full bg-brand-grey border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                />
              </div>
            </div>

            <div className="mb-10">
              <label className="block text-[10px] font-bold text-brand-navy/40 tracking-widest mb-2 uppercase">
                Problembeschreibung
              </label>
              <textarea
                placeholder="Beschreiben Sie das Problem so detailliert wie möglich..."
                className="w-full bg-brand-grey border-none rounded-xl px-5 py-4 h-32 focus:ring-2 focus:ring-blue-500 transition-all font-medium"
              />
            </div>

            <div className="mb-12">
              <label className="block text-[10px] font-bold text-brand-navy/40 tracking-widest mb-4 uppercase">
                Service-Art
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  {icon: <Truck size={18} />, label: 'Abholung', desc: 'Wir holen es ab'},
                  {
                    icon: <MapPin size={18} />,
                    label: 'Bring-In',
                    desc: 'Persönlich abgeben',
                    active: true,
                  },
                  {icon: <Mail size={18} />, label: 'Versand', desc: 'Per Post senden'},
                ].map((type, i) => (
                  <div
                    key={i}
                    className={`p-6 rounded-2xl border-2 transition-all cursor-pointer ${type.active ? 'border-blue-500 bg-blue-50' : 'border-brand-grey bg-brand-grey/30 hover:border-blue-200'}`}
                  >
                    <div className={`mb-4 ${type.active ? 'text-blue-600' : 'text-brand-navy'} `}>
                      {type.icon}
                    </div>
                    <div className="font-bold text-sm">{type.label}</div>
                    <div className="text-[10px] text-brand-navy/40 mt-1 uppercase tracking-tighter">
                      {type.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full bg-brand-navy text-white py-6 rounded-[20px] font-bold text-lg hover:bg-blue-600 transition-all shadow-xl" type="button">
              Reparatur-Termin anfragen
            </button>
            <p className="text-center text-brand-navy/30 text-xs mt-6">
              Durch das Absenden akzeptieren Sie unsere Datenschutzbestimmungen.
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-brand-navy text-white rounded-[40px] p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Zap size={80} />
              </div>
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 bg-brand-lime text-brand-navy rounded-lg flex items-center justify-center">
                  <Zap size={20} />
                </div>
                <h3 className="text-2xl font-bold">Express-Anfrage</h3>
              </div>

              <div className="space-y-6 text-left">
                <div>
                  <label className="block text-[10px] font-bold text-white/40 tracking-widest mb-2 uppercase">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-brand-lime focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-white/40 tracking-widest mb-2 uppercase">
                    Telefon
                  </label>
                  <input
                    type="text"
                    placeholder="Telefon"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-brand-lime focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-white/40 tracking-widest mb-2 uppercase">
                    Gerät
                  </label>
                  <input
                    type="text"
                    placeholder="z.B. iPhone 14"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-brand-lime focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-white/40 tracking-widest mb-2 uppercase">
                    Dringlichkeit
                  </label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-brand-lime focus:outline-none text-white overflow-hidden">
                    <option className="text-brand-navy">Normal (2-3 Tage)</option>
                    <option className="text-brand-navy">Express (Heute)</option>
                  </select>
                </div>
                <p className="text-[9px] text-white/30 italic">
                  Hinweis: Schnelle Bearbeitung via E-Mail
                </p>
                <button className="w-full bg-brand-lime text-brand-navy py-4 rounded-xl font-bold shadow-lg" type="button">
                  Schnellanfrage senden
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
