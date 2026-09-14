-- Owner invitations: the platform owner claim flows through the same
-- one-time invite mechanism; only server-side SQL may create an owner invite
-- (the admin invite endpoint remains limited to coordinator/member).

alter table public.org_invites drop constraint org_invites_role_check;
alter table public.org_invites add constraint org_invites_role_check
  check (role in ('owner','coordinator','member'));
