import {Clock, Mail, MapPin, Phone} from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="pt-32 pb-24">
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <span className="text-blue-600 text-[10px] font-bold tracking-[0.2em] uppercase">
              STANDORT
            </span>
            <h2 className="text-6xl font-bold mt-4 italic">
              Kontakt <span className="text-blue-600 not-italic">& Anfahrt</span>
            </h2>
            <p className="text-brand-navy/60 mt-8 text-lg leading-relaxed max-w-md">
              Sie finden uns im Herzen von Rhede. Besuchen Sie unsere moderne
              Werkstatt oder kontaktieren Sie uns für eine Abholung.
            </p>

            <div className="mt-12 space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-brand-grey rounded-xl flex items-center justify-center text-brand-navy mr-6">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Anschrift</h4>
                  <p className="text-brand-navy/60">
                    Deichstraße 5
                    <br />
                    46414 Rhede, Deutschland
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 bg-brand-grey rounded-xl flex items-center justify-center text-brand-navy mr-6">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Telefon</h4>
                  <p className="text-brand-navy/60">0157 5644106</p>
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
                    Mo - Fr: 09:00 - 18:00 Uhr
                    <br />
                    Sa: 10:00 - 14:00 Uhr
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-brand-grey rounded-[40px] overflow-hidden shadow-sm h-[600px] relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2477.564434289454!2d6.685324076713619!3d51.782046890333245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b85e05a8f6d6ab%3A0x425f6916af91970!2s46414%20Rhede!5e0!3m2!1sde!2sde!4v1714169542000!5m2!1sde!2sde"
              className="absolute inset-0 w-full h-full grayscale opacity-80"
              style={{border: 0}}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
