import {NextResponse} from 'next/server';
import {listPrices} from '@/lib/supabaseAdmin';
import {buildPricingCatalog} from '@/lib/pricingCatalog';
import {getDefaultServicePrices} from '@/lib/defaultServicePrices';
import type {PriceRecord} from '@/types/pricing';

export async function GET() {
  try {
    const items = await listPrices(false);
    const catalog = buildPricingCatalog(items);

    return NextResponse.json({
      items,
      catalog,
    });
  } catch (error) {
    const fallbackItems = getDefaultServicePrices().map((item) => {
      const now = new Date().toISOString();
      const id = `${item.brand}:${item.product_name}:${item.category}`;

      return {
        id,
        product_name: item.product_name,
        brand: item.brand,
        category: item.category,
        price: item.price,
        status: item.status ?? 'active',
        note: item.note ?? null,
        prefix: item.prefix ?? null,
        sort_order: item.sort_order ?? 0,
        created_at: now,
        updated_at: now,
      } satisfies PriceRecord;
    });

    const fallbackCatalog = buildPricingCatalog(fallbackItems);

    return NextResponse.json({
      items: fallbackItems,
      catalog: fallbackCatalog,
      fallback: true,
      error:
        error instanceof Error
          ? error.message
          : 'Preise konnten nicht geladen werden.',
    });
  }
}
