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
import type {
  BrandKey,
  PriceCategory,
  PricingCatalogBrand,
  PricingCatalogModel,
  PricingCatalogService,
} from '@/types/pricing';
import type {ReactNode} from 'react';

const CATEGORY_META: Record<
  PriceCategory,
  {icon: ReactNode; desc: string}
> = {
  original: {
    icon: <ShieldCheck size={16} />,
    desc: 'Höchste Präzision & Garantie',
  },
  premium: {
    icon: <Zap size={16} />,
    desc: 'Hervorragendes Preis-Leistungs-Verhältnis',
  },
  standard: {
    icon: <Monitor size={16} />,
    desc: 'Günstige Alternative',
  },
  akku: {
    icon: <Cpu size={16} />,
    desc: 'Neue Kapazität für dein Gerät',
  },
  display: {
    icon: <Monitor size={16} />,
    desc: 'Circa-Preis je nach Farbe & Verfügbarkeit',
  },
  diagnose: {
    icon: <Cpu size={16} />,
    desc: 'Analyse & Fehlersuche',
  },
  other: {
    icon: <Cpu size={16} />,
    desc: 'Weitere Service-Leistungen',
  },
};

function formatEuro(value: number) {
  return value.toFixed(2).replace('.', ',');
}

function findBrand(catalog: PricingCatalogBrand[], brandKey: BrandKey | null) {
  if (!brandKey) {
    return null;
  }

  return catalog.find((brand) => brand.key === brandKey) ?? null;
}

