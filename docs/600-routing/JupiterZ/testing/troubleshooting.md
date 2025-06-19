---
sidebar_label: "Troubleshooting"
description: "Common issues and solutions for Jupiter RFQ integration"
title: "Troubleshooting"
---

<head>
    <title>Jupiter RFQ Troubleshooting</title>
    <meta name="twitter:card" content="summary" />
</head>

# Troubleshooting

This guide covers common issues that arise during Jupiter RFQ webhook integration and their solutions.

## Common Integration Issues

### 1. Requests Don't Reach Webhook During Integration Tests

**Symptoms:**
- Integration tests report no quotes received
- Webhook logs show no incoming requests
- Tests timeout waiting for responses

**Likely Causes:**
- **Request timeout**: Most common cause - webhook not responding within 250ms
- **Network connectivity**: Webhook not accessible from Jupiter's servers
- **SSL/TLS issues**: Certificate problems preventing HTTPS connections
- **Rate limiting**: Webhook blocking requests due to rate limits

**Solutions:**

#### Check Response Times
```bash
# Test webhook response time locally
curl -w "@curl-format.txt" -X POST \
  https://your-webhook.com/jupiter/rfq/quote \
  -H "Content-Type: application/json" \
  -d '{"inputMint":"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v","outputMint":"So11111111111111111111111111111111111111112","amount":"1000000","swapMode":"ExactIn","slippageBps":50,"platformFeeBps":100}'

# curl-format.txt content:
#     time_namelookup:  %{time_namelookup}\n
#        time_connect:  %{time_connect}\n
#     time_appconnect:  %{time_appconnect}\n
#    time_pretransfer:  %{time_pretransfer}\n
#       time_redirect:  %{time_redirect}\n
#  time_starttransfer:  %{time_starttransfer}\n
#                     ----------\n
#          time_total:  %{time_total}\n
```

#### Verify Accessibility
```bash
# Test from external server (not localhost)
curl -I https://your-webhook.com/jupiter/rfq/tokens

# Check SSL certificate
curl -vI https://your-webhook.com/jupiter/rfq/tokens 2>&1 | grep -E "(SSL|certificate|TLS)"
```

#### Monitor Webhook Logs
```javascript
// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});
```

### 2. Webhook Provides Quote But RFQ Returns 404

**Symptoms:**
- Webhook logs show successful quote responses
- Jupiter's API returns 404 "No quotes available"
- Users don't see your quotes in the interface

**Root Cause:**
Quote fails simulation - every quote is simulated before being presented to users.

**Common Simulation Failure Reasons:**

#### Insufficient Maker Balance
```javascript
// Check maker token balances
async function checkMakerBalances() {
  const connection = new Connection(process.env.SOLANA_RPC_URL);
  const makerPublicKey = new PublicKey(process.env.MAKER_PUBLIC_KEY);
  
  // Check all supported tokens
  for (const tokenMint of supportedTokens) {
    const tokenAccount = await getAssociatedTokenAddress(
      new PublicKey(tokenMint),
      makerPublicKey
    );
    
    try {
      const balance = await connection.getTokenAccountBalance(tokenAccount);
      console.log(`${tokenMint}: ${balance.value.amount}`);
    } catch (error) {
      console.error(`Missing token account for ${tokenMint}`);
    }
  }
  
  // Check SOL balance for fees
  const solBalance = await connection.getBalance(makerPublicKey);
  console.log(`SOL balance: ${solBalance / 1e9} SOL`);
}
```

#### Missing Associated Token Accounts (ATAs)
```javascript
// Create missing ATAs
async function ensureTokenAccounts() {
  const connection = new Connection(process.env.SOLANA_RPC_URL);
  const makerKeypair = loadMakerKeypair();
  
  for (const tokenMint of supportedTokens) {
    const tokenAccount = await getAssociatedTokenAddress(
      new PublicKey(tokenMint),
      makerKeypair.publicKey
    );
    
    const accountInfo = await connection.getAccountInfo(tokenAccount);
    if (!accountInfo) {
      console.log(`Creating ATA for ${tokenMint}`);
      
      const instruction = createAssociatedTokenAccountInstruction(
        makerKeypair.publicKey,
        tokenAccount,
        makerKeypair.publicKey,
        new PublicKey(tokenMint)
      );
      
      const transaction = new Transaction().add(instruction);
      await sendAndConfirmTransaction(connection, transaction, [makerKeypair]);
    }
  }
}
```

#### Insufficient SOL for Network Fees
```javascript
// Monitor SOL balance for fees
function checkFeeBalance() {
  const MIN_SOL_BALANCE = 0.1; // 0.1 SOL minimum
  
  const solBalance = await connection.getBalance(makerPublicKey);
  const solBalanceSOL = solBalance / 1e9;
  
  if (solBalanceSOL < MIN_SOL_BALANCE) {
    console.warn(`Low SOL balance: ${solBalanceSOL} SOL`);
    // Alert or auto-refill logic
  }
}
```

