---
sidebar_label: "FAQ"
description: "Frequently asked questions about Jupiter RFQ integration"
title: "Frequently Asked Questions"
---

<head>
    <title>Jupiter RFQ FAQ</title>
    <meta name="twitter:card" content="summary" />
</head>

# Frequently Asked Questions

This section answers common questions about Jupiter RFQ webhook integration, covering technical implementation, business considerations, and operational aspects.

## General Questions

### What is Jupiter RFQ?

Jupiter RFQ (Request for Quote) is a system that allows market makers to provide liquidity for token swaps through competitive quotes. Instead of using automated market makers (AMMs), users receive quotes directly from registered market makers, often resulting in better prices and lower computational costs.

### Why should I integrate with Jupiter RFQ?

- **Lower computational costs**: RFQ fills are 10x less CU intensive than AMM swaps
- **Better pricing control**: Set your own spreads and manage inventory actively  
- **Reduced gas volatility**: Not subject to on-chain gas price fluctuations
- **Access to Jupiter's user base**: Tap into one of Solana's largest trading platforms

### How do I get started?

1. **Build your webhook**: Implement the three required endpoints (`/tokens`, `/quote`, `/swap`)
2. **Test thoroughly**: Use our acceptance and integration test suites
3. **Contact Jupiter**: Reach out to [Jo on Telegram](https://t.me/biuu0x) to register
4. **Go live**: After verification, your webhook will be added to production

## Technical Implementation

### Does RFQ support native SOL?

**Yes**, native SOL is fully supported for both takers (users) and makers. However, market makers should use **WSOL (Wrapped SOL)** in their systems. The order engine program automatically handles SOL wrapping/unwrapping as needed.

```javascript
// Market makers should work with WSOL
const WSOL_MINT = "So11111111111111111111111111111111111111112";

// The system automatically handles native SOL for users
```

### Do I need to account for fees when providing quotes?

**No**, you don't need to account for Jupiter's platform fees when generating quotes. The RFQ system applies fees automatically during transaction building.

**Example:**
- Your quote: 1 SOL → 1000 USDC
- With 100 bps (1%) fee: User receives 990 USDC, 10 USDC collected as fee
- You only transfer 990 USDC, not 1000 USDC

### Should I verify swap requests?

**Yes**, you should always verify swap requests even though Jupiter's RFQ system also performs verification. This provides an additional layer of security and helps ensure transaction integrity.

The Jupiter SDK provides a validation function:
```javascript
import { validateSimilarFillSanitizedMessage } from '@jup-ag/order-engine-sdk';

// Use Jupiter's validation function
const isValid = await validateSimilarFillSanitizedMessage({
  transaction: parsedTx,
  quote: quote,
  userPublicKey: userPublicKey,
  makerPublicKey: YOUR_MAKER_PUBLIC_KEY
});
```

### What happens if I don't provide a quote (return 404)?

**No penalty**. It's perfectly acceptable to return `404 Not Found` when you cannot provide a quote. This is expected behavior for scenarios like:

- **Unsupported pairs**: You only trade certain token combinations
- **Size limitations**: Amount is outside your quoting range
- **Market conditions**: Temporarily unable to provide competitive quotes
- **Liquidity constraints**: Insufficient inventory for the requested amount

**Example scenarios:**
```javascript
// Pair not supported
if (!supportedPairs.includes(`${inputMint}-${outputMint}`)) {
  return res.status(404).json({ error: "Pair not supported" });
}

// Amount outside range
if (amount < MIN_QUOTE_SIZE || amount > MAX_QUOTE_SIZE) {
  return res.status(404).json({ error: "Amount outside quoting range" });
}
```

### Do faster quotes receive priority?

**No**, quote speed doesn't affect selection priority. Jupiter dispatches quote requests to all registered webhooks simultaneously and waits for the 250ms timeout. All quotes received within the timeout are compared, and the **best quote value** is selected.

However, if two quotes have identical values (unlikely), the faster response will be prioritized as a tiebreaker.

### Are there fees for stable-to-stable swaps?

**No**, stable-to-stable swaps are exempt from Jupiter's platform fees. Examples of stable-to-stable pairs include:
- USDC ↔ USDT
- USDC ↔ USDH  
- USDT ↔ USDH

### How long do quotes remain valid?

Quotes have a **50-second expiry** from creation time:
- **25 seconds** reserved for market maker to verify, sign, and submit transaction
- **25 seconds** allocated for user to accept the quote
- **Frontend auto-refresh**: New quotes are requested every 5 seconds

This fixed expiry system simplifies integration by removing the need for custom expiry management.

## Operational Questions

### What are the performance requirements?

#### Response Time Requirements
- **Quote requests**: Maximum 250ms response time
- **Swap requests**: Maximum 25 seconds response time

#### Success Rate Requirements  
- **95% fulfillment rate** for accepted quotes
- Falling below 95% in a 1-hour window results in temporary suspension

#### Uptime Requirements
- High availability expected (99.9%+ uptime recommended)
- Consistent 5xx errors will result in temporary suspension

### What happens if my webhook goes offline?

- **Temporary outages**: Jupiter automatically routes traffic to available webhooks
- **Extended outages**: Your webhook will be temporarily suspended from receiving requests
- **Recovery**: Contact the Jupiter team to re-enable your webhook once issues are resolved

### How is quote selection handled?

Jupiter selects quotes based on:
1. **Best value for user**: Highest output amount (ExactIn) or lowest input amount (ExactOut)
2. **Quote simulation**: All quotes must pass transaction simulation
3. **Tiebreaker**: If values are identical, faster response wins

### Can I update my supported tokens dynamically?

**Yes**, Jupiter calls your `/tokens` endpoint every 10 minutes to refresh the supported token list. You can:

- Add new tokens by including them in your response
- Remove tokens by excluding them from your response
- Temporarily disable pairs based on liquidity or market conditions

```javascript
app.get('/tokens', async (req, res) => {
  // Dynamic token list based on current liquidity
  const tokensWithLiquidity = await getTokensWithSufficientLiquidity();
  res.json(tokensWithLiquidity);
});
```

## Business and Compliance

### What are the regulatory considerations?

- **Jurisdiction compliance**: Ensure compliance with your local regulations
- **AML/KYC**: Implement appropriate anti-money laundering procedures
- **Licensing**: Verify if market making requires licenses in your jurisdiction
- **Reporting**: Maintain records for regulatory reporting requirements

### How do I handle risk management?

#### Position Limits
```javascript
// Implement position size limits
const MAX_POSITION_SIZE = {
  'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v': 1000000 * 1e6, // 1M USDC
  'So11111111111111111111111111111111111111112': 10000 * 1e9,   // 10K SOL
};

function checkPositionLimit(token, amount) {
  const currentPosition = getCurrentPosition(token);
  const limit = MAX_POSITION_SIZE[token];
  return (currentPosition + amount) <= limit;
}
```

#### Price Deviation Monitoring
```javascript
// Monitor for unusual price movements
function isPriceWithinBounds(inputMint, outputMint, price) {
  const marketPrice = getMarketPrice(inputMint, outputMint);
  const deviation = Math.abs(price - marketPrice) / marketPrice;
  const MAX_DEVIATION = 0.05; // 5% maximum deviation
  
  return deviation <= MAX_DEVIATION;
}
```

### What about inventory management?

#### Real-time Balance Monitoring
```javascript
class InventoryManager {
  constructor() {
    this.updateInterval = setInterval(() => {
      this.updateBalances();
    }, 10000); // Update every 10 seconds
  }
  
  async updateBalances() {
    for (const token of supportedTokens) {
      const balance = await getTokenBalance(token);
      this.balances.set(token, balance);
      
      // Alert if below minimum threshold
      if (balance < this.getMinimumBalance(token)) {
        this.alertLowInventory(token, balance);
      }
    }
  }
}
```

#### Hedging Strategies
- **Delta hedging**: Automatically hedge positions through other venues
- **Inventory limits**: Set maximum position sizes per token
- **Rebalancing**: Implement automated rebalancing logic

## Technical Support

### How do I debug quote issues?

1. **Check logs**: Review webhook request/response logs
2. **Validate simulation**: Ensure quotes pass Jupiter's simulation
3. **Test manually**: Use the edge UI for manual testing
4. **Monitor metrics**: Track response times and success rates

### What information should I provide when seeking help?

When contacting support, include:
- **Webhook URL**: Your registered endpoint
- **Error messages**: Exact error messages and stack traces
- **Request examples**: Sample requests and responses
- **Performance data**: Response times and success rates
- **Environment details**: Server specifications and network setup

### How do I report issues?

1. **GitHub Issues**: [Create an issue](https://github.com/jup-ag/rfq-webhook-toolkit/issues)
2. **Telegram**: Contact [Jo directly](https://t.me/biuu0x)
3. **Email**: Include detailed information and logs

## Advanced Topics

### Can I customize transaction building in the future?

Currently, Jupiter RFQ crafts all transactions, but **future plans include allowing market makers to craft their own transactions** with a set of whitelisted instructions. This would provide more flexibility for complex trading strategies.

### Will Jupiter help with transaction submission?

Jupiter is considering **helping market makers land transactions on-chain** in the future. This could be beneficial for market makers who prefer not to handle transaction submission themselves.

### How does the order engine program work?

- **Mainnet deployment**: [61DFfeTKM7trxYcPQCM78bJ794ddZprZpAwAnLiwTpYH](https://solscan.io/account/61DFfeTKM7trxYcPQCM78bJ794ddZprZpAwAnLiwTpYH)
- **Source code**: Available in the [programs/order-engine](https://github.com/jup-ag/rfq-webhook-toolkit/tree/main/programs/order-engine) directory
- **IDL**: Interface Definition Language file in [idls directory](https://github.com/jup-ag/rfq-webhook-toolkit/tree/main/idls)
- **Audit**: [Offside Labs audit report](https://github.com/jup-ag/rfq-webhook-toolkit/blob/main/audits/Jupiter-RFQ-Nov-2024-OffsideLabs.pdf)

### What about the non-standard payload?

The transaction includes 3 additional bytes of metadata:
- **Bytes 1-2**: Fee amount in basis points (u16)
- **Byte 3**: Bit mask where LSB indicates swap type (0=ExactIn, 1=ExactOut)

This data is for off-chain consumption only and isn't processed by the on-chain program.

## Still Have Questions?

- **Documentation**: Browse other sections of this documentation
- **Sample Code**: Check the [server-example](https://github.com/jup-ag/rfq-webhook-toolkit/tree/main/server-example) directory
- **Community**: Join discussions in Jupiter's community channels
- **Direct Support**: Contact [Jo on Telegram](https://t.me/biuu0x) for specific integration questions
