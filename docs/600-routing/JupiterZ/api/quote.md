---
sidebar_label: "Quote Endpoint"
description: "Generate competitive quotes for Jupiter RFQ requests"
title: "Quote Endpoint"
---

<head>
    <title>Jupiter RFQ Quote Endpoint</title>
    <meta name="twitter:card" content="summary" />
</head>

# Quote Endpoint

The quote endpoint is the core of the RFQ system. Jupiter sends quote requests to your webhook, and you must respond with competitive pricing within 250ms.

## Endpoint Details

**Method:** `POST`  
**Path:** `/quote`  
**Full URL:** `{baseUrl}/quote`  
**Timeout:** 250ms maximum response time

## Request Format

### Headers
```
POST /jupiter/rfq/quote HTTP/1.1
Host: your-api-endpoint.com
Content-Type: application/json
User-Agent: Jupiter-RFQ/1.0
X-API-KEY: your-api-key (if configured)
x-request-start: 1672531200000
x-request-timeout: 250
```

### Request Body
```json
{
  "inputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  "outputMint": "So11111111111111111111111111111111111111112",
  "amount": "1000000",
  "swapMode": "ExactIn",
  "slippageBps": 50,
  "platformFeeBps": 100,
  "contextSlot": 123456789,
  "timeSent": 1672531200000
}
```

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `inputMint` | string | Yes | Input token mint address |
| `outputMint` | string | Yes | Output token mint address |
| `amount` | string | Yes | Token amount in smallest unit |
| `swapMode` | string | Yes | `"ExactIn"` or `"ExactOut"` |
| `slippageBps` | number | Yes | Maximum slippage in basis points |
| `platformFeeBps` | number | Yes | Platform fee in basis points |
| `contextSlot` | number | No | Solana context slot for pricing |
| `timeSent` | number | No | Timestamp when request was sent |

## Response Format

### Success Response (200 OK)

```json
{
  "inputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  "outputMint": "So11111111111111111111111111111111111111112",
  "inAmount": "1000000",
  "outAmount": "4500000",
  "priceImpactPct": "0.15",
  "platformFeeBps": 100,
  "timeTaken": 150
}
```

### Response Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `inputMint` | string | Yes | Echo of input mint |
| `outputMint` | string | Yes | Echo of output mint |
| `inAmount` | string | Yes | Input amount (accounting for fees) |
| `outAmount` | string | Yes | Output amount you can provide |
| `priceImpactPct` | string | No | Price impact percentage |
| `platformFeeBps` | number | No | Echo of platform fee |
| `timeTaken` | number | No | Processing time in milliseconds |

### No Quote Available (404 Not Found)

Return 404 when you cannot provide a quote:

```json
{
  "error": "Quote not available",
  "reason": "Insufficient liquidity"
}
```

## Swap Modes Explained

### ExactIn
User specifies exact input amount, output amount varies based on your quote.

**Example Request:**
```json
{
  "amount": "1000000",     // Exactly 1 USDC in
  "swapMode": "ExactIn"
}
```

**Example Response:**
```json
{
  "inAmount": "1000000",   // Exactly 1 USDC
  "outAmount": "4500000"   // ~0.0045 SOL out (your quote)
}
```

### ExactOut
User specifies exact output amount, input amount varies based on your quote.

**Example Request:**
```json
{
  "amount": "1000000000",  // Exactly 1 SOL out
  "swapMode": "ExactOut"
}
```

**Example Response:**
```json
{
  "inAmount": "220000000", // ~220 USDC in (your quote)
  "outAmount": "1000000000" // Exactly 1 SOL
}
```

## Fee Handling

### Platform Fees
Jupiter charges dynamic fees that are included in the quote request. **You don't need to account for these fees** - they're handled automatically by the RFQ system.

```javascript
// ❌ Don't do this - fees are handled automatically
const outputWithFee = baseOutput * (1 - platformFeeBps / 10000);

// ✅ Do this - quote your best price
const outputAmount = calculateBestPrice(inputAmount, inputMint, outputMint);
```

### Fee Application Example
For a 1 SOL → 1000 USDC quote with 100 bps (1%) fee:
- Your quote: `outAmount: "1000000000"` (1000 USDC)
- Actual transfer: 990 USDC to user, 10 USDC as fee
- You only provide 990 USDC, not 1000 USDC

## Implementation Examples

### Basic Quote Handler
```javascript
app.post('/jupiter/rfq/quote', async (req, res) => {
  const startTime = Date.now();
  
  try {
    const { inputMint, outputMint, amount, swapMode } = req.body;
    
    // 1. Validate request
    if (!isValidTokenPair(inputMint, outputMint)) {
      return res.status(404).json({
        error: "Token pair not supported"
      });
    }
    
    // 2. Check liquidity
    if (!hasSufficientLiquidity(inputMint, outputMint, amount, swapMode)) {
      return res.status(404).json({
        error: "Insufficient liquidity"
      });
    }
    
    // 3. Calculate quote
    const quote = await calculateQuote({
      inputMint,
      outputMint, 
      amount,
      swapMode
    });
    
    const timeTaken = Date.now() - startTime;
    
    res.json({
      inputMint,
      outputMint,
      inAmount: swapMode === 'ExactIn' ? amount : quote.inAmount,
      outAmount: swapMode === 'ExactOut' ? amount : quote.outAmount,
      priceImpactPct: quote.priceImpactPct,
      timeTaken
    });
    
  } catch (error) {
    console.error('Quote generation failed:', error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
});
```

