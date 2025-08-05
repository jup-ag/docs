---
sidebar_label: "Invite Code (Beta)"
description: "Use the Jupiter Universal Send API to gift, pay, or onboard anyone in seconds."
title: "Invite Code (Beta)"
---

<head>
    <title>Invite Code (Beta)</title>
    <meta name="twitter:card" content="summary" />
</head>

:::note
- Lite URL: `https://lite-api.jup.ag/send/v1`
- Pro URL: `https://api.jup.ag/send/v1`

To upgrade to Pro or understand our rate limiting, please refer to this section.
- [API Key Setup](/docs/api-setup)
- [API Rate Limit](/docs/api-rate-limit)
:::

## Caution

The Universal Send API only handles transaction building - which means it only expects and exchanges of parameters/fields such as public key, amount, mint. It does not handle any private/secret key nor invite code.

The generation of invite code and hashing of invite code to determine the private key **is done on the CLIENT SIDE** and the following section will provide the steps before using the API.

:::danger
Handle INVITE CODE and PRIVATE KEY with highest security.

- Any potential threats of invite code or private key being exposed might lead to loss of funds.
- Jupiter is not liable for loss of funds due to leaked invite code or private key.
:::

:::note
**insert recommendations on how to handle invite code and private key**
:::

## Overview

1. Create invite code.
2. From utils, derive the secret key - a deterministic 64-byte Solana secret key (32 bytes private + 32 bytes public key).
3. Create Solana Keypair instance from the secret key.
4. Post request to get Universal Send transaction.
    - If `craft-clawback`, requires an additional `invitePDA` to be passed in.
5. Sign with both sender and recipient keypair, then send transaction and wait for confirmation.

<details>
    <summary>
        Full Utils Code Snippet
    </summary>

```jsx
import crypto from "crypto";
import * as ed from "@noble/ed25519";
import { sha512 } from "@noble/hashes/sha512";
const hashFunction = (...messages) => sha512(ed.etc.concatBytes(...messages));
ed.etc.sha512Sync = hashFunction;

const { createHash } = await import("node:crypto");

// This function creates a random 12-character base58 invite code
// Uses 13 random bytes (~1.4 quintillion possible codes)
export async function create_invite_code() {
  const buf = crypto.randomBytes(13);

  // 58^12 = 1.449225352 e21
  return binary_to_base58(new Uint8Array(buf)).substring(0, 12);
};

// This function converts an invite code to a deterministic private key
// Uses SHA256 hash of `"invite:"` + `invite_code` as the seed
// Returns a 64-byte Solana keypair (32 bytes private + 32 bytes public key)
export function invite_code_to_priv_key(invite_code) {
  // Hash the invite code with a prefix
  const pre_hash = "invite:" + invite_code;
  const sha = createHash("sha256");
  const priv_key = crypto.createHash("sha256").update(pre_hash).digest();

  // Use ed25519 to get the public key
  const pub_key = ed.getPublicKey(new Uint8Array(priv_key));
  const solana_priv_key = new Uint8Array(64);
  solana_priv_key.set(priv_key);
  solana_priv_key.set(pub_key, 32);

  return solana_priv_key;
};

/////////////////////////////////////////////////////////////////////////////////////
// Taken from https://github.com/pur3miish/base58-js
const base58_chars =
  "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const create_base58_map = () => {
  const base58M = Array(256).fill(-1);
  for (let i = 0; i < base58_chars.length; ++i)
    base58M[base58_chars.charCodeAt(i)] = i;

  return base58M;
};

const base58Map = create_base58_map();
export function binary_to_base58(uint8array) {
  const result = [];

  for (const byte of uint8array) {
    let carry = byte;
    for (let j = 0; j < result.length; ++j) {
      const x = (base58Map[result[j]] << 8) + carry;
      result[j] = base58_chars.charCodeAt(x % 58);
      carry = (x / 58) | 0;
    }
    while (carry) {
      result.push(base58_chars.charCodeAt(carry % 58));
      carry = (carry / 58) | 0;
    }
  }

  for (const byte of uint8array)
    if (byte) break;
    else result.push("1".charCodeAt(0));

  result.reverse();

  return String.fromCharCode(...result);
}

export function base58_to_binary(base58String) {
  if (!base58String || typeof base58String !== "string")
    throw new Error(`Expected base58 string but got “${base58String}”`);
  if (base58String.match(/[IOl0]/gmu))
    throw new Error(
      `Invalid base58 character “${base58String.match(/[IOl0]/gmu)}”`
    );
  const lz = base58String.match(/^1+/gmu);
  const psz = lz ? lz[0].length : 0;
  const size =
    ((base58String.length - psz) * (Math.log(58) / Math.log(256)) + 1) >>> 0;

  return new Uint8Array([
    ...new Uint8Array(psz),
    ...base58String
      .match(/.{1}/gmu)
      .map((i) => base58_chars.indexOf(i))
      .reduce((acc, i) => {
        acc = acc.map((j) => {
          const x = j * 58 + i;
          i = x >> 8;
          return x;
        });
        return acc;
      }, new Uint8Array(size))
      .reverse()
      .filter(
        (
          (lastValue) => (value) =>
            (lastValue = lastValue || value)
        )(false)
      ),
  ]);
}
/////////////////////////////////////////////////////////////////////////////////////
```
</details>


