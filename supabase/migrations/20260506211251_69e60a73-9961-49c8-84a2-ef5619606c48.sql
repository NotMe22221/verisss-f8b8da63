create table public.early_access_signups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  team text,
  created_at timestamptz not null default now()
);
create unique index early_access_signups_email_key on public.early_access_signups (lower(email));
alter table public.early_access_signups enable row level security;
create policy "anyone can signup" on public.early_access_signups for insert to anon, authenticated with check (true);
