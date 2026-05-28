import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';
import {
  ADMIN_SESSION_COOKIE,
  requireAdminSessionFromCookie,
} from '@/lib/adminAuth';
import {
  createPrice,
  createPricesBulk,
  deletePrice,
  listPrices,
  updatePrice,
} from '@/lib/supabaseAdmin';
import {getDefaultServicePrices} from '@/lib/defaultServicePrices';
import {normalizeBrandKey} from '@/lib/pricingCatalog';
import type {PriceCategory, PriceRecordInput, ProductStatus} from '@/types/pricing';

const ALLOWED_CATEGORIES: PriceCategory[] = [
  'original',
  'premium',
  'standard',
  'akku',
  'display',
  'diagnose',
  'other',
];

const ALLOWED_STATUS: ProductStatus[] = ['active', 'inactive'];

function parseNumber(value: unknown) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return null;
  }

  return Math.round(number * 100) / 100;
}

function isDuplicateRecord(
  existing: {id: string; brand: string; product_name: string; category: string}[],
  target: {id?: string; brand: string; product_name: string; category: string},
) {
  return existing.some((item) => {
    if (target.id && item.id === target.id) {
      return false;
    }

    return (
      item.brand === target.brand &&
      item.product_name.toLowerCase() === target.product_name.toLowerCase() &&
      item.category === target.category
    );
  });
}

function normalizePayload(payload: Partial<PriceRecordInput>) {
  const parsedPrice = parseNumber(payload.price);

  if (
    !payload.product_name?.trim() ||
    !payload.brand?.trim() ||
    !payload.category ||
    parsedPrice === null
  ) {
    throw new Error('INVALID_PAYLOAD');
  }

  if (!ALLOWED_CATEGORIES.includes(payload.category)) {
    throw new Error('INVALID_CATEGORY');
  }

  const status = payload.status ?? 'active';

  if (!ALLOWED_STATUS.includes(status)) {
    throw new Error('INVALID_STATUS');
  }

  return {
    product_name: payload.product_name.trim(),
    brand: normalizeBrandKey(payload.brand),
    category: payload.category,
    price: parsedPrice,
    status,
    note: payload.note?.trim() || null,
    prefix: payload.prefix?.trim() || null,
    sort_order: parseNumber(payload.sort_order) ?? 0,
  } satisfies PriceRecordInput;
}

async function authorize() {
  const token = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;

  try {
    return await requireAdminSessionFromCookie(token);
  } catch {
    throw new Error('UNAUTHORIZED');
  }
}

export async function GET() {
  try {
    await authorize();
    let prices = await listPrices(true);

    if (prices.length === 0) {
      await createPricesBulk(getDefaultServicePrices());
      prices = await listPrices(true);
    }

    return NextResponse.json({
      items: prices,
      stats: {
        total: prices.length,
        active: prices.filter((item) => item.status === 'active').length,
        inactive: prices.filter((item) => item.status === 'inactive').length,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({error: 'Nicht autorisiert.'}, {status: 401});
    }

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

export async function POST(request: Request) {
  try {
    await authorize();
    const body = (await request.json()) as Partial<PriceRecordInput>;
    const payload = normalizePayload(body);

    const existing = await listPrices(true);
    if (
      isDuplicateRecord(existing, {
        brand: payload.brand,
        product_name: payload.product_name,
        category: payload.category,
      })
    ) {
      return NextResponse.json(
        {
          error:
            'Dieses Modell mit dieser Service-Kategorie existiert bereits für die Marke.',
        },
        {status: 409},
      );
    }

    const created = await createPrice(payload);

    return NextResponse.json({item: created, message: 'Produkt wurde angelegt.'});
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({error: 'Nicht autorisiert.'}, {status: 401});
    }

    if (
      error instanceof Error &&
      ['INVALID_PAYLOAD', 'INVALID_CATEGORY', 'INVALID_STATUS'].includes(
        error.message,
      )
    ) {
      return NextResponse.json(
        {error: 'Ungültige Eingaben. Bitte Felder prüfen.'},
        {status: 400},
      );
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Produkt konnte nicht erstellt werden.',
      },
      {status: 500},
    );
  }
}

export async function PATCH(request: Request) {
  try {
    await authorize();
    const body = (await request.json()) as Partial<PriceRecordInput> & {id?: string};

    if (!body.id) {
      return NextResponse.json({error: 'ID fehlt.'}, {status: 400});
    }

    const patch: Partial<PriceRecordInput> = {};

    if (body.product_name !== undefined) patch.product_name = body.product_name;
    if (body.brand !== undefined) patch.brand = body.brand;
    if (body.category !== undefined) patch.category = body.category;
    if (body.price !== undefined) patch.price = parseNumber(body.price) ?? undefined;
    if (body.status !== undefined) patch.status = body.status;
    if (body.note !== undefined) patch.note = body.note;
    if (body.prefix !== undefined) patch.prefix = body.prefix;
    if (body.sort_order !== undefined)
      patch.sort_order = parseNumber(body.sort_order) ?? undefined;

    const normalized = {
      ...(patch.product_name !== undefined
        ? {product_name: patch.product_name.trim()}
        : {}),
      ...(patch.brand !== undefined ? {brand: normalizeBrandKey(patch.brand)} : {}),
      ...(patch.category !== undefined ? {category: patch.category} : {}),
      ...(patch.price !== undefined ? {price: patch.price} : {}),
      ...(patch.status !== undefined ? {status: patch.status} : {}),
      ...(patch.note !== undefined ? {note: patch.note?.trim() || null} : {}),
      ...(patch.prefix !== undefined ? {prefix: patch.prefix?.trim() || null} : {}),
      ...(patch.sort_order !== undefined ? {sort_order: patch.sort_order} : {}),
    } as Partial<PriceRecordInput>;

    if (
      normalized.category !== undefined &&
      !ALLOWED_CATEGORIES.includes(normalized.category)
    ) {
      return NextResponse.json({error: 'Ungültige Kategorie.'}, {status: 400});
    }

    if (
      normalized.status !== undefined &&
      !ALLOWED_STATUS.includes(normalized.status)
    ) {
      return NextResponse.json({error: 'Ungültiger Status.'}, {status: 400});
    }

    if (normalized.price !== undefined && !Number.isFinite(normalized.price)) {
      return NextResponse.json({error: 'Ungültiger Preis.'}, {status: 400});
    }

    const existing = await listPrices(true);
    const current = existing.find((item) => item.id === body.id);

    if (!current) {
      return NextResponse.json({error: 'Produkt nicht gefunden.'}, {status: 404});
    }

    const target = {
      id: body.id,
      brand: normalized.brand ?? current.brand,
      product_name: normalized.product_name ?? current.product_name,
      category: normalized.category ?? current.category,
    };

    if (isDuplicateRecord(existing, target)) {
      return NextResponse.json(
        {
          error:
            'Diese Kombination aus Marke, Modell und Service existiert bereits.',
        },
        {status: 409},
      );
    }

    const updated = await updatePrice(body.id, normalized);

    return NextResponse.json({item: updated, message: 'Produkt wurde aktualisiert.'});
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({error: 'Nicht autorisiert.'}, {status: 401});
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Produkt konnte nicht aktualisiert werden.',
      },
      {status: 500},
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await authorize();
    const {searchParams} = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({error: 'ID fehlt.'}, {status: 400});
    }

    await deletePrice(id);

    return NextResponse.json({success: true, message: 'Produkt wurde gelöscht.'});
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({error: 'Nicht autorisiert.'}, {status: 401});
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Produkt konnte nicht gelöscht werden.',
      },
      {status: 500},
    );
  }
}
