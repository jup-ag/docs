---
sidebar_label: "Swap Endpoint"
description: "Execute verified swap transactions for Jupiter RFQ"
title: "Swap Endpoint"
---

<head>
    <title>Jupiter RFQ Swap Endpoint</title>
    <meta name="twitter:card" content="summary" />
</head>

# Swap Endpoint

The swap endpoint handles the execution of verified swap requests. When a user accepts a quote, Jupiter sends the swap request to your webhook with a prepared transaction that you must verify, sign, and submit to the Solana network.

## Endpoint Details

**Method:** `POST`  
**Path:** `/swap`  
**Full URL:** `{baseUrl}/swap`  
**Timeout:** 25 seconds maximum response time

## Request Format

### Headers
```
POST /jupiter/rfq/swap HTTP/1.1
Host: your-api-endpoint.com
Content-Type: application/json
User-Agent: Jupiter-RFQ/1.0
X-API-KEY: your-api-key (if configured)
```

### Request Body
```json
{
  "quote": {
    "inputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    "outputMint": "So11111111111111111111111111111111111111112",
    "inAmount": "1000000",
    "outAmount": "4500000",
    "priceImpactPct": "0.15"
  },
  "transaction": "base64-encoded-transaction-data",
  "quoteId": "unique-quote-identifier-uuid",
  "userPublicKey": "user-wallet-public-key",
  "wrapUnwrapSOL": true,
  "computeUnitPrice": 1000
}
```

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `quote` | object | Yes | Original quote details |
| `transaction` | string | Yes | Base64-encoded transaction |
| `quoteId` | string | Yes | Unique identifier for the quote |
| `userPublicKey` | string | Yes | User's wallet public key |
| `wrapUnwrapSOL` | boolean | No | Whether SOL wrapping is needed |
| `computeUnitPrice` | number | No | Compute unit price for transaction |

## Response Format

### Success Response (200 OK)

```json
{
  "txid": "5j8...signature-hash...abc",
  "timeTaken": 1500
}
```

### Response Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `txid` | string | Yes | Transaction signature/hash |
| `timeTaken` | number | No | Processing time in milliseconds |

## Transaction Verification

Before signing and submitting the transaction, you **must** verify its contents to ensure it matches your quote and protects against malicious requests.

### Required Verification Steps

1. **Quote Validation**: Verify the quote matches your records
2. **Transaction Parsing**: Decode and validate transaction instructions
3. **Amount Verification**: Ensure amounts match your quote
4. **Account Verification**: Verify all accounts are correct
5. **Expiry Check**: Ensure transaction hasn't expired

### Verification Implementation

```javascript
app.post('/jupiter/rfq/swap', async (req, res) => {
  const startTime = Date.now();
  
  try {
    const { quote, transaction, quoteId, userPublicKey } = req.body;
    
    // 1. Verify quote exists and is valid
    const storedQuote = await getQuoteById(quoteId);
    if (!storedQuote || isQuoteExpired(storedQuote)) {
      return res.status(400).json({
        error: "Quote expired or not found"
      });
    }
    
    // 2. Verify quote matches request
    if (!quotesMatch(quote, storedQuote)) {
      return res.status(400).json({
        error: "Quote mismatch"
      });
    }
    
    // 3. Parse and verify transaction
    const txData = Buffer.from(transaction, 'base64');
    const parsedTx = parseTransaction(txData);
    
    if (!isValidTransaction(parsedTx, quote, userPublicKey)) {
      return res.status(400).json({
        error: "Invalid transaction"
      });
    }
    
    // 4. Sign and submit transaction
    const signedTx = await signTransaction(txData);
    const txid = await submitTransaction(signedTx);
    
    const timeTaken = Date.now() - startTime;
    
    res.json({
      txid,
      timeTaken
    });
    
  } catch (error) {
    console.error('Swap execution failed:', error);
    res.status(500).json({
      error: "Failed to execute swap"
    });
  }
});
```

## Quote Validation