### Advanced Quote Calculation
```javascript
async function calculateQuote({ inputMint, outputMint, amount, swapMode }) {
  // Get current market prices
  const basePrice = await getMarketPrice(inputMint, outputMint);
  
  // Calculate price impact based on size
  const priceImpact = calculatePriceImpact(amount, inputMint, outputMint);
  
  // Apply spread for profit margin
  const spread = getSpread(inputMint, outputMint);
  
  // Final price calculation
  const effectivePrice = basePrice * (1 - priceImpact - spread);
  
  if (swapMode === 'ExactIn') {
    const outAmount = Math.floor(parseInt(amount) * effectivePrice);
    return {
      inAmount: amount,
      outAmount: outAmount.toString(),
      priceImpactPct: ((priceImpact + spread) * 100).toFixed(2)
    };
  } else {
    const inAmount = Math.ceil(parseInt(amount) / effectivePrice);
    return {
      inAmount: inAmount.toString(),
      outAmount: amount,
      priceImpactPct: ((priceImpact + spread) * 100).toFixed(2)
    };
  }
}
```

### Price Impact Calculation
```javascript
function calculatePriceImpact(amount, inputMint, outputMint) {
  const liquidity = getAvailableLiquidity(inputMint, outputMint);
  const amountNumber = parseInt(amount);
  
  // Simple linear price impact model
  const impactBps = Math.min(
    (amountNumber / liquidity) * 10000, // Linear impact
    500 // Cap at 5%
  );
  
  return impactBps / 10000; // Convert to decimal
}
```

## Performance Optimization

### Caching Strategies
```javascript
const priceCache = new Map();
const CACHE_TTL = 1000; // 1 second

async function getCachedPrice(pair) {
  const cached = priceCache.get(pair);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.price;
  }
  
  const price = await fetchMarketPrice(pair);
  priceCache.set(pair, {
    price,
    timestamp: Date.now()
  });
  
  return price;
}
```

### Pre-computation
```javascript
// Pre-compute prices for common pairs
const priceUpdater = setInterval(async () => {
  const commonPairs = getCommonTradingPairs();
  for (const pair of commonPairs) {
    await getCachedPrice(pair);
  }
}, 500); // Update every 500ms
```

### Connection Pooling
```javascript
// Optimize external API calls
const agent = new https.Agent({
  keepAlive: true,
  keepAliveMsecs: 1000,
  maxSockets: 20
});

const apiClient = axios.create({
  httpsAgent: agent,
  timeout: 100 // 100ms timeout for external calls
});
```

## Validation and Error Handling

### Input Validation
```javascript
function validateQuoteRequest(req) {
  const { inputMint, outputMint, amount, swapMode } = req;
  
  // Validate token addresses
  if (!isValidMintAddress(inputMint) || !isValidMintAddress(outputMint)) {
    return { valid: false, error: "Invalid token address" };
  }
  
  // Validate amount
  if (!amount || isNaN(parseInt(amount)) || parseInt(amount) <= 0) {
    return { valid: false, error: "Invalid amount" };
  }
  
  // Validate swap mode
  if (!['ExactIn', 'ExactOut'].includes(swapMode)) {
    return { valid: false, error: "Invalid swap mode" };
  }
  
  return { valid: true };
}
```

### Liquidity Checks
```javascript
async function hasSufficientLiquidity(inputMint, outputMint, amount, swapMode) {
  if (swapMode === 'ExactIn') {
    // Check if we have enough output token
    const outputBalance = await getTokenBalance(outputMint);
    const estimatedOutput = await estimateOutput(inputMint, outputMint, amount);
    return outputBalance >= estimatedOutput;
  } else {
    // Check if we can accept enough input token
    const inputCapacity = await getInputCapacity(inputMint);
    const estimatedInput = await estimateInput(inputMint, outputMint, amount);
    return inputCapacity >= estimatedInput;
  }
}
```

## Testing Your Implementation

### Unit Tests
```javascript
describe('Quote Endpoint', () => {
  test('should return valid quote for supported pair', async () => {
    const response = await request(app)
      .post('/jupiter/rfq/quote')
      .send({
        inputMint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
        outputMint: 'So11111111111111111111111111111111111111112',
        amount: '1000000',
        swapMode: 'ExactIn',
        slippageBps: 50,
        platformFeeBps: 100
      })
      .expect(200);
      
    expect(response.body).toHaveProperty('outAmount');
    expect(parseInt(response.body.outAmount)).toBeGreaterThan(0);
  });
  
  test('should return 404 for unsupported pair', async () => {
    await request(app)
      .post('/jupiter/rfq/quote')
      .send({
        inputMint: 'UnsupportedTokenMint',
        outputMint: 'So11111111111111111111111111111111111111112',
        amount: '1000000',
        swapMode: 'ExactIn'
      })
      .expect(404);
  });
});
```

### Performance Tests
```javascript
test('should respond within 250ms', async () => {
  const start = Date.now();
  
  await request(app)
    .post('/jupiter/rfq/quote')
    .send(validQuoteRequest)
    .expect(200);
    
  const duration = Date.now() - start;
  expect(duration).toBeLessThan(250);
});
```

## Common Issues and Solutions

### Slow Response Times
**Problem**: Quotes taking longer than 250ms  
**Solutions**:
- Cache price data aggressively
- Pre-compute common calculations
- Optimize database queries
- Use connection pooling

### Inconsistent Pricing
**Problem**: Quotes don't match market prices  
**Solutions**:
- Use reliable price feeds
- Implement proper error handling for price failures
- Add price staleness checks

### Insufficient Liquidity Errors
**Problem**: Returning quotes when liquidity is insufficient  
**Solutions**:
- Real-time liquidity monitoring
- Conservative liquidity estimates
- Proper error responses (404)

---

**Next:** [Swap Endpoint](./swap) - Learn how to handle swap execution requests
