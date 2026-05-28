'use client';

import {useEffect, useMemo, useRef, useState} from 'react';
import {
  Check,
  CircleAlert,
  LogOut,
  Moon,
  Pencil,
  Plus,
  Save,
  Sun,
  Trash2,
} from 'lucide-react';
import type {PriceCategory, PriceRecord, ProductStatus} from '@/types/pricing';
import {CATEGORY_LABELS} from '@/types/pricing';

type ApiResponse = {
  items: PriceRecord[];
  stats: {
    total: number;
    active: number;
    inactive: number;
  };
};

type SortOption =
  | 'sort_order_asc'
  | 'sort_order_desc'
  | 'brand_asc'
  | 'brand_desc'
  | 'price_asc'
  | 'price_desc'
  | 'name_asc'
  | 'name_desc';
type DraftProduct = {
  product_name: string;
  brand: string;
  category: PriceCategory;
  price: string;
  status: ProductStatus;
  note: string;
  prefix: string;
  sort_order: string;
};

const CATEGORY_OPTIONS: PriceCategory[] = [
  'original',
  'premium',
  'standard',
  'akku',
  'display',
  'diagnose',
  'other',
];

const STATUS_OPTIONS: ProductStatus[] = ['active', 'inactive'];

const EMPTY_NEW_PRODUCT: DraftProduct = {
  product_name: '',
  brand: 'apple',
  category: 'original',
  price: '',
  status: 'active',
  note: '',
  prefix: '',
  sort_order: '0',
};

function formatPrice(value: number) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);
}

function parsePrice(value: string) {
  const normalized = value.replace(',', '.').trim();
  const parsed = Number(normalized);

  if (!Number.isFinite(parsed)) {
    return null;
  }

  return Math.round(parsed * 100) / 100;
}

