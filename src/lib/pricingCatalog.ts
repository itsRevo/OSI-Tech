import {
  CATEGORY_LABELS,
  type BrandKey,
  type PriceRecord,
  type PricingCatalogBrand,
} from '@/types/pricing';

const BRAND_LABELS: Record<BrandKey, string> = {
  apple: 'Apple',
  samsung: 'Samsung',
  other: 'Andere',
};

export function normalizeBrandKey(rawBrand: string): BrandKey {
  const normalized = rawBrand.trim().toLowerCase();

  if (normalized === 'apple' || normalized.includes('iphone')) {
    return 'apple';
  }

  if (normalized === 'samsung' || normalized.includes('galaxy')) {
    return 'samsung';
  }

  return 'other';
}

export function buildPricingCatalog(items: PriceRecord[]): PricingCatalogBrand[] {
  const brandBuckets = new Map<BrandKey, Map<string, PriceRecord[]>>();

  items
    .filter((item) => item.status === 'active')
    .forEach((item) => {
      const brandKey = normalizeBrandKey(item.brand);

      if (!brandBuckets.has(brandKey)) {
        brandBuckets.set(brandKey, new Map());
      }

      const modelBucket = brandBuckets.get(brandKey)!;
      if (!modelBucket.has(item.product_name)) {
        modelBucket.set(item.product_name, []);
      }

      modelBucket.get(item.product_name)!.push(item);
    });

  return (['apple', 'samsung', 'other'] as BrandKey[]).map((brandKey) => {
    const modelMap = brandBuckets.get(brandKey) ?? new Map<string, PriceRecord[]>();

    const models = Array.from(modelMap.entries())
      .map(([model, services]) => ({
        model,
        sort_order:
          services
            .map((service) => service.sort_order)
            .sort((a, b) => a - b)[0] ?? 0,
        services: services
          .slice()
          .sort((a, b) => a.category.localeCompare(b.category))
          .map((service) => ({
            id: service.id,
            type: service.category,
            type_label: CATEGORY_LABELS[service.category],
            price: service.price,
            status: service.status,
            note: service.note,
            prefix: service.prefix,
          })),
      }))
      .sort((a, b) => {
        if (a.sort_order !== b.sort_order) {
          return a.sort_order - b.sort_order;
        }

        return a.model.localeCompare(b.model);
      });

    return {
      key: brandKey,
      label: BRAND_LABELS[brandKey],
      models,
    };
  });
}
