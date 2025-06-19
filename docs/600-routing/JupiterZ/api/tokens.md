---
sidebar_label: "Tokens Endpoint"
description: "Advertise supported token pairs for Jupiter RFQ"
title: "Tokens Endpoint"
---

<head>
    <title>Jupiter RFQ Tokens Endpoint</title>
    <meta name="twitter:card" content="summary" />
</head>

# Tokens Endpoint

The tokens endpoint allows market makers to advertise which token pairs they support. Jupiter calls this endpoint every 10 minutes to refresh the list of available tokens for each webhook.

## Endpoint Details

**Method:** `GET`  
**Path:** `/tokens`  
**Full URL:** `{baseUrl}/tokens`

## Request

### Headers
```
GET /jupiter/rfq/tokens HTTP/1.1
Host: your-api-endpoint.com
User-Agent: Jupiter-RFQ/1.0
X-API-KEY: your-api-key (if configured)
```

### Query Parameters
None required.

## Response

### Success Response (200 OK)

Returns a JSON array of token mint addresses that your market maker supports.

**Response Format:**
```json
[
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  "So11111111111111111111111111111111111111112", 
  "mSoLzYCxHdYgdziU2hgzX6qHJwXaTNFRGZQ7CWt5qKZ",
  "7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj"
]
```

### Example Response
```json
[
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC
  "So11111111111111111111111111111111111111112",  // SOL (Native)
  "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",  // USDT  
  "mSoLzYCxHdYgdziU2hgzX6qHJwXaTNFRGZQ7CWt5qKZ",   // mSOL
  "7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj"    // stSOL
]
```

## Token Requirements

### Supported Token Types
- **Native SOL**: Use the standard SOL mint address
- **SPL Tokens**: Any valid SPL token mint address
- **Wrapped SOL (WSOL)**: Required for SOL swap processing

:::important Native SOL Support
While Jupiter RFQ supports native SOL for users, market makers should use WSOL (Wrapped SOL) in their systems. The order engine automatically handles SOL wrapping/unwrapping.
:::

### Token Address Validation
All token addresses must be:
- Valid base58-encoded Solana public keys
- Existing token mints on Solana mainnet
- Tokens you can actually provide liquidity for

### Common Token Addresses
```javascript
const COMMON_TOKENS = {
  SOL: "So11111111111111111111111111111111111111112",
  USDC: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", 
  USDT: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
  mSOL: "mSoLzYCxHdYgdziU2hgzX6qHJwXaTNFRGZQ7CWt5qKZ",
  stSOL: "7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj",
  jitoSOL: "J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn",
  BONK: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
  JUP: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN"
};
```

## Implementation Example

### Basic Implementation
```javascript
app.get('/jupiter/rfq/tokens', (req, res) => {
  // Return tokens your MM supports
  const supportedTokens = [
    "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC
    "So11111111111111111111111111111111111111112",  // SOL
    "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"   // USDT
  ];
  
  res.json(supportedTokens);
});
```

### Dynamic Implementation
```javascript
app.get('/jupiter/rfq/tokens', async (req, res) => {
  try {
    // Check liquidity availability dynamically
    const availableTokens = await getTokensWithSufficientLiquidity();
    
    // Filter based on current market conditions
    const activeTokens = availableTokens.filter(token => 
      isMarketActive(token) && hasMinimumLiquidity(token)
    );
    
    res.json(activeTokens);
  } catch (error) {
    console.error('Failed to fetch tokens:', error);
    res.status(500).json({
      error: 'Failed to fetch supported tokens'
    });
  }
});
```

### With Caching
```javascript
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
let tokenCache = null;
let cacheExpiry = 0;

app.get('/jupiter/rfq/tokens', async (req, res) => {
  try {
    const now = Date.now();
    
    // Return cached tokens if still valid
    if (tokenCache && now < cacheExpiry) {
      return res.json(tokenCache);
    }
    
    // Refresh token list
    const tokens = await fetchSupportedTokens();
    tokenCache = tokens;
    cacheExpiry = now + CACHE_TTL;
    
    res.json(tokens);
  } catch (error) {
    // Return cached tokens on error if available
    if (tokenCache) {
      return res.json(tokenCache);
    }
    
    res.status(500).json({
      error: 'Failed to fetch supported tokens'
    });
  }
});
```

## Best Practices

### 1. Liquidity Verification
Only advertise tokens for which you have sufficient liquidity:

```javascript
async function getTokensWithSufficientLiquidity() {
  const allTokens = await getAllConfiguredTokens();
  const validTokens = [];
  
  for (const token of allTokens) {
    const balance = await getTokenBalance(token);
    const minRequired = getMinimumLiquidity(token);
    
    if (balance >= minRequired) {
      validTokens.push(token);
    }
  }
  
  return validTokens;
}
```

### 2. Market Hours Consideration
Consider market conditions when advertising tokens:

```javascript
function isMarketActive(tokenMint) {
  // Check if token has active trading
  const volume24h = get24HourVolume(tokenMint);
  const lastTradeTime = getLastTradeTime(tokenMint);
  
  return volume24h > MIN_VOLUME && 
         (Date.now() - lastTradeTime) < MAX_LAST_TRADE_AGE;
}
```

### 3. Error Handling
Implement robust error handling:

```javascript
app.get('/jupiter/rfq/tokens', async (req, res) => {
  try {
    const tokens = await getSupportedTokens();
    res.json(tokens);
  } catch (error) {
    console.error('Tokens endpoint error:', error);
    
    // Return a minimal fallback list
    res.json([
      "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC
      "So11111111111111111111111111111111111111112"   // SOL
    ]);
  }
});
```

## Error Responses

### 500 Internal Server Error
```json
{
  "error": "Failed to fetch supported tokens",
  "code": "INTERNAL_ERROR"
}
```

### 503 Service Unavailable
```json
{
  "error": "Token service temporarily unavailable",
  "code": "SERVICE_UNAVAILABLE"
}
```

## Monitoring and Debugging

### Health Checks
Monitor your tokens endpoint:

```javascript
// Health check specifically for tokens endpoint
app.get('/health/tokens', async (req, res) => {
  try {
    const tokens = await getSupportedTokens();
    res.json({
      status: 'healthy',
      tokenCount: tokens.length,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      error: error.message
    });
  }
});
```

### Logging
Log token list changes:

```javascript
let previousTokens = [];

app.get('/jupiter/rfq/tokens', async (req, res) => {
  const tokens = await getSupportedTokens();
  
  // Log changes
  const added = tokens.filter(t => !previousTokens.includes(t));
  const removed = previousTokens.filter(t => !tokens.includes(t));
  
  if (added.length > 0 || removed.length > 0) {
    console.log('Token list changed:', {
      added,
      removed,
      total: tokens.length
    });
  }
  
  previousTokens = [...tokens];
  res.json(tokens);
});
```

## Common Issues

### Empty Token List
**Problem**: Returning an empty array  
**Impact**: No quote requests will be sent to your webhook  
**Solution**: Ensure at least some tokens are always available

### Invalid Token Addresses
**Problem**: Including invalid mint addresses  
**Impact**: Quote requests may fail validation  
**Solution**: Validate all token addresses before including them

### Stale Token List
**Problem**: Not updating tokens when liquidity changes  
**Impact**: Quote requests for unavailable tokens  
**Solution**: Implement real-time liquidity monitoring

---

**Next:** [Quote Endpoint](./quote) - Learn how to handle quote requests
