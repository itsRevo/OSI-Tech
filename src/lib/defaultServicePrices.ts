import type {PriceRecordInput} from '@/types/pricing';

type AppleSeed = {
  model: string;
  standard: number;
  premium: number;
  original: number;
  akku: number;
};

type SamsungSeed = {
  model: string;
  display: number;
  prefix?: string;
  note?: string;
};

const APPLE_SEED: AppleSeed[] = [
  {model: 'iPhone X', standard: 89.9, premium: 129.9, original: 169.9, akku: 69.9},
  {model: 'iPhone XR', standard: 89.9, premium: 129.9, original: 159.9, akku: 69.9},
  {model: 'iPhone XS', standard: 89.9, premium: 129.9, original: 179.9, akku: 69.9},
  {model: 'iPhone XS MAX', standard: 99.9, premium: 129.9, original: 189.9, akku: 69.9},
  {model: 'iPhone 11', standard: 89.9, premium: 129.9, original: 159.9, akku: 69.9},
  {model: 'iPhone 11 Pro', standard: 89.9, premium: 139.9, original: 189.9, akku: 79.9},
  {model: 'iPhone 11 Pro Max', standard: 99.9, premium: 139.9, original: 219.9, akku: 79.9},
  {model: 'iPhone 12', standard: 99.9, premium: 139.9, original: 199.9, akku: 79.9},
  {model: 'iPhone 12 mini', standard: 99.9, premium: 159.9, original: 199.9, akku: 79.9},
  {model: 'iPhone 12 pro', standard: 99.9, premium: 149.9, original: 199.9, akku: 79.9},
  {model: 'iPhone 12 Pro Max', standard: 109.9, premium: 149.9, original: 279.9, akku: 79.9},
  {model: 'iPhone 13', standard: 99.9, premium: 149.9, original: 209.9, akku: 79.9},
  {model: 'iPhone 13 mini', standard: 109.9, premium: 229.9, original: 269.9, akku: 79.9},
  {model: 'iPhone 13 pro', standard: 99.9, premium: 149.9, original: 249.9, akku: 79.9},
  {model: 'iPhone 13 pro Max', standard: 99.9, premium: 149.9, original: 289.9, akku: 79.9},
  {model: 'iPhone 14', standard: 99.9, premium: 149.9, original: 219.9, akku: 79.9},
  {model: 'iPhone 14 Plus', standard: 99.9, premium: 149.9, original: 259.9, akku: 79.9},
  {model: 'iPhone 14 Pro', standard: 109.9, premium: 189.9, original: 339.9, akku: 79.9},
  {model: 'iPhone 14 Pro Max', standard: 119.9, premium: 169.9, original: 409.9, akku: 79.9},
  {model: 'iPhone 15', standard: 99.9, premium: 179.9, original: 309.9, akku: 79.9},
  {model: 'iPhone 15 Plus', standard: 99.9, premium: 169.9, original: 299.9, akku: 79.9},
  {model: 'iPhone 15 Pro', standard: 109.9, premium: 179.9, original: 409.9, akku: 79.9},
  {model: 'iPhone 15 Pro Max', standard: 119.9, premium: 169.9, original: 429.9, akku: 79.9},
  {model: 'iPhone 16', standard: 119.9, premium: 189.9, original: 329.9, akku: 84.9},
  {model: 'iPhone 16 Plus', standard: 119.9, premium: 179.9, original: 319.9, akku: 84.9},
  {model: 'iPhone 16 Pro', standard: 129.9, premium: 199.9, original: 419.9, akku: 84.9},
  {model: 'iPhone 16 Pro Max', standard: 159.9, premium: 209.9, original: 479.9, akku: 84.9},
  {model: 'iPhone 16 e', standard: 99.9, premium: 149.9, original: 269.9, akku: 89.9},
];

const SAMSUNG_SEED: SamsungSeed[] = [
  {model: 'Samsung Galaxy S26', display: 259.9, note: 'Circa-Angabe'},
  {model: 'Samsung Galaxy S26 Plus', display: 299.9, note: 'Circa-Angabe'},
  {
    model: 'Samsung Galaxy S26 Ultra',
    display: 259.9,
    prefix: 'ab ca.',
    note: 'Je nach Farbe kann der Preis variieren.',
  },
  {
    model: 'Samsung Galaxy S25',
    display: 219.9,
    prefix: 'ab ca.',
    note: 'Je nach Farbe kann der Preis variieren.',
  },
  {model: 'Samsung Galaxy S25 FE', display: 169.9, note: 'Circa-Angabe'},
  {model: 'Samsung Galaxy S25 Edge', display: 299.9, note: 'Circa-Angabe'},
  {
    model: 'Samsung Galaxy S25 Plus',
    display: 239.9,
    prefix: 'ab ca.',
    note: 'Je nach Farbe kann der Preis variieren.',
  },
  {model: 'Samsung Galaxy S25 Ultra', display: 309.9, note: 'Circa-Angabe'},
  {model: 'Samsung Galaxy S24 FE', display: 189.9, note: 'Circa-Angabe'},
  {
    model: 'Samsung Galaxy S24',
    display: 224.9,
    prefix: 'ab ca.',
    note: 'Je nach Farbe kann der Preis variieren.',
  },
  {
    model: 'Samsung Galaxy S24 Plus',
    display: 249.9,
    prefix: 'ab ca.',
    note: 'Je nach Farbe kann der Preis variieren.',
  },
  {model: 'Samsung Galaxy S24 Ultra', display: 309.9, note: 'Circa-Angabe'},
];

export function getDefaultServicePrices(): PriceRecordInput[] {
  const items: PriceRecordInput[] = [];

  APPLE_SEED.forEach((entry, index) => {
    const sortOrder = index + 1;

    items.push(
      {
        product_name: entry.model,
        brand: 'apple',
        category: 'original',
        price: entry.original,
        status: 'active',
        sort_order: sortOrder,
      },
      {
        product_name: entry.model,
        brand: 'apple',
        category: 'premium',
        price: entry.premium,
        status: 'active',
        sort_order: sortOrder,
      },
      {
        product_name: entry.model,
        brand: 'apple',
        category: 'standard',
        price: entry.standard,
        status: 'active',
        sort_order: sortOrder,
      },
      {
        product_name: entry.model,
        brand: 'apple',
        category: 'akku',
        price: entry.akku,
        status: 'active',
        sort_order: sortOrder,
      },
    );
  });

  SAMSUNG_SEED.forEach((entry, index) => {
    items.push({
      product_name: entry.model,
      brand: 'samsung',
      category: 'display',
      price: entry.display,
      status: 'active',
      note: entry.note ?? null,
      prefix: entry.prefix ?? null,
      sort_order: index + 1,
    });
  });

  return items;
}
