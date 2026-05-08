'use client';

import {
  ArrowRight,
  Battery,
  CheckCircle2,
  ChevronRight,
  Clock,
  Laptop,
  MapPin,
  Monitor,
  PenTool,
  Search,
  ShieldCheck,
  Star,
  Tablet,
  ThumbsUp,
  Watch,
  Wrench,
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
              Technik am Standort Rhede. Für iPhone, Samsung, Google Pixel,
              iPad, MacBook und viele weitere Geräte.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/termine"
                className="bg-brand-navy text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center"
              >
                Termin buchen <ArrowRight size={20} className="ml-3" />
              </Link>
              <Link
                href="/preise"
                className="bg-white border-2 border-brand-grey px-10 py-5 rounded-2xl font-bold text-lg text-brand-navy hover:bg-brand-grey transition-all"
              >
                Preise prüfen
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-4 max-w-xl">
              {[
                {value: '60 Min.', label: 'typische Express-Reparatur'},
                {value: '6 Mon.', label: 'Garantie auf viele Arbeiten'},
                {value: '3 Städte', label: 'Rhede, Bocholt, Borken'},
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

            <div className="mt-12 flex items-center space-x-8">
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

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-blue-600 text-[10px] font-bold tracking-[0.2em] uppercase">
                SO LÄUFT ES AB
              </span>
              <h2 className="text-5xl font-bold mt-4 italic mb-8">
                Von der Diagnose bis zur{' '}
                <span className="text-blue-600 not-italic">fertigen Reparatur</span>
              </h2>
              <p className="text-brand-navy/60 text-lg leading-relaxed max-w-xl">
                Wir halten den Ablauf bewusst klar: Erst wird das Fehlerbild
                geprüft, dann besprechen wir Preis, Ersatzteilqualität und
                Reparaturdauer. Erst danach starten wir mit der Arbeit.
              </p>
              <Link
                href="/termine"
                className="inline-flex items-center mt-10 bg-brand-navy text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-600 transition-colors"
              >
                Schaden beschreiben <ArrowRight size={18} className="ml-3" />
              </Link>
            </div>
            <div className="space-y-5">
              {[
                {
                  icon: <Search size={22} />,
                  title: '1. Fehlerbild prüfen',
                  text: 'Wir prüfen Display, Akku, Ladeanschluss, Kamera, Lautsprecher, Software und sichtbare Schäden.',
                },
                {
                  icon: <PenTool size={22} />,
                  title: '2. Angebot abstimmen',
                  text: 'Sie erhalten eine verständliche Einschätzung zu Kosten, Ersatzteilqualität und voraussichtlicher Dauer.',
                },
                {
                  icon: <Wrench size={22} />,
                  title: '3. Fachgerecht reparieren',
                  text: 'Die Reparatur erfolgt mit passenden Werkzeugen, sauberer Dokumentation und Funktionskontrolle.',
                },
                {
                  icon: <CheckCircle2 size={22} />,
                  title: '4. Gerät testen & abholen',
                  text: 'Vor der Rückgabe testen wir zentrale Funktionen und erklären, was gemacht wurde.',
                },
              ].map((step) => (
                <div
                  key={step.title}
                  className="bg-brand-grey/70 rounded-[28px] p-6 flex gap-5 border border-brand-grey"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white text-blue-600 flex items-center justify-center shrink-0">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                    <p className="text-brand-navy/60 text-sm leading-relaxed">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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

      <section className="py-24 bg-brand-grey/40">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-14">
            <span className="text-blue-600 text-[10px] font-bold tracking-[0.2em] uppercase">
              REGIONALER SERVICE
            </span>
            <h2 className="text-5xl font-bold mt-4 italic">
              Handy Reparatur in{' '}
              <span className="text-blue-600 not-italic">Rhede & Umgebung</span>
            </h2>
            <p className="text-brand-navy/60 mt-6 text-lg leading-relaxed">
              Unsere Werkstatt in Rhede ist schnell erreichbar für Kunden aus
              Bocholt, Borken und dem westlichen Münsterland. Vor jeder
              Reparatur erhalten Sie eine klare Einschätzung zu Preis, Dauer und
              Ersatzteilqualität.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                city: 'Rhede',
                href: '/rhede',
                text: 'Direkter Bring-In-Service in der Werkstatt für Display, Akku, Backglass, Software und Diagnose.',
              },
              {
                city: 'Bocholt',
                href: '/bocholt',
                text: 'Smartphone-Reparatur nahe Bocholt mit Terminabstimmung und transparenter Teileauswahl.',
              },
              {
                city: 'Borken',
                href: '/borken',
                text: 'Reparaturservice für Kunden aus Borken mit planbarer Abgabe und klarer Kosteneinschätzung.',
              },
            ].map((item) => (
              <Link
                key={item.city}
                href={item.href}
                className="bg-white p-8 rounded-[32px] border border-brand-grey hover:border-blue-600 transition-all group"
              >
                <h3 className="text-2xl font-bold mb-4">
                  Handy Reparatur {item.city}
                </h3>
                <p className="text-brand-navy/60 text-sm leading-relaxed mb-6">
                  {item.text}
                </p>
                <span className="inline-flex items-center text-blue-600 font-bold text-sm group-hover:translate-x-1 transition-transform">
                  Stadtseite öffnen <ChevronRight size={18} className="ml-2" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            <div className="bg-brand-navy text-white rounded-[36px] p-10 md:p-14">
              <MapPin className="text-brand-lime mb-8" size={36} />
              <span className="text-brand-lime text-[10px] font-bold tracking-[0.2em] uppercase">
                WERKSTATT IN RHEDE
              </span>
              <h2 className="text-4xl md:text-5xl font-black italic mt-4 mb-6">
                Vor Ort abgeben, prüfen lassen, reparieren lassen.
              </h2>
              <p className="text-white/60 leading-relaxed mb-8">
                Sie finden OsiTech Smart Repair an der Deichstraße 5 in 46414
                Rhede. Für viele Reparaturen reicht eine kurze Fehlerbeschreibung
                mit Modellangabe, damit wir Ersatzteile und Zeitfenster besser
                planen können.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center bg-white text-brand-navy px-7 py-4 rounded-2xl font-bold"
              >
                Kontakt & Anfahrt <ChevronRight size={18} className="ml-2" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  icon: <Clock size={24} />,
                  title: 'Öffnungszeiten',
                  text: 'Mo - Fr: 09:00 - 18:00 Uhr. Sa: 10:00 - 14:00 Uhr.',
                },
                {
                  icon: <Zap size={24} />,
                  title: 'Express nach Absprache',
                  text: 'Viele Display- und Akku-Reparaturen sind bei verfügbaren Teilen kurzfristig möglich.',
                },
                {
                  icon: <ShieldCheck size={24} />,
                  title: 'Garantie & Kontrolle',
                  text: 'Nach der Reparatur prüfen wir zentrale Funktionen und erklären die erledigten Arbeiten.',
                },
                {
                  icon: <MapPin size={24} />,
                  title: 'Regionale Nähe',
                  text: 'Ideal erreichbar aus Rhede, Bocholt, Borken, Isselburg, Velen und Umgebung.',
                },
              ].map((item) => (
                <div key={item.title} className="bg-brand-grey rounded-[28px] p-7">
                  <div className="text-blue-600 mb-5">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-brand-navy/60 text-sm leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-14">
            <span className="text-blue-600 text-[10px] font-bold tracking-[0.2em] uppercase">
              HÄUFIGE REPARATUREN
            </span>
            <h2 className="text-5xl font-bold mt-4 italic">
              Die wichtigsten Schäden{' '}
              <span className="text-blue-600 not-italic">schnell gelöst</span>
            </h2>
            <p className="text-brand-navy/60 mt-6 text-lg leading-relaxed">
              Ob Displaybruch, schwacher Akku oder Ladeproblem: Wir reparieren
              typische Smartphone-Schäden ebenso wie komplexere Fehler an
              Platine, Software und Datenbestand.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Monitor size={28} />,
                title: 'Display & Glas',
                text: 'Austausch bei Rissen, schwarzen Flecken, Touch-Aussetzern und Pixelfehlern.',
              },
              {
                icon: <Battery size={28} />,
                title: 'Akku & Laufzeit',
                text: 'Akkuwechsel bei kurzer Laufzeit, Aufblähen, spontanen Neustarts oder Ladeproblemen.',
              },
              {
                icon: <Smartphone size={28} />,
                title: 'Ladebuchse & Anschlüsse',
                text: 'Reinigung, Diagnose und Austausch bei Wackelkontakt oder fehlender Ladefunktion.',
              },
              {
                icon: <ShieldCheck size={28} />,
                title: 'Daten & Software',
                text: 'Hilfe bei Startfehlern, Updates, Datenübertragung, Backup und Geräteeinrichtung.',
              },
            ].map((repair) => (
              <article
                key={repair.title}
                className="bg-white border border-brand-grey rounded-[28px] p-7 hover:border-blue-600 transition-colors"
              >
                <div className="text-blue-600 mb-6">{repair.icon}</div>
                <h3 className="text-xl font-bold mb-3">{repair.title}</h3>
                <p className="text-brand-navy/60 text-sm leading-relaxed">
                  {repair.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-brand-grey/40">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-3 gap-12">
            <div>
              <span className="text-blue-600 text-[10px] font-bold tracking-[0.2em] uppercase">
                DIREKT INFORMIERT
              </span>
              <h2 className="text-5xl font-bold mt-4 italic">
                Fragen vor der{' '}
                <span className="text-blue-600 not-italic">Reparatur</span>
              </h2>
              <p className="text-brand-navy/60 mt-6 leading-relaxed">
                Die wichtigsten Antworten für Kunden, die ihr Gerät in Rhede
                reparieren lassen oder aus Bocholt und Borken anfragen.
              </p>
            </div>
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
              {[
                {
                  question: 'Wie schnell ist eine Display-Reparatur möglich?',
                  answer:
                    'Viele gängige iPhone- und Smartphone-Displays lassen sich bei verfügbarer Ware innerhalb kurzer Zeit tauschen. Bei seltenen Modellen stimmen wir die Teilebestellung vorher ab.',
                },
                {
                  question: 'Bekomme ich vorab einen festen Preis?',
                  answer:
                    'Bei gelisteten Standardreparaturen ja. Bei Wasserschaden, Datenrettung oder Platinenfehlern prüfen wir das Gerät zuerst und nennen die Kosten vor Reparaturbeginn.',
                },
                {
                  question: 'Werden meine Daten gelöscht?',
                  answer:
                    'Bei Display-, Akku- und vielen Hardware-Reparaturen bleiben Daten normalerweise erhalten. Wir empfehlen trotzdem ein Backup, wenn das Gerät noch bedienbar ist.',
                },
                {
                  question: 'Welche Geräte repariert OsiTech?',
                  answer:
                    'Wir bearbeiten iPhone, Samsung Galaxy, Google Pixel, iPad, Android-Tablets, MacBooks, Windows-Laptops und Smartwatches je nach Ersatzteilverfügbarkeit.',
                },
              ].map((faq) => (
                <article key={faq.question} className="bg-white rounded-[28px] p-7">
                  <h3 className="font-bold text-lg mb-3">{faq.question}</h3>
                  <p className="text-brand-navy/60 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </article>
              ))}
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
                  href="/termine"
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
