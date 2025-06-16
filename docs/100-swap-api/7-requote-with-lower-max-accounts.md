---
sidebar_label: "Requote with Lower Max Accounts"
description: "Requote and adjust max accounts via the Swap API."
title: "Requote with Lower Max Accounts"
---

<head>
    <title>Requote with Lower Max Accounts</title>
    <meta name="twitter:card" content="summary" />
</head>

In some cases where you might be limited or require strict control by adding your own instructions to the swap transaction, you might face issues with exceeding transaction size limit. In this section, we will provide some helping code to help you requote when the transaction size is too large.

:::note
We provide a `maxAccounts` param in the `/quote` endpoint to allow you to reduce the total number of accounts used for a swap - this will allow you to add your own instructions.

[Refer to this section for more information and do note its limitations and important notes before using](/docs/swap-api/get-quote#max-accounts).
:::

:::tip
We recommend `maxAccounts` 64 and start as high as you can, then incrementally reduce when requoting.
:::

## Example Code

**Scenario 1**

In the case where you already know how many bytes you need:
1. Request for quote and the swap transaction as per normal.
2. Serialize the transaction.
3. Use the conditions to check if the transaction is too large.
    1. If too large, requote again with lower max accounts - do note that the route will change.
    2. If it is not too large, proceed to add your instructions, then sign and send to the network.

```jsx
// IF YOU KNOW HOW MANY BYTES YOU ARE ALREADY USING
// For example, if you are already using 320 raw bytes of a transaction
// Hence, the remaining raw bytes left for the swap is 1232 - 320 = 912 bytes
try {
    const transactionUint8Array = transaction.serialize();
    console.log(`Transaction size: ${transactionUint8Array.length} bytes`);
    console.log(transactionUint8Array);

    if (transactionUint8Array.length > 912) {
        console.log(`Quote again with lower max accounts: Transaction is too large at ${transactionUint8Array.length} (>912 bytes) but can still serialize`);
    } else {
        console.log(`Proceed with transaction: Transaction size is at ${transactionUint8Array.length}`)
        // Continue with the swap transaction
        // Add your own instructions to the transaction
        // Sign and send to the network
    }
} catch (error) {
    if (error instanceof RangeError) {
        console.log("Quote again with lower max accounts: Transaction is too large to even serialize (RangeError)");
    } else {
        throw error; // Re-throw if it's not a RangeError
    }
}
```

**Scenario 2**

In the case where you do not know how many bytes you need:
1. Request for quote and the swap transaction as per normal.
2. Add your own instructions and modifications as needed.
3. Simulate the transaction.
4. Use the conditions to check if the transaction is too large.
    1. If too large, requote again with lower max accounts - do note that the route will change.
    2. If it is not too large, proceed to sign and send to the network.

```jsx
// IF YOU DON'T KNOW HOW MUCH BYTES YOU ARE ALREADY USING
// We can add your own instructions to the transaction first
// Then simulate the full transaction
try {
  const transactionUint8Array = transaction.serialize();
  console.log(`Transaction size: ${transactionUint8Array.length} bytes`);

  try {
    const simulatedTransaction = await connection.simulateTransaction(transaction, {
      sigVerify: false,
      commitment: 'confirmed',
      accounts: {
        encoding: 'base64',
        addresses: [wallet.publicKey.toString()],
      },
    });
  } catch (simError) {
    if (simError.message.includes('too large')) {
      console.log(`Quote again with lower max accounts: ${simError.message}`);
    } else {
      console.log(`Error during simulation: ${simError.message}`);
      throw simError;
    }
  }
} catch (error) {
  if (error instanceof RangeError) {
    console.log("Quote again with lower max accounts: Transaction is too large to even serialize (RangeError)");
  } else {
    console.log(`Error during transaction processing: ${error.message}`);
    throw error; // Re-throw if it's not a RangeError
  }
}
```