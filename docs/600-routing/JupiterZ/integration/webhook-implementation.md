---
sidebar_label: "Webhook Implementation"
description: "Step-by-step webhook implementation guide for Jupiter RFQ"
title: "Webhook Implementation"
---

<head>
    <title>Jupiter RFQ Webhook Implementation</title>
    <meta name="twitter:card" content="summary" />
</head>

# Webhook Implementation

This guide walks you through implementing the required webhook endpoints for Jupiter RFQ integration.

## Endpoint Requirements

### 1. Tokens Endpoint (`GET /tokens`)

This endpoint advertises the tokens your market maker supports. Jupiter calls this endpoint every 10 minutes to refresh the token list.

**Response Format:**
```json
[
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC
  "So11111111111111111111111111111111111111112",  // SOL
  "mSoLzYCxHdYgdziU2hgzX6qHJwXaTNFRGZQ7CWt5qKZ"   // mSOL
]
```

:::tip
Only advertise tokens for which you have sufficient liquidity and can maintain the required 95% fulfillment rate.
:::

### 2. Quote Endpoint (`POST /quote`)

Receives quote requests and returns competitive pricing.

**Request Format:**
```json
{
  "inputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  "outputMint": "So11111111111111111111111111111111111111112",
  "amount": "1000000",
  "swapMode": "ExactIn",
  "slippageBps": 50
}
```

**Response Format:**
```json
{
  "inputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  "outputMint": "So11111111111111111111111111111111111111112", 
  "inAmount": "1000000",
  "outAmount": "4500000",
  "priceImpactPct": "0.1"
}
```

### 3. Swap Endpoint (`POST /swap`)

Receives swap execution requests with transaction data.

**Request Format:**
```json
{
  "quote": {
    "inputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    "outputMint": "So11111111111111111111111111111111111111112",
    "inAmount": "1000000", 
    "outAmount": "4500000"
  },
  "transaction": "base64-encoded-transaction-data",
  "quoteId": "unique-quote-identifier"
}
```

**Response Format:**
```json
{
  "txid": "transaction-signature"
}
```

## HTTP Status Codes

### Successful Responses
- **`200 OK`** - Request successful, returning quote/execution
- **`404 Not Found`** - No quote available (unsupported pair/size)

### Error Responses  
- **`400 Bad Request`** - Malformed request
- **`401 Unauthorized`** - Invalid/missing API key
- **`50x Server Errors`** - Webhook offline/unavailable

## Implementation Tips

### Quote Generation
```javascript
// Example quote calculation
function generateQuote(inputMint, outputMint, amount, swapMode) {
  // 1. Check if pair is supported
  if (!supportedPairs.includes(`${inputMint}-${outputMint}`)) {
    return { status: 404 };
  }
  
  // 2. Check liquidity availability
  if (amount > getAvailableLiquidity(inputMint, outputMint)) {
    return { status: 404 };
  }
  
  // 3. Calculate price including spread
  const basePrice = getMarketPrice(inputMint, outputMint);
  const spread = calculateSpread(amount);
  const finalPrice = basePrice * (1 - spread);
  
  return {
    status: 200,
    quote: {
      inputMint,
      outputMint,
      inAmount: amount,
      outAmount: Math.floor(amount * finalPrice),
      priceImpactPct: (spread * 100).toFixed(2)
    }
  };
}
```

### Transaction Verification
```javascript
// Example swap verification
function handleSwap(request) {
  // 1. Verify quote is still valid
  const quote = validateQuote(request.quote, request.quoteId);
  if (!quote.valid) {
    return { status: 400, error: "Quote expired" };
  }
  
  // 2. Verify transaction data
  const txValid = verifyTransaction(request.transaction, request.quote);
  if (!txValid) {
    return { status: 400, error: "Invalid transaction" };
  }
  
  // 3. Submit to network
  const txid = submitTransaction(request.transaction);
  return { status: 200, txid };
}
```

## Performance Optimization

### Response Time Requirements
- Use connection pooling for database/external API calls
- Implement caching for frequently accessed data
- Pre-calculate common price pairs
- Monitor response times with metrics

### Error Handling
```javascript
// Graceful error handling
app.post('/quote', async (req, res) => {
  try {
    const quote = await generateQuote(req.body);
    res.json(quote);
  } catch (error) {
    console.error('Quote generation failed:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

## Sample Implementation

A complete sample server implementation is available in the [server-example](https://github.com/jup-ag/rfq-webhook-toolkit/tree/main/server-example) directory of the toolkit repository.

To run the sample server:

```bash
make run-server-example
```

Then visit `http://localhost:8080/swagger-ui/` to explore the API documentation.

## Next Steps

- **[API Reference](../api/overview)** - Detailed API specifications
- **[Testing](../testing/overview)** - Test your implementation
- **[Deployment](./deployment)** - Production deployment guide