### Quote Matching
```javascript
function quotesMatch(requestQuote, storedQuote) {
  return (
    requestQuote.inputMint === storedQuote.inputMint &&
    requestQuote.outputMint === storedQuote.outputMint &&
    requestQuote.inAmount === storedQuote.inAmount &&
    requestQuote.outAmount === storedQuote.outAmount
  );
}
```

### Quote Expiry
```javascript
function isQuoteExpired(quote) {
  const QUOTE_TTL = 50 * 1000; // 50 seconds
  const now = Date.now();
  return (now - quote.timestamp) > QUOTE_TTL;
}
```

## Transaction Verification Using SDK

Jupiter provides an SDK for transaction verification:

```javascript
import { validateSimilarFillSanitizedMessage } from '@jup-ag/order-engine-sdk';

async function isValidTransaction(parsedTx, quote, userPublicKey) {
  try {
    // Use Jupiter's validation function
    const isValid = await validateSimilarFillSanitizedMessage({
      transaction: parsedTx,
      quote: quote,
      userPublicKey: userPublicKey,
      makerPublicKey: YOUR_MAKER_PUBLIC_KEY
    });
    
    return isValid;
  } catch (error) {
    console.error('Transaction validation failed:', error);
    return false;
  }
}
```

## Transaction Signing and Submission

### Signing the Transaction
```javascript
import { Keypair, Transaction } from '@solana/web3.js';

async function signTransaction(transactionData) {
  // Load your maker keypair
  const makerKeypair = Keypair.fromSecretKey(
    Buffer.from(process.env.MAKER_PRIVATE_KEY, 'base64')
  );
  
  // Deserialize transaction
  const transaction = Transaction.from(transactionData);
  
  // Sign with maker keypair
  transaction.sign(makerKeypair);
  
  return transaction.serialize();
}
```

### Submitting to Network
```javascript
import { Connection } from '@solana/web3.js';

async function submitTransaction(signedTxData) {
  const connection = new Connection(process.env.SOLANA_RPC_URL);
  
  const txid = await connection.sendRawTransaction(signedTxData, {
    skipPreflight: false,
    preflightCommitment: 'confirmed',
    maxRetries: 3
  });
  
  // Wait for confirmation
  await connection.confirmTransaction(txid, 'confirmed');
  
  return txid;
}
```

## Error Handling

### Common Error Scenarios

#### Quote Expired
```json
{
  "error": "Quote expired",
  "code": "QUOTE_EXPIRED",
  "details": {
    "quoteId": "uuid",
    "expiryTime": 1672531250000
  }
}
```

#### Invalid Transaction
```json
{
  "error": "Transaction validation failed",
  "code": "INVALID_TRANSACTION",
  "details": {
    "reason": "Amount mismatch"
  }
}
```

#### Insufficient Balance
```json
{
  "error": "Insufficient balance for swap",
  "code": "INSUFFICIENT_BALANCE",
  "details": {
    "required": "1000000",
    "available": "500000"
  }
}
```

### Error Response Format
```javascript
function sendError(res, code, message, details = {}) {
  res.status(400).json({
    error: message,
    code: code,
    details: details,
    timestamp: Date.now()
  });
}
```

## Non-Standard Payload Information

The transaction includes 3 additional bytes appended to the instruction data:

- **Bytes 1-2**: Fee amount in basis points (u16)
- **Byte 3**: Bit mask where LSB indicates swap type
  - `0` = ExactIn
  - `1` = ExactOut

```javascript
function parseAdditionalData(instructionData) {
  const dataLength = instructionData.length;
  
  // Last 3 bytes contain additional info
  const feeBytes = instructionData.slice(dataLength - 3, dataLength - 1);
  const modeByte = instructionData[dataLength - 1];
  
  const feeBps = feeBytes.readUInt16LE(0);
  const isExactOut = (modeByte & 1) === 1;
  
  return {
    feeBps,
    swapMode: isExactOut ? 'ExactOut' : 'ExactIn'
  };
}
```

## Performance Optimization

### Connection Management
```javascript
// Maintain persistent connection to Solana
const connection = new Connection(process.env.SOLANA_RPC_URL, {
  commitment: 'confirmed',
  wsEndpoint: process.env.SOLANA_WS_URL,
  httpHeaders: {
    'Content-Type': 'application/json',
  }
});
```

