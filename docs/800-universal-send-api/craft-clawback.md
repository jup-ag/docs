---
sidebar_label: "Craft Clawback (Beta)"
description: "Use the Jupiter Universal Send API to gift, pay, or onboard anyone in seconds."
title: "Craft Clawback (Beta)"
---

<head>
    <title>Craft Clawback (Beta)</title>
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

1. Load invite code.
2. Load public key from invite.
3. Find the [Program Derived Address (PDA)](https://solana.com/docs/core/pda) of the invite.
    - Uses `"invite"` and the public key of recipient at seed.
4. Post request to get Clawback transaction.
5. Sign with sender keypair, then send transaction and wait for confirmation.

:::note
[Please ensure that you have set up the prerequisites](/docs/universal-send-api/invite-code#overview).
:::

<details>
    <summary>
        Full Code Snippet
    </summary>

```jsx
import { invite_code_to_priv_key } from "./utils.js";
import {
  Connection,
  Keypair,
  PublicKey,
  VersionedTransaction,
} from "@solana/web3.js";
import fs from "fs";

const connection = new Connection('insert-rpc');
const senderPrivateKey = JSON.parse(fs.readFileSync('/Path/to/sender/id.json', 'utf8').trim());
const sender = Keypair.fromSecretKey(new Uint8Array(senderPrivateKey));
process.loadEnvFile('.env');

// STEP 1: Load invite code
const invite_code = process.env.INVITE_CODE;

// STEP 2: Load the public key from the invite code
const secret_key = invite_code_to_priv_key(invite_code);
const pubkey = Keypair.fromSecretKey(secret_key).publicKey;

// STEP 3: Find the Program Derived Address (PDA) for the invite
// Uses `"invite"` as seed + the public key
// PDAs are deterministic addresses owned by the program
const invite_pda = PublicKey.findProgramAddressSync(
    [Buffer.from("invite"), pubkey.toBuffer()],
    new PublicKey("inv1tEtSwRMtM44tbvJGNiTxMvDfPVnX9StyqXfDfks")
  )[0];

// STEP 4: Post request for a Clawback transaction
const craftClawbackTransaction = await (
    await fetch ('https://lite-api.jup.ag/send/v1/craft-clawback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            invitePDA: invite_pda.toBase58(),
            sender: sender.publicKey.toBase58(),
        }, null, 2)
    })
).json();

// STEP 5: Use sender keypair to sign and send to network
const transaction = VersionedTransaction.deserialize(Buffer.from(craftClawbackTransaction.tx, 'base64'));
transaction.sign([sender]); // SIGN with SENDER
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
  }
} catch (error) {
  console.error(`Error confirming transaction: ${error}`);
  console.log(`Examine the transaction status: https://solscan.io/tx/${signature}`);
}
```
</details>

## Imports

```jsx
import { invite_code_to_priv_key } from "./utils.js";
import {
  Connection,
  Keypair,
  PublicKey,
  VersionedTransaction,
} from "@solana/web3.js";
import fs from "fs";

const connection = new Connection('insert-rpc');
const senderPrivateKey = JSON.parse(fs.readFileSync('/Path/to/sender/id.json', 'utf8').trim());
const sender = Keypair.fromSecretKey(new Uint8Array(senderPrivateKey));
process.loadEnvFile('.env');
```

## Invite Code and Public Key

```jsx
// STEP 1: Load invite code
const invite_code = process.env.INVITE_CODE;

// STEP 2: Load the public key from the invite code
const secret_key = invite_code_to_priv_key(invite_code); // Follow the utils.js guide
const pubkey = Keypair.fromSecretKey(secret_key).publicKey;
```

## Invite PDA

```jsx
// STEP 3: Find the Program Derived Address (PDA) for the invite
// Uses `"invite"` as seed + the public key
// PDAs are deterministic addresses owned by the program
const invite_pda = PublicKey.findProgramAddressSync(
    [Buffer.from("invite"), pubkey.toBuffer()],
    new PublicKey("inv1tEtSwRMtM44tbvJGNiTxMvDfPVnX9StyqXfDfks")
  )[0];
```

## Craft Clawback

:::note
The clawback will return the full amount including leftover transaction fees and/or rent back to the sender.
:::

```jsx
// STEP 4: Post request for a Clawback transaction
const craftClawbackTransaction = await (
    await fetch ('https://lite-api.jup.ag/send/v1/craft-clawback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            invitePDA: invite_pda.toBase58(),
            sender: sender.publicKey.toBase58(),
        }, null, 2)
    })
).json();
```