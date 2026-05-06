drop policy "anyone can signup" on public.early_access_signups;
create policy "public can submit signup"
  on public.early_access_signups
  for insert
  to anon, authenticated
  with check (
    char_length(name) between 1 and 100
    and char_length(email) between 3 and 255
    and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    and (team is null or char_length(team) <= 150)
  );
