---
sidebar_label: "Introduction"
description: An open source Solana referral program used by Jupiter Programs (or any other programs) to enable developers to earn fees.
title: Referral Program
---

<head>
    <title>Referral Program</title>
    <meta name="twitter:card" content="summary" />
</head>

The Referral Program is an open-source program used by Jupiter Programs (or any other programs) to enable developers to earn fees.

:::info Referral Program Source Code
[Open Source Repository](https://github.com/TeamRaccoons/referral): To understand and make use of the referral program better.
:::

## Jupiter API Integrators

The Jupiter Programs use the Referral Program to allow developers to earn fees when integrating with Jupiter. Below are some resources to help you quickly get started. There are a different ways to setup such as via the Jupiter Referral Dashboard or using the provided scripts.

- [Jupiter Referral Dashboard](https://referral.jup.ag/): To view and manage your referral accounts used with Jupiter APIs.
- [Add Fees to Ultra API](https://dev.jup.ag/docs/ultra-api/add-fees-to-ultra): To add fees to your Ultra API integration.
- [Add Fees to Swap and Trigger API](https://dev.jup.ag/docs/swap-api/add-fees-to-swap): To add fees to your Swap and Trigger API integration.
- [Add Fees to Terminal](https://dev.jup.ag/docs/tool-kits/terminal#adding-fees-to-terminal): To add fees to your Terminal integration.

## Other Program Integrators

### Project Usage

If you have a project/product that runs a program on the Solana blockchain, you can integrate the Referral Program to allow/share revenue with the integrators of your program.

Similar to how Jupiter Programs uses the Referral Program to help developers earn fees and/or share the revenue with Jupiter. For example, Jupiter Ultra uses the Jupiter Swap program which relies on the Referral Program.

- Create a `Project` by calling `initialize_project` with your chosen `base` key and a project `name` (`base` key refers to a key identifier of your project).
- Set a `default_share_bps` to share the fees with your referrers (or integrators).
- An example of a `Project` account: [Jupiter Ultra Project](https://solscan.io/account/DkiqsTrw1u1bYFumumC7sCG2S8K25qc2vemJFHyW2wJc)

### Referrer Usage

If you are a referrer such as a developer or integrator of a project that runs a program on the Solana blockchain, you can create the necessary accounts via the Referral Program to earn fees.

- The program must be integrated with the Referral Program.
- Create a `Referral` account by calling `initialize_referral_account` with the correct `Project` account, the `Referral` account, and your own `Partner` account (`Partner` account is the admin of this referral account).
- Create the necessary `Referral` token accounts for the `Referral` account to receive fees in.
