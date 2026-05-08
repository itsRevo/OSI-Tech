import {
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Smartphone,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-2">
            <h2 className="text-4xl font-bold italic mb-6">
              OsiTech{' '}
              <span className="text-brand-lime not-italic text-sm ml-2 tracking-widest uppercase">
                Rhede
              </span>
            </h2>
            <p className="text-white/40 max-w-sm text-sm leading-relaxed mb-8">
              Seit über 10 Jahren Ihr Partner für professionelle Smart Device
              Reparaturen. Präzision, Schnelligkeit und faire Preise sind unser
              Versprechen.
            </p>
            <div className="flex space-x-6">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-lime hover:text-brand-navy transition-all cursor-pointer">
                <Smartphone size={18} />
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-lime hover:text-brand-navy transition-all cursor-pointer">
                <CheckCircle2 size={18} />
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-lime hover:text-brand-navy transition-all cursor-pointer">
                <Zap size={18} />
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-xs tracking-widest uppercase text-white/30 mb-8">
              Quick Links
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link
                  href="/services"
                  className="hover:text-brand-lime transition-colors"
                >
                  Dienstleistungen
                </Link>
              </li>
              <li>
                <Link
                  href="/preise"
                  className="hover:text-brand-lime transition-colors"
                >
                  Preisliste
                </Link>
              </li>
              <li>
                <Link
                  href="/termine"
                  className="hover:text-brand-lime transition-colors"
                >
                  Terminbuchung
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-brand-lime transition-colors"
                >
                  Standort
                </Link>
              </li>
              <li>
                <Link
                  href="/rhede"
                  className="hover:text-brand-lime transition-colors"
                >
                  Handy Reparatur Rhede
                </Link>
              </li>
              <li>
                <Link
                  href="/bocholt"
                  className="hover:text-brand-lime transition-colors"
                >
                  Handy Reparatur Bocholt
                </Link>
              </li>
              <li>
                <Link
                  href="/borken"
                  className="hover:text-brand-lime transition-colors"
                >
                  Handy Reparatur Borken
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xs tracking-widest uppercase text-white/30 mb-8">
              Service
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-center">
                <Phone size={14} className="mr-2 text-brand-lime" /> +49 (0) 157
                5644106
              </li>
              <li className="flex items-center">
                <Mail size={14} className="mr-2 text-brand-lime" />
                info@osi-tech.de
              </li>
              <li className="flex items-center">
                <MapPin size={14} className="mr-2 text-brand-lime" />
                Deichstraße 5, Rhede
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-white/20 font-medium">
          <p>© 2024 OsiTech Smart Repair. Alle Rechte vorbehalten.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <Link href="/impressum" className="hover:text-white transition-colors">
              Impressum
            </Link>
            <a href="#" className="hover:text-white transition-colors">
              Datenschutz
            </a>
            <a href="#" className="hover:text-white transition-colors">
              AGB
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
