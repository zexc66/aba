-- AIABASD collaboration platform v1
-- Organizations, memberships, rooms, documents, tasks, activity log.
-- Every table has RLS enabled; access is org-membership scoped.
-- Storage: private bucket room-documents, path convention {room_uuid}/{filename}.

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  locale text not null default 'en' check (locale in ('en','ar','fr')),
  created_at timestamptz not null default now()
);

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 160),
  slug text not null unique check (slug ~ '^[a-z0-9-]{2,60}$'),
  created_at timestamptz not null default now()
);

create table public.memberships (
  org_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member' check (role in ('owner','coordinator','member')),
  status text not null default 'active' check (status in ('invited','active')),
  created_at timestamptz not null default now(),
  primary key (org_id, user_id)
);

create table public.org_invites (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  email text not null check (email ~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'),
  role text not null default 'member' check (role in ('coordinator','member')),
  token uuid not null default gen_random_uuid(),
  invited_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  accepted_at timestamptz,
  unique (org_id, email)
);

create table public.rooms (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  project_slug text not null check (project_slug ~ '^[a-z0-9-]{2,80}$'),
  title text not null check (char_length(title) between 2 and 160),
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  unique (org_id, project_slug)
);

create table public.room_members (
  room_id uuid not null references public.rooms(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  added_at timestamptz not null default now(),
  primary key (room_id, user_id)
);

create table public.documents (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms(id) on delete cascade,
  storage_path text not null unique,
  title text not null check (char_length(title) between 1 and 200),
  uploaded_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 300),
  status text not null default 'open' check (status in ('open','in-progress','done')),
  due_date date,
  assignee uuid references auth.users(id),
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table public.activity_log (
  id bigint generated always as identity primary key,
  room_id uuid not null references public.rooms(id) on delete cascade,
  actor uuid references auth.users(id),
  action text not null check (action ~ '^[a-z-]{2,40}$'),
  detail text not null default '' check (char_length(detail) <= 500),
  at timestamptz not null default now()
);

create index activity_room_idx on public.activity_log (room_id, at desc);
create index tasks_room_idx on public.tasks (room_id, status);
create index documents_room_idx on public.documents (room_id);

-- ── Access helpers (security definer avoids RLS recursion) ────────────────

create function public.is_org_member(org uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.memberships
    where org_id = org and user_id = auth.uid() and status = 'active'
  );
$$;

create function public.org_role(org uuid) returns text
language sql stable security definer set search_path = public as $$
  select role from public.memberships
  where org_id = org and user_id = auth.uid() and status = 'active'
$$;

create function public.room_of_path(path text) returns uuid
language plpgsql stable as $$
declare result uuid;
begin
  begin result := ((storage.foldername(path))[1])::uuid;
  exception when others then result := null;
  end;
  return result;
end; $$;

create function public.is_room_member(room uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.rooms r
    join public.room_members rm on rm.room_id = r.id
    where r.id = room and rm.user_id = auth.uid()
  );
$$;

-- ── Triggers: profile + org-owner bootstrap ───────────────────────────────

create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name',''));
  return new;
end; $$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create function public.handle_new_org() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.memberships (org_id, user_id, role, status)
  values (new.id, auth.uid(), 'owner', 'active');
  return new;
end; $$;

create trigger on_org_created
after insert on public.organizations
for each row execute function public.handle_new_org();

-- ── Row Level Security ────────────────────────────────────────────────────

alter table public.profiles enable row level security;
create policy "profiles select own" on public.profiles for select using (auth.uid() = id);
create policy "profiles insert own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles update own" on public.profiles for update using (auth.uid() = id);

alter table public.organizations enable row level security;
create policy "orgs select member" on public.organizations for select using (public.is_org_member(id));
create policy "orgs insert authenticated" on public.organizations for insert to authenticated with check (true);

alter table public.memberships enable row level security;
create policy "memberships select own or org" on public.memberships for select using (
  user_id = auth.uid() or public.is_org_member(org_id)
);
create policy "memberships manage coordinator" on public.memberships for all using (
  public.org_role(org_id) in ('owner','coordinator')
) with check (
  public.org_role(org_id) in ('owner','coordinator')
);

alter table public.org_invites enable row level security;
-- No policies: invites are created and consumed only server-side (service role).

alter table public.rooms enable row level security;
create policy "rooms select org member" on public.rooms for select using (public.is_org_member(org_id));
create policy "rooms write coordinator" on public.rooms for all using (
  public.org_role(org_id) in ('owner','coordinator')
) with check (
  public.org_role(org_id) in ('owner','coordinator')
);

alter table public.room_members enable row level security;
create policy "room_members select org member" on public.room_members for select using (
  exists (select 1 from public.rooms r where r.id = room_id and public.is_org_member(r.org_id))
);
create policy "room_members write coordinator" on public.room_members for all using (
  exists (select 1 from public.rooms r where r.id = room_id and public.org_role(r.org_id) in ('owner','coordinator'))
) with check (
  exists (select 1 from public.rooms r where r.id = room_id and public.org_role(r.org_id) in ('owner','coordinator'))
);

alter table public.documents enable row level security;
create policy "documents select room member" on public.documents for select using (
  exists (select 1 from public.rooms r where r.id = room_id and (public.is_org_member(r.org_id) or public.is_room_member(r.id)))
);
create policy "documents insert room member" on public.documents for insert with check (
  exists (select 1 from public.rooms r where r.id = room_id and (public.is_org_member(r.org_id) or public.is_room_member(r.id)))
);
create policy "documents delete uploader or coordinator" on public.documents for delete using (
  uploaded_by = auth.uid()
  or exists (select 1 from public.rooms r where r.id = room_id and public.org_role(r.org_id) in ('owner','coordinator'))
);

alter table public.tasks enable row level security;
create policy "tasks select room member" on public.tasks for select using (
  exists (select 1 from public.rooms r where r.id = room_id and (public.is_org_member(r.org_id) or public.is_room_member(r.id)))
);
create policy "tasks insert room member" on public.tasks for insert with check (
  exists (select 1 from public.rooms r where r.id = room_id and (public.is_org_member(r.org_id) or public.is_room_member(r.id)))
);
create policy "tasks update room member" on public.tasks for update using (
  exists (select 1 from public.rooms r where r.id = room_id and (public.is_org_member(r.org_id) or public.is_room_member(r.id)))
);
create policy "tasks delete creator or coordinator" on public.tasks for delete using (
  created_by = auth.uid()
  or exists (select 1 from public.rooms r where r.id = room_id and public.org_role(r.org_id) in ('owner','coordinator'))
);

alter table public.activity_log enable row level security;
create policy "activity select room member" on public.activity_log for select using (
  exists (select 1 from public.rooms r where r.id = room_id and (public.is_org_member(r.org_id) or public.is_room_member(r.id)))
);
create policy "activity insert room member" on public.activity_log for insert with check (
  exists (select 1 from public.rooms r where r.id = room_id and (public.is_org_member(r.org_id) or public.is_room_member(r.id)))
);
-- Append-only: no update or delete policies on purpose.

-- ── Storage: private documents bucket ─────────────────────────────────────

insert into storage.buckets (id, name, public)
values ('room-documents', 'room-documents', false)
on conflict (id) do nothing;

create policy "room docs read" on storage.objects for select using (
  bucket_id = 'room-documents'
  and exists (
    select 1 from public.rooms r
    where r.id = public.room_of_path(name)
      and (public.is_org_member(r.org_id) or public.is_room_member(r.id))
  )
);

create policy "room docs upload" on storage.objects for insert to authenticated with check (
  bucket_id = 'room-documents'
  and exists (
    select 1 from public.rooms r
    where r.id = public.room_of_path(name)
      and (public.is_org_member(r.org_id) or public.is_room_member(r.id))
  )
);

create policy "room docs delete own or coordinator" on storage.objects for delete to authenticated using (
  bucket_id = 'room-documents'
  and exists (
    select 1 from public.rooms r
    where r.id = public.room_of_path(name)
      and (r.created_by = auth.uid() or public.org_role(r.org_id) in ('owner','coordinator'))
  )
);
