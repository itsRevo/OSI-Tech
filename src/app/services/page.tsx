'use client';

import {Battery, Cpu, Layers, Monitor, PenTool, Shield, Smartphone} from 'lucide-react';
import {motion} from 'motion/react';

export default function ServicesPage() {
  const services = [
    {
      icon: <Monitor size={32} />,
      name: 'Display-Reparatur',
      time: '< 60 Min',
      desc: 'Schneller Austausch bei Glasbruch oder Pixelfehlern mit kalibrierten Displays.',
    },
    {
      icon: <Battery size={32} />,
      name: 'Akku-Austausch',
      time: '< 30 Min',
      desc: 'Wiederherstellung der originalen Laufzeit mit zertifizierten Hochleistungszellen.',
    },
    {
      icon: <Shield size={32} />,
      name: 'Wasserschäden',
      time: '1-3 Tage',
      desc: 'Professionelle Ultraschallreinigung und Korrosionsschutz für Ihre Hardware.',
    },
    {
      icon: <Cpu size={32} />,
      name: 'Platinen-Service',
      time: '2-5 Tage',
      desc: 'Micro-Soldering für komplexe Bauteil-Reparaturen auf Chipebene.',
    },
    {
      icon: <Layers size={32} />,
      name: 'Backglass-Tausch',
      time: '90 Min',
      desc: 'Präziser Laser-Austausch der Rückseite ohne Gehäuseschaden.',
    },
    {
      icon: <Smartphone size={32} />,
      name: 'Software-Service',
      time: '60 Min',
      desc: 'Datenrettung, Updates und Optimierung Ihres Betriebssystems.',
    },
  ];

  return (
    <main className="pt-32 pb-24">
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-24">
          <span className="text-blue-600 text-[10px] font-bold tracking-[0.2em] uppercase">
            UNSERE EXPERTISE
          </span>
          <h2 className="text-6xl font-bold mt-4 italic">
            Dienstleistungen <span className="text-blue-600 not-italic">& Support</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{delay: i * 0.1}}
              className="bg-white border-2 border-brand-grey p-10 rounded-[40px] hover:border-blue-600 transition-all group"
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
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
