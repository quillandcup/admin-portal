-- Remove incorrect member alias: "Amanda Leigh" → Amanda Zeine
-- These are two different people. Amanda Zeine is a recent signup.

DELETE FROM member_name_aliases
WHERE alias = 'Amanda Leigh';

COMMENT ON TABLE member_name_aliases IS 'Removed incorrect alias: Amanda Leigh mapped to Amanda Zeine (they are different people)';
