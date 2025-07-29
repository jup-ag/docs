---
sidebar_label: "Earn"
description: "Use Jupiter Lend to borrow assets."
title: "Earn"
---

<head>
    <title>Earn</title>
    <meta name="twitter:card" content="summary" />
</head>

:::note
- Lite URL: `https://lite-api.jup.ag/quote`
- Pro URL: `https://api.jup.ag/swap/v1/quote`

To upgrade to Pro or understand our rate limiting, please refer to this section.
- [API Key Setup](/docs/api-setup)
- [API Rate Limit](/docs/api-rate-limit)
:::

:::tip API Reference
To fully utilize the Lend API, check out the [Lend API Reference](/docs/api/lend-api).
:::

## About

The Lend API provides 2 ways to interface with the Earn functions in the Jupiter Lend Program. You can either make a post request to directly get the **Transaction**, or **Instruction** which can be used for CPI or composing with additional instructions.

1. **Transaction**: To use the Transaction method, simply request to `/earning/deposit` or `/earning/withdraw` directly. The API will respond with an unsigned base64 transaction for the signer to sign, then sent to the network for execution.
2. **Instruction**: In some use cases, you'd prefer to utilize the instructions instead of the serialized transaction, so you can utilzie with CPI or compose with other instructions. You can make a post request to `/earning/deposit-instruction` and `/earning/withdraw-instruction` instead.

## Deposit

1. User chooses the vault (with a specific mint, e.g. USDC).
2. User chooses the amount and deposits the specific mint.
3. User sign and then the transaction is sent to the network.
4. The mint authority mints vault tokens to the user.

```jsx
// TRANSACTION
const depositTransactionResponse = await (
    await (
        await fetch('https://lite-api.jup.ag/lend/v1/earning/deposit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                asset: mint,
                amount: '100000',
                signer: wallet.publicKey,
            })
        })
    )
);

// INSTRUCTION
const depositInstructionResponse = await (
    await (
        await fetch('https://lite-api.jup.ag/lend/v1/earning/deposit-instruction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                asset: mint,
                amount: '100000',
                signer: wallet.publicKey,
            })
        })
    )
);
```

## Withdraw

1. User chooses the vault (with existing assets deposited).
2. User chooses the amount and withdraws.
3. User sign and then the transaction is sent to the network.
4. The token program burns the vault tokens from the user.

```jsx
// TRANSACTION
const withdrawTransactionResponse = await (
    await (
        await fetch('https://lite-api.jup.ag/lend/v1/earning/withdraw', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                asset: mint,
                amount: '100000',
                signer: wallet.publicKey,
            })
        })
    )
);

// INSTRUCTION
const withdrawInstructionResponse = await (
    await (
        await fetch('https://lite-api.jup.ag/lend/v1/earning/withdraw-instruction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                asset: mint,
                amount: '100000',
                signer: wallet.publicKey,
            })
        })
    )
)
```