# Subscription Reconciliation Action Items

*Date:* 2026-04-30

## Immediate Actions Required

### 1. Kajabi Updates Needed

#### Reactivate in Kajabi
- *categunnell@gmail.com* (Cate Gunnell)
  - Status: Active and paying in Stripe
  - Issue: Incorrectly deactivated in Kajabi (deactivated 2026-03-09)
  - Action: Reactivate Kajabi subscription

#### Deactivate in Kajabi  
- *authorzking@gmail.com* (Z King)
  - Status: On hiatus, correctly paused in Stripe
  - Issue: Still shows active in Kajabi
  - Action: Revoke in Kajabi too

- *zripleybooks@gmail.com* (Sam Arthurs)
  - Status: On hiatus, correctly paused in Stripe
  - Stripe: Paused (“Yes, girl! I see you!“)
  - Issue: Still shows as active in Kajabi
  - Action: Revoke in Kajabi too

#### Hiatus -> Cancel? 
- *meadows.c.a.23@gmail.com* (C.A. Meadows)
  - Status: Permanently paused/on hiatus
  - Stripe: Paused
  - Kajabi: Active
  - Status: :warning: Verify if “permanently paused” means should be deactivated in Kajabi

### 2. Payment Method Conversions (PayPal → Stripe)

#### New Member - Recently Joined
- *chancellor.ashley@gmail.com* (Ashley Chancellor)
  - Status: Just joined, using PayPal for some reason
  - Action: Convert to Stripe subscription

#### Existing Member - Using PayPal
- *ckimbrowrites@gmail.com* (Carly Kimbro)
  - Status: Using PayPal instead of Stripe
  - Action: Convert to Stripe subscription

### 3. Payments Missing/Investigation

#### Multiple Accounts - No Payments
- *jenniferpowellwrites@gmail.com* / *jennmp118@gmail.com* / *hello@jennmpowell.com* / *admin@jennmpowell.com* (Jenn Powell)
  - Status: Doesn’t appear to have paid since early 2025
  - Evidence: Multiple changing cards, emails, and Kajabi/Stripe accounts
  - Current: 2 active Kajabi subscriptions (“Yes, girl! I see you!“), no Stripe subscriptions
  - Action: 
    1. Investigate payment history across all accounts
    2. Consolidate to single account
    3. Require valid payment method or deactivate
    4. Consider reaching out about payment issues

### 4. Deactivate - Member Deceased

- *ccbrown@live.com* (Carmen Norris)
  - Status: Active in Kajabi (“Yes, girl! I see you!“), no Stripe subscription
  - Reason: Member passed away
  - Action: Deactivate Kajabi subscription

## Context - No Action Needed (Already Handled Correctly)

### 180 Program Members (5)
These show as paused in Stripe because Q&C Membership is included via 180 program for 6 months:
- laurenkolenda793@gmail.com (Lauren Kolenda)
- luwen.solomon@gmail.com (Luwen Solomon)
- novelsbynicha@proton.me (Nicha Kamduang)
- rachel@everelsewhere.co (Rachel Everley)
- wildrootedwords@gmail.com (Courtney B)

*Status:* ✓ Correct (paused in Stripe, but getting access through 180 program)

### Special Gift/Compensation Cases

#### Mika Affiliate Compensation
- *notablynicole@gmail.com* (Nicole Annbury)
  - Kajabi: Shows canceled
  - Ania says: She’s back, given “gift” to compensate for missed Mika affiliates
  - Stripe: Paused with mark_uncollectible behavior
  - Status: ✓ Needs Kajabi reactivation - when?

#### Hosting Gift
- *courtneyzano@gmail.com* (Courtney Zanosky)
  - Status: Maybe paused for hosting (gift)
  - Stripe: Paused with mark_uncollectible behavior
  - Status: :warning: Verify if this is intentional

## Questions for Resolution

1. *Nicole Annbury*: Should her gift be time-limited or ongoing?
2. *Courtney Zanosky*: Confirm hosting gift details and duration
3. *C.A. Meadows*: Does “permanently paused” mean she should be deactivated completely?
4. *PayPal Strategy*: Convert all to Stripe, or add PayPal tracking?