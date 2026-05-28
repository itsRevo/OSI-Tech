import {NextResponse} from 'next/server';
import {listPrices} from '@/lib/supabaseAdmin';
import {buildPricingCatalog} from '@/lib/pricingCatalog';

export async function GET() {
  try {
    const items = await listPrices(false);
    const catalog = buildPricingCatalog(items);

    return NextResponse.json({
      items,
      catalog,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Preise konnten nicht geladen werden.',
      },
      {status: 500},
    );
  }
}
