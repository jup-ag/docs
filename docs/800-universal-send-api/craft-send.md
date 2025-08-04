---
sidebar_label: "Craft Send (Beta)"
description: "Use the Jupiter Universal Send API to gift, pay, or onboard anyone in seconds."
title: "Craft Send (Beta)"
---

<head>
    <title>Craft Send (Beta)</title>
    <meta name="twitter:card" content="summary" />
</head>

:::note
- Lite URL: `https://lite-api.jup.ag/send/v1`
- Pro URL: `https://api.jup.ag/send/v1`

To upgrade to Pro or understand our rate limiting, please refer to this section.
- [API Key Setup](/docs/api-setup)
- [API Rate Limit](/docs/api-rate-limit)
:::

## Overview

1. Create invite code.
2. From utils, derive the secret key - a deterministic 64-byte Solana secret key (32 bytes private + 32 bytes public key).
3. Create Solana Keypair instance from the secret key.
4. Post request to get Universal Send transaction.
5. Sign with both sender and recipient keypair, then send transaction and wait for confirmation.

:::note
[Please ensure that you have set up the prerequisites](/docs/universal-send-api/invite-code#overview).
:::

<details>
    <summary>
        Full Code Snippet
    </summary>

```jsx
import { create_invite_code, invite_code_to_priv_key } from "./utils.js";
import {
  Connection,
  Keypair,
  VersionedTransaction,
} from "@solana/web3.js";
import fs from "fs";

const connection = new Connection('insert-rpc');
const senderPrivateKey = JSON.parse(fs.readFileSync('/Path/to/sender/id.json', 'utf8').trim());
const sender = Keypair.fromSecretKey(new Uint8Array(senderPrivateKey));

// STEP 1: Create 12-character invite code
const invite_code = await create_invite_code();

// STEP 2: Derive secret key (public and private key)
const secret_key = invite_code_to_priv_key(invite_code);

// STEP 3: Use secret key to create Solana Keypair instance
const recipient = Keypair.fromSecretKey(secret_key);

// STEP 4: Post request for a Universal Send transaction
const craftSendTransaction = await (
    await fetch ('https://lite-api.jup.ag/send/v1/craft-send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            inviteSigner: recipient.publicKey.toBase58(),
            sender: sender.publicKey.toBase58(),
            amount: "10000000", // atomic amount before decimals
            // mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // Defaults to SOL if `mint` is not provided
        }, null, 2)
    })
).json();

// STEP 5: Use sender and receipient keypair to sign and send to network
const transaction = VersionedTransaction.deserialize(Buffer.from(craftSendTransaction.tx, 'base64'));
transaction.sign([sender, recipient]); // SIGN with both SENDER and RECIPIENT keypair
const transactionBinary = transaction.serialize();
const blockhashInfo = await connection.getLatestBlockhashAndContext({ commitment: "confirmed" });

const signature = await connection.sendRawTransaction(transactionBinary, {
  maxRetries: 0,
  skipPreflight: true,
});

// Log the signature immediately after sending, before confirmation
console.log(`Transaction sent: https://solscan.io/tx/${signature}`);
  
try {
  const confirmation = await connection.confirmTransaction({
    signature,
    blockhash: blockhashInfo.value.blockhash,
    lastValidBlockHeight: blockhashInfo.value.lastValidBlockHeight,
  }, "confirmed");

  if (confirmation.value.err) {
    console.error(`Transaction failed: ${JSON.stringify(confirmation.value.err)}`);
    console.log(`Examine the failed transaction: https://solscan.io/tx/${signature}`);
  } else {
    console.log(`Transaction successful: https://solscan.io/tx/${signature}`);
  };
} catch (error) {
  console.error(`Error confirming transaction: ${error}`);
  console.log(`Examine the transaction status: https://solscan.io/tx/${signature}`);
};
```
</details>

## Imports

```jsx
import { create_invite_code, invite_code_to_priv_key } from "./utils.js";
import {
  Connection,
  Keypair,
} from "@solana/web3.js";
import fs from "fs";

const connection = new Connection('insert-rpc');
const senderPrivateKey = JSON.parse(fs.readFileSync('/Path/to/sender/id.json', 'utf8').trim());
const sender = Keypair.fromSecretKey(new Uint8Array(senderPrivateKey));
```

## Create Invite Code

```jsx
// STEP 1: Create 12-character invite code
const invite_code = await create_invite_code();

// STEP 2: Derive secret key (public and private key)
const secret_key = invite_code_to_priv_key(invite_code);

// STEP 3: Use secret key to create Solana Keypair instance
const recipient = Keypair.fromSecretKey(secret_key);
```

## Craft Send

:::note API Params
- The `amount` is in its atomic value before applying decimals, e.g. 1 USDC is 1_000_000.
- The `mint` defaults to SOL if not provided, if provided it can be any token mint.
:::

:::note Signing and sending
- After getting the transaction, you need to sign with **both sender and recipient** keypair.
- You can send the transaction to the network via any method.
:::

```jsx
// STEP 4: Post request for a Universal Send transaction
const craftSendTransaction = await (
    await fetch ('https://lite-api.jup.ag/send/v1/craft-send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            inviteSigner: recipient.publicKey.toBase58(),
            sender: sender.publicKey.toBase58(),
            amount: "10000000",
            // mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        }, null, 2)
    })
).json();
```