export default function AdminPricingPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [items, setItems] = useState<PriceRecord[]>([]);
  const [editingIds, setEditingIds] = useState<string[]>([]);
  const [dirtyIds, setDirtyIds] = useState<string[]>([]);
  const [newProduct, setNewProduct] = useState<DraftProduct>(EMPTY_NEW_PRODUCT);
  const [autoSave, setAutoSave] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [brandFilter, setBrandFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | PriceCategory>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | ProductStatus>('all');
  const [sortOption, setSortOption] = useState<SortOption>('sort_order_asc');
  const [viewMode, setViewMode] = useState<'grouped' | 'detailed'>('grouped');
  const autoSaveTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const stats = useMemo(() => {
    return {
      total: items.length,
      active: items.filter((item) => item.status === 'active').length,
      inactive: items.filter((item) => item.status === 'inactive').length,
    };
  }, [items]);

  const brandSummary = useMemo(() => {
    const map = new Map<string, number>();

    items.forEach((item) => {
      const key = item.brand || 'unbekannt';
      map.set(key, (map.get(key) ?? 0) + 1);
    });

    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [items]);

  const availableBrands = useMemo(() => {
    return Array.from(new Set(items.map((item) => item.brand).filter(Boolean))).sort(
      (a, b) => a.localeCompare(b),
    );
  }, [items]);

  const filteredItems = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const filtered = items.filter((item) => {
      if (brandFilter !== 'all' && item.brand !== brandFilter) {
        return false;
      }

      if (categoryFilter !== 'all' && item.category !== categoryFilter) {
        return false;
      }

      if (statusFilter !== 'all' && item.status !== statusFilter) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      return (
        item.product_name.toLowerCase().includes(normalizedSearch) ||
        item.brand.toLowerCase().includes(normalizedSearch)
      );
    });

    const sorted = [...filtered];

    sorted.sort((a, b) => {
      if (sortOption === 'sort_order_asc') {
        return a.sort_order - b.sort_order;
      }

      if (sortOption === 'sort_order_desc') {
        return b.sort_order - a.sort_order;
      }

      if (sortOption === 'brand_asc') {
        return (
          a.brand.localeCompare(b.brand) ||
          a.product_name.localeCompare(b.product_name)
        );
      }

      if (sortOption === 'brand_desc') {
        return (
          b.brand.localeCompare(a.brand) ||
          b.product_name.localeCompare(a.product_name)
        );
      }

      if (sortOption === 'price_asc') {
        return a.price - b.price;
      }

      if (sortOption === 'price_desc') {
        return b.price - a.price;
      }

      if (sortOption === 'name_desc') {
        return b.product_name.localeCompare(a.product_name);
      }

      return a.product_name.localeCompare(b.product_name);
    });

    return sorted;
  }, [
    items,
    searchTerm,
    brandFilter,
    categoryFilter,
    statusFilter,
    sortOption,
  ]);

  const groupedModels = useMemo(() => {
    const map = new Map<
      string,
      {
        brand: string;
        model: string;
        categories: Set<PriceCategory>;
        serviceCount: number;
        minPrice: number;
        maxPrice: number;
      }
    >();

    filteredItems.forEach((item) => {
      const key = `${item.brand}::${item.product_name}`;

      if (!map.has(key)) {
        map.set(key, {
          brand: item.brand,
          model: item.product_name,
          categories: new Set<PriceCategory>(),
          serviceCount: 0,
          minPrice: item.price,
          maxPrice: item.price,
        });
      }

      const group = map.get(key)!;
      group.categories.add(item.category);
      group.serviceCount += 1;
      group.minPrice = Math.min(group.minPrice, item.price);
      group.maxPrice = Math.max(group.maxPrice, item.price);
    });

    return Array.from(map.values()).sort((a, b) => {
      const brandCompare = a.brand.localeCompare(b.brand);
      if (brandCompare !== 0) {
        return brandCompare;
      }

      return a.model.localeCompare(b.model);
    });
  }, [filteredItems]);

  const categorySummary = useMemo(() => {
    const map = new Map<string, number>();

    items.forEach((item) => {
      map.set(item.category, (map.get(item.category) ?? 0) + 1);
    });

    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [items]);

  useEffect(() => {
    const initialize = async () => {
      setError(null);

      try {
        const sessionResponse = await fetch('/api/admin/session', {
          cache: 'no-store',
        });

        if (!sessionResponse.ok) {
          setAuthenticated(false);
          return;
        }

        const session = (await sessionResponse.json()) as {
          authenticated: boolean;
          username: string;
        };

        if (session.authenticated) {
          setAuthenticated(true);
          setUsername(session.username);
          try {
            await loadItems();
          } catch (loadError) {
            setError(
              loadError instanceof Error
                ? loadError.message
                : 'Preise konnten nicht geladen werden.',
            );
          }
        }
      } catch {
        setError('Session konnte nicht geprüft werden.');
      } finally {
        setLoading(false);
      }
    };

    void initialize();
  }, []);

  async function loadItems() {
    const response = await fetch('/api/admin/prices', {cache: 'no-store'});

    if (!response.ok) {
      const body = (await response.json()) as {error?: string};
      throw new Error(body.error || 'Preise konnten nicht geladen werden.');
    }

    const data = (await response.json()) as ApiResponse;
    setItems(data.items);
    setEditingIds([]);
    setDirtyIds([]);
  }

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setToast(null);
    setBusyId('login');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          username: loginUsername,
          password: loginPassword,
        }),
      });

      if (!response.ok) {
        const body = (await response.json()) as {error?: string};
        throw new Error(body.error || 'Login fehlgeschlagen.');
      }

      setAuthenticated(true);
      setUsername(loginUsername.trim());
      setLoginPassword('');
      await loadItems();
      setToast('Erfolgreich eingeloggt.');
    } catch (loginError) {
      setError(
        loginError instanceof Error ? loginError.message : 'Login fehlgeschlagen.',
      );
    } finally {
      setBusyId(null);
    }
  }

  async function logout() {
    setBusyId('logout');
    try {
      await fetch('/api/admin/logout', {method: 'POST'});
      setAuthenticated(false);
      setItems([]);
      setUsername('');
      setToast('Abgemeldet.');
    } finally {
      setBusyId(null);
    }
  }

  function setField<K extends keyof PriceRecord>(
    id: string,
    key: K,
    value: PriceRecord[K],
  ) {
    setItems((current) =>
      current.map((item) => (item.id === id ? {...item, [key]: value} : item)),
    );

    setDirtyIds((current) => (current.includes(id) ? current : [...current, id]));

    if (autoSave) {
      if (autoSaveTimers.current[id]) {
        clearTimeout(autoSaveTimers.current[id]);
      }

      autoSaveTimers.current[id] = setTimeout(() => {
        const product = items.find((entry) => entry.id === id);
        if (product) {
          void saveItem(product.id);
        }
      }, 700);
    }
  }

  function toggleEdit(id: string) {
    setEditingIds((current) =>
      current.includes(id) ? current.filter((entryId) => entryId !== id) : [...current, id],
    );
  }

  async function saveItem(id: string) {
    const product = items.find((entry) => entry.id === id);

    if (!product) {
      return;
    }

    setBusyId(id);
    setError(null);

    try {
      const response = await fetch('/api/admin/prices', {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        const body = (await response.json()) as {error?: string};
        throw new Error(body.error || 'Speichern fehlgeschlagen.');
      }

      const body = (await response.json()) as {item: PriceRecord; message: string};

      setItems((current) =>
        current.map((entry) => (entry.id === id ? body.item : entry)),
      );
      setDirtyIds((current) => current.filter((entryId) => entryId !== id));
      setToast(body.message);
    } catch (saveError) {
      setError(
        saveError instanceof Error ? saveError.message : 'Speichern fehlgeschlagen.',
      );
    } finally {
      setBusyId(null);
    }
  }

  async function saveAll() {
    const targets = dirtyIds.slice();

    for (const id of targets) {
      await saveItem(id);
    }
  }

  async function deleteItem(id: string) {
    if (!window.confirm('Produkt wirklich löschen?')) {
      return;
    }

    setBusyId(id);
    setError(null);

    try {
      const response = await fetch(`/api/admin/prices?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const body = (await response.json()) as {error?: string};
        throw new Error(body.error || 'Löschen fehlgeschlagen.');
      }

      setItems((current) => current.filter((entry) => entry.id !== id));
      setDirtyIds((current) => current.filter((entryId) => entryId !== id));
      setEditingIds((current) => current.filter((entryId) => entryId !== id));
      setToast('Produkt wurde gelöscht.');
    } catch (deleteError) {
      setError(
        deleteError instanceof Error ? deleteError.message : 'Löschen fehlgeschlagen.',
      );
    } finally {
      setBusyId(null);
    }
  }

  async function createItem(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusyId('new');
    setError(null);

    try {
      const parsedPrice = parsePrice(newProduct.price);
      const sortOrder = Number(newProduct.sort_order || '0');

      if (!newProduct.product_name.trim() || !newProduct.brand.trim()) {
        throw new Error('Bitte Produktname und Kategorie ausfüllen.');
      }

      if (parsedPrice === null) {
        throw new Error('Bitte einen gültigen Preis eintragen.');
      }

      const response = await fetch('/api/admin/prices', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          product_name: newProduct.product_name,
          brand: newProduct.brand,
          category: newProduct.category,
          price: parsedPrice,
          status: newProduct.status,
          note: newProduct.note,
          prefix: newProduct.prefix,
          sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
        }),
      });

      if (!response.ok) {
        const body = (await response.json()) as {error?: string};
        throw new Error(body.error || 'Erstellen fehlgeschlagen.');
      }

      const body = (await response.json()) as {item: PriceRecord; message: string};
      setItems((current) => [body.item, ...current]);
      setNewProduct(EMPTY_NEW_PRODUCT);
      setToast(body.message);
    } catch (createError) {
      setError(
        createError instanceof Error ? createError.message : 'Anlegen fehlgeschlagen.',
      );
    } finally {
      setBusyId(null);
    }
  }

  if (loading) {
    return (
      <main className="pt-32 pb-20 px-4 sm:px-6 md:px-10">
        <div className="max-w-7xl mx-auto rounded-3xl border border-brand-grey bg-white p-8 shadow-sm">
          Lade Admin-Bereich ...
        </div>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="pt-32 pb-20 px-4 sm:px-6 md:px-10">
        <div className="max-w-md mx-auto rounded-3xl border border-brand-grey bg-white p-8 shadow-xl">
          <h1 className="text-2xl font-black text-brand-navy">Admin Login</h1>
          <p className="text-sm text-brand-navy/60 mt-2">
            Melde dich an, um Preise zu verwalten.
          </p>

          <form className="mt-8 space-y-4" onSubmit={login}>
            <input
              value={loginUsername}
              onChange={(event) => setLoginUsername(event.target.value)}
              placeholder="Benutzername"
              className="w-full rounded-xl border border-brand-navy/15 px-4 py-3"
            />
            <input
              type="password"
              value={loginPassword}
              onChange={(event) => setLoginPassword(event.target.value)}
              placeholder="Passwort"
              className="w-full rounded-xl border border-brand-navy/15 px-4 py-3"
            />
            <button
              type="submit"
              disabled={busyId === 'login'}
              className="w-full rounded-xl bg-brand-navy text-white py-3 font-bold hover:opacity-95 transition"
            >
              {busyId === 'login' ? 'Anmelden...' : 'Anmelden'}
            </button>
          </form>

          {error && (
            <p className="mt-4 flex items-center gap-2 text-red-600 text-sm">
              <CircleAlert size={16} /> {error}
            </p>
          )}
        </div>
      </main>
    );
  }

  const pageShell = darkMode
    ? 'bg-slate-950 text-slate-100'
    : 'bg-gradient-to-b from-slate-50 via-white to-blue-50 text-brand-navy';

  const panelClass = darkMode
    ? 'bg-slate-900 border-slate-800 shadow-2xl'
    : 'bg-white border-slate-200 shadow-xl';

  const fieldClass = darkMode
    ? 'rounded-xl border border-slate-600 bg-slate-900/80 px-4 py-3 text-slate-100 placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30'
    : 'rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20';

  const selectFieldClass = darkMode
    ? 'rounded-xl border border-slate-600 bg-slate-900/80 px-4 py-3 text-slate-100 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30'
    : 'rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20';

  const selectOptionClass = darkMode
    ? 'bg-slate-800 text-slate-100'
    : 'bg-white text-slate-900';

  const nativeSelectStyle = {
    colorScheme: darkMode ? 'dark' : 'light',
  } as const;

  return (
    <main className={`pt-28 pb-20 px-4 sm:px-6 md:px-10 transition-colors ${pageShell}`}>
      <div className="max-w-7xl mx-auto space-y-6">
        <section
          className={`rounded-3xl border p-6 md:p-8 backdrop-blur ${panelClass} transition-colors`}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-xs tracking-[0.24em] uppercase text-blue-400 font-bold">
                Preisverwaltung
              </p>
              <h1 className="text-3xl md:text-4xl font-black mt-2">
                Admin Dashboard
              </h1>
              <p className="text-sm mt-2 opacity-80">
                Eingeloggt als {username}. Preise lassen sich direkt bearbeiten und
                speichern.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setDarkMode((current) => !current)}
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold"
              >
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                {darkMode ? 'Heller Modus' : 'Dunkler Modus'}
              </button>
              <button
                type="button"
                onClick={logout}
                disabled={busyId === 'logout'}
                className="inline-flex items-center gap-2 rounded-xl bg-red-500/90 px-4 py-2 text-sm font-semibold text-white"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <article className="rounded-2xl bg-blue-500/15 border border-blue-400/20 p-4">
              <p className="text-xs uppercase tracking-wide opacity-70">Gesamt</p>
              <p className="text-2xl font-black mt-1">{stats.total}</p>
            </article>
            <article className="rounded-2xl bg-emerald-500/15 border border-emerald-400/20 p-4">
              <p className="text-xs uppercase tracking-wide opacity-70">Aktiv</p>
              <p className="text-2xl font-black mt-1">{stats.active}</p>
            </article>
            <article className="rounded-2xl bg-amber-500/15 border border-amber-400/20 p-4">
              <p className="text-xs uppercase tracking-wide opacity-70">Inaktiv</p>
              <p className="text-2xl font-black mt-1">{stats.inactive}</p>
            </article>
          </div>
        </section>

        <section className={`rounded-3xl border p-6 ${panelClass}`}>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <h2 className="text-xl font-bold">Produkte & Preise</h2>
            <div className="flex items-center gap-3">
              <div className="inline-flex rounded-xl border border-white/15 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setViewMode('grouped')}
                  className={`px-3 py-2 text-xs font-semibold ${viewMode === 'grouped' ? 'bg-blue-600 text-white' : 'bg-transparent text-slate-200'}`}
                >
                  Gruppiert
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('detailed')}
                  className={`px-3 py-2 text-xs font-semibold ${viewMode === 'detailed' ? 'bg-blue-600 text-white' : 'bg-transparent text-slate-200'}`}
                >
                  Details
                </button>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={autoSave}
                  onChange={(event) => setAutoSave(event.target.checked)}
                />
                Auto-Save
              </label>
              <button
                type="button"
                onClick={saveAll}
                disabled={dirtyIds.length === 0}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-40"
              >
                <Save size={16} /> Alle speichern ({dirtyIds.length})
              </button>
            </div>
          </div>

          <div className="mb-5 grid md:grid-cols-5 gap-3">
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Suche nach Modell oder Marke"
              className={`md:col-span-2 ${fieldClass}`}
            />

            <select
              value={brandFilter}
              onChange={(event) => setBrandFilter(event.target.value)}
              className={selectFieldClass}
              style={nativeSelectStyle}
            >
              <option value="all" className={selectOptionClass}>
                Alle Marken
              </option>
              {availableBrands.map((brand) => (
                <option key={brand} value={brand} className={selectOptionClass}>
                  {brand}
                </option>
              ))}
            </select>

            <select
              value={categoryFilter}
              onChange={(event) =>
                setCategoryFilter(event.target.value as 'all' | PriceCategory)
              }
              className={selectFieldClass}
              style={nativeSelectStyle}
            >
              <option value="all" className={selectOptionClass}>
                Alle Kategorien
              </option>
              {CATEGORY_OPTIONS.map((category) => (
                <option key={category} value={category} className={selectOptionClass}>
                  {CATEGORY_LABELS[category]}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value as 'all' | ProductStatus)
              }
              className={selectFieldClass}
              style={nativeSelectStyle}
            >
              <option value="all" className={selectOptionClass}>
                Alle Status
              </option>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status} className={selectOptionClass}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6 grid md:grid-cols-2 gap-3">
            <select
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value as SortOption)}
              className={selectFieldClass}
              style={nativeSelectStyle}
            >
              <option value="sort_order_asc" className={selectOptionClass}>
                Sortierung: Reihenfolge (aufsteigend)
              </option>
              <option value="sort_order_desc" className={selectOptionClass}>
                Sortierung: Reihenfolge (absteigend)
              </option>
              <option value="brand_asc" className={selectOptionClass}>
                Sortierung: Marke A-Z
              </option>
              <option value="brand_desc" className={selectOptionClass}>
                Sortierung: Marke Z-A
              </option>
              <option value="name_asc" className={selectOptionClass}>
                Sortierung: Modell A-Z
              </option>
              <option value="name_desc" className={selectOptionClass}>
                Sortierung: Modell Z-A
              </option>
              <option value="price_asc" className={selectOptionClass}>
                Sortierung: Preis aufsteigend
              </option>
              <option value="price_desc" className={selectOptionClass}>
                Sortierung: Preis absteigend
              </option>
            </select>

            <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm">
              Treffer: <span className="font-bold">{filteredItems.length}</span> von{' '}
              <span className="font-bold">{items.length}</span>
            </div>
          </div>

          <div className="mb-6 grid md:grid-cols-2 gap-4">
            <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold mb-3">Aktuelle Marken im Bestand</p>
              <div className="flex flex-wrap gap-2">
                {brandSummary.length === 0 && (
                  <span className="text-sm opacity-70">Noch keine Einträge vorhanden.</span>
                )}
                {brandSummary.map(([brand, count]) => (
                  <span
                    key={brand}
                    className="rounded-full border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 text-xs font-semibold"
                  >
                    {brand} ({count})
                  </span>
                ))}
              </div>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold mb-3">Aktuelle Kategorien im Bestand</p>
              <div className="flex flex-wrap gap-2">
                {categorySummary.length === 0 && (
                  <span className="text-sm opacity-70">Noch keine Einträge vorhanden.</span>
                )}
                {categorySummary.map(([category, count]) => (
                  <span
                    key={category}
                    className="rounded-full border border-blue-400/25 bg-blue-500/10 px-3 py-1 text-xs font-semibold"
                  >
                    {CATEGORY_LABELS[category as PriceCategory] ?? category} ({count})
                  </span>
                ))}
              </div>
            </article>
          </div>

          {viewMode === 'grouped' ? (
            <div className="space-y-3">
              {groupedModels.map((group) => (
                <article
                  key={`${group.brand}-${group.model}`}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-wide opacity-70">
                        {group.brand}
                      </p>
                      <h3 className="text-lg font-bold">{group.model}</h3>
                      <p className="text-sm opacity-75 mt-1">
                        Services: {group.serviceCount} · Preisbereich:{' '}
                        {formatPrice(group.minPrice)} bis {formatPrice(group.maxPrice)}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {Array.from(group.categories).map((category) => (
                          <span
                            key={category}
                            className="rounded-full border border-cyan-400/25 bg-cyan-500/10 px-2 py-1 text-[11px] font-semibold"
                          >
                            {CATEGORY_LABELS[category]}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setBrandFilter(group.brand);
                        setSearchTerm(group.model);
                        setCategoryFilter('all');
                        setStatusFilter('all');
                        setViewMode('detailed');
                      }}
                      className="inline-flex items-center gap-2 rounded-xl border border-blue-400/40 bg-blue-500/10 px-4 py-2 text-sm font-semibold"
                    >
                      <Pencil size={14} /> Details bearbeiten
                    </button>
                  </div>
                </article>
              ))}

              {groupedModels.length === 0 && (
                <p className="py-2 text-sm opacity-70">Keine Einträge für diese Filter.</p>
              )}
            </div>
          ) : (
            <>
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left opacity-70 border-b border-white/10">
                      <th className="py-3 pr-3">Produktname</th>
                      <th className="py-3 px-3">Marke</th>
                      <th className="py-3 px-3">Preis</th>
                      <th className="py-3 px-3">Kategorie</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3">Bearbeiten</th>
                      <th className="py-3 pl-3">Aktionen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((item) => {
                      const isEditing = editingIds.includes(item.id);

                      return (
                        <tr key={item.id} className="border-b border-white/10">
                          <td className="py-3 pr-3">
                            <input
                              value={item.product_name}
                              disabled={!isEditing}
                              onChange={(event) =>
                                setField(item.id, 'product_name', event.target.value)
                              }
                              className="w-full rounded-lg border border-white/15 bg-transparent px-3 py-2 disabled:opacity-75"
                            />
                          </td>
                          <td className="py-3 px-3">
                            <input
                              value={item.brand}
                              disabled={!isEditing}
                              onChange={(event) =>
                                setField(item.id, 'brand', event.target.value)
                              }
                              className="w-full rounded-lg border border-white/15 bg-transparent px-3 py-2 disabled:opacity-75"
                            />
                          </td>
                          <td className="py-3 px-3 w-[180px]">
                            <div className="flex items-center gap-2">
                              <input
                                value={item.price}
                                disabled={!isEditing}
                                onChange={(event) => {
                                  const parsed = parsePrice(event.target.value);
                                  if (parsed !== null) {
                                    setField(item.id, 'price', parsed);
                                  }
                                }}
                                className="w-full rounded-lg border border-white/15 bg-transparent px-3 py-2"
                              />
                              <button
                                type="button"
                                onClick={() => setField(item.id, 'price', item.price + 1)}
                                className="rounded-lg border border-white/15 px-2 py-1"
                              >
                                +
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setField(item.id, 'price', Math.max(0, item.price - 1))
                                }
                                className="rounded-lg border border-white/15 px-2 py-1"
                              >
                                -
                              </button>
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <select
                              value={item.category}
                              disabled={!isEditing}
                              onChange={(event) =>
                                setField(
                                  item.id,
                                  'category',
                                  event.target.value as PriceCategory,
                                )
                              }
                              className="rounded-lg border border-white/15 bg-transparent px-3 py-2"
                              style={nativeSelectStyle}
                            >
                              {CATEGORY_OPTIONS.map((category) => (
                                <option
                                  key={category}
                                  value={category}
                                  className={selectOptionClass}
                                >
                                  {CATEGORY_LABELS[category]}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="py-3 px-3">
                            <select
                              value={item.status}
                              disabled={!isEditing}
                              onChange={(event) =>
                                setField(
                                  item.id,
                                  'status',
                                  event.target.value as ProductStatus,
                                )
                              }
                              className="rounded-lg border border-white/15 bg-transparent px-3 py-2"
                              style={nativeSelectStyle}
                            >
                              {STATUS_OPTIONS.map((status) => (
                                <option
                                  key={status}
                                  value={status}
                                  className={selectOptionClass}
                                >
                                  {status}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="py-3 px-3">
                            <button
                              type="button"
                              onClick={() => toggleEdit(item.id)}
                              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2"
                            >
                              <Pencil size={14} /> {isEditing ? 'Fertig' : 'Bearbeiten'}
                            </button>
                          </td>
                          <td className="py-3 pl-3">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => saveItem(item.id)}
                                disabled={
                                  !dirtyIds.includes(item.id) || busyId === item.id
                                }
                                className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-2 text-white disabled:opacity-40"
                              >
                                <Check size={14} /> Speichern
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteItem(item.id)}
                                disabled={busyId === item.id}
                                className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-3 py-2 text-white"
                              >
                                <Trash2 size={14} /> Löschen
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {filteredItems.length === 0 && (
                  <p className="py-4 text-sm opacity-70">
                    Keine Einträge für diese Filter.
                  </p>
                )}
              </div>

              <div className="md:hidden space-y-3">
                {filteredItems.map((item) => {
                  const isEditing = editingIds.includes(item.id);
                  return (
                    <article
                      key={item.id}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <strong>{item.product_name}</strong>
                        <button
                          type="button"
                          onClick={() => toggleEdit(item.id)}
                          className="rounded-lg border border-white/15 px-3 py-1 text-xs"
                        >
                          {isEditing ? 'Fertig' : 'Bearbeiten'}
                        </button>
                      </div>

                      <input
                        value={item.product_name}
                        disabled={!isEditing}
                        onChange={(event) =>
                          setField(item.id, 'product_name', event.target.value)
                        }
                        className="w-full rounded-lg border border-white/15 bg-transparent px-3 py-2"
                      />

                      <input
                        value={item.brand}
                        disabled={!isEditing}
                        onChange={(event) => setField(item.id, 'brand', event.target.value)}
                        className="w-full rounded-lg border border-white/15 bg-transparent px-3 py-2"
                      />

                      <input
                        value={item.price}
                        disabled={!isEditing}
                        onChange={(event) => {
                          const parsed = parsePrice(event.target.value);
                          if (parsed !== null) {
                            setField(item.id, 'price', parsed);
                          }
                        }}
                        className="w-full rounded-lg border border-white/15 bg-transparent px-3 py-2"
                      />

                      <div className="grid grid-cols-2 gap-2">
                        <select
                          value={item.category}
                          disabled={!isEditing}
                          onChange={(event) =>
                            setField(item.id, 'category', event.target.value as PriceCategory)
                          }
                          className="w-full rounded-lg border border-white/15 bg-transparent px-3 py-2"
                          style={nativeSelectStyle}
                        >
                          {CATEGORY_OPTIONS.map((category) => (
                            <option
                              key={category}
                              value={category}
                              className={selectOptionClass}
                            >
                              {CATEGORY_LABELS[category]}
                            </option>
                          ))}
                        </select>

                        <select
                          value={item.status}
                          disabled={!isEditing}
                          onChange={(event) =>
                            setField(item.id, 'status', event.target.value as ProductStatus)
                          }
                          className="w-full rounded-lg border border-white/15 bg-transparent px-3 py-2"
                          style={nativeSelectStyle}
                        >
                          {STATUS_OPTIONS.map((status) => (
                            <option
                              key={status}
                              value={status}
                              className={selectOptionClass}
                            >
                              {status}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setField(item.id, 'price', item.price + 1)}
                          className="rounded-lg border border-white/15 py-2"
                        >
                          + 1€
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setField(item.id, 'price', Math.max(0, item.price - 1))
                          }
                          className="rounded-lg border border-white/15 py-2"
                        >
                          - 1€
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => saveItem(item.id)}
                          className="rounded-lg bg-emerald-600 py-2 text-white text-sm"
                        >
                          Speichern
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteItem(item.id)}
                          className="rounded-lg bg-red-600 py-2 text-white text-sm"
                        >
                          Löschen
                        </button>
                      </div>
                    </article>
                  );
                })}

                {filteredItems.length === 0 && (
                  <p className="py-2 text-sm opacity-70">Keine Einträge für diese Filter.</p>
                )}
              </div>
            </>
          )}
        </section>

        <section className={`rounded-3xl border p-6 ${panelClass}`}>
          <h2 className="text-xl font-bold">Neues Produkt anlegen</h2>
          <form className="mt-5 grid md:grid-cols-2 gap-4" onSubmit={createItem}>
            <input
              value={newProduct.product_name}
              onChange={(event) =>
                setNewProduct((current) => ({
                  ...current,
                  product_name: event.target.value,
                }))
              }
              placeholder="Produktname / Dienstleistung"
              className={fieldClass}
            />
            <input
              value={newProduct.brand}
              onChange={(event) =>
                setNewProduct((current) => ({...current, brand: event.target.value}))
              }
              placeholder="Kategorie / Marke"
              className={fieldClass}
            />
            <input
              value={newProduct.price}
              onChange={(event) =>
                setNewProduct((current) => ({...current, price: event.target.value}))
              }
              placeholder="Preis z. B. 129.90"
              className={fieldClass}
            />
            <select
              value={newProduct.category}
              onChange={(event) =>
                setNewProduct((current) => ({
                  ...current,
                  category: event.target.value as PriceCategory,
                }))
              }
              className={selectFieldClass}
              style={nativeSelectStyle}
            >
              {CATEGORY_OPTIONS.map((category) => (
                <option key={category} value={category} className={selectOptionClass}>
                  {CATEGORY_LABELS[category]}
                </option>
              ))}
            </select>
            <select
              value={newProduct.status}
              onChange={(event) =>
                setNewProduct((current) => ({
                  ...current,
                  status: event.target.value as ProductStatus,
                }))
              }
              className={selectFieldClass}
              style={nativeSelectStyle}
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status} className={selectOptionClass}>
                  {status}
                </option>
              ))}
            </select>
            <input
              value={newProduct.sort_order}
              onChange={(event) =>
                setNewProduct((current) => ({
                  ...current,
                  sort_order: event.target.value,
                }))
              }
              placeholder="Sortierung"
              className={fieldClass}
            />

            <div className="md:col-span-2 grid md:grid-cols-2 gap-4">
              <input
                value={newProduct.prefix}
                onChange={(event) =>
                  setNewProduct((current) => ({...current, prefix: event.target.value}))
                }
                placeholder="Preis-Prefix (optional, z. B. ab ca.)"
                className={fieldClass}
              />
              <input
                value={newProduct.note}
                onChange={(event) =>
                  setNewProduct((current) => ({...current, note: event.target.value}))
                }
                placeholder="Notiz (optional)"
                className={fieldClass}
              />
            </div>

            <div className="md:col-span-2 flex items-center justify-between gap-3">
              <p className="text-sm opacity-75">
                Vorschau: {newProduct.price ? formatPrice(Number(newProduct.price) || 0) : '—'}
              </p>
              <button
                type="submit"
                disabled={busyId === 'new'}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-bold text-white"
              >
                <Plus size={16} /> {busyId === 'new' ? 'Speichern...' : 'Produkt anlegen'}
              </button>
            </div>
          </form>
        </section>

        {(toast || error) && (
          <section className={`rounded-2xl border p-4 ${panelClass}`}>
            {toast && <p className="text-emerald-400 text-sm">{toast}</p>}
            {error && <p className="text-red-400 text-sm">{error}</p>}
          </section>
        )}
      </div>
    </main>
  );
}
