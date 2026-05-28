create extension if not exists pgcrypto;

create table if not exists public.service_prices (
  id uuid primary key default gen_random_uuid(),
  product_name text not null,
  brand text not null,
  category text not null check (
    category in ('original', 'premium', 'standard', 'akku', 'display', 'diagnose', 'other')
  ),
  price numeric(10,2) not null check (price >= 0),
  status text not null default 'active' check (status in ('active', 'inactive')),
  note text,
  prefix text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists service_prices_brand_idx
  on public.service_prices(brand);

create index if not exists service_prices_status_idx
  on public.service_prices(status);

create index if not exists service_prices_sort_idx
  on public.service_prices(sort_order, product_name);

create unique index if not exists service_prices_unique_brand_model_category_idx
  on public.service_prices(lower(brand), lower(product_name), category);

create or replace function public.touch_updated_at_service_prices()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_service_prices_updated_at on public.service_prices;

create trigger trg_service_prices_updated_at
before update on public.service_prices
for each row execute function public.touch_updated_at_service_prices();
