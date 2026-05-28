import type {PriceRecord, PriceRecordInput} from '@/types/pricing';

const TABLE = 'service_prices';

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getBaseUrl() {
  const url = getRequiredEnv('SUPABASE_URL');

  if (url.includes('your-project-ref.supabase.co')) {
    throw new Error(
      'Bitte SUPABASE_URL in .env.local mit deiner echten Projekt-URL setzen.',
    );
  }

  return `${url.replace(/\/$/, '')}/rest/v1`;
}

function getHeaders(prefer?: string) {
  const serviceRoleKey = getRequiredEnv('SUPABASE_SERVICE_ROLE_KEY');

  if (serviceRoleKey === 'your-service-role-key') {
    throw new Error(
      'Bitte SUPABASE_SERVICE_ROLE_KEY in .env.local mit deinem echten Key setzen.',
    );
  }

  return {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    'Content-Type': 'application/json',
    ...(prefer ? {Prefer: prefer} : {}),
  };
}

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Supabase request failed (${response.status}): ${body}`);
  }

  if (response.status === 204) {
    return [] as T;
  }

  return (await response.json()) as T;
}

function encodeFilter(value: string) {
  return encodeURIComponent(value);
}

export async function listPrices(includeInactive = true) {
  const statusFilter = includeInactive ? '' : '&status=eq.active';
  const url = `${getBaseUrl()}/${TABLE}?select=*&order=sort_order.asc.nullslast,product_name.asc,category.asc${statusFilter}`;
  const response = await fetch(url, {
    headers: getHeaders(),
    cache: 'no-store',
  });

  return parseResponse<PriceRecord[]>(response);
}

export async function createPrice(input: PriceRecordInput) {
  const url = `${getBaseUrl()}/${TABLE}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: getHeaders('return=representation'),
    body: JSON.stringify([
      {
        ...input,
        status: input.status ?? 'active',
      },
    ]),
  });

  const rows = await parseResponse<PriceRecord[]>(response);
  return rows[0];
}

export async function createPricesBulk(inputs: PriceRecordInput[]) {
  if (inputs.length === 0) {
    return [] as PriceRecord[];
  }

  const normalizedRows = inputs.map((input) => ({
    product_name: input.product_name,
    brand: input.brand,
    category: input.category,
    price: input.price,
    status: input.status ?? 'active',
    note: input.note ?? null,
    prefix: input.prefix ?? null,
    sort_order: input.sort_order ?? 0,
  }));

  const url = `${getBaseUrl()}/${TABLE}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: getHeaders('return=representation'),
    body: JSON.stringify(normalizedRows),
  });

  return parseResponse<PriceRecord[]>(response);
}

export async function updatePrice(id: string, patch: Partial<PriceRecordInput>) {
  const url = `${getBaseUrl()}/${TABLE}?id=eq.${encodeFilter(id)}`;
  const response = await fetch(url, {
    method: 'PATCH',
    headers: getHeaders('return=representation'),
    body: JSON.stringify(patch),
  });

  const rows = await parseResponse<PriceRecord[]>(response);
  return rows[0];
}

export async function deletePrice(id: string) {
  const url = `${getBaseUrl()}/${TABLE}?id=eq.${encodeFilter(id)}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: getHeaders(),
  });

  await parseResponse<PriceRecord[]>(response);
}
