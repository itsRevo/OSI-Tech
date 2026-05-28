'use client';

import {useEffect, useState} from 'react';
import {Menu, X} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import NavLink from '@/components/navigation/NavLink';

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAdminRoute = pathname.startsWith('/admin');

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
    {name: 'Preise', href: '/preise'},
    {name: 'Termin', href: '/termine'},
    {name: 'Kontakt', href: '/contact'},
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isAdminRoute
          ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800 py-3 shadow-lg'
          : isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 border-b border-slate-200/80'
            : 'bg-white/80 backdrop-blur-md py-4 border-b border-slate-200/60'
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center ${
          isAdminRoute ? 'text-slate-100' : 'text-brand-navy'
        }`}
      >
        <Link
          href="/"
          className="flex-1 inline-flex items-center h-10 sm:h-11 overflow-visible"
        >
          <Image
            src="/images/ChatGPT%20Image%2026.%20Mai%202026,%2023_54_23.png"
            alt="OSI Tech Smart Repair"
            width={320}
            height={90}
            className="h-10 w-auto sm:h-11 scale-[3.2] origin-left"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              href={link.href}
              className="text-sm font-semibold transition-colors"
              activeClassName={isAdminRoute ? 'text-cyan-300' : 'text-blue-700'}
              inactiveClassName={
                isAdminRoute
                  ? 'text-slate-300 hover:text-white'
                  : 'text-brand-navy/75 hover:text-brand-navy'
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex-1 hidden md:flex justify-end">
          <Link
            href="/termine"
            className={`px-5 py-2 rounded-md text-sm font-semibold transition-all ${
              isAdminRoute
                ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
                : 'bg-brand-navy text-white hover:bg-blue-700'
            }`}
          >
            Termin anfragen
          </Link>
        </div>

        <button
          className={`md:hidden ml-auto ${isAdminRoute ? 'text-white' : 'text-brand-navy'}`}
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
            className={`absolute top-full left-0 right-0 shadow-xl py-6 px-6 md:hidden ${
              isAdminRoute
                ? 'bg-slate-950 text-white border-t border-slate-800'
                : 'bg-white text-brand-navy border-t border-slate-200'
            }`}
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-bold"
                  activeClassName={isAdminRoute ? 'text-cyan-300' : 'text-blue-700'}
                  inactiveClassName={isAdminRoute ? 'text-slate-200' : 'text-brand-navy'}
                >
                  {link.name}
                </NavLink>
              ))}
              <Link
                href="/termine"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`py-4 rounded-xl text-center font-bold ${
                  isAdminRoute
                    ? 'bg-cyan-500 text-slate-950'
                    : 'bg-brand-navy text-white'
                }`}
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