<details>
    <summary>
        Full Usage Code Snippet
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

## Prerequisite

### Dependencies

```bash
npm install @solana/web3.js@1 # Using v1 of web3.js instead of v2
npm install dotenv # Useful for testing and handling of invite code and private key
npm install @noble/ed25519
npm install @noble/hashes
```

### Imports

Create a utils file to add these functions

```jsx
import crypto from "crypto";
import * as ed from "@noble/ed25519";
import { sha512 } from "@noble/hashes/sha512";
import { PublicKey } from "@solana/web3.js";

// Configure the ed25519 library to use SHA-512 for internal operations
// This is REQUIRED before using any ed25519 functions like getPublicKey()
// The library needs to know which hash function to use for key derivation and signing
const hashFunction = (...messages) => sha512(ed.etc.concatBytes(...messages));
ed.etc.sha512Sync = hashFunction;

// Import createHash function from Node.js crypto module using dynamic import
// This allows us to use the modern 'node:crypto' protocol for better compatibility
// createHash is used for SHA-256 hashing in the invite code functions
const { createHash } = await import("node:crypto");
```

## Functions

### Create Invite Code

```jsx
// This function creates a random 12-character base58 invite code
// Uses 13 random bytes (~1.4 quintillion possible codes)
export async function create_invite_code() {
  const buf = crypto.randomBytes(13);

  // 58^12 = 1.449225352 e21
  return binary_to_base58(new Uint8Array(buf)).substring(0, 12);
};
```

### Derive Solana Secret Key

```jsx
// This function converts an invite code to a deterministic private key
// Uses SHA256 hash of `"invite:"` + `invite_code` as the seed
// Returns a 64-byte Solana secret key (32 bytes private + 32 bytes public key)
export function invite_code_to_priv_key(invite_code) {
  // Hash the invite code with a prefix
  const pre_hash = "invite:" + invite_code;
  const sha = createHash("sha256");
  const priv_key = crypto.createHash("sha256").update(pre_hash).digest();

  // Use ed25519 to get the public key
  const pub_key = ed.getPublicKey(new Uint8Array(priv_key));
  const solana_priv_key = new Uint8Array(64);
  solana_priv_key.set(priv_key);
  solana_priv_key.set(pub_key, 32);

  return solana_priv_key;
};
```

### Convert Binary To Base58

```jsx
/////////////////////////////////////////////////////////////////////////////////////
// Taken from https://github.com/pur3miish/base58-js
const base58_chars =
  "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const create_base58_map = () => {
  const base58M = Array(256).fill(-1);
  for (let i = 0; i < base58_chars.length; ++i)
    base58M[base58_chars.charCodeAt(i)] = i;

  return base58M;
};

const base58Map = create_base58_map();
export function binary_to_base58(uint8array) {
  const result = [];

  for (const byte of uint8array) {
    let carry = byte;
    for (let j = 0; j < result.length; ++j) {
      const x = (base58Map[result[j]] << 8) + carry;
      result[j] = base58_chars.charCodeAt(x % 58);
      carry = (x / 58) | 0;
    }
    while (carry) {
      result.push(base58_chars.charCodeAt(carry % 58));
      carry = (carry / 58) | 0;
    }
  }

  for (const byte of uint8array)
    if (byte) break;
    else result.push("1".charCodeAt(0));

  result.reverse();

  return String.fromCharCode(...result);
}

export function base58_to_binary(base58String) {
  if (!base58String || typeof base58String !== "string")
    throw new Error(`Expected base58 string but got “${base58String}”`);
  if (base58String.match(/[IOl0]/gmu))
    throw new Error(
      `Invalid base58 character “${base58String.match(/[IOl0]/gmu)}”`
    );
  const lz = base58String.match(/^1+/gmu);
  const psz = lz ? lz[0].length : 0;
  const size =
    ((base58String.length - psz) * (Math.log(58) / Math.log(256)) + 1) >>> 0;

  return new Uint8Array([
    ...new Uint8Array(psz),
    ...base58String
      .match(/.{1}/gmu)
      .map((i) => base58_chars.indexOf(i))
      .reduce((acc, i) => {
        acc = acc.map((j) => {
          const x = j * 58 + i;
          i = x >> 8;
          return x;
        });
        return acc;
      }, new Uint8Array(size))
      .reverse()
      .filter(
        (
          (lastValue) => (value) =>
            (lastValue = lastValue || value)
        )(false)
      ),
  ]);
}
/////////////////////////////////////////////////////////////////////////////////////
```