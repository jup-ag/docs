---
sidebar_label: Adding Fees
description: Enhance your platform revenue by adding customizable fees to Jupiter swap using the Jupiter API. Learn how to implement it effortlessly!
title: Adding Your Own Fee To Jupiter Swap
---

<head>
    <title>Add Fees to Jupiter API: Enhance Your Platform Revenue Seamlessly</title>
    <meta name="twitter:card" content="summary" />
</head>

<style jsx>
{`
  .api-method-box {
    border-radius: 8px;
    margin: 16px 0;
    display: inline;
    padding: 4px;
    font-weight: 700;
    margin-right: 8px;
    font-size: 12px;
    color: white
  }

.get {
  border: 1px solid #018847;
  background-color: #018847 !important;
}

.post {
  border: 1px solid #eaba0c;
  background-color: #eaba0c !important;
}

  .api-method-path {
    font-size: 14px;
    display: inline;
  }
`}</style>

![cat_flying](./cat_flying_money.png)

:::warning No need to use referral program
As of January 2025, you do not need to use the Referral program to add fees to your Jupiter Swap.

You can simply pass in **any** token account to the `feeAccount` parameter in `/swap` endpoint to indicate which mint and token account to send the fees to. (You still need to add `platformFeeBps` in `/quote`)

- For Exact In, both input or output mint of the swap can be used to take fees.
- For Exact Out, only the input mint can be used to take fees.
- It does not support Token2022.
:::

