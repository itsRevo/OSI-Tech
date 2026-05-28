export type ProductStatus = 'active' | 'inactive';

export type BrandKey = 'apple' | 'samsung' | 'other';

export type PriceCategory =
  | 'original'
  | 'premium'
  | 'standard'
  | 'akku'
  | 'display'
  | 'diagnose'
  | 'other';

export type PriceRecord = {
  id: string;
  product_name: string;
  brand: string;
  category: PriceCategory;
  price: number;
  status: ProductStatus;
  note: string | null;
  prefix: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type PriceRecordInput = {
  product_name: string;
  brand: string;
  category: PriceCategory;
  price: number;
  status?: ProductStatus;
  note?: string | null;
  prefix?: string | null;
  sort_order?: number;
};

export type PricingCatalogService = {
  id: string;
  type: PriceCategory;
  type_label: string;
  price: number;
  status: ProductStatus;
  note: string | null;
  prefix: string | null;
};

export type PricingCatalogModel = {
  model: string;
  sort_order: number;
  services: PricingCatalogService[];
};

export type PricingCatalogBrand = {
  key: BrandKey;
  label: string;
  models: PricingCatalogModel[];
};

export const CATEGORY_LABELS: Record<PriceCategory, string> = {
  original: 'Original Qualität',
  premium: 'Premium Qualität',
  standard: 'Standard Qualität',
  akku: 'Akku-Austausch',
  display: 'Display-Reparatur',
  diagnose: 'Diagnose',
  other: 'Sonstiges',
};
