---
sidebar_label: "Introduction"
description: "Jupiter RFQ Webhook Toolkit Introduction"
title: "Jupiter RFQ Webhook Toolkit"
---

<head>
    <title>Jupiter RFQ Webhook Toolkit</title>
    <meta name="twitter:card" content="summary" />
</head>

# Jupiter RFQ Webhook Toolkit

Welcome to the **Jupiter RFQ Webhook Toolkit** documentation! This comprehensive guide will help you integrate your market making system with Jupiter's Request for Quote (RFQ) module.

## What is Jupiter RFQ?

Jupiter RFQ allows market makers to provide liquidity and adjust their quotes without being subject to the volatility of on-chain gas prices or chain health. RFQ fills are much less computationally intensive (10x less) compared to AMM swaps and can save gas costs in the long run.

:::info
📣 **NOTE**: This integration is still subject to changes, and we welcome suggestions for improvements. If you're interested in becoming a Market Maker on Jupiter RFQ, please read this documentation and reach out to [Jo](https://t.me/biuu0x) on Telegram to register your webhook.
:::

## Key Features

- **Low Computational Cost**: RFQ fills are 10x less CU intensive than AMM swaps
- **Gas Optimization**: Save on transaction costs compared to traditional AMM routes
- **Dynamic Pricing**: Adjust quotes without on-chain volatility concerns
- **Flexible Integration**: RESTful webhook API for easy integration

## Getting Started

Choose your path based on your role:

- **Market Makers**: Start with the [Integration Guide](./integration/overview) to understand the webhook requirements
- **Developers**: Check out the [API Documentation](./api/overview) for technical details
- **Testing**: Use our [Testing Suite](./testing/overview) to validate your implementation

## Integration Overview

The RFQ system works through a webhook-based architecture where:

1. **Registration**: Market makers register their webhook endpoints with Jupiter
2. **Quote Requests**: Jupiter sends quote requests to registered webhooks
3. **Quote Response**: Webhooks respond with competitive quotes within 250ms
4. **Swap Execution**: Users can execute swaps using the best available quotes

## Quick Links

- [Order Engine Program](https://solscan.io/account/61DFfeTKM7trxYcPQCM78bJ794ddZprZpAwAnLiwTpYH) (Mainnet)
- [GitHub Repository](https://github.com/jup-ag/rfq-webhook-toolkit)
- [OpenAPI Documentation](https://github.com/jup-ag/rfq-webhook-toolkit/blob/main/openapi)
- [Audit Report](https://github.com/jup-ag/rfq-webhook-toolkit/blob/main/audits/Jupiter-RFQ-Nov-2024-OffsideLabs.pdf) by Offside Labs

## Need Help?

- Check the [FAQ](./faq) for common questions
- Review the [Troubleshooting](./testing/troubleshooting) guide for common issues
- Reach out on [Telegram](https://t.me/biuu0x) for direct support
