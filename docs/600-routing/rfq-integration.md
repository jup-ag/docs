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
The integration requirements are subjected to change and we are open to suggestions or feedbacks on ways to improve the integration.
:::

## Integration Steps

- Host a service that adheres to our [RFQ API schema](https://github.com/jup-ag/rfq-webhook-toolkit/tree/main/openapi)
- Provide a webhook for Jupiter to send quotes and swap transactions
- Complete end-to-end [integration tests](https://github.com/jup-ag/rfq-webhook-toolkit/tree/main/tests)
- Onboard to Edge before going live on Production

## Integration Notes

### Fulfillment Requirements

To ensure market makers stay competitive and responsive, we enforce a minimum benchmark for fulfillment and response times.

- **Fulfillment**: Market makers are expected to comply and fulfill **95%** of the quotes provided within a 1-hour window. If this is not met, the market maker will be turned off.
- **Response Time**: A webhook must respond within **250 ms** of receiving a quote request. If it fails to do so, the RFQ system will proceed with the available quotes at the time.

To resume operations, we will need to manually re-enable your webhook, please reach out to us if this happens.

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

The dynamic fee amount is forwarded to webhooks in the quote request parameters and it is contained in the message that both taker and maker sign ** **(see the payload section above)** **. In manual mode, the fee is a flat 2pbs.

**Fee Calculation**

Webhooks do not need to account for fees when quoting, the fee is applied directly by the RFQ system during transaction building.

- For example, for a quote of 1 SOL to 1,000 USDC with a fee of 100 bps
- Only 990 USDC will be transferred out of the market maker account
- While 10 USDC will be collected as a fee

:::note
The fee is not automatically transferred and will be accounted for asynchronously on a regular basis.

We are looking into a way to automatically account for and transfer the fees. As this will be required when third party integrators of the Ultra API are taking fees.
:::

---

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