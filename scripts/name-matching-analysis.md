# Name Matching Analysis

## Problem Summary

26 out of 63 active members showing zero attendance due to name matching issues. Zoom attendees often appear without email addresses and use shortened names or nicknames that don't match the full names in the members table.

## Root Cause

The attendance matching logic tries three methods in order:
1. **Email match** - fails when Zoom has null email
2. **Alias match** - fails when no alias exists  
3. **Normalized name match** - fails when names don't match exactly

Example: "Bestie" (Zoom) doesn't match "L M Bestie" (member record)

## Aliases Added

| Zoom Name | Member Name | Member Email |
|-----------|-------------|--------------|
| Bestie | L M Bestie | laura.may.best@gmail.com |
| Allison  | Allison Preston | allisonxpreston@gmail.com |
| Iris | Iris Simons | simonsiris@icloud.com |
| Amanda Leigh | Amanda Zeine | alzeinebooks@gmail.com |
| Carolyn Kimbro | Carly Kimbro | ckimbrowrites@gmail.com |
| Alicyn Pike | Alicyn Newman | alicynwriter@gmail.com |

## Top Unmatched Zoom Names (Requiring Manual Review)

These names appear frequently in Zoom but don't match any member:

| Zoom Name | Appearances | Meetings |
|-----------|------------|----------|
| Feya Rose | 78 | 66 |
| Lilian Horn | 55 | 54 |
| Courtney B | 40 | 35 |
| Katy J. Schroeder | 32 | 28 |
| Nicole Annbury | 32 | 28 |
| Natalie Griffin | 28 | 26 |
| Sally Blue | 28 | 28 |
| Daphne Garrison | 27 | 22 |
| Mica Rice | 26 | 23 |
| AJ Volante | 25 | 25 |
| Amena Jamali | 25 | 25 |
| Vivian Rolfe | 25 | 23 |
| Elze | 18 | 13 |
| Birgit Schreiber | 18 | 14 |
| Edy Hackett | 16 | 16 |
| Kristin Brown | 15 | 15 |
| Erica Kasemodel | 15 | 13 |
| Kailey Haider | 15 | 14 |

## Active Members Still at Zero Attendance

After adding the aliases above, these members will still show zero unless we find their Zoom names:

- Alicyn Newman ❓ (might be fixed by "Alicyn Pike" alias)
- Allison Preston ❓ (might be fixed by "Allison " alias)
- Amanda Zeine ❓ (might be fixed by "Amanda Leigh" alias)
- Briana Meyer
- Carly Kimbro ❓ (might be fixed by "Carolyn Kimbro" alias)
- Cassia Carter
- Danielle Porte
- Deena Graves
- Elle Lowery
- Iris Simons ❓ (might be fixed by "Iris" alias)
- Jess Janssen
- Joanne Bourgault
- Justyna Zmurko
- Kate Winch
- Kaylee Hunt
- Kristen Richardson
- L M Bestie ✅ (fixed with "Bestie" alias)
- Marsha Trites-Russell
- MerlinXVI
- Molly Rothburn
- Nicole Jorge (might match "Nicole Annbury"?)
- Olivia Rhodes
- Rebecca Tabor
- Saleema Lookman
- SarahLPeachey
- Susanna Mlot

## Next Steps

1. **Reprocess attendance** from the dashboard to apply the new aliases
2. **Manual review needed**: You'll need to identify which Zoom names correspond to which members
3. **Add more aliases**: Use this SQL pattern:
   ```sql
   INSERT INTO member_name_aliases (member_id, alias) VALUES
     ((SELECT id FROM members WHERE email = 'member@example.com'), 'Their Zoom Name')
   ON CONFLICT DO NOTHING;
   ```

## Finding Zoom Names for a Specific Member

To help identify a member's Zoom name, search for partial matches:

```sql
-- Example: Find Zoom names that might be Briana Meyer
SELECT DISTINCT z.name, COUNT(*) as appearances
FROM zoom_attendees z
WHERE z.email IS NULL
  AND (z.name ILIKE '%briana%' OR z.name ILIKE '%meyer%')
GROUP BY z.name
ORDER BY COUNT(*) DESC;
```

## Diagnostic Queries

See `scripts/find-missing-aliases.sql` for automated fuzzy matching (but expect false positives).

View the current alias mappings:
```sql
SELECT m.name as member_name, m.email, a.alias as zoom_name
FROM member_name_aliases a
JOIN members m ON m.id = a.member_id
ORDER BY m.name;
```
