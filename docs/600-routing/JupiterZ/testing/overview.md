---
sidebar_label: "Testing Overview"
description: "Comprehensive testing guide for Jupiter RFQ webhooks"
title: "Testing Overview"
---

<head>
    <title>Jupiter RFQ Testing Overview</title>
    <meta name="twitter:card" content="summary" />
</head>

# Testing Overview

Testing is crucial for ensuring your Jupiter RFQ webhook implementation works correctly and meets performance requirements. This section provides comprehensive testing guidance including test suites, tools, and troubleshooting.

## Test Suite Structure

The Jupiter RFQ toolkit includes several types of tests to validate your implementation:

### 1. **Acceptance Tests**
- Simulate Jupiter RFQ module interactions with your webhook
- Verify API compatibility and response formats  
- Can be run locally against your development server
- **Purpose**: Validate that your webhook meets the API specifications

### 2. **Integration Tests**
- End-to-end tests using Jupiter's pre-production environment
- Require webhook registration with Jupiter
- Perform real swaps on Solana mainnet
- **Purpose**: Validate complete integration with Jupiter's systems

### 3. **Manual Tests**  
- Interactive testing using Jupiter's edge UI
- Browser-based testing with custom webhook parameters
- **Purpose**: Manual validation and debugging

## Prerequisites