#### WSOL Requirements for SOL Swaps
```javascript
// Ensure WSOL account exists for SOL trading
async function ensureWSOLAccount() {
  const WSOL_MINT = 'So11111111111111111111111111111111111111112';
  const wsolAccount = await getAssociatedTokenAddress(
    new PublicKey(WSOL_MINT),
    makerKeypair.publicKey
  );
  
  const accountInfo = await connection.getAccountInfo(wsolAccount);
  if (!accountInfo) {
    // Create WSOL account and fund it
    await createAndFundWSOLAccount(wsolAccount);
  }
}
```

### 3. Quote Response Time Too High

**Symptoms:**
- Quotes taking longer than 250ms to respond
- Timeouts in acceptance tests
- Reduced quote request volume

**Optimization Strategies:**

#### Database Query Optimization
```javascript
// Use connection pooling
const pool = new Pool({
  host: 'localhost',
  database: 'rfq_db',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Add database indexes
`
CREATE INDEX CONCURRENTLY idx_prices_pair_timestamp 
ON prices (input_mint, output_mint, created_at DESC);

CREATE INDEX CONCURRENTLY idx_liquidity_mint 
ON liquidity (token_mint, updated_at DESC);
`
```

#### Price Feed Caching
```javascript
// Aggressive price caching
class PriceCache {
  constructor() {
    this.cache = new Map();
    this.TTL = 1000; // 1 second
  }
  
  async getPrice(pair) {
    const cached = this.cache.get(pair);
    if (cached && Date.now() - cached.timestamp < this.TTL) {
      return cached.price;
    }
    
    const price = await this.fetchPrice(pair);
    this.cache.set(pair, {
      price,
      timestamp: Date.now()
    });
    
    return price;
  }
  
  // Pre-warm cache for common pairs
  async warmCache() {
    const commonPairs = this.getCommonPairs();
    await Promise.all(
      commonPairs.map(pair => this.getPrice(pair))
    );
  }
}
```

#### Connection Optimization
```javascript
// HTTP keep-alive for external APIs
const https = require('https');
const agent = new https.Agent({
  keepAlive: true,
  keepAliveMsecs: 1000,
  maxSockets: 50
});

// Optimized HTTP client
const client = axios.create({
  httpsAgent: agent,
  timeout: 100,
  headers: {
    'Connection': 'keep-alive'
  }
});
```

### 4. Low Success Rate (Below 95%)

**Symptoms:**
- Success rate monitoring shows < 95%
- Warning from Jupiter team about compliance
- Webhook being temporarily suspended

**Causes and Solutions:**

#### Quote Staleness
```javascript
// Implement quote freshness checks
function isQuoteFresh(quote) {
  const QUOTE_FRESHNESS = 30 * 1000; // 30 seconds
  return (Date.now() - quote.timestamp) < QUOTE_FRESHNESS;
}

app.post('/swap', (req, res) => {
  const { quoteId } = req.body;
  const quote = getStoredQuote(quoteId);
  
  if (!quote || !isQuoteFresh(quote)) {
    return res.status(400).json({
      error: 'Quote expired or not found'
    });
  }
  
  // Continue with swap...
});
```

#### Network Issues
```javascript
// Implement retry logic with exponential backoff
async function submitTransactionWithRetry(txData, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const txid = await connection.sendRawTransaction(txData);
      return txid;
    } catch (error) {
      if (attempt === maxRetries) throw error;
      
      const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
```

#### Liquidity Management
```javascript
// Real-time liquidity monitoring
class LiquidityMonitor {
  constructor() {
    this.balances = new Map();
    this.updateInterval = setInterval(() => {
      this.updateBalances();
    }, 10000); // Update every 10 seconds
  }
  
  async updateBalances() {
    for (const token of supportedTokens) {
      const balance = await getTokenBalance(token);
      this.balances.set(token, balance);
    }
  }
  
  hasSufficientLiquidity(token, amount) {
    const balance = this.balances.get(token) || 0;
    const buffer = 0.9; // 10% buffer
    return balance * buffer >= amount;
  }
}
```

### 5. Transaction Simulation Failures

**Symptoms:**
- Swaps fail with simulation errors
- "Transaction would exceed account data limit" errors
- "Insufficient funds" despite adequate balances

**Debugging Steps:**

#### Enable Detailed Transaction Logs
```javascript
// Add detailed transaction logging
async function submitTransaction(txData) {
  try {
    // Simulate first to get detailed error
    const simulation = await connection.simulateTransaction(
      Transaction.from(txData),
      { commitment: 'processed' }
    );
    
    if (simulation.value.err) {
      console.error('Simulation failed:', simulation.value);
      throw new Error(`Simulation failed: ${JSON.stringify(simulation.value.err)}`);
    }
    
    const txid = await connection.sendRawTransaction(txData);
    return txid;
  } catch (error) {
    console.error('Transaction submission failed:', error);
    throw error;
  }
}
```

