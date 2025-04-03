---
sidebar_label: "Payments Through Swap"
description: "Jupiter Swap API allows you to set up payments solutions for your products."
title: "Payments Through Swap"
---

<head>
    <title>Payments Through Swap</title>
    <meta name="twitter:card" content="summary" />
</head>

The Jupiter Swap API can be utilized such that you, a merchant can allow your customer to pay in any tokens while you still receive in your preferred token payment at the end of the transaction.

## Use Case

Let’s set the stage. You are selling a **jupcake!!!** to your customer and merchant might only accept in 1 USDC, but Alice only has 1 SOL for various reasons. Well, you’re at the right place! By using the Swap API, merchant can let customer pay in SOL while merchant still receive USDC in order to complete the payment for a jupcake.

- Customer has 1,000,000 SOL.
- Merchant sells 1 jupcake for 1 USDC.
- Use the Swap API to swap exactly 1 USDC output from Customer's SOL.
- Merchant receives the 1 USDC, as planned!

## Let’s Get Started

### 1. Setup

You will need slightly different imports and also remember to set up connection to an RPC. If you have not set up the other typical libraries or are familiar with the Swap API, please follow this [Environment Setup](/docs/environment-setup) and [Get Quote and Swap](./1-get-quote.md) guide.

```bash
npm i @solana/spl-token
```

```jsx
import { PublicKey, Connection, Keypair, VersionedTransaction } from '@solana/web3.js';
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Wallet } from '@coral-xyz/anchor';
import fetch from 'cross-fetch';
```

Before we start getting a quote and swap transaction, for example sake, we will need to prepare your and Alice's accounts. In production scenario, you will need to dynamically pass this in and allow users to sign in their device interfaces.

Do note that you will need to have already set up:
- A wallet in your machine to simulate yourself as the customer as the customer is the signer of the transaction (similar to how we set up in [Environment Setup](/docs/environment-setup)).
- `trackingAccount` is an additional Solana Account you can pass in to track only Jupiter transactions easily.

#### Set Up Accounts

```jsx
const customerAccount = new Wallet(...);

console.log("customerAccount:", customerAccount.publicKey.toBase58());

const USDC_MINT = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'); // Your preferred token payment

const merchantAccount = new PublicKey('ReplaceWithMerchantPubkey');
// const trackingAccount = new PublicKey('ReplaceWithPubkey');

console.log("USDC_MINT:", USDC_MINT.toBase58());
console.log("merchantAccount:", merchantAccount.toBase58());
// console.log("trackingAccount:", trackingAccount.toBase58());
```

#### Set Up `destinationTokenAccount`

One more thing you will need to set up! Later on, you will need to pass in `destinationTokenAccount` which will be your token account for your preferred token payment mint. **Do note that it is the merchant's token account and it needs to be initialized.**

```jsx
// Get the associated token account for the merchant wallet
const merchantUSDCTokenAccount = await getAssociatedTokenAddress(
	  USDC_MINT,
	  merchantAccount,
	  true,
	  TOKEN_PROGRAM_ID,
	  ASSOCIATED_TOKEN_PROGRAM_ID
);

console.log("merchantUSDCTokenAccount:", merchantUSDCTokenAccount.toBase58());
```

### 2. Set `swapMode` to `ExactOut` in Quote

Next, the merchant have to [Get Quote](./1-get-quote.md) for the customer. We are using the `ExactOut` mode because we know exactly how much output amount (1 USDC) the merchant want to receive but not sure how much input amount the customer should pay with.

By getting a quote first, the customer can know upfront the specific amount of input token before they approve and sign the transaction.

:::warning Limitations of `ExactOut`
Currently, there are some limitations as `ExactOut` is not widely supported across all DEXes.
- Supported DEXes are only Orca Whirlpool, Raydium CLMM, and Raydium CPMM.
- NOT ALL token pairs may be available.
:::

```jsx
const quoteResponse = await (
    await fetch(
        'https://api.jup.ag/swap/v1/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&amount=100000&slippageBps=50&restrictIntermediateTokens=true&swapMode=ExactOut'
    )
  ).json();
  
console.log(JSON.stringify(quoteResponse, null, 2));
```

From the this quote, you should get part of the response like this, where `amount` specified in the query parameter represents the `outAmount` in the response and of course, `swapMode: ExactOut`.

```json
{
    "inputMint": "So11111111111111111111111111111111111111112",
    "inAmount": "4434914",
    "outputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    "outAmount": "1000000",
    "otherAmountThreshold": "4434914",
    "swapMode": "ExactOut",
    ...
}
```

### 3. Set `destinationTokenAccount` in Swap

The merchant then retrieves the serialized swap transaction, but the merchant need to specify the `destinationTokenAccount` in the parameters — this will build the swap transaction to swap but send to the [merchant's specified token account which we defined earlier](#set-up-destinationtokenaccount).

The `destinationTokenAccount` should be the merchant’s token account to receive the payment in. Also do note that `customerAccount` should be accounted for. **You can refer to the [Build Swap Transaction](./2-build-swap-transaction.md) guide for other parameters to be passed in.**

```jsx
const swapResponse = await (
    await fetch('https://api.jup.ag/swap/v1/swap', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            quoteResponse,
            userPublicKey: customerAccount.publicKey.toBase58(),
            destinationTokenAccount: merchantUSDCTokenAccount.toBase58(),
            // trackingAccount: trackingAccount.toBase58(),
        })
    })
).json();

console.log(swapResponse);
```

### 4. Prepare Transaction

We have walked through the steps here and explained some of the code, you can refer to [Send Swap Transaction - Prepare Transaction](./3-send-swap-transaction.md#prepare-transaction). The main difference for payments is to ensure that the customer is the fee payer (the merchant can be generous and be the fee payer too!) and the signer.

```jsx
const transactionBase64 = swapResponse.swapTransaction
const transaction = VersionedTransaction.deserialize(Buffer.from(transactionBase64, 'base64'));

transaction.feePayer = customerAccount.publicKey;

transaction.sign([customerAccount.payer]);

const transactionBinary = transaction.serialize();
```

### 5. Send Transaction

We have walked through the steps here and explained some of the code, you can refer to [Send Swap Transaction - Send Transaction](./3-send-swap-transaction.md#send-transaction). The main difference for payments is, you might want to try adjusting `maxRetries` to a higher count as it is not time sensitive and ideally this is used with tighter slippage and ensuring the `inputMint` is not too unstable.

Do note that more retries will cause the user to wait slightly longer, so find the balance between the two. Read more here: https://solana.com/docs/advanced/retry.

```jsx
const signature = await connection.sendRawTransaction(transactionBinary, {
    maxRetries: 10,
    preflightCommitment: "finalized",
});
  
const confirmation = await connection.confirmTransaction({ signature }, "finalized");

if (confirmation.value.err) {
    throw new Error(`Transaction failed: ${JSON.stringify(confirmation.value.err)}\nhttps://solscan.io/${signature}/`);
} else console.log(`Transaction successful: https://solscan.io/tx/${signature}/`);
```

The succeeded Swap Transaction should show:
- Token A swaps from the customer's token account
- Token A swap to Token B
- Token B sends to the merchant's token account

[If transactions are not landing well, you can refer to this section.](./3-send-swap-transaction.md#oh-transaction-not-landing)
