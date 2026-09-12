-- Restrict organization creation: AIABASD operates a single platform org.
-- Orgs are provisioned server-side (service role); members join by invitation.
-- The bootstrap trigger only fires for interactive signups (auth.uid() set),
-- so server-side inserts do not fail on a null owner.

drop policy if exists "orgs insert authenticated" on public.organizations;

create or replace function public.handle_new_org() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then
    return new;
  end if;
  insert into public.memberships (org_id, user_id, role, status)
  values (new.id, auth.uid(), 'owner', 'active');
  return new;
end; $$;

-- Platform org (idempotent; owner membership is attached after first sign-in).
insert into public.organizations (name, slug)
values ('AIABASD — African International Alliance for Business & Sustainable Development', 'aiabasd')
on conflict (slug) do nothing;