#### Validate Transaction Structure
```javascript
// Parse and validate transaction before signing
function validateTransaction(txData, expectedQuote) {
  const transaction = Transaction.from(txData);
  
  // Check instruction count
  if (transaction.instructions.length === 0) {
    throw new Error('Empty transaction');
  }
  
  // Validate each instruction
  for (const instruction of transaction.instructions) {
    if (!instruction.programId) {
      throw new Error('Invalid instruction: missing program ID');
    }
  }
  
  // Additional validation logic...
  return true;
}
```

### 6. API Key Authentication Issues

**Symptoms:**
- 401 Unauthorized responses
- "Invalid API key" errors in logs
- Webhook not receiving requests

**Solutions:**

#### Verify API Key Configuration
```javascript
// Debug API key middleware
app.use('/jupiter/rfq', (req, res, next) => {
  const providedKey = req.headers['x-api-key'];
  const expectedKey = process.env.API_KEY;
  
  console.log('API Key Debug:', {
    provided: providedKey ? 'PROVIDED' : 'MISSING',
    expectedLength: expectedKey ? expectedKey.length : 0,
    match: providedKey === expectedKey
  });
  
  if (expectedKey && providedKey !== expectedKey) {
    return res.status(401).json({
      error: 'Invalid API key'
    });
  }
  
  next();
});
```

### 7. CORS and Network Issues

**Symptoms:**
- Browser-based tests fail
- Manual testing through edge UI doesn't work
- Network connectivity errors

**Solutions:**

#### Configure CORS Properly
```javascript
app.use(cors({
  origin: [
    'https://jup.ag',
    'https://edge.jup.ag', 
    'https://preprod.ultra-api.jup.ag'
  ],
  credentials: true,
  optionsSuccessStatus: 200
}));
```

#### Network Diagnostics
```bash
# Test network connectivity
ping your-webhook.com
nslookup your-webhook.com  
traceroute your-webhook.com

# Test SSL/TLS
openssl s_client -connect your-webhook.com:443 -servername your-webhook.com
```

## Monitoring and Alerting

### Health Check Endpoint
```javascript
app.get('/health', async (req, res) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    checks: {}
  };
  
  // Database connectivity
  try {
    await pool.query('SELECT 1');
    health.checks.database = 'healthy';
  } catch (error) {
    health.checks.database = 'unhealthy';
    health.status = 'unhealthy';
  }
  
  // External API connectivity
  try {
    await priceAPI.ping();
    health.checks.priceAPI = 'healthy';
  } catch (error) {
    health.checks.priceAPI = 'unhealthy';
  }
  
  // Solana RPC connectivity
  try {
    await connection.getSlot();
    health.checks.solana = 'healthy';
  } catch (error) {
    health.checks.solana = 'unhealthy';
    health.status = 'unhealthy';
  }
  
  const statusCode = health.status === 'healthy' ? 200 : 503;
  res.status(statusCode).json(health);
});
```

### Metrics Collection
```javascript
// Prometheus metrics
const prometheus = require('prom-client');

const quoteResponseTime = new prometheus.Histogram({
  name: 'quote_response_time_seconds',
  help: 'Quote endpoint response time',
  buckets: [0.1, 0.2, 0.25, 0.5, 1.0]
});

const swapSuccessRate = new prometheus.Counter({
  name: 'swap_attempts_total',
  help: 'Total swap attempts',
  labelNames: ['status']
});

// Usage
app.post('/quote', async (req, res) => {
  const timer = quoteResponseTime.startTimer();
  
  try {
    const quote = await generateQuote(req.body);
    timer();
    res.json(quote);
  } catch (error) {
    timer();
    res.status(500).json({ error: 'Failed' });
  }
});
```

## Getting Help

### Contact Information
- **Jupiter Team**: [Jo on Telegram](https://t.me/biuu0x)
- **GitHub Issues**: [rfq-webhook-toolkit issues](https://github.com/jup-ag/rfq-webhook-toolkit/issues)
- **Documentation**: This documentation site

### Information to Provide
When seeking help, include:

1. **Webhook URL**: Your registered webhook endpoint
2. **Error Messages**: Exact error messages and logs
3. **Request/Response**: Sample requests and responses
4. **Environment**: Server specifications and network setup
5. **Performance Data**: Response times and success rates
6. **Test Results**: Output from acceptance/integration tests

### Escalation Process
1. **Self-diagnosis**: Use this troubleshooting guide
2. **Community**: Check GitHub issues for similar problems
3. **Direct Support**: Contact Jupiter team with detailed information
4. **Emergency**: For production issues affecting users, contact immediately

Remember: Most integration issues are related to performance (response times) or insufficient balances. Start with these common causes before investigating more complex issues.
