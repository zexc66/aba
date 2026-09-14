-- Invite acceptance as a security-definer RPC: the signed-in member's email
-- is checked against the pending invite inside the database, removing any
-- dependency on serverless reachability or token round-trips.

create function public.accept_my_invite(p_token uuid) returns text
language plpgsql security definer set search_path = public as $$
declare
  inv record;
  uid uuid;
  uemail text;
begin
  if p_token is null then
    return 'invalid';
  end if;
  select id, org_id, email, role, accepted_at into inv
  from public.org_invites where token = p_token;
  if not found then
    return 'invalid';
  end if;
  if inv.accepted_at is not null then
    return 'already';
  end if;
  uid := auth.uid();
  if uid is null then
    return 'unauthorized';
  end if;
  select lower(email) into uemail from auth.users where id = uid;
  if uemail is distinct from lower(inv.email) then
    return 'mismatch:' || inv.email;
  end if;
  update public.org_invites set accepted_at = now() where id = inv.id;
  insert into public.memberships (org_id, user_id, role, status)
  values (inv.org_id, uid, inv.role, 'active')
  on conflict (org_id, user_id) do update set role = excluded.role, status = 'active';
  return 'accepted';
end; $$;

revoke execute on function public.accept_my_invite(uuid) from anon;
grant execute on function public.accept_my_invite(uuid) to authenticated;
