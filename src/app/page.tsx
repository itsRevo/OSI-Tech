'use client';

import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Laptop,
  PenTool,
  ShieldCheck,
  Star,
  Tablet,
  ThumbsUp,
  Watch,
  Zap,
  Smartphone,
} from 'lucide-react';
import Link from 'next/link';
import {motion} from 'motion/react';

export default function HomePage() {
  return (
    <main className="pt-32">
      <section className="pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{opacity: 0, x: -50}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.8}}
          >
            <span className="text-blue-600 font-bold tracking-[0.2em] text-[10px] uppercase block mb-4 italic">
              PRÄZISION TRIFFT MOBILITÄT
            </span>
            <h1 className="text-7xl md:text-8xl font-black text-brand-navy leading-[0.9] italic mb-8">
              Smart <span className="text-blue-600 not-italic">Device</span>
              <br />
              Expertise.
            </h1>
            <p className="text-brand-navy/60 text-lg max-w-md leading-relaxed mb-10">
              Ihr zertifizierter Partner für High-End Smartphone- &
              Laptop-Reparaturen. Schnell, transparent und mit modernster
              Technik am Standort Rhede.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/booking"
                className="bg-brand-navy text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center"
              >
                Termin buchen <ArrowRight size={20} className="ml-3" />
              </Link>
              <Link
                href="/prices"
                className="bg-white border-2 border-brand-grey px-10 py-5 rounded-2xl font-bold text-lg text-brand-navy hover:bg-brand-grey transition-all"
              >
                Preise prüfen
              </Link>
            </div>

            <div className="mt-16 flex items-center space-x-8">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full border-4 border-white bg-brand-grey overflow-hidden"
                  >
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex text-yellow-500 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="text-sm font-bold text-brand-navy">
                  4.9/5{' '}
                  <span className="text-brand-navy/40 font-medium">
                    von 1.200+ Kunden
                  </span>
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{opacity: 0, scale: 0.8}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 1}}
            className="relative"
          >
            <div className="absolute inset-0 bg-blue-600 rounded-[60px] rotate-6 opacity-5 blur-3xl" />
            <div className="relative bg-white rounded-[60px] p-4 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1597740985671-2a8a3b80502e?auto=format&fit=crop&q=80&w=1000"
                className="rounded-[50px] w-full aspect-[4/5] object-cover"
                alt="Repair Tech"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-10 -left-10 bg-brand-lime p-8 rounded-[40px] shadow-xl max-w-[240px]">
                <h3 className="text-3xl font-black text-brand-navy leading-tight">
                  Meist am selben Tag fertig
                </h3>
              </div>
              <div className="absolute top-10 -right-10 bg-brand-navy text-white p-8 rounded-[40px] shadow-xl italic">
                <ShieldCheck size={40} className="text-brand-lime mb-2" />
                <h4 className="font-bold text-sm">
                  Garantierter
                  <br />
                  Schutz.
                </h4>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-brand-grey/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-blue-600 text-[10px] font-bold tracking-[0.2em] uppercase">
              WARUM UNS WÄHLEN?
            </span>
            <h2 className="text-5xl font-bold mt-4 italic">
              Unser <span className="text-blue-600 not-italic">Qualitätsversprechen</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <ShieldCheck size={32} />,
                title: 'Bis zu 6 Monate Garantie',
                desc: 'Auf ersetzte Teile und unsere durchgeführte Arbeit.',
              },
              {
                icon: <Zap size={32} />,
                title: 'Express-Service',
                desc: 'Die meisten Reparaturen erledigen wir in unter 60 Minuten.',
              },
              {
                icon: <PenTool size={32} />,
                title: 'Zertifizierte Techniker',
                desc: 'Hochqualifizierte Experten für alle gängigen Marken.',
              },
              {
                icon: <ThumbsUp size={32} />,
                title: 'Transparente Preise',
                desc: 'Keine versteckten Kosten. Festpreise inklusive Einbau.',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white p-10 rounded-[40px] shadow-sm border border-brand-grey hover:border-blue-600 transition-all"
              >
                <div className="text-blue-600 mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-brand-navy/60 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <motion.div
                    whileHover={{y: -10}}
                    className="bg-brand-navy rounded-[40px] p-8 text-white relative overflow-hidden h-64"
                  >
                    <Smartphone
                      className="absolute -right-4 -bottom-4 opacity-10"
                      size={120}
                    />
                    <h4 className="text-2xl font-bold mb-2">Smartphones</h4>
                    <p className="text-white/40 text-sm">
                      iPhone, Samsung, Google Pixel & mehr.
                    </p>
                  </motion.div>
                  <motion.div
                    whileHover={{y: -10}}
                    className="bg-brand-lime rounded-[40px] p-8 text-brand-navy relative overflow-hidden h-48"
                  >
                    <Tablet
                      className="absolute -right-4 -bottom-4 opacity-20"
                      size={100}
                    />
                    <h4 className="text-2xl font-bold mb-2">Tablets</h4>
                    <p className="text-brand-navy/40 text-sm">
                      iPad & Android Tablets.
                    </p>
                  </motion.div>
                </div>
                <div className="space-y-6 pt-12">
                  <motion.div
                    whileHover={{y: -10}}
                    className="bg-blue-600 rounded-[40px] p-8 text-white relative overflow-hidden h-48"
                  >
                    <Laptop
                      className="absolute -right-4 -bottom-4 opacity-20"
                      size={100}
                    />
                    <h4 className="text-2xl font-bold mb-2">Laptops</h4>
                    <p className="text-white/40 text-sm">
                      MacBook & Windows Reparaturen.
                    </p>
                  </motion.div>
                  <motion.div
                    whileHover={{y: -10}}
                    className="bg-brand-grey rounded-[40px] p-8 text-brand-navy relative overflow-hidden h-64 border border-brand-grey/50"
                  >
                    <Watch
                      className="absolute -right-4 -bottom-4 opacity-10"
                      size={120}
                    />
                    <h4 className="text-2xl font-bold mb-2">Watches</h4>
                    <p className="text-brand-navy/40 text-sm">
                      Apple Watch & Smartwatches.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
            <div>
              <span className="text-blue-600 text-[10px] font-bold tracking-[0.2em] uppercase">
                ALLES AUS EINER HAND
              </span>
              <h2 className="text-5xl font-bold mt-4 italic mb-8">
                Reparatur für{' '}
                <span className="text-blue-600 not-italic">jedes Device</span>
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: 'Micro-Soldering Expertise',
                    desc: 'Wir reparieren auch dort, wo andere aufgeben – bis auf Chip-Ebene.',
                  },
                  {
                    title: 'Original Ersatzteile',
                    desc: 'Für Apple, Samsung und Google setzen wir auf höchste Standards.',
                  },
                  {
                    title: 'Datenrettung',
                    desc: 'Wir retten Ihre wertvollen Fotos und Dokumente von defekten Geräten.',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-6">
                    <div className="mt-1 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600">
                      <CheckCircle2 size={14} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{item.title}</h4>
                      <p className="text-brand-navy/60 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/services"
                className="inline-flex items-center mt-12 text-brand-navy font-bold hover:text-blue-600 transition-all group"
              >
                Alle Dienstleistungen ansehen{' '}
                <ChevronRight
                  size={20}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="bg-brand-navy rounded-[60px] p-12 md:p-24 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent opacity-50" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-5xl md:text-6xl font-black italic mb-8">
                Bereit für die{' '}
                <span className="text-brand-lime not-italic">Reparatur?</span>
              </h2>
              <p className="text-white/60 text-lg mb-12">
                Warten Sie nicht länger auf ein defektes Gerät. Buchen Sie jetzt
                Ihren Termin oder fordern Sie ein unverbindliches Angebot an.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link
                  href="/booking"
                  className="bg-brand-lime text-brand-navy px-12 py-6 rounded-2xl font-bold text-xl hover:scale-105 transition-all shadow-xl"
                >
                  Jetzt Termin buchen
                </Link>
                <Link
                  href="/contact"
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-12 py-6 rounded-2xl font-bold text-xl hover:bg-white/20 transition-all"
                >
                  Standort finden
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