The Referral Program is an open source program by Jupiter to provide referral fees for integrators who are integrating Jupiter Swap and Jupiter Limit Order. You can check out the code [here](https://github.com/TeamRaccoons/referral) to gain a better understanding of how it works.

By default, there are no protocol fees on Jupiter. Integrators have the option to introduce a platform fee on swaps. The platform fee is provided in basis points, e.g. **20 bps** for **0.2%** of the token input or output. If a platform fee is set by an integrator, Jupiter **will take 2.5%** of the platform fee charged by the integrators. It doesn't support Token2022 tokens.

## Usage

### Jupiter API

#### 1. Obtain a referral account

Go to the [referral dashboard](https://referral.jup.ag/dashboard) to create your referral account. After creating your referral account, remember to find your `Referral Key` on the page. This is your referral account public key. You'll need this to gather platform fees.

#### 2. Set your referral fee

Setting your referral fee with the Jupiter API is simple. You just add in the `platformFeeBps` parameter to the `GET /quote` endpoint:

<details>
  <summary>
    <div>
      <div className="api-method-box get">GET</div>
      <p className="api-method-path">https://quote-api.jup.ag/v6/quote</p>
    </div>
  </summary>

**Parameters in use in the below code example:**

- `inputMint`: The mint address of the input token.
- `outputMint`: The mint address of the output token.
- `amount`: The amount of input tokens to be swapped.
- `slippage`: The maximum allowable slippage for the swap.
- `platformFeeBps`: Basis points of the fee to be added.

```shell
curl -G "https://quote-api.jup.ag/v6/quote" \
     --data-urlencode "inputMint=So11111111111111111111111111111111111111112" \
     --data-urlencode "outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" \
     --data-urlencode "amount=100000000" \
     --data-urlencode "slippageBps=50" \
     --data-urlencode "platformFeeBps=20"
```

</details>

```js
// Function to swap SOL to USDC with input 0.1 SOL and 0.5% slippage
async function getQuote() {
  try {
    // Create a new URL object for the quote API endpoint
    const url = new URL("https://quote-api.jup.ag/v6/quote");

    // Append query parameters to the URL
    // inputMint: The mint address of the input token (SOL)
    url.searchParams.append(
      "inputMint",
      "So11111111111111111111111111111111111111112"
    );

    // outputMint: The mint address of the output token (USDC)
    url.searchParams.append(
      "outputMint",
      "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
    );

    // amount: The amount of input tokens to be swapped (0.1 SOL in lamports, where 1 SOL = 1,000,000,000 lamports)
    url.searchParams.append("amount", 100000000);

    // slippageBps: The maximum allowable slippage for the swap (0.5% expressed in basis points)
    url.searchParams.append("slippageBps", 50);

    // platformFeeBps: The platform fee to be added (20 basis points)
    url.searchParams.append("platformFeeBps", 20);

    // Perform the fetch request to the constructed URL
    const response = await fetch(url.toString());

    // Check if the response is not OK (status code is not in the range 200-299)
    if (!response.ok) {
      // Throw an error with the status text from the response
      throw new Error(`Error fetching quote: ${response.statusText}`);
    }

    // Parse the response body as JSON
    const quoteResponse = await response.json();

    // Log the parsed response to the console
    console.log({ quoteResponse });
  } catch (error) {
    // Catch any errors that occur during the fetch request or JSON parsing
    // Log the error to the console
    console.error("Failed to get quote:", error);
  }
}

// Call the function to get the quote
getQuote();
```

#### 3. Set your fee token account

On the `POST /swap` endpoint, remember to add your `feeAccount` parameter.

<details>
  <summary>
    <div>
      <div className="api-method-box post">POST</div>
      <p className="api-method-path">https://station.jup.ag/v6/swap</p>
    </div>
  </summary>

**Parameters in use in the below code example:**

- `quoteResponse`: The response object from the `/quote` API.
- `userPublicKey`: The public key of the user initiating the swap.
- `wrapAndUnwrapSol`: Auto wrap and unwrap SOL. Default is true.
- `feeAccount`: The fee account associated with the swap.
- `platformFeeBps`: Basis points of the fee to be added.

```shell
# Example being constructed in code below
curl -X POST "https://quote-api.jup.ag/v6/swap" \
     -H "Content-Type: application/json" \
     -d '{
           "quoteResponse": { /* The quote response from the /quote API */ },
           "userPublicKey": "YourUserPublicKey",
           "wrapAndUnwrapSol": true,
           "feeAccount": "YourFeeAccountPublicKey"
         }'
```

</details>

```js
// Function to find the fee account and get serialized transactions for the swap
async function getFeeAccountAndSwapTransaction(
  referralAccountPubkey,
  mint,
  quoteResponse,
  wallet
) {
  try {
    // Find the fee account program address synchronously
    // Parameters:
    // - Buffer.from("referral_ata"): A buffer containing the string "referral_ata"
    // - referralAccountPubkey.toBuffer(): The buffer representation of the referral account public key
    // - mint.toBuffer(): The buffer representation of the token mint
    // - new PublicKey("REFER4ZgmyYx9c6He5XfaTMiGfdLwRnkV4RPp9t9iF3"): The public key of the Referral Program
    const [feeAccount] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("referral_ata"),
        referralAccountPubkey.toBuffer(),
        mint.toBuffer(),
      ],
      new PublicKey("REFER4ZgmyYx9c6He5XfaTMiGfdLwRnkV4RPp9t9iF3")
    );

    // Construct the request body for the swap API
    const requestBody = {
      quoteResponse, // The quote response from the /quote API
      userPublicKey: wallet.publicKey.toString(), // The user's public key
      wrapAndUnwrapSol: true, // Auto wrap and unwrap SOL (default is true)
      feeAccount, // The fee account obtained from findProgramAddressSync
    };

    // Perform the fetch request to the swap API
    const response = await fetch("https://quote-api.jup.ag/v6/swap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody), // Convert the request body to a JSON string
    });

    // Check if the response is not OK (status code is not in the range 200-299)
    if (!response.ok) {
      // Throw an error with the status text from the response
      throw new Error(`Error performing swap: ${response.statusText}`);
    }

    // Parse the response body as JSON to get the swap transaction
    const { swapTransaction } = await response.json();

    // Log the swap transaction to the console
    console.log({ swapTransaction });

    return swapTransaction; // Return the swap transaction
  } catch (error) {
    // Catch any errors that occur during the fetch request or JSON parsing
    // Log the error to the console
    console.error("Failed to get fee account and swap transaction:", error);
  }
}

// Example usage of the function
// Assuming you have defined referralAccountPubkey, mint, quoteResponse, and wallet elsewhere
getFeeAccountAndSwapTransaction(
  referralAccountPubkey,
  mint,
  quoteResponse,
  wallet
);
```

:::note
The fee token account, it can either be the input mint or the output mint on the swap for ExactIn. For ExactOut, the fee is being taken as the same mint as the input mint. Also, make sure that the fee token account has been created. You can create the fee token account on the referral dashboard. It doesn't support Token2022 tokens.
:::

## Referral Javascript SDK

You can check out the Referral Javascript SDK [here](https://www.npmjs.com/package/@jup-ag/referral-sdk). For a list of methods that you can use, check out the source code [here](https://github.com/TeamRaccoons/referral/blob/main/packages/sdk/src/referral.ts).

There are also examples on how to use the SDK [here](https://github.com/TeamRaccoons/referral/tree/main/example).

:::note
The Jupiter Swap's project account for the Referral Program is `45ruCyfdRkWpRNGEqWzjCiXRHkZs8WXCLQ67Pnpye7Hp`.
:::
