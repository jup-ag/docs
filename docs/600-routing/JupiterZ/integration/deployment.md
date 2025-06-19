---
sidebar_label: "Deployment Guide"
description: "Production deployment guide for Jupiter RFQ webhooks"
title: "Deployment Guide"
---

<head>
    <title>Jupiter RFQ Deployment Guide</title>
    <meta name="twitter:card" content="summary" />
</head>

# Deployment Guide

This guide covers best practices for deploying your Jupiter RFQ webhook to production.

## Pre-Deployment Checklist

### ✅ Testing Complete
- [ ] All acceptance tests passing
- [ ] Integration tests successful
- [ ] Load testing completed
- [ ] Error handling validated

### ✅ Infrastructure Ready
- [ ] Production environment provisioned
- [ ] Monitoring and alerting configured
- [ ] Backup and recovery procedures in place
- [ ] SSL/TLS certificates installed

### ✅ Performance Requirements
- [ ] Response times < 250ms for quotes
- [ ] Response times < 25 seconds for swaps
- [ ] 99.9% uptime SLA capability
- [ ] Sufficient liquidity provisioned

## Infrastructure Requirements

### Minimum Server Specifications
- **CPU**: 2+ cores
- **RAM**: 4GB+ 
- **Storage**: SSD with 100GB+ free space
- **Network**: Low-latency connection with 100Mbps+ bandwidth

### Recommended Architecture
```mermaid
graph TB
    LB[Load Balancer] --> A[App Server 1]
    LB --> B[App Server 2]
    A --> DB[(Database)]
    B --> DB
    A --> Redis[(Cache)]
    B --> Redis
    
    subgraph "Monitoring"
        M[Metrics]
        L[Logs]
        A1[Alerts]
    end
    
    A --> M
    B --> M
```

## Environment Configuration

### Environment Variables
```bash
# Server Configuration
PORT=8080
NODE_ENV=production

# Database
DATABASE_URL=postgresql://user:pass@host:5432/rfq_db

# Redis Cache
REDIS_URL=redis://host:6379

# Solana Configuration
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
SOLANA_PRIVATE_KEY=your_base58_private_key

# API Configuration  
API_KEY=your_secure_api_key
WEBHOOK_SECRET=your_webhook_secret

# Monitoring
LOG_LEVEL=info
METRICS_PORT=9090
```

### Security Configuration
```javascript
// Express security middleware
app.use(helmet());
app.use(cors({
  origin: ['https://jup.ag', 'https://preprod.ultra-api.jup.ag'],
  credentials: true
}));

// Rate limiting
app.use('/quote', rateLimit({
  windowMs: 1000, // 1 second
  max: 100 // max 100 requests per second
}));
```

## Monitoring and Alerting

### Key Metrics to Monitor
- **Response Time**: Quote/swap endpoint latency
- **Success Rate**: Percentage of successful requests
- **Error Rate**: 4xx/5xx error frequency
- **Throughput**: Requests per second
- **Liquidity**: Available token balances

### Sample Monitoring Configuration
```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'rfq-webhook'
    static_configs:
      - targets: ['localhost:9090']
```

### Critical Alerts
```yaml
# alerts.yml
groups:
  - name: rfq_webhook
    rules:
      - alert: HighResponseTime
        expr: http_request_duration_seconds{quantile="0.95"} > 0.2
        labels:
          severity: warning
        annotations:
          summary: "Quote response time too high"
          
      - alert: LowSuccessRate  
        expr: rate(http_requests_total{status=~"2.."}[5m]) < 0.95
        labels:
          severity: critical
        annotations:
          summary: "Success rate below 95%"
```

## Load Balancing

### Nginx Configuration
```nginx
upstream rfq_backend {
    server 127.0.0.1:8080;
    server 127.0.0.1:8081;
    keepalive 32;
}

server {
    listen 443 ssl http2;
    server_name your-webhook.example.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    location /jupiter/rfq {
        proxy_pass http://rfq_backend;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_connect_timeout 100ms;
        proxy_send_timeout 30s;
        proxy_read_timeout 30s;
    }
}
```

## Database Optimization

### Connection Pooling
```javascript
// PostgreSQL connection pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 20, // max connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

### Caching Strategy
```javascript
// Redis caching for prices
async function getCachedPrice(pair) {
  const cached = await redis.get(`price:${pair}`);
  if (cached) return JSON.parse(cached);
  
  const price = await fetchPriceFromOracle(pair);
  await redis.setex(`price:${pair}`, 30, JSON.stringify(price));
  return price;
}
```

## Disaster Recovery

### Backup Strategy
- **Database**: Automated daily backups with point-in-time recovery
- **Configuration**: Version-controlled infrastructure as code
- **Keys**: Secure backup of private keys in multiple locations

### Failover Procedures
1. **Health Check Failure**: Automatic traffic routing to healthy instances
2. **Database Failure**: Automatic failover to replica database
3. **Complete Outage**: Emergency runbook for manual recovery

### Emergency Contacts
- On-call engineer rotation
- Jupiter team contact information
- Infrastructure provider support

## Performance Tuning

### Application Optimization
```javascript
// Connection keep-alive for external APIs
const agent = new https.Agent({
  keepAlive: true,
  keepAliveMsecs: 1000,
  maxSockets: 50
});

// Optimize JSON parsing
app.use(express.json({ limit: '1mb' }));

// Compress responses
app.use(compression());
```

### Database Optimization
```sql
-- Index optimization for quote lookups
CREATE INDEX CONCURRENTLY idx_quotes_pair_timestamp 
ON quotes (input_mint, output_mint, created_at DESC);

-- Analyze query performance
EXPLAIN ANALYZE SELECT * FROM quotes 
WHERE input_mint = $1 AND output_mint = $2 
ORDER BY created_at DESC LIMIT 1;
```

## Security Best Practices

### API Security
- Implement rate limiting per endpoint
- Use HTTPS with proper SSL/TLS configuration
- Validate all input parameters
- Implement request signing for sensitive operations

### Private Key Management
- Use hardware security modules (HSM) or secure key management services
- Implement key rotation procedures
- Never log private keys or sensitive data
- Use environment variables for secrets

### Network Security
- Implement IP whitelisting for Jupiter's requests
- Use VPC/private networks for internal communication
- Regular security audits and penetration testing

## Registration with Jupiter

Once your webhook is deployed and tested:

1. **Contact Jupiter Team**: Reach out to [Jo](https://t.me/biuu0x) on Telegram
2. **Provide Details**:
   - Webhook base URL
   - API key (if required)
   - Supported token pairs
   - Expected liquidity amounts

3. **Testing Phase**: Jupiter will conduct integration testing
4. **Go Live**: Your webhook will be added to production rotation

## Post-Deployment Monitoring

### Daily Checks
- Monitor success rates and response times
- Check error logs for anomalies
- Verify liquidity levels
- Review alert notifications

### Weekly Reviews
- Analyze performance trends
- Review capacity utilization
- Update documentation
- Plan capacity scaling

### Monthly Activities
- Security patch updates
- Performance optimization review
- Disaster recovery testing
- SLA compliance review

## Troubleshooting Common Issues

### High Response Times
- Check database connection pool utilization
- Monitor external API latency
- Review application logs for bottlenecks
- Consider horizontal scaling

### Low Success Rate
- Verify sufficient liquidity across all pairs
- Check for network connectivity issues
- Review error patterns in logs
- Validate transaction building logic

### Integration Issues
- Verify webhook endpoint accessibility
- Check API key configuration
- Validate response format compliance
- Test with Jupiter's test environment
