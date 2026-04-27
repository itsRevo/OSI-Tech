'use client';

import {useEffect, useState} from 'react';
import {
  CheckCircle2,
  Cpu,
  MessageSquare,
  Monitor,
  ShieldCheck,
  Smartphone,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

export default function PricingTable() {
  const brands = [
    {id: 'apple', name: 'iPhone', icon: <Smartphone size={16} />},
    {id: 'samsung', name: 'Samsung', icon: <Smartphone size={16} />},
    {id: 'google', name: 'Google Pixel', icon: <Smartphone size={16} />},
  ];

  const repairData: Record<string, any[]> = {
    apple: [
      {model: 'iPhone X', standard: '89,90', premium: '129,90', original: '169,90', akku: '69,90'},
      {model: 'iPhone XR', standard: '89,90', premium: '129,90', original: '159,90', akku: '69,90'},
      {model: 'iPhone XS', standard: '89,90', premium: '129,90', original: '179,90', akku: '69,90'},
      {model: 'iPhone XS MAX', standard: '99,90', premium: '129,90', original: '189,90', akku: '69,90'},
      {model: 'iPhone 11', standard: '89,90', premium: '129,90', original: '159,90', akku: '69,90'},
      {model: 'iPhone 11 Pro', standard: '89,90', premium: '139,90', original: '189,90', akku: '79,90'},
      {model: 'iPhone 11 Pro Max', standard: '99,90', premium: '139,90', original: '219,90', akku: '79,90'},
      {model: 'iPhone 12', standard: '99,90', premium: '139,90', original: '199,90', akku: '79,90'},
      {model: 'iPhone 12 mini', standard: '99,90', premium: '159,90', original: '199,90', akku: '79,90'},
      {model: 'iPhone 12 pro', standard: '99,90', premium: '149,90', original: '199,90', akku: '79,90'},
      {model: 'iPhone 12 Pro Max', standard: '109,90', premium: '149,90', original: '279,90', akku: '79,90'},
      {model: 'iPhone 13', standard: '99,90', premium: '149,90', original: '209,90', akku: '79,90'},
      {model: 'iPhone 13 mini', standard: '109,90', premium: '229,90', original: '269,90', akku: '79,90'},
      {model: 'iPhone 13 pro', standard: '99,90', premium: '149,90', original: '249,90', akku: '79,90'},
      {model: 'iPhone 13 pro Max', standard: '99,90', premium: '149,90', original: '289,90', akku: '79,90'},
      {model: 'iPhone 14', standard: '99,90', premium: '149,90', original: '219,90', akku: '79,90'},
      {model: 'iPhone 14 Plus', standard: '99,90', premium: '149,90', original: '259,90', akku: '79,90'},
      {model: 'iPhone 14 Pro', standard: '109,90', premium: '189,90', original: '339,90', akku: '79,90'},
      {model: 'iPhone 14 Pro Max', standard: '119,90', premium: '169,90', original: '409,90', akku: '79,90'},
      {model: 'iPhone 15', standard: '99,90', premium: '179,90', original: '309,90', akku: '79,90'},
      {model: 'iPhone 15 Plus', standard: '99,90', premium: '169,90', original: '299,90', akku: '79,90'},
      {model: 'iPhone 15 Pro', standard: '109,90', premium: '179,90', original: '409,90', Practical: '79,90'},
      {model: 'iPhone 15 Pro Max', standard: '119,90', premium: '169,90', original: '429,90', akku: '79,90'},
      {model: 'iPhone 16', standard: '119,90', premium: '189,90', original: '329,90', akku: '84,90'},
      {model: 'iPhone 16 Plus', standard: '119,90', premium: '179,90', original: '319,90', akku: '84,90'},
      {model: 'iPhone 16 Pro', standard: '129,90', premium: '199,90', original: '419,90', akku: '84,90'},
      {model: 'iPhone 16 Pro Max', standard: '159,90', premium: '209,90', original: '479,90', akku: '84,90'},
      {model: 'iPhone 16 e', standard: '99,90', premium: '149,90', original: '269,90', akku: '89,90'},
    ],
    samsung: [],
    google: [],
  };

  const [selectedBrand, setSelectedBrand] = useState('apple');
  const [selectedModel, setSelectedModel] = useState(repairData['apple'][0].model);
  const [selectedType, setSelectedType] = useState('original');

  useEffect(() => {
    setSelectedModel(repairData[selectedBrand][0]?.model || '');
  }, [selectedBrand]);

  const currentBrandData = repairData[selectedBrand] || [];
  const currentData =
    currentBrandData.find((d) => d.model === selectedModel) ||
    currentBrandData[0] ||
    {};

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
            type="button"
          >
            {brand.icon}
            <span>{brand.name}</span>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        <div className="space-y-8">
          <div>
            <label className="block text-[10px] font-bold text-brand-navy/40 tracking-widest mb-4 uppercase">
              Modell wählen
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
              {currentBrandData.map((item) => (
                <button
                  key={item.model}
                  onClick={() => setSelectedModel(item.model)}
                  className={`px-4 py-3 rounded-xl text-xs font-bold transition-all text-left truncate ${selectedModel === item.model ? 'bg-brand-navy text-white shadow-lg' : 'bg-white text-brand-navy/60 hover:bg-white/80 border border-transparent hover:border-brand-navy/10'}`}
                  type="button"
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
            <label className="block text-[10px] font-bold text-brand-navy/40 tracking-widest mb-4 uppercase">
              Qualität / Service
            </label>
            <div className="space-y-3">
              {[
                {
                  id: 'original',
                  label: 'Original Qualität',
                  icon: <ShieldCheck size={16} />,
                  desc: 'Höchste Präzision & Garantie',
                },
                {
                  id: 'premium',
                  label: 'Premium Qualität',
                  icon: <Zap size={16} />,
                  desc: 'Hervorragendes Preis-Leistung',
                },
                {
                  id: 'standard',
                  label: 'Standard Qualität',
                  icon: <Monitor size={16} />,
                  desc: 'Günstige Alternative',
                },
                {
                  id: 'akku',
                  label: 'Akku-Austausch',
                  icon: <Cpu size={16} />,
                  desc: 'Neue Kapazität',
                },
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl border-2 transition-all ${selectedType === type.id ? 'border-blue-600 bg-white shadow-md' : 'border-transparent bg-white/50 hover:bg-white'}`}
                  type="button"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`p-2 rounded-lg ${selectedType === type.id ? 'bg-blue-600 text-white' : 'bg-brand-navy/5 text-brand-navy/40'}`}
                    >
                      {type.icon}
                    </div>
                    <div className="text-left">
                      <div
                        className={`text-sm font-bold ${selectedType === type.id ? 'text-brand-navy' : 'text-brand-navy/60'}`}
                      >
                        {type.label}
                      </div>
                      <div className="text-[10px] text-brand-navy/30">
                        {type.desc}
                      </div>
                    </div>
                  </div>
                  {selectedType === type.id && (
                    <CheckCircle2 size={18} className="text-blue-600" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 bg-brand-navy rounded-[32px] p-8 text-center text-white relative overflow-hidden group shadow-2xl">
            <div className="absolute -top-6 -right-6 p-4 opacity-10 group-hover:rotate-12 transition-transform">
              <Smartphone size={100} />
            </div>
            {selectedBrand === 'apple' ? (
              <>
                <div className="text-[10px] font-bold tracking-[0.3em] text-white/40 mb-2 uppercase">
                  FINALER PREIS
                </div>
                <div className="text-5xl font-black">{getPrice()}€</div>
                <div className="text-[9px] text-white/30 mt-4 italic font-medium">
                  Inkl. MwSt., Einbau & 12 Monate Garantie
                </div>
              </>
            ) : (
              <>
                <div className="text-[10px] font-bold tracking-[0.3em] text-white/40 mb-4 uppercase">
                  PREIS AUF ANFRAGE
                </div>
                <Link
                  href="/contact"
                  className="w-full bg-brand-lime text-brand-navy py-4 rounded-xl font-bold flex items-center justify-center hover:scale-[1.03] transition-transform"
                >
                  <MessageSquare size={18} className="mr-2" /> Angebot
                  anfordern
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
