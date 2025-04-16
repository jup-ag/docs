---
sidebar_label: "Jupiter Z (RFQ)"
description: "Integrate your DEX into Jupiter."
title: "RFQ Integration"
---

<head>
    <title>RFQ Integration</title>
    <meta name="twitter:card" content="summary" />
</head>

This section will cover the integration of your RFQ service into Jupiter's routing system.

:::caution
The integration requirements are subjected to change and please provide suggestions or feedbacks on ways to improve the integration process.
:::

<img src="/dev/rfq-flow.png" alt="RFQ Flow" width="700" />

## Integration Prerequisites

- Host a service that adheres to our RFQ API schema
- Provide a webhook for Jupiter to send quotes and swap transactions
- Complete end-to-end integration tests
- When ready, you will be onboarded to Edge before going live on production

:::note
[Please reach out to us in Discord](https://discord.gg/jup)
- If you are interested to participate in Jupiter Z
- If you need any help or clarification regarding the integration.
- To begin onboarding to Edge.
:::

### Example Integration

To facilitate the integration, we provide an [integration SDK in this repository](https://github.com/jup-ag/rfq-webhook-toolkit).

- [**Sample server**](https://github.com/jup-ag/rfq-webhook-toolkit/tree/main/server-example/): Implements the webhook API in Rust.
- [**API Schema**](https://github.com/jup-ag/rfq-webhook-toolkit/tree/main/openapi): OpenAPI schema for the RFQ API.
- [**Integration tests**](https://github.com/jup-ag/rfq-webhook-toolkit/tree/main/tests/): Verify the implementation of the webhook.
- [**Troubleshooting**](https://github.com/jup-ag/rfq-webhook-toolkit/tree/main/tests/README.md#troubleshooting): Common issues that arise during integration.

---

### RFQ API Schema

To facilitate the integration into Jupiter's RFQ module, you will need to provide a webhook for us to register the quotation and swap endpoints with the corresponding request and response format.

| Endpoint | Method | URL | Description |
|----------|--------|-----|-------------|
| Base URL | - | `https://your-api-endpoint.com/jupiter/rfq` | Example URL that we will register into our API. |
| Quote | POST | `https://your-api-endpoint.com/jupiter/rfq/quote` | Called to request quotes. |
| Swap | POST | `https://your-api-endpoint.com/jupiter/rfq/swap` | Called to execute swaps. |
| Tokens | GET | `https://your-api-endpoint.com/jupiter/rfq/tokens` | Called periodically to fetch supported tokens ([see the token section below](#advertising-supported-tokens)). |

:::note API Key
If you require an API key to access your endpoints, please provide it to us during the registration process. The API Key will be passed to the webhook as a header `X-API-KEY`.
:::

---

### Response Codes

Market Makers should return appropriate HTTP status codes along with error messages.

| Status Code | Description |
|--------------|-------------|
| `200 OK` | The request was successful, and the webhook will return a quote. |
| `404 Not Found` | The webhook will not return a quote for this request (e.g. the pair or the size are not supported). |
| `400 Bad Request` | The request sent to the webhook is malformed (e.g. missing an expected parameter). |
| `401 Unauthorized` | Authorization failed. For example the `X-API-KEY` is missing or incorrect. |
| `50x Server Errors` | The webhook is offline or unable to respond. If the status persist, the webhook will be temporarily suspended and will not receive requests. |

:::note Timeouts
A webhook must adhere to the [fullfillment and response time requirements](#fulfillment-requirements). When sending the quote request, the RFQ system includes the following headers:

| Header | Description |
|--------|-------------|
| `x-request-start` | The millisecond timestamp indicating when the request was sent. |
| `x-request-timeout` | The millisecond timeout for the request (currently set to 250 ms). |
:::

## Integration Notes

### Order Engine

The RFQ functionality depends on the mainnet deployment of the [Order Engine Program](https://solscan.io/account/61DFfeTKM7trxYcPQCM78bJ794ddZprZpAwAnLiwTpYH) for order fulfillment.

- **Source Code**: The program's source is located in the [programs/order-engine](https://github.com/jup-ag/rfq-webhook-toolkit/tree/main/programs/order-engine) directory.
- **IDL**: The Interface Definition Language (IDL) file is available [here](https://github.com/jup-ag/rfq-webhook-toolkit/tree/main/idls).

---

### Fulfillment Requirements

To ensure market makers stay competitive and responsive, we enforce a minimum benchmark for fulfillment and response times.

- **Fulfillment**: Market makers are expected to comply and fulfill **95%** of the quotes provided within a 1-hour window. If this is not met, the market maker will be turned off.
- **Response Time**: A webhook must respond within **250 ms** of receiving a quote request. If it fails to do so, the RFQ system will proceed with the available quotes at the time.

:::caution
To resume operations, we will need to manually re-enable your webhook, please reach out to us if this happens.
:::

:::danger need clarification
are we penalizing the market maker if they consistently take more than 250ms to respond?
:::

---

### Expiry

We enforce a fixed expiry timing flow for all quotes and transactions. This simplifies the integration by removing the need for market makers to specify custom expiry times in quote requests, providing consistent behavior across all quotes and transactions, and establishing clear timeout boundaries at different stages of the flow.

**Breakdown of the expiry flow:**

- **Total of 50 seconds**: Transaction expiry time
- **1st 25 seconds**: Reserved for the webhook to verify, sign, and send the transaction on-chain
- **2nd 25 seconds**: Allocated for the user to accept the quote

:::note
The frontend automatically re-quotes every 5 seconds.
:::

:::caution
These expiry thresholds may be adjusted based on performance and feedback.
:::

---

### Fees

Jupiter RFQ allows MMs a way to provide liquidity, adjust their quotes without being subject to the volatility of on-chain gas prices or chain health. RFQ fills are also much less CU intensive (< 10x) compared to AMM swaps, and can save gas in the long run on fills. Today, RFQ, when operating in Ultra mode, charges a dynamic fee that is selected based on factors like tokens and size.

**Dynamic Fee**

The dynamic fee amount is forwarded to webhooks in the quote request parameters and it is contained in the message that both taker and maker sign ([see the payload section below](#non-standard-payload)). In manual mode, the fee is a flat 2pbs.

**Fee Calculation**

Webhooks do not need to account for fees when quoting, the fee is applied directly by the RFQ system during transaction building.

- For example, for a quote of 1 SOL to 1,000 USDC with a fee of 100 bps
- Only 990 USDC will be transferred out of the market maker account
- While 10 USDC will be collected as a fee

:::note
The fee is not automatically transferred and will be accounted for asynchronously on a regular basis.

This is subject to change in the future.
:::

---

### Non-standard payload
The transaction data includes, beside the instruction data for the order-engine, 3 additional bytes that are appended to the instruction data. These bytes are not processed by the program and are only information and to be consumed by an off-chain consumer. The first 2 bytes contains the fee amount in basis points (u16) and the third byte (u8) is a bit mask where the least significant bit indicates if the swap is exact-in (0) or exact-out (1).

---

### Advertising Supported Tokens

In order to receive relevant quote requests, market makers need to advertise the tokens they support. This is done by providing a list of supported tokens in the response to the `/tokens` route. The response should be a JSON array of token addresses. The list of tokens is refreshed every 10 minutes.

## FAQ

**Does RFQ support native SOL?**

Yes, native SOL is fully supported in the order-engine program for both the taker (user) and the maker. However, for now, we assume the maker will use WSOL (Wrapped SOL).

**Do faster quotes receive priority?**

No, the RFQ system dispatches the quote request to all registered webhooks simultaneously. All quotes received within the quote timeout are compared to select the best one. The selection prioritizes the quote value first (In the unlikely scenario where two quotes have identical values, the quote from the webhook with the faster response time will be actually prioritized).

**Shall a webhook verify swap requests?**

Yes, the RFQ system will verify the swap requests before forwarding them to the webhooks. However, webhooks are encouraged to verify the swap requests as well to ensure the integrity of the system. The checks that the RFQ system performs can be found in the [validate_similar_fill_sanitized_message](https://github.com/jup-ag/rfq-webhook-toolkit/blob/de46a38c3cfbda730c026a9b4bea85591c83f9e5/order-engine-sdk/src/fill.rs#L151) function.

**Is there a penalty for not providing a quote (status code 404)?**

No, there is no penalty. It is up to the webhook to decide whether to respond with a quote (`200 OK`) or indicate that it cannot provide one (`404 Not Found`).

For example, suppose a webhook provides quotes for USDC/SOL only within a range of 100 to 1000 USDC. If it receives a quote request for 10 USDC → SOL, it will respond with `404 Not Found`, since the amount is outside its quoting range.

In another case, a webhook may only support one-way quotes (USDC → SOL) but not SOL → USDC. If it receives a request for SOL → USDC, it will also return `404 Not Found`.

**Is there a fee applied to stable-to-stable swaps?**

No. Stable to stable swaps are exempt from fees.