export default function PricingTable() {
  const brands = [
    {id: 'apple' as BrandKey, name: 'Apple', icon: <Smartphone size={16} />},
    {id: 'samsung' as BrandKey, name: 'Samsung', icon: <Smartphone size={16} />},
    {id: 'other' as BrandKey, name: 'Andere', icon: <Smartphone size={16} />},
  ];

  const [catalog, setCatalog] = useState<PricingCatalogBrand[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState<BrandKey | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  useEffect(() => {
    const loadPricing = async () => {
      try {
        const response = await fetch('/api/pricing', {cache: 'no-store'});

        if (!response.ok) {
          setLoading(false);
          return;
        }

        const body = (await response.json()) as {catalog?: PricingCatalogBrand[]};
        setCatalog(body.catalog ?? []);
      } catch {
        setCatalog([]);
      } finally {
        setLoading(false);
      }
    };

    void loadPricing();
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (catalog.length === 0) {
      return;
    }

    if (selectedBrand && selectedModel && selectedService) {
      return;
    }

    const preferredOrder: BrandKey[] = ['apple', 'samsung', 'other'];
    const defaultBrand =
      preferredOrder.find((key) =>
        catalog.some((brand) => brand.key === key && brand.models.length > 0),
      ) ??
      catalog.find((brand) => brand.models.length > 0)?.key ??
      null;

    if (!defaultBrand) {
      return;
    }

    const brandData = findBrand(catalog, defaultBrand);
    const defaultModel = brandData?.models?.[0]?.model ?? null;
    const defaultService = brandData?.models?.[0]?.services?.[0]?.id ?? null;

    setSelectedBrand((prev) => prev ?? defaultBrand);
    setSelectedModel((prev) => prev ?? defaultModel);
    setSelectedService((prev) => prev ?? defaultService);
  }, [catalog, loading, selectedBrand, selectedModel, selectedService]);

  const selectedBrandData = findBrand(catalog, selectedBrand);
  const modelOptions = selectedBrandData?.models ?? [];

  const selectedModelData: PricingCatalogModel | null = selectedModel
    ? modelOptions.find((model) => model.model === selectedModel) ?? null
    : null;

  const serviceOptions = selectedModelData?.services ?? [];

  const selectedServiceData: PricingCatalogService | null = selectedService
    ? serviceOptions.find((service) => service.id === selectedService) ?? null
    : null;

  return (
    <div className="bg-brand-grey rounded-[40px] p-8 md:p-12 shadow-inner border border-brand-grey/50">
      <p className="text-brand-navy/50 text-sm leading-relaxed mb-6">
        Hinweis: Alle Preise sind Circa-Angaben, da Ersatzteilpreise je nach
        Farbe, Verfügbarkeit und Display-Version variieren können.
      </p>
      <div className="flex justify-center flex-wrap gap-4 mb-12">
        {brands.map((brand) => (
          <button
            key={brand.id}
            onClick={() => {
              setSelectedBrand(brand.id);
              setSelectedModel(null);
              setSelectedService(null);
            }}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
              {!selectedBrand && (
                <div className="col-span-2 text-center py-8 text-brand-navy/40 text-sm italic">
                  Bitte zuerst eine Marke auswählen.
                </div>
              )}
              {selectedBrand && !loading && modelOptions.length === 0 && (
                <div className="col-span-2 text-center py-8 text-brand-navy/40 text-sm italic">
                  Keine Modelle für diese Marke hinterlegt.
                </div>
              )}
              {selectedBrand &&
                modelOptions.map((item) => (
                  <button
                    key={item.model}
                    onClick={() => {
                      setSelectedModel(item.model);
                      setSelectedService(null);
                    }}
                    className={`px-4 py-3 rounded-xl text-xs font-bold transition-all text-left whitespace-normal wrap-break-word leading-snug ${selectedModel === item.model ? 'bg-brand-navy text-white shadow-lg' : 'bg-white text-brand-navy/60 hover:bg-white/80 border border-transparent hover:border-brand-navy/10'}`}
                    type="button"
                  >
                    {item.model}
                  </button>
                ))}
            </div>
            {selectedBrand === 'samsung' && selectedModel && (
              <p className="mt-5 text-xs leading-relaxed text-brand-navy/50">
                Hinweis: Alle Preise sind Circa-Angaben. Ersatzteilpreise
                variieren häufig und können je nach Farbe, Lieferbarkeit und
                Display-Version abweichen.
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <label className="block text-[10px] font-bold text-brand-navy/40 tracking-widest mb-4 uppercase">
              Qualität / Service
            </label>
            <div className="space-y-3">
              {!selectedModel && (
                <div className="rounded-2xl border border-dashed border-brand-navy/20 bg-white/50 px-6 py-5 text-sm text-brand-navy/60">
                  Wähle zuerst ein Modell aus. Danach erscheinen die verfügbaren
                  Service-Optionen.
                </div>
              )}
              {selectedModel &&
                serviceOptions.map((service) => {
                  const meta = CATEGORY_META[service.type];

                  return (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl border-2 transition-all ${selectedService === service.id ? 'border-blue-600 bg-white shadow-md' : 'border-transparent bg-white/50 hover:bg-white'}`}
                      type="button"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-2 rounded-lg ${selectedService === service.id ? 'bg-blue-600 text-white' : 'bg-brand-navy/5 text-brand-navy/40'}`}
                        >
                          {meta.icon}
                        </div>
                        <div className="text-left">
                          <div
                            className={`text-sm font-bold ${selectedService === service.id ? 'text-brand-navy' : 'text-brand-navy/60'}`}
                          >
                            {service.type_label}
                          </div>
                          <div className="text-[10px] text-brand-navy/30">
                            {meta.desc}
                          </div>
                        </div>
                      </div>
                      {selectedService === service.id && (
                        <CheckCircle2 size={18} className="text-blue-600" />
                      )}
                    </button>
                  );
                })}
            </div>
          </div>

          <div className="mt-10 bg-brand-navy rounded-[32px] p-8 text-center text-white relative overflow-hidden group shadow-2xl">
            <div className="absolute -top-6 -right-6 p-4 opacity-10 group-hover:rotate-12 transition-transform">
              <Smartphone size={100} />
            </div>
            {selectedBrand && selectedModel && selectedServiceData ? (
              <>
                <div className="text-sm font-bold text-white/80 mb-4 text-left">
                  {selectedModel}
                </div>
                <div className="text-[10px] font-bold tracking-[0.3em] text-white/40 mb-2 uppercase">
                  CIRCA PREIS
                </div>
                <div className="text-5xl font-black">
                  {selectedServiceData.prefix ? `${selectedServiceData.prefix} ` : ''}
                  {formatEuro(selectedServiceData.price)}€
                </div>
                <div className="text-[9px] text-white/30 mt-4 italic font-medium">
                  {selectedServiceData.note ||
                    'Inkl. MwSt., Einbau & 6 Monate Garantie'}
                </div>
              </>
            ) : (
              <>
                <div className="text-[10px] font-bold tracking-[0.3em] text-white/40 mb-4 uppercase">
                  {selectedBrand
                    ? 'SERVICE WÄHLEN'
                    : 'MARKENBASIERT FILTERN'}
                </div>
                <p className="text-sm text-white/75 mb-6">
                  Folge der Reihenfolge: Marke → Modell → Service. Danach wird
                  der Preis angezeigt.
                </p>
                {selectedBrand && selectedBrand !== 'other' ? null : (
                  <Link
                    href="/contact"
                    className="w-full bg-brand-lime text-brand-navy py-4 rounded-xl font-bold flex items-center justify-center hover:scale-[1.03] transition-transform"
                  >
                    <MessageSquare size={18} className="mr-2" /> Angebot
                    anfordern
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
