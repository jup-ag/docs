---
sidebar_label: How Recurring Order works
title: How Recurring Order works?
description: Introduction to how Recurring Order works
---

<head>
    <title>How Recurring Order works</title>
    <meta name="twitter:card" content="summary" />
</head>

Creating a Recurring Order is like setting up a reliable machine that processes your trades in the intervals you set them at, here’s how it works in a nutshell, let’s break it down into:

- How the orders are created
- How your tokens are bought
- How tokens are transferred after each order
- How the Recurring Order is (auto) closed

---

## How the orders are created

1. When you start a Recurring order, the total allocated tokens you’re selling, say USDC, will be transferred from your wallet into an order account owned by the Jupiter Recurring Order Program. This also includes other information like order interval, buying amount, etc.
2. Once you [create your first Recurring Order position](./how-to-create-recurring-order), your first order is processed right away! For example, if you're selling USDC into JupSOL, the full USDC amount you chose will be stored in your vault, and the first trade will happen immediately.
3. The remaining trades follow at regular intervals, based on the schedule you pick.

:::tip **Heads-Up! Keep It Up with Randomness**
To keep your Recurring Order strategy less predictable, each trade will execute within a randomized window of ±30 seconds from your chosen time. Think of it as a little sprinkle of unpredictability to keep things fresh and secure.
:::

## How your tokens are bought

When you create a Recurring order account, your big order is split into smaller, bite-sized trades. The number of trades depends on the options you pick. Let’s break it down:

Say you’re selling of $300 USDC into JupSOL over 3 days. Your order will be split into 3 trades of $100 USDC each, one for every day. Let’s see this in action:

| Order # | Amount to sell  | JupSOL Price | JupSOL Bought | Total JupSOL | Time                      |
|---------|-----------------|-----------|------------|-----------|---------------------------|
| 1       | $100            | $200      | 0.5        | 0.5       | Immediately upon creation |
| 2       | $100            | $210      | 0.476      | 0.976     | 1 day after creation      |
| 3       | $100            | $180      | 0.555      | 1.531     | 2 days after creation     |

At the end of the example Recurring Order, you can see that the price of JupSOL has fluctuated and the average cost of your Recurring Order is $196.666.

#### Backfills
:::note Missed order Purchases
Do note that, if your Recurring order misses multiple purchases, it will backlog these purchases. When it is available to fill, it attempts to backfill all missed purchases immediately (with some buffer between each purchase).

Currently, it is not an option to backfill immediately or not. This is part of the current design of Recurring Order.
:::

## How tokens are transferred after each order

Every time an order executes, the purchased tokens will show up in your wallet within the same transaction. No extra steps required! Let’s break it down:

Using the same example as above:

**Day 1:** Your first $100 USDC order executes, and voila! You receive **0.4995 JupSOL** (net of fees) in your wallet.

**Day 2:** Your second $100 USDC order processes, delivering **0.4755 JupSOL** (net of fees) to your wallet.

**Day 3:** Your final $100 USDC order wraps things up with another **0.554 JupSOL** (net of fees) delivered to your wallet.

:::caution **Caveat to Auto-Withdrawal: Keep Your ATAs Open**
If your purchased token isn’t SOL, automatic transfers only work if you have the correct **Associated Token Account (ATA)** set up. But don’t worry—Jupiter Recurring Order creates the necessary ATA when you set up your account.
::: 

**What if you closed your ATA?**

If you manually close your purchased token’s ATA (via a wallet or a 3rd-party tool), auto-transfers after every order won’t work. Instead, tokens will stay in your Recurring Order vault safely and only transfer as a lump sum at the end of your Recurring Order cycle.

:::tip **Pro Tip:** Manual withdraw
If you don’t want to wait, you can manually withdraw your tokens from the Recurring Order vault anytime through our user-friendly UI.
:::

## How the Recurring Order is (auto) closed

At the end of your Recurring Order cycle, Jupiter takes care of everything for you. Here’s how it works:

- If your wallet’s Associated Token Account (ATA) stays open, your purchased tokens are transferred to your wallet with each order. (No one else can ever receive your tokens)
- If you’ve closed your token account mid-cycle (as mentioned above), don’t worry. The program recovers the rent from your Recurring Order account’s in-token PDA and uses it to re-open your token account, so your tokens can still reach you safely.

**How Rent Works:**

By default, **2/3 of the rent** from your Recurring Order account is sent back to you. The remaining **1/3 of the rent** isn’t taken by Jupiter or anyone else—it’s recoverable by you if you decide to close your ATA that holds your tokens later.

:::caution **Do NOT close your ATA**
Do not clsoe your ATA, before withdrawing or swapping your tokens! If you do, it could result in token loss. This isn’t just a Jupiter thing, it’s how Solana wallets and accounts operate.
:::