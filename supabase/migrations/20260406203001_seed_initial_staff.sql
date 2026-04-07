-- Seed initial staff members
-- Note: Run /api/process/members after this to sync to members table

INSERT INTO staff (name, email, role, hire_date, notes)
VALUES
  ('Ania Ray', 'ania@quillandcup.com', 'owner', '2020-01-01', 'Company owner'),
  ('Cody Ray', 'cody@quillandcup.com', 'owner', '2020-01-01', 'Company owner')
ON CONFLICT (email) DO NOTHING;

COMMENT ON TABLE staff IS 'Initial staff: Ania Ray and Cody Ray (company owners)';
