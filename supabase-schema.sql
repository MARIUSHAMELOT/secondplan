-- Activer l'extension UUID
create extension if not exists "uuid-ossp";

-- Table des profils architectes
create table if not exists architect_profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  title text,
  city text,
  bio text,
  photo_url text,
  expertises text[] default '{}',
  services text[] default '{}',
  availability_notes text,
  starting_price integer,
  verified boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Table des photos de réalisations
create table if not exists architect_photos (
  id uuid primary key default uuid_generate_v4(),
  architect_id uuid references architect_profiles(id) on delete cascade,
  url text not null,
  caption text,
  created_at timestamp with time zone default now()
);

-- Activer RLS
alter table architect_profiles enable row level security;
alter table architect_photos enable row level security;

-- Policies : lecture publique
create policy "Profils visibles publiquement"
  on architect_profiles for select
  using (true);

create policy "Photos visibles publiquement"
  on architect_photos for select
  using (true);

-- Policies : écriture uniquement par le propriétaire
create policy "Architecte peut modifier son profil"
  on architect_profiles for all
  using (auth.uid() = user_id);

create policy "Architecte peut gérer ses photos"
  on architect_photos for all
  using (
    architect_id in (
      select id from architect_profiles where user_id = auth.uid()
    )
  );

-- Storage bucket pour les photos
insert into storage.buckets (id, name, public)
values ('architect-photos', 'architect-photos', true)
on conflict do nothing;

-- Policy storage
create policy "Photos publiques en lecture"
  on storage.objects for select
  using (bucket_id = 'architect-photos');

create policy "Architectes peuvent uploader"
  on storage.objects for insert
  with check (bucket_id = 'architect-photos' and auth.role() = 'authenticated');
