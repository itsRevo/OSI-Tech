'use client';

import {useEffect, useState} from 'react';
import {Menu, X} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';
import Link from 'next/link';
import NavLink from '@/components/navigation/NavLink';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    {name: 'Startseite', href: '/'},
    {name: 'Services', href: '/services'},
    {name: 'Preise', href: '/prices'},
    {name: 'Termin', href: '/booking'},
    {name: 'Kontakt', href: '/contact'},
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center text-brand-navy">
        <Link href="/" className="flex-1 text-xl font-bold tracking-tight">
          OsiTech Smart Repair
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              href={link.href}
              className="text-sm font-semibold transition-colors"
              activeClassName="text-blue-600"
              inactiveClassName="text-brand-navy/60 hover:text-brand-navy"
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex-1 hidden md:flex justify-end">
          <Link
            href="/booking"
            className="bg-brand-navy text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-opacity-90 transition-all"
          >
            Termin anfragen
          </Link>
        </div>

        <button
          className="md:hidden ml-auto"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          type="button"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{opacity: 0, y: -20}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -20}}
            className="absolute top-full left-0 right-0 bg-white shadow-xl py-6 px-6 md:hidden"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-bold"
                  activeClassName="text-blue-600"
                  inactiveClassName="text-brand-navy"
                >
                  {link.name}
                </NavLink>
              ))}
              <Link
                href="/booking"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-brand-navy text-white py-4 rounded-xl text-center font-bold"
              >
                Termin anfragen
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
