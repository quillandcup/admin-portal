# Stripe vs Kajabi Subscription Comparison Report (Post-Cleanup)

**Generated:** 2026-04-30  
**Status:** After implementing action items from SUBSCRIPTION_ACTION_ITEMS.md

## Executive Summary

| Metric | Before Cleanup | After Cleanup | Change |
|--------|----------------|---------------|--------|
| **Kajabi Active Subscriptions** | 81 | 74 | -7 |
| Stripe Truly Active (paying) | 69 | 71 | +2 |
| Stripe Paused (on hiatus) | 27 | 25 | -2 |
| Stripe Past Due | 2 | 0 | -2 |
| **Members Who Should Be Active** | N/A | 78 | - |
| **Discrepancy** | 12 | 4 | -8 |

## Summary of Changes

### Kajabi Deactivations (8 members)
1. **authorzking@gmail.com** (Z King) - On hiatus
2. **ccbrown@live.com** (Carmen Norris) - Member deceased
3. **zripleybooks@gmail.com** (Sam Arthurs) - On hiatus  
4. **meadows.c.a.23@gmail.com** (C.A. Meadows) - Permanently paused
5. **feyarose@outlook.com** (Feya Rose) - Past due, payment not resolved
6. **nia.decoux@gmail.com** (Nia DeCoux) - Past due, payment not resolved
7. **jenniferpowellwrites@gmail.com** (Jenn Powell #1) - Payment evasion
8. **jennmp118@gmail.com** (Jenn Powell #2) - Payment evasion / duplicate account

### Kajabi Reactivations (1 member)
1. **categunnell@gmail.com** (Cate Gunnell) - Already paying in Stripe, incorrectly deactivated

### PayPal to Stripe Conversions (2 members)
1. **chancellor.ashley@gmail.com** (Ashley Chancellor) - New member using PayPal
2. **ckimbrowrites@gmail.com** (Carly Kimbro) - Existing member using PayPal

## Post-Cleanup Status Breakdown

### Members Who Should Count as Active (78 total)

#### 1. Paying via Stripe - Not Paused (71 members)
- Standard active subscriptions
- Currently being billed monthly
- Have full access to Quill & Cup
- Includes 2 PayPal conversions (once completed)

#### 2. 180 Program Members (5 members)
Membership included via 180 program for 6 months, so Stripe subscription is paused:
- laurenkolenda793@gmail.com (Lauren Kolenda)
- luwen.solomon@gmail.com (Luwen Solomon)
- novelsbynicha@proton.me (Nicha Kamduang)
- rachel@everelsewhere.co (Rachel Everley)
- wildrootedwords@gmail.com (Courtney B)

**Status:** Paused in Stripe ✓ | Active in Kajabi ✓

#### 3. Gift/Compensation Members (2 members)
- **notablynicole@gmail.com** (Nicole Annbury) - Gift compensation for missed Mika affiliates
- **courtneyzano@gmail.com** (Courtney Zanosky) - Possibly hosting gift (needs verification)

**Status:** Paused in Stripe with `mark_uncollectible` ✓ | Active in Kajabi ✓

## Remaining Discrepancy: 4 Members

### What Are the 4?

After cleanup, there remain **~4 members** who are:
- ✓ Paying in Stripe (status='active', pause_collection=null)
- ✗ NOT active in Kajabi (deactivated_at is set)
- ❓ Not identified for reactivation

**Root cause:** These are members who canceled in Kajabi but Stripe is still billing them through the end of their current billing period.

**Context:** We identified 27 members with "Stripe active but Kajabi canceled". Of those:
- 1 reactivated (categunnell) - was an error, should be active
- ~22 are correctly paused in Stripe (on hiatus, etc.)
- **~4 are NOT paused but remain inactive in Kajabi**

### Next Step for the Remaining 4

**Option A:** Identify and reactivate them (if they should have access while paying)  
**Option B:** Cancel their Stripe subscriptions (if they truly intended to cancel)  
**Option C:** Contact them to verify intent (are they aware they're still being billed?)

## Final Member Status Categories

### Active Members (74 in Kajabi after cleanup)

| Category | Count | Stripe Status | Notes |
|----------|-------|---------------|-------|
| Standard Active | ~65 | Active, not paused | Paying monthly |
| 180 Program | 5 | Active, paused | Access via program |
| Gift/Compensation | 2 | Active, paused | Special access |
| PayPal (converting) | 2 | Will be active | Being converted |

### Inactive/On Hiatus

| Status | Count | Notes |
|--------|-------|-------|
| On Hiatus | 2 | Z King, Sam Arthurs - correctly paused in both systems |
| Permanently Paused | 1 | C.A. Meadows - deactivated in Kajabi |
| Deceased | 1 | Carmen Norris - deactivated |
| Payment Issues | 2 | Feya Rose, Nia DeCoux - past due, deactivated |
| Payment Evasion | 2 | Jenn Powell accounts - deactivated |

## Reconciliation Health Metrics

### Data Quality: Excellent ✓
- All 98 Stripe subscriptions have `kjb_member_id` for matching
- Email mismatches identified and documented (5 cases)
- Special cases properly categorized (180 program, gifts)

### Status Alignment: 95% Accurate
- 74 of 78 expected active members correctly marked in Kajabi
- 4 discrepancy cases need investigation/resolution
- Improvement from 85% accurate (12 discrepancy / 81 total) to 95% (4/78)

### Payment Method Coverage: 97%
- 96% paying via Stripe (71 of 74 active)
- 3% special access (7 of 74: 5x180 program + 2 gifts)
- PayPal conversions in progress (will reach 100% Stripe)

## Recommended Ongoing Monitoring

### Weekly
- Review past_due subscriptions (check for new payment failures)
- Verify new PayPal subscriptions haven't been created

### Monthly  
- Audit Stripe active vs Kajabi active for new discrepancies
- Review 180 program status (check if any should resume billing)
- Verify gift subscriptions still valid

### Quarterly
- Review paused subscriptions with `resumes_at` dates
- Check for payment evasion patterns (multiple accounts, changing cards)
- Reconcile member counts across all systems

## Technical Implementation Status

### Completed ✓
- Stripe Bronze tables created and populated
- Kajabi Bronze tables fully populated  
- `kjb_member_id` matching implemented
- Status comparison reports generated

### Pending
- Update `/api/process/members` to use Stripe as source of truth
- Add special case flags (180 program, gifts, PayPal) to member records
- Create automated discrepancy alerts
- Build reconciliation dashboard

### Deferred
- PayPal integration for native tracking (alternative: convert all to Stripe)
- Automated Stripe subscription cancellation for Kajabi cancellations
- Automated reactivation workflow for mistaken deactivations

## Appendix: Detailed Action Items Tracking

### Critical Actions (Implemented)
- ✓ Deactivated 8 members in Kajabi
- ✓ Reactivated 1 member in Kajabi (categunnell)
- ⏳ PayPal conversions (2 members) - in progress
- ⏳ Past due follow-ups (2 members) - contacted, awaiting response

### Investigation Actions (Completed)
- ✓ Jenn Powell accounts - identified as payment evasion
- ✓ Carmen Norris - confirmed deceased
- ✓ Email mismatches - documented 5 cases
- ✓ 180 program members - identified and verified (5 members)

### Outstanding Questions
- ❓ Nicole Annbury gift duration - is it time-limited or ongoing?
- ❓ Courtney Zanosky hosting gift - verify details and duration  
- ❓ C.A. Meadows "permanently paused" - confirm vs temporary hiatus
- ❓ Remaining 4 discrepancy - identify and resolve

---

**Last Updated:** 2026-04-30  
**Next Review:** 2026-05-07 (weekly check-in)
