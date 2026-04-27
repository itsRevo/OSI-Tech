import React, { useState, useEffect } from 'react';
import { 
  Smartphone, Zap, ShieldCheck, Cpu, Monitor, Phone, 
  Mail, MapPin, Calendar, Clock, ChevronRight, Menu, X, 
  MessageSquare, CheckCircle2, Truck, Star, ArrowRight,
  Shield, Battery, Layers, Laptop, Tablet, Watch, Search,
  HardDrive, PenTool, RefreshCcw, ThumbsUp
} from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

// --- Shared Components ---

const PricingTable = () => {
    const brands = [
        { id: 'apple', name: 'iPhone', icon: <Smartphone size={16} /> },
        { id: 'samsung', name: 'Samsung', icon: <Smartphone size={16} /> },
        { id: 'google', name: 'Google Pixel', icon: <Smartphone size={16} /> },
    ];

    const repairData: Record<string, any[]> = {
        apple: [
            { model: 'iPhone X', standard: '89,90', premium: '129,90', original: '169,90', akku: '69,90' },
            { model: 'iPhone XR', standard: '89,90', premium: '129,90', original: '159,90', akku: '69,90' },
            { model: 'iPhone XS', standard: '89,90', premium: '129,90', original: '179,90', akku: '69,90' },
            { model: 'iPhone XS MAX', standard: '99,90', premium: '129,90', original: '189,90', akku: '69,90' },
            { model: 'iPhone 11', standard: '89,90', premium: '129,90', original: '159,90', akku: '69,90' },
            { model: 'iPhone 11 Pro', standard: '89,90', premium: '139,90', original: '189,90', akku: '79,90' },
            { model: 'iPhone 11 Pro Max', standard: '99,90', premium: '139,90', original: '219,90', akku: '79,90' },
            { model: 'iPhone 12', standard: '99,90', premium: '139,90', original: '199,90', akku: '79,90' },
            { model: 'iPhone 12 mini', standard: '99,90', premium: '159,90', original: '199,90', akku: '79,90' },
            { model: 'iPhone 12 pro', standard: '99,90', premium: '149,90', original: '199,90', akku: '79,90' },
            { model: 'iPhone 12 Pro Max', standard: '109,90', premium: '149,90', original: '279,90', akku: '79,90' },
            { model: 'iPhone 13', standard: '99,90', premium: '149,90', original: '209,90', akku: '79,90' },
            { model: 'iPhone 13 mini', standard: '109,90', premium: '229,90', original: '269,90', akku: '79,90' },
            { model: 'iPhone 13 pro', standard: '99,90', premium: '149,90', original: '249,90', akku: '79,90' },
            { model: 'iPhone 13 pro Max', standard: '99,90', premium: '149,90', original: '289,90', akku: '79,90' },
            { model: 'iPhone 14', standard: '99,90', premium: '149,90', original: '219,90', akku: '79,90' },
            { model: 'iPhone 14 Plus', standard: '99,90', premium: '149,90', original: '259,90', akku: '79,90' },
            { model: 'iPhone 14 Pro', standard: '109,90', premium: '189,90', original: '339,90', akku: '79,90' },
            { model: 'iPhone 14 Pro Max', standard: '119,90', premium: '169,90', original: '409,90', akku: '79,90' },
            { model: 'iPhone 15', standard: '99,90', premium: '179,90', original: '309,90', akku: '79,90' },
            { model: 'iPhone 15 Plus', standard: '99,90', premium: '169,90', original: '299,90', akku: '79,90' },
            { model: 'iPhone 15 Pro', standard: '109,90', premium: '179,90', original: '409,90', Practical: '79,90' },
            { model: 'iPhone 15 Pro Max', standard: '119,90', premium: '169,90', original: '429,90', akku: '79,90' },
            { model: 'iPhone 16', standard: '119,90', premium: '189,90', original: '329,90', akku: '84,90' },
            { model: 'iPhone 16 Plus', standard: '119,90', premium: '179,90', original: '319,90', akku: '84,90' },
            { model: 'iPhone 16 Pro', standard: '129,90', premium: '199,90', original: '419,90', akku: '84,90' },
            { model: 'iPhone 16 Pro Max', standard: '159,90', premium: '209,90', original: '479,90', akku: '84,90' },
            { model: 'iPhone 16 e', standard: '99,90', premium: '149,90', original: '269,90', akku: '89,90' },
        ],
        samsung: [],
        google: []
    };

    const [selectedBrand, setSelectedBrand] = useState('apple');
    const [selectedModel, setSelectedModel] = useState(repairData['apple'][0].model);
    const [selectedType, setSelectedType] = useState('original');

    useEffect(() => {
        setSelectedModel(repairData[selectedBrand][0]?.model || '');
    }, [selectedBrand]);

    const currentBrandData = repairData[selectedBrand] || [];
    const currentData = currentBrandData.find(d => d.model === selectedModel) || currentBrandData[0] || {};
    
    const getPrice = () => {
        if (selectedBrand !== 'apple') return null;
        if (!currentData) return '0,00';
        if (selectedType === 'standard') return currentData.standard || 'a.A.';
        if (selectedType === 'premium') return currentData.premium || 'a.A.';
        if (selectedType === 'original') return currentData.original || 'a.A.';
        if (selectedType === 'akku') return currentData.akku || 'a.A.';
        return '0,00';
    };

    return (
        <div className="bg-brand-grey rounded-[40px] p-8 md:p-12 shadow-inner border border-brand-grey/50">
            <div className="flex justify-center flex-wrap gap-4 mb-12">
                {brands.map((brand) => (
                    <button
                        key={brand.id}
                        onClick={() => setSelectedBrand(brand.id)}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-sm ${selectedBrand === brand.id ? 'bg-blue-600 text-white' : 'bg-white text-brand-navy/60 hover:bg-white/80'}`}
                    >
                        {brand.icon}
                        <span>{brand.name}</span>
                    </button>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
                <div className="space-y-8">
                    <div>
                        <label className="block text-[10px] font-bold text-brand-navy/40 tracking-widest mb-4 uppercase">Modell wählen</label>
                        <div className="grid grid-cols-2 gap-2 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                            {currentBrandData.map((item) => (
                                <button 
                                    key={item.model}
                                    onClick={() => setSelectedModel(item.model)}
                                    className={`px-4 py-3 rounded-xl text-xs font-bold transition-all text-left truncate ${selectedModel === item.model ? 'bg-brand-navy text-white shadow-lg' : 'bg-white text-brand-navy/60 hover:bg-white/80 border border-transparent hover:border-brand-navy/10'}`}
                                >
                                    {item.model}
                                </button>
                            ))}
                            {currentBrandData.length === 0 && (
                                <div className="col-span-2 text-center py-8 text-brand-navy/40 text-sm italic">
                                    Preise auf Anfrage
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-between">
                    <div>
                        <label className="block text-[10px] font-bold text-brand-navy/40 tracking-widest mb-4 uppercase">Qualität / Service</label>
                        <div className="space-y-3">
                            {[
                                { id: 'original', label: 'Original Qualität', icon: <ShieldCheck size={16}/>, desc: 'Höchste Präzision & Garantie' },
                                { id: 'premium', label: 'Premium Qualität', icon: <Zap size={16}/>, desc: 'Hervorragendes Preis-Leistung' },
                                { id: 'standard', label: 'Standard Qualität', icon: <Monitor size={16}/>, desc: 'Günstige Alternative' },
                                { id: 'akku', label: 'Akku-Austausch', icon: <Cpu size={16}/>, desc: 'Neue Kapazität' },
                            ].map((type) => (
                                <button 
                                    key={type.id}
                                    onClick={() => setSelectedType(type.id)}
                                    className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl border-2 transition-all ${selectedType === type.id ? 'border-blue-600 bg-white shadow-md' : 'border-transparent bg-white/50 hover:bg-white'}`}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className={`p-2 rounded-lg ${selectedType === type.id ? 'bg-blue-600 text-white' : 'bg-brand-navy/5 text-brand-navy/40'}`}>{type.icon}</div>
                                        <div className="text-left">
                                            <div className={`text-sm font-bold ${selectedType === type.id ? 'text-brand-navy' : 'text-brand-navy/60'}`}>{type.label}</div>
                                            <div className="text-[10px] text-brand-navy/30">{type.desc}</div>
                                        </div>
                                    </div>
                                    {selectedType === type.id && <CheckCircle2 size={18} className="text-blue-600" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-10 bg-brand-navy rounded-[32px] p-8 text-center text-white relative overflow-hidden group shadow-2xl">
                        <div className="absolute -top-6 -right-6 p-4 opacity-10 group-hover:rotate-12 transition-transform"><Smartphone size={100} /></div>
                        {selectedBrand === 'apple' ? (
                            <>
                                <div className="text-[10px] font-bold tracking-[0.3em] text-white/40 mb-2 uppercase">FINALER PREIS</div>
                                <div className="text-5xl font-black">{getPrice()}€</div>
                                <div className="text-[9px] text-white/30 mt-4 italic font-medium">Inkl. MwSt., Einbau & 12 Monate Garantie</div>
                            </>
                        ) : (
                            <>
                                <div className="text-[10px] font-bold tracking-[0.3em] text-white/40 mb-4 uppercase">PREIS AUF ANFRAGE</div>
                                <Link 
                                    to="/contact"
                                    className="w-full bg-brand-lime text-brand-navy py-4 rounded-xl font-bold flex items-center justify-center hover:scale-[1.03] transition-transform"
                                >
                                    <MessageSquare size={18} className="mr-2" /> Angebot anfordern
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Header ---

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Startseite', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Preise', href: '/prices' },
    { name: 'Termin', href: '/booking' },
    { name: 'Kontakt', href: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center text-brand-navy">
        <Link to="/" className="flex-1 text-xl font-bold tracking-tight">OsiTech Smart Repair</Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink 
              key={link.name} 
              to={link.href} 
              className={({ isActive }) => `text-sm font-semibold transition-colors ${isActive ? 'text-blue-600' : 'text-brand-navy/60 hover:text-brand-navy'}`}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex-1 hidden md:flex justify-end">
          <Link to="/booking" className="bg-brand-navy text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-opacity-90 transition-all">
            Termin anfragen
          </Link>
        </div>

        <button className="md:hidden ml-auto" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl py-6 px-6 md:hidden"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.name} 
                  to={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => `text-lg font-bold ${isActive ? 'text-blue-600' : 'text-brand-navy'}`}
                >
                  {link.name}
                </NavLink>
              ))}
              <Link 
                to="/booking"
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
};

// --- Footer ---

const Footer = () => (
  <footer className="bg-brand-navy text-white py-24">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid md:grid-cols-4 gap-16 mb-24">
        <div className="col-span-2">
          <h2 className="text-4xl font-bold italic mb-6">OsiTech <span className="text-brand-lime not-italic text-sm ml-2 tracking-widest uppercase">Rhede</span></h2>
          <p className="text-white/40 max-w-sm text-sm leading-relaxed mb-8">
            Seit über 10 Jahren Ihr Partner für professionelle Smart Device Reparaturen. Präzision, Schnelligkeit und faire Preise sind unser Versprechen.
          </p>
          <div className="flex space-x-6">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-lime hover:text-brand-navy transition-all cursor-pointer"><Smartphone size={18} /></div>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-lime hover:text-brand-navy transition-all cursor-pointer"><CheckCircle2 size={18} /></div>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-lime hover:text-brand-navy transition-all cursor-pointer"><Zap size={18} /></div>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-xs tracking-widest uppercase text-white/30 mb-8">Quick Links</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link to="/services" className="hover:text-brand-lime transition-colors">Dienstleistungen</Link></li>
            <li><Link to="/prices" className="hover:text-brand-lime transition-colors">Preisliste</Link></li>
            <li><Link to="/booking" className="hover:text-brand-lime transition-colors">Terminbuchung</Link></li>
            <li><Link to="/contact" className="hover:text-brand-lime transition-colors">Standort</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-xs tracking-widest uppercase text-white/30 mb-8">Service</h4>
          <ul className="space-y-4 text-sm font-medium">
             <li className="flex items-center"><Phone size={14} className="mr-2 text-brand-lime" /> +49 (0) 157 5644106</li>
             <li className="flex items-center"><Mail size={14} className="mr-2 text-brand-lime" /> info@osi-tech.de</li>
             <li className="flex items-center"><MapPin size={14} className="mr-2 text-brand-lime" /> Deichstraße 5, Rhede</li>
          </ul>
        </div>
      </div>
      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-white/20 font-medium">
        <p>© 2024 OsiTech Smart Repair. Alle Rechte vorbehalten.</p>
        <div className="flex space-x-8 mt-4 md:mt-0">
          <Link to="/impressum" className="hover:text-white transition-colors">Impressum</Link>
          <a href="#" className="hover:text-white transition-colors">Datenschutz</a>
          <a href="#" className="hover:text-white transition-colors">AGB</a>
        </div>
      </div>
    </div>
  </footer>
);

// --- Pages ---

const HomePage = () => (
    <main className="pt-32">
        {/* Hero Section */}
        <section className="pb-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center">
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-blue-600 font-bold tracking-[0.2em] text-[10px] uppercase block mb-4 italic">PRÄZISION TRIFFT MOBILITÄT</span>
                    <h1 className="text-7xl md:text-8xl font-black text-brand-navy leading-[0.9] italic mb-8">
                        Smart <span className="text-blue-600 not-italic">Device</span><br/>Expertise.
                    </h1>
                    <p className="text-brand-navy/60 text-lg max-w-md leading-relaxed mb-10">
                        Ihr zertifizierter Partner für High-End Smartphone- & Laptop-Reparaturen. Schnell, transparent und mit modernster Technik am Standort Rhede.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link to="/booking" className="bg-brand-navy text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center">
                            Termin buchen <ArrowRight size={20} className="ml-3" />
                        </Link>
                        <Link to="/prices" className="bg-white border-2 border-brand-grey px-10 py-5 rounded-2xl font-bold text-lg text-brand-navy hover:bg-brand-grey transition-all">
                            Preise prüfen
                        </Link>
                    </div>
                    
                    <div className="mt-16 flex items-center space-x-8">
                        <div className="flex -space-x-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-brand-grey overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
                                </div>
                            ))}
                        </div>
                        <div>
                            <div className="flex text-yellow-500 mb-1">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                            </div>
                            <p className="text-sm font-bold text-brand-navy">4.9/5 <span className="text-brand-navy/40 font-medium">von 1.200+ Kunden</span></p>
                        </div>
                    </div>
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
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
                            <h3 className="text-4xl font-black text-brand-navy">60m</h3>
                            <p className="text-brand-navy font-bold text-sm tracking-tight leading-none mt-1 uppercase">Meist am selben Tag fertig</p>
                        </div>
                        <div className="absolute top-10 -right-10 bg-brand-navy text-white p-8 rounded-[40px] shadow-xl italic">
                            <ShieldCheck size={40} className="text-brand-lime mb-2" />
                            <h4 className="font-bold text-sm">Garantierter<br/>Schutz.</h4>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>

        {/* Feature Grid */}
        <section className="py-24 bg-brand-grey/30">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center mb-16">
                    <span className="text-blue-600 text-[10px] font-bold tracking-[0.2em] uppercase">WARUM UNS WÄHLEN?</span>
                    <h2 className="text-5xl font-bold mt-4 italic">Unser <span className="text-blue-600 not-italic">Qualitätsversprechen</span></h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: <ShieldCheck size={32} />, title: "12 Monate Garantie", desc: "Auf alle ersetzten Teile und unsere durchgeführte Arbeit." },
                        { icon: <Zap size={32} />, title: "Express-Service", desc: "Die meisten Reparaturen erledigen wir in unter 60 Minuten." },
                        { icon: <PenTool size={32} />, title: "Zertifizierte Techniker", desc: "Hochqualifizierte Experten für alle gängigen Marken." },
                        { icon: <ThumbsUp size={32} />, title: "Transparente Preise", desc: "Keine versteckten Kosten. Festpreise inklusive Einbau." }
                    ].map((feature, i) => (
                        <div key={i} className="bg-white p-10 rounded-[40px] shadow-sm border border-brand-grey hover:border-blue-600 transition-all">
                            <div className="text-blue-600 mb-6">{feature.icon}</div>
                            <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                            <p className="text-brand-navy/60 text-sm leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Devices Section */}
        <section className="py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid lg:grid-cols-2 gap-24 items-center">
                    <div className="relative">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-6">
                                <motion.div whileHover={{ y: -10 }} className="bg-brand-navy rounded-[40px] p-8 text-white relative overflow-hidden h-64">
                                    <Smartphone className="absolute -right-4 -bottom-4 opacity-10" size={120} />
                                    <h4 className="text-2xl font-bold mb-2">Smartphones</h4>
                                    <p className="text-white/40 text-sm">iPhone, Samsung, Google Pixel & mehr.</p>
                                </motion.div>
                                <motion.div whileHover={{ y: -10 }} className="bg-brand-lime rounded-[40px] p-8 text-brand-navy relative overflow-hidden h-48">
                                    <Tablet className="absolute -right-4 -bottom-4 opacity-20" size={100} />
                                    <h4 className="text-2xl font-bold mb-2">Tablets</h4>
                                    <p className="text-brand-navy/40 text-sm">iPad & Android Tablets.</p>
                                </motion.div>
                            </div>
                            <div className="space-y-6 pt-12">
                                <motion.div whileHover={{ y: -10 }} className="bg-blue-600 rounded-[40px] p-8 text-white relative overflow-hidden h-48">
                                    <Laptop className="absolute -right-4 -bottom-4 opacity-20" size={100} />
                                    <h4 className="text-2xl font-bold mb-2">Laptops</h4>
                                    <p className="text-white/40 text-sm">MacBook & Windows Reparaturen.</p>
                                </motion.div>
                                <motion.div whileHover={{ y: -10 }} className="bg-brand-grey rounded-[40px] p-8 text-brand-navy relative overflow-hidden h-64 border border-brand-grey/50">
                                    <Watch className="absolute -right-4 -bottom-4 opacity-10" size={120} />
                                    <h4 className="text-2xl font-bold mb-2">Watches</h4>
                                    <p className="text-brand-navy/40 text-sm">Apple Watch & Smartwatches.</p>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span className="text-blue-600 text-[10px] font-bold tracking-[0.2em] uppercase">ALLES AUS EINER HAND</span>
                        <h2 className="text-5xl font-bold mt-4 italic mb-8">Reparatur für <span className="text-blue-600 not-italic">jedes Device</span></h2>
                        <div className="space-y-6">
                            {[
                                { title: "Micro-Soldering Expertise", desc: "Wir reparieren auch dort, wo andere aufgeben – bis auf Chip-Ebene." },
                                { title: "Original Ersatzteile", desc: "Für Apple, Samsung und Google setzen wir auf höchste Standards." },
                                { title: "Datenrettung", desc: "Wir retten Ihre wertvollen Fotos und Dokumente von defekten Geräten." }
                            ].map((item, i) => (
                                <div key={i} className="flex items-start space-x-6">
                                    <div className="mt-1 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600"><CheckCircle2 size={14} /></div>
                                    <div>
                                        <h4 className="font-bold text-lg">{item.title}</h4>
                                        <p className="text-brand-navy/60 text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Link to="/services" className="inline-flex items-center mt-12 text-brand-navy font-bold hover:text-blue-600 transition-all group">
                            Alle Dienstleistungen ansehen <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>

        {/* Call to Action */}
        <section className="py-24">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="bg-brand-navy rounded-[60px] p-12 md:p-24 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent opacity-50" />
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-5xl md:text-6xl font-black italic mb-8">Bereit für die <span className="text-brand-lime not-italic">Reparatur?</span></h2>
                        <p className="text-white/60 text-lg mb-12">Warten Sie nicht länger auf ein defektes Gerät. Buchen Sie jetzt Ihren Termin oder fordern Sie ein unverbindliches Angebot an.</p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Link to="/booking" className="bg-brand-lime text-brand-navy px-12 py-6 rounded-2xl font-bold text-xl hover:scale-105 transition-all shadow-xl">
                                Jetzt Termin buchen
                            </Link>
                            <Link to="/contact" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-12 py-6 rounded-2xl font-bold text-xl hover:bg-white/20 transition-all">
                                Standort finden
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
);

const ServicesPage = () => {
    const services = [
        { icon: <Monitor size={32} />, name: 'Display-Reparatur', time: '< 60 Min', desc: 'Schneller Austausch bei Glasbruch oder Pixelfehlern mit kalibrierten Displays.' },
        { icon: <Battery size={32} />, name: 'Akku-Austausch', time: '< 30 Min', desc: 'Wiederherstellung der originalen Laufzeit mit zertifizierten Hochleistungszellen.' },
        { icon: <Shield size={32} />, name: 'Wasserschäden', time: '1-3 Tage', desc: 'Professionelle Ultraschallreinigung und Korrosionsschutz für Ihre Hardware.' },
        { icon: <Cpu size={32} />, name: 'Platinen-Service', time: '2-5 Tage', desc: 'Micro-Soldering für komplexe Bauteil-Reparaturen auf Chipebene.' },
        { icon: <Layers size={32} />, name: 'Backglass-Tausch', time: '90 Min', desc: 'Präziser Laser-Austausch der Rückseite ohne Gehäuseschaden.' },
        { icon: <Smartphone size={32} />, name: 'Software-Service', time: '60 Min', desc: 'Datenrettung, Updates und Optimierung Ihres Betriebssystems.' },
    ];

    return (
        <main className="pt-32 pb-24">
            <section className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="mb-24">
                    <span className="text-blue-600 text-[10px] font-bold tracking-[0.2em] uppercase">UNSERE EXPERTISE</span>
                    <h2 className="text-6xl font-bold mt-4 italic">Dienstleistungen <span className="text-blue-600 not-italic">& Support</span></h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white border-2 border-brand-grey p-10 rounded-[40px] hover:border-blue-600 transition-all group"
                        >
                            <div className="w-16 h-16 bg-brand-grey rounded-2xl flex items-center justify-center text-brand-navy mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                {service.icon}
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-2xl font-bold">{service.name}</h3>
                                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase italic">{service.time}</span>
                            </div>
                            <p className="text-brand-navy/60 leading-relaxed text-sm">{service.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </main>
    );
};

const PricingPage = () => (
    <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
            <span className="text-blue-600 text-[10px] font-bold tracking-[0.2em] uppercase">SMART RECHNER</span>
            <h2 className="text-6xl font-bold mt-4 italic">Transparente <span className="text-blue-600 not-italic">Preiseliste</span></h2>
            <p className="text-brand-navy/60 mt-4 max-w-md">Wählen Sie Ihr Modell und die gewünschte Qualität, um den finalen Preis inkl. Einbau zu sehen.</p>
        </div>
        <div className="max-w-5xl mx-auto px-6">
            <PricingTable />
        </div>
    </main>
);

const BookingPage = () => (
    <main className="pt-32 pb-24">
        <section id="booking" className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2 bg-white rounded-[40px] p-8 md:p-16 shadow-sm border border-brand-grey">
                    <div className="flex items-center space-x-4 mb-12">
                        <div className="w-12 h-12 bg-brand-navy text-white rounded-xl flex items-center justify-center"><Calendar size={24} /></div>
                        <h3 className="text-3xl font-bold">Buchungsformular</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-10">
                        <div>
                            <label className="block text-[10px] font-bold text-brand-navy/40 tracking-widest mb-2 uppercase">Name</label>
                            <input type="text" placeholder="Ihr vollständiger Name" className="w-full bg-brand-grey border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-brand-navy/40 tracking-widest mb-2 uppercase">Telefon</label>
                            <input type="text" placeholder="+49 000 000000" className="w-full bg-brand-grey border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
                        </div>
                    </div>

                    <div className="mb-10">
                        <label className="block text-[10px] font-bold text-brand-navy/40 tracking-widest mb-2 uppercase">E-Mail</label>
                        <input type="email" placeholder="beispiel@mail.de" className="w-full bg-brand-grey border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-10">
                        <div>
                            <label className="block text-[10px] font-bold text-brand-navy/40 tracking-widest mb-2 uppercase">Gerät</label>
                            <select className="w-full bg-brand-grey border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 transition-all font-medium">
                                <option>iPhone 15 Pro Max</option>
                                <option>Samsung Galaxy S24</option>
                                <option>Anderes Modell</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-brand-navy/40 tracking-widest mb-2 uppercase">Wunschtermin</label>
                            <input type="date" className="w-full bg-brand-grey border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
                        </div>
                    </div>

                    <div className="mb-10">
                        <label className="block text-[10px] font-bold text-brand-navy/40 tracking-widest mb-2 uppercase">Problembeschreibung</label>
                        <textarea placeholder="Beschreiben Sie das Problem so detailliert wie möglich..." className="w-full bg-brand-grey border-none rounded-xl px-5 py-4 h-32 focus:ring-2 focus:ring-blue-500 transition-all font-medium"></textarea>
                    </div>

                    <div className="mb-12">
                        <label className="block text-[10px] font-bold text-brand-navy/40 tracking-widest mb-4 uppercase">Service-Art</label>
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { icon: <Truck size={18} />, label: 'Abholung', desc: 'Wir holen es ab' },
                                { icon: <MapPin size={18} />, label: 'Bring-In', desc: 'Persönlich abgeben', active: true },
                                { icon: <Mail size={18} />, label: 'Versand', desc: 'Per Post senden' },
                            ].map((type, i) => (
                                <div key={i} className={`p-6 rounded-2xl border-2 transition-all cursor-pointer ${type.active ? 'border-blue-500 bg-blue-50' : 'border-brand-grey bg-brand-grey/30 hover:border-blue-200'}`}>
                                    <div className={`mb-4 ${type.active ? 'text-blue-600' : 'text-brand-navy'} `}>{type.icon}</div>
                                    <div className="font-bold text-sm">{type.label}</div>
                                    <div className="text-[10px] text-brand-navy/40 mt-1 uppercase tracking-tighter">{type.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className="w-full bg-brand-navy text-white py-6 rounded-[20px] font-bold text-lg hover:bg-blue-600 transition-all shadow-xl">
                        Reparatur-Termin anfragen
                    </button>
                    <p className="text-center text-brand-navy/30 text-xs mt-6">Durch das Absenden akzeptieren Sie unsere Datenschutzbestimmungen.</p>
                </div>

                <div className="space-y-8">
                    <div className="bg-brand-navy text-white rounded-[40px] p-10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10"><Zap size={80} /></div>
                        <div className="flex items-center space-x-3 mb-8">
                            <div className="w-10 h-10 bg-brand-lime text-brand-navy rounded-lg flex items-center justify-center"><Zap size={20} /></div>
                            <h3 className="text-2xl font-bold">Express-Anfrage</h3>
                        </div>
                        
                        <div className="space-y-6 text-left">
                            <div>
                                <label className="block text-[10px] font-bold text-white/40 tracking-widest mb-2 uppercase">Name</label>
                                <input type="text" placeholder="Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-brand-lime focus:outline-none" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-white/40 tracking-widest mb-2 uppercase">Telefon</label>
                                <input type="text" placeholder="Telefon" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-brand-lime focus:outline-none" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-white/40 tracking-widest mb-2 uppercase">Gerät</label>
                                <input type="text" placeholder="z.B. iPhone 14" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-brand-lime focus:outline-none" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-white/40 tracking-widest mb-2 uppercase">Dringlichkeit</label>
                                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-brand-lime focus:outline-none text-white overflow-hidden">
                                    <option className="text-brand-navy">Normal (2-3 Tage)</option>
                                    <option className="text-brand-navy">Express (Heute)</option>
                                </select>
                            </div>
                            <p className="text-[9px] text-white/30 italic">Hinweis: Schnelle Bearbeitung via E-Mail</p>
                            <button className="w-full bg-brand-lime text-brand-navy py-4 rounded-xl font-bold shadow-lg">
                                Schnellanfrage senden
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
);

const ContactPage = () => (
    <main className="pt-32 pb-24">
        <section className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid lg:grid-cols-2 gap-16">
                <div>
                    <span className="text-blue-600 text-[10px] font-bold tracking-[0.2em] uppercase">STANDORT</span>
                    <h2 className="text-6xl font-bold mt-4 italic">Kontakt <span className="text-blue-600 not-italic">& Anfahrt</span></h2>
                    <p className="text-brand-navy/60 mt-8 text-lg leading-relaxed max-w-md">
                        Sie finden uns im Herzen von Rhede. Besuchen Sie unsere moderne Werkstatt oder kontaktieren Sie uns für eine Abholung.
                    </p>
                    
                    <div className="mt-12 space-y-8">
                        <div className="flex items-start">
                            <div className="w-12 h-12 bg-brand-grey rounded-xl flex items-center justify-center text-brand-navy mr-6"><MapPin size={24} /></div>
                            <div>
                                <h4 className="font-bold text-xl mb-1">Anschrift</h4>
                                <p className="text-brand-navy/60">Deichstraße 5<br/>46414 Rhede, Deutschland</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="w-12 h-12 bg-brand-grey rounded-xl flex items-center justify-center text-brand-navy mr-6"><Phone size={24} /></div>
                            <div>
                                <h4 className="font-bold text-xl mb-1">Telefon</h4>
                                <p className="text-brand-navy/60">0157 5644106</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="w-12 h-12 bg-brand-grey rounded-xl flex items-center justify-center text-brand-navy mr-6"><Mail size={24} /></div>
                            <div>
                                <h4 className="font-bold text-xl mb-1">E-Mail</h4>
                                <p className="text-brand-navy/60">info@osi-tech.de</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="w-12 h-12 bg-brand-grey rounded-xl flex items-center justify-center text-brand-navy mr-6"><Clock size={24} /></div>
                            <div>
                                <h4 className="font-bold text-xl mb-1">Öffnungszeiten</h4>
                                <p className="text-brand-navy/60">Mo - Fr: 09:00 - 18:00 Uhr<br/>Sa: 10:00 - 14:00 Uhr</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-brand-grey rounded-[40px] overflow-hidden shadow-sm h-[600px] relative">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2477.564434289454!2d6.685324076713619!3d51.782046890333245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b85e05a8f6d6ab%3A0x425f6916af91970!2s46414%20Rhede!5e0!3m2!1sde!2sde!4v1714169542000!5m2!1sde!2sde" 
                        className="absolute inset-0 w-full h-full grayscale opacity-80"
                        style={{ border: 0 }} 
                        allowFullScreen={true} 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>
        </section>
    </main>
);

const ImpressumPage = () => (
    <main className="pt-32 pb-24">
        <section className="max-w-4xl mx-auto px-6 md:px-12">
            <h1 className="text-5xl font-black italic mb-12">Impressum</h1>
            <div className="space-y-12 text-brand-navy/70 leading-relaxed">
                <div>
                    <h2 className="text-xl font-bold text-brand-navy mb-4">Angaben gemäß § 5 TMG:</h2>
                    <p>OsiTech Smart Repair</p>
                    <p>Deichstraße 5</p>
                    <p>46414 Rhede</p>
                    <p>Deutschland</p>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-brand-navy mb-4">Vertreten durch:</h2>
                    <p>Osman Habib El-Molla</p>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-brand-navy mb-4">Kontakt:</h2>
                    <p>Telefon: 0157 5644106</p>
                    <p>E-Mail: info@osi-tech.de</p>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-brand-navy mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</h2>
                    <p>Osman Habib El-Molla</p>
                    <p>Deichstraße 5</p>
                    <p>46414 Rhede</p>
                </div>
                <div className="pt-12 border-t border-brand-grey">
                    <p className="text-sm">Haftungsausschluss: Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.</p>
                </div>
            </div>
        </section>
    </main>
);

const RechnerPage = () => (
    <main className="pt-32 pb-24">
        <PricingTable />
    </main>
);

// --- App Entry (Exported by main script) ---

export { 
  HomePage, 
  ServicesPage, 
  BookingPage, 
  PricingPage, 
  ContactPage, 
  RechnerPage,
  ImpressumPage,
  Header,
  Footer
};
