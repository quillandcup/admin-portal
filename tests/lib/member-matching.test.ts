import { describe, it, expect } from 'vitest'
import { normalizeName, matchAttendeeToMember, batchMatchAttendees, type Member, type MemberAlias } from '@/lib/member-matching'

describe('Member Matching', () => {
  const mockMembers: Member[] = [
    { id: '1', name: 'L M Bestie', email: 'laura.may.best@gmail.com' },
    { id: '2', name: 'Feya Rose', email: 'feyarose@outlook.com' },
    { id: '3', name: 'Carly Kimbro', email: 'ckimbrowrites@gmail.com' },
    { id: '4', name: 'Erica Kase Kasemodel', email: 'erica.kasemodel@gmail.com' },
  ]

  const mockAliases: MemberAlias[] = [
    { member_id: '1', alias: 'Bestie' },
    { member_id: '3', alias: 'Carolyn Kimbro' },
    { member_id: '4', alias: 'Kase' },
    { member_id: '4', alias: 'Erica Kasemodel' },
  ]

  describe('normalizeName', () => {
    it('should lowercase names', () => {
      expect(normalizeName('Feya Rose')).toBe('feya rose')
    })

    it('should remove special characters', () => {
      expect(normalizeName("L M Bestie's Name!")).toBe('l m besties name')
    })

    it('should collapse multiple spaces', () => {
      expect(normalizeName('John    Doe')).toBe('john doe')
    })

    it('should trim whitespace', () => {
      expect(normalizeName('  Feya Rose  ')).toBe('feya rose')
    })

    it('should handle all transformations together', () => {
      expect(normalizeName("  L. M. Bestie's  Name!!  ")).toBe('l m besties name')
    })
  })

  describe('matchAttendeeToMember', () => {
    it('should match by email (highest priority)', () => {
      const result = matchAttendeeToMember(
        'Wrong Name',
        'laura.may.best@gmail.com',
        mockMembers,
        mockAliases
      )

      expect(result).toEqual({
        member_id: '1',
        confidence: 'high',
        method: 'email'
      })
    })

    it('should match by email case-insensitively', () => {
      const result = matchAttendeeToMember(
        'Wrong Name',
        'LAURA.MAY.BEST@GMAIL.COM',
        mockMembers,
        mockAliases
      )

      expect(result).not.toBeNull()
      expect(result?.member_id).toBe('1')
    })

    it('should match by alias when no email', () => {
      const result = matchAttendeeToMember(
        'Bestie',
        null,
        mockMembers,
        mockAliases
      )

      expect(result).toEqual({
        member_id: '1',
        confidence: 'high',
        method: 'alias'
      })
    })

    it('should match by normalized name when no email or alias', () => {
      const result = matchAttendeeToMember(
        'Feya Rose',
        null,
        mockMembers,
        mockAliases
      )

      expect(result).toEqual({
        member_id: '2',
        confidence: 'high',
        method: 'normalized_name'
      })
    })

    it('should match normalized name with punctuation differences', () => {
      const result = matchAttendeeToMember(
        'L. M. Bestie',
        null,
        mockMembers,
        mockAliases
      )

      expect(result).not.toBeNull()
      expect(result?.member_id).toBe('1')
      expect(result?.method).toBe('normalized_name')
    })

    it('should prioritize email over alias', () => {
      const result = matchAttendeeToMember(
        'Bestie', // This is an alias for member 1
        'feyarose@outlook.com', // But email is for member 2
        mockMembers,
        mockAliases
      )

      // Email match should win
      expect(result?.member_id).toBe('2')
      expect(result?.method).toBe('email')
    })

    it('should prioritize alias over normalized name', () => {
      const result = matchAttendeeToMember(
        'Carolyn Kimbro', // Alias for member 3
        null,
        mockMembers,
        mockAliases
      )

      expect(result?.member_id).toBe('3')
      expect(result?.method).toBe('alias')
    })

    it('should support multiple aliases for same member', () => {
      const result1 = matchAttendeeToMember('Kase', null, mockMembers, mockAliases)
      const result2 = matchAttendeeToMember('Erica Kasemodel', null, mockMembers, mockAliases)

      expect(result1?.member_id).toBe('4')
      expect(result2?.member_id).toBe('4')
    })

    it('should return null when no match found', () => {
      const result = matchAttendeeToMember(
        'Unknown Person',
        'unknown@example.com',
        mockMembers,
        mockAliases
      )

      expect(result).toBeNull()
    })
  })

  describe('batchMatchAttendees', () => {
    it('should match multiple attendees', () => {
      const attendees = [
        { name: 'Bestie', email: null },
        { name: 'Feya Rose', email: 'feyarose@outlook.com' },
        { name: 'Kase', email: null },
        { name: 'Unknown Person', email: null },
      ]

      const result = batchMatchAttendees(attendees, mockMembers, mockAliases)

      expect(result.matches).toHaveLength(3)
      expect(result.unmatched).toHaveLength(1)
      expect(result.unmatched[0].name).toBe('Unknown Person')
    })

    it('should provide match method for each result', () => {
      const attendees = [
        { name: 'Bestie', email: null }, // alias match
        { name: 'Feya Rose', email: 'feyarose@outlook.com' }, // email match
        { name: 'Carly Kimbro', email: null }, // normalized name match
      ]

      const result = batchMatchAttendees(attendees, mockMembers, mockAliases)

      expect(result.matches[0].match.method).toBe('alias')
      expect(result.matches[1].match.method).toBe('email')
      expect(result.matches[2].match.method).toBe('normalized_name')
    })
  })

  describe('Real-world edge cases', () => {
    it('should handle Zoom names with trailing spaces', () => {
      const result = matchAttendeeToMember(
        'Allison ', // Note the trailing space (actual Zoom data)
        null,
        [{ id: '5', name: 'Allison Preston', email: 'allison@example.com' }],
        [{ member_id: '5', alias: 'Allison ' }] // Alias includes the space
      )

      expect(result?.member_id).toBe('5')
    })

    it('should handle names that differ only in punctuation', () => {
      const members: Member[] = [
        { id: '6', name: 'Elze Albada Jelgersma/Elin Sage', email: 'elin.sage.writer@gmail.com' }
      ]
      const aliases: MemberAlias[] = [
        { member_id: '6', alias: 'Elze' }
      ]

      const result = matchAttendeeToMember('Elze', null, members, aliases)

      expect(result?.member_id).toBe('6')
    })
  })
})