### Transaction Batching
```javascript
// For high-volume operations, consider batching
class TransactionBatcher {
  constructor() {
    this.pending = [];
    this.batchSize = 10;
    this.batchTimeout = 100; // ms
  }
  
  async submitTransaction(txData) {
    return new Promise((resolve, reject) => {
      this.pending.push({ txData, resolve, reject });
      
      if (this.pending.length >= this.batchSize) {
        this.processBatch();
      } else {
        setTimeout(() => this.processBatch(), this.batchTimeout);
      }
    });
  }
  
  async processBatch() {
    const batch = this.pending.splice(0, this.batchSize);
    // Process transactions in parallel
    await Promise.allSettled(
      batch.map(item => this.processTransaction(item))
    );
  }
}
```

## Monitoring and Logging

### Transaction Tracking
```javascript
app.post('/jupiter/rfq/swap', async (req, res) => {
  const swapId = generateSwapId();
  const startTime = Date.now();
  
  console.log('Swap started:', {
    swapId,
    quoteId: req.body.quoteId,
    inputMint: req.body.quote.inputMint,
    outputMint: req.body.quote.outputMint,
    amount: req.body.quote.inAmount
  });
  
  try {
    const txid = await executeSwap(req.body);
    
    console.log('Swap completed:', {
      swapId,
      txid,
      duration: Date.now() - startTime
    });
    
    res.json({ txid });
  } catch (error) {
    console.error('Swap failed:', {
      swapId,
      error: error.message,
      duration: Date.now() - startTime
    });
    
    res.status(500).json({ error: 'Swap execution failed' });
  }
});
```

### Success Rate Monitoring
```javascript
// Track success rates for compliance monitoring
class SwapMetrics {
  constructor() {
    this.attempts = 0;
    this.successes = 0;
    this.failures = 0;
  }
  
  recordAttempt() {
    this.attempts++;
  }
  
  recordSuccess() {
    this.successes++;
  }
  
  recordFailure() {
    this.failures++;
  }
  
  getSuccessRate() {
    return this.attempts > 0 ? this.successes / this.attempts : 0;
  }
  
  // Check if below 95% threshold
  isCompliant() {
    return this.getSuccessRate() >= 0.95;
  }
}
```

## Testing Swap Implementation

### Unit Tests
```javascript
describe('Swap Endpoint', () => {
  test('should execute valid swap', async () => {
    const mockQuote = createMockQuote();
    const mockTransaction = createMockTransaction(mockQuote);
    
    const response = await request(app)
      .post('/jupiter/rfq/swap')
      .send({
        quote: mockQuote,
        transaction: mockTransaction,
        quoteId: 'test-quote-id',
        userPublicKey: 'test-user-key'
      })
      .expect(200);
      
    expect(response.body).toHaveProperty('txid');
    expect(response.body.txid).toMatch(/^[1-9A-HJ-NP-Za-km-z]{87,88}$/);
  });
  
  test('should reject expired quote', async () => {
    const expiredQuote = createExpiredQuote();
    
    await request(app)
      .post('/jupiter/rfq/swap')
      .send({
        quote: expiredQuote,
        transaction: 'mock-transaction',
        quoteId: 'expired-quote-id'
      })
      .expect(400);
  });
});
```

## Common Issues and Solutions

### Transaction Simulation Failures
**Problem**: Transactions fail simulation  
**Causes**:
- Insufficient maker balance
- Missing token accounts
- Invalid transaction structure

**Solutions**:
- Verify all token accounts exist
- Ensure sufficient SOL for fees
- Validate transaction before submission

### High Failure Rates
**Problem**: Success rate below 95%  
**Causes**:
- Network congestion
- Stale quotes
- Insufficient liquidity management

**Solutions**:
- Implement robust retry logic
- Monitor quote freshness
- Real-time liquidity tracking

### Slow Transaction Confirmation
**Problem**: Transactions taking too long to confirm  
**Solutions**:
- Use higher compute unit prices
- Implement transaction monitoring
- Have fallback RPC endpoints

---

**Next:** [Testing](../testing/overview) - Learn how to test your webhook implementation