### Required Tools
- **[Node.js](https://nodejs.org/)** (v16 or higher)
- **[pnpm](https://pnpm.io/)** package manager
- **[Vitest](https://vitest.dev/)** testing framework

### Setup
```bash
# Install dependencies
make prepare-tests

# Or manually with pnpm
pnpm install
```

## Quick Start Testing

### Test Against Sample Server
The quickest way to understand the testing process:

```bash
# Run acceptance tests against the bundled sample server
make run-acceptance-tests-against-sample-server
```

This will:
1. Start the sample webhook server
2. Run all acceptance tests
3. Display results and any failures

### Test Your Implementation
Once you have your webhook running:

```bash
# Set your webhook URL
export WEBHOOK_URL=https://your-webhook.example.com/jupiter/rfq

# If you need an API key
export WEBHOOK_API_KEY=your-api-key

# Run acceptance tests
make run-acceptance-tests
```

## Test Environment Variables

Configure tests using these environment variables:

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `WEBHOOK_URL` | Yes | Your webhook base URL | `https://api.example.com/jupiter/rfq` |
| `WEBHOOK_API_KEY` | No | API key if required | `your-secret-api-key` |
| `WEBHOOK_ID` | Integration only | Your registered webhook ID | `your-webhook-uuid` |
| `TAKER_KEYPAIR` | Integration only | Path to keypair JSON file | `./keypair.json` |

## Test Scenarios

### Acceptance Test Coverage

#### **Tokens Endpoint Tests**
- ✅ Returns valid token list
- ✅ Handles errors gracefully
- ✅ Response format validation
- ✅ Performance requirements

#### **Quote Endpoint Tests**
- ✅ Valid quote requests (ExactIn/ExactOut)
- ✅ Unsupported pair handling (404 responses)
- ✅ Invalid request parameters (400 responses)
- ✅ Response time under 250ms
- ✅ Quote format validation

#### **Swap Endpoint Tests**
- ✅ Valid swap execution
- ✅ Quote validation
- ✅ Transaction verification
- ✅ Error handling
- ✅ Response time under 25 seconds

### Integration Test Coverage

#### **End-to-End Flow**
- ✅ Quote request through Jupiter's systems
- ✅ Quote acceptance and swap execution
- ✅ Transaction confirmation on-chain
- ✅ Success rate compliance (95%+)

## Running Tests

### Acceptance Tests

#### Basic Run
```bash
# Using make
make run-acceptance-tests

# Using pnpm directly  
pnpm run acceptance
```

#### With Custom Parameters
```bash
# Test specific scenarios
WEBHOOK_URL=https://localhost:8080/jupiter/rfq \
WEBHOOK_API_KEY=test-key \
pnpm run acceptance
```

#### Debug Mode
```bash
# Enable verbose logging
DEBUG=true pnpm run acceptance
```

### Integration Tests

:::warning Real Mainnet Transactions
Integration tests perform real swaps on Solana mainnet and will consume actual tokens from your test wallet.
:::

```bash
# Set required environment variables
export TAKER_KEYPAIR=./test-keypair.json
export WEBHOOK_ID=your-registered-webhook-id

# Run integration tests
make run-integration-tests

# Or with pnpm
pnpm run integration
```

#### Custom Test Parameters
Override default test parameters by setting environment variables:

```bash
# Test with different amounts/tokens
export INPUT_MINT=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v  # USDC
export OUTPUT_MINT=So11111111111111111111111111111111111111112   # SOL  
export INPUT_AMOUNT=1000000  # 1 USDC
export SWAP_MODE=ExactIn

pnpm run integration
```

### Manual Testing

Use Jupiter's edge UI with browser extensions to test manually:

1. **Install Browser Extension**: Use [Inssman](https://chromewebstore.google.com/search/Inssman) or similar
2. **Configure Request Modification**:
   - Host: `https://preprod.ultra-api.jup.ag/*`
   - Add parameter: `webhookId=your-webhook-id`
3. **Visit Edge UI**: Go to [edge.jup.ag](https://edge.jup.ag/)
4. **Test Swaps**: Perform swaps and verify your webhook receives requests

## Test Results Interpretation

### Successful Test Output
```bash
✓ Tokens endpoint returns valid response (45ms)
✓ Quote endpoint handles ExactIn requests (120ms)  
✓ Quote endpoint handles ExactOut requests (134ms)
✓ Quote endpoint returns 404 for unsupported pairs (23ms)
✓ Swap endpoint executes valid swaps (1.2s)

Test Suites: 3 passed, 3 total
Tests:       15 passed, 15 total  
Time:        3.45s
```

### Failed Test Example
```bash
✗ Quote endpoint response time (287ms)
  Expected response time to be less than 250ms
  
✗ Swap endpoint transaction validation
  AssertionError: Expected valid transaction signature
    at validateSwap (test/swap.test.js:45:12)
```

## Performance Benchmarking

### Response Time Monitoring
```javascript
// Example performance test
test('Quote endpoint meets performance requirements', async () => {
  const iterations = 100;
  const times = [];
  
  for (let i = 0; i < iterations; i++) {
    const start = Date.now();
    await makeQuoteRequest();
    const duration = Date.now() - start;
    times.push(duration);
  }
  
  const average = times.reduce((a, b) => a + b) / times.length;
  const p95 = times.sort()[Math.floor(times.length * 0.95)];
  
  expect(average).toBeLessThan(200); // Average under 200ms
  expect(p95).toBeLessThan(250);     // 95th percentile under 250ms
});
```

### Load Testing
```bash
# Run load tests with artillery or similar
artillery run load-test-config.yml
```

## Continuous Integration

### GitHub Actions Example
```yaml
name: Webhook Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: pnpm install
        
      - name: Start webhook server
        run: npm start &
        
      - name: Wait for server
        run: sleep 10
        
      - name: Run acceptance tests  
        env:
          WEBHOOK_URL: http://localhost:8080/jupiter/rfq
        run: pnpm run acceptance
```

## Test Data Management

### Mock Data
Use consistent test data for reproducible results:

```javascript
// test/fixtures/quotes.js
export const VALID_QUOTE_REQUEST = {
  inputMint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  outputMint: 'So11111111111111111111111111111111111111112',
  amount: '1000000',
  swapMode: 'ExactIn',
  slippageBps: 50,
  platformFeeBps: 100
};

export const UNSUPPORTED_PAIR = {
  inputMint: 'UnknownToken111111111111111111111111111111',
  outputMint: 'So11111111111111111111111111111111111111112',
  amount: '1000000',
  swapMode: 'ExactIn'
};
```

### Test Wallets
For integration tests, use dedicated test wallets:

```javascript
// Generate test keypair
import { Keypair } from '@solana/web3.js';
import fs from 'fs';

const keypair = Keypair.generate();
fs.writeFileSync('test-keypair.json', JSON.stringify(Array.from(keypair.secretKey)));
```

## Next Steps

- **[Troubleshooting](./troubleshooting)** - Common issues and solutions
