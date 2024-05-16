---
sidebar_label: Payments API
description: Convert any token to USDC with Jupiter Payments API. A comprehensive guide for seamless crypto transactions.
title: "Payments API: Convert Any Token to USDC"
---

<head>
    <title>Jupiter Payments API Guide: Seamless Token Conversion to USDC</title>
    <meta name="twitter:card" content="summary" />
</head>


Jupiter's Payments API supports your payments use case. Utilize Jupiter + SolanaPay to pay for anything with any SPL token. With the Jupiter Payments API, you can specify an exact output token amount. The API doesn't just support output token to USDC, but to any SPL token!

## Use Case

Payments or interaction with a protocol can require an exact amount of token B. Users might not have token A or prefer to hold other tokens long term. The Jupiter API allow building a swap transaction to receive an exact amount of token A for a maximum in amount of token B.

## A Practical Example using the API

Bob is selling a delicious latte for 5 USDC. Alice wants to buy Bob's latte. The problem is, Alice only holds mSOL. Luckily, Bob can use the Jupiter Payments API to let Alice swap for exactly 5 USDC then transfer 5 USDC to his payment wallet. 

First, we need to show Alice how much mSOL she will have to spend for the latte.

<details>
  <summary>Click to play video</summary>
  <video width="320" height="240" controls>
    <source src="/videos/payments-api.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</details>

```shell
curl -s 'https://quote-api.jup.ag/v6/quote?inputMint=mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So&outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&amount=5000000&swapMode=ExactOut&slippageBps=50' | jq '.inAmount, .otherAmountThreshold'
```

Parameters:

- The input mint is mSOL and the output mint is USDC.
- `swapMode` is `ExactOut`, as opposed to the default `ExactIn`.
- We want to receive amount=5,000,000, 5 USDC.

Response:

- `inAmount` is the quoted estimated amount of mSOL required to receive 5 USDC.
- `otherAmountThreshold` is the maximum in amount, the quote above with the slippage tolerance.

:::info
Currently, only Orca Whirlpool, Raydium CLMM, and Raydium CPMM support ExactOut mode. All token pairs may not be available in this mode.
:::

Then Bob creates the transaction with the `/swap` endpoint, and adds a 5 USDC token transfer from Alice to his payment wallet using the `destinationTokenAccount` argument, which Alice will verify, sign and send.

:::info
In the example bellow, we assume the associated token account exists on `destinationTokenAccount`.
:::

```js
import { Token, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token'; // version 0.1.x
import { PublicKey } from '@solana/web3.js';

const USDC_MINT = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');
const paymentAmount = 5_000_000; // 5 USDC
const bobWallet = new PublicKey('BUX7s2ef2htTGb2KKoPHWkmzxPj4nTWMWRgs5CSbQxf9');

// This token account has to be created before they can receive USDC.
const bobUSDCTokenAccount = Token.getAssociatedTokenAddress(
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  USDC_MINT,
  bobWallet,
  // @ts-ignore
  true,
);

// Get the serialized transactions for the swap
const transactions = await (
  await fetch('https://quote-api.jup.ag/v6/swap', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      // quoteResponse from /quote api
      quoteResponse,
      // Bob will receive the 5 USDC
      destinationTokenAccount: bobUSDCTokenAccount.toString(),
      userPublicKey: aliceWallet.publicKey.toString(),
    })
  })
).json();

const { swapTransaction } = transactions;

// Execute the `swapTransaction`
```

:::tip
If you want to add your own fees, check out: [Adding Your Own Fees](/docs/APIs/adding-fees)
:::
