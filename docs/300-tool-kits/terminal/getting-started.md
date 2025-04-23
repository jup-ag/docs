---
sidebar_label: "Getting Started"
description: "An overview of Jupiter Swap Terminal and its core features."
title: "Getting Started with Terminal"
---

<head>
    <title>Getting Started with Terminal</title>
    <meta name="twitter:card" content="summary" />
</head>

# Getting Started with Terminal

## Prerequisites

When integrating Terminal, there are a few integration methods to think about, and choose the one that best fits your application's architecture and requirements.

### Ways to Integrate

- **Direct Script Integration (CDN)**
  - Simplest way to add Terminal.
  - Add script tag to HTML:
    ```html
    <script src="https://terminal.jup.ag/main-v4.js" data-preload defer></script>
    ```

- **NPM Package Integration**
  - Recommended for React/Next.js applications.
  - [Install via NPM](https://www.npmjs.com/package/@jup-ag/terminal): `npm install @jup-ag/terminal`
  - Import and use as a module.

### Wallet Integration

- **Standalone Mode**: For applications without existing wallet provider.
- **Integrated Mode**: For applications with existing wallet provider.

## Best Practices

1. Implement proper error handling
2. Consider using environment variables for sensitive data
3. Test thoroughly in development before deploying
4. Monitor swap success rates and user feedback
