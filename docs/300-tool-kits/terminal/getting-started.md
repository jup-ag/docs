---
sidebar_label: "Getting Started"
description: "An overview of Jupiter Swap Terminal and its core features."
title: "Getting Started with Terminal"
---

# Getting Started with Terminal

## Prerequisites

Before integrating Jupiter Terminal, ensure you have:

1. A Solana RPC endpoint (you can use public endpoints or services like Helius)
2. A React or Next.js application
3. Basic understanding of TypeScript (recommended)

## React Application Example

### Step 1: Add TypeScript Support

Create a type declaration file `terminal.d.ts` in your project's types folder:

```typescript
declare global {
  interface Window {
    Jupiter: JupiterTerminal;
  }
}
```

### Step 2: Embed the Terminal Script

In your `index.html`, add the Jupiter Terminal script:

```html
<head>
  <script src="https://terminal.jup.ag/main-v4.js" data-preload defer></script>
</head>
```

### Step 3: Initialize Terminal

There are two ways to initialize Jupiter Terminal in a React application:

#### Method 1: Using Window Object

```typescript
import React, { useEffect } from "react";

function App() {
  useEffect(() => {
    // Create container for terminal
    const terminalContainer = document.createElement("div");
    terminalContainer.id = "jupiter-terminal";
    document.body.appendChild(terminalContainer);

    // Initialize terminal
    window.Jupiter.init({
      displayMode: "integrated",
      integratedTargetId: "jupiter-terminal",
      endpoint: "https://mainnet.helius-rpc.com/?api-key=YOUR_API_KEY",
      formProps: {
        fixedOutputMint: false,
      },
    });
  }, []);

  return (
    <div>
      <h1>Jupiter Terminal Demo</h1>
      <div id="jupiter-terminal" style={{ width: "100%", height: "500px" }} />
    </div>
  );
}
```

#### Method 2: Using @jup-ag/terminal Package

1. Install the package:

```bash
npm install @jup-ag/terminal
```

2. Initialize the terminal:

```typescript
import React, { useEffect } from "react";
import "@jup-ag/terminal/css";

function App() {
  useEffect(() => {
    import("@jup-ag/terminal").then((mod) => {
      const { init } = mod;
      init({
        displayMode: "integrated",
        integratedTargetId: "jupiter-terminal",
        endpoint: "https://mainnet.helius-rpc.com/?api-key=YOUR_API_KEY",
      });
    });
  }, []);

  return (
    <div>
      <h1>Jupiter Terminal Demo</h1>
      <div id="jupiter-terminal" style={{ width: "100%", height: "500px" }} />
    </div>
  );
}
```

## Next.js Application Example

### Step 1: Add TypeScript Support

Create a type declaration file `terminal.d.ts` in your project's types folder:

```typescript
declare global {
  interface Window {
    Jupiter: JupiterTerminal;
  }
}
```

### Step 2: Embed the Terminal Script

For Next.js applications, you can add the script in two ways:

#### Using App Router (Next.js 13+)

In your `app/layout.tsx`:

```typescript
import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://terminal.jup.ag/main-v4.js"
          strategy="beforeInteractive"
          data-preload
          defer
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

#### Using Pages Router

In your `pages/_app.tsx`:

```typescript
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        src="https://terminal.jup.ag/main-v4.js"
        strategy="beforeInteractive"
        data-preload
        defer
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
```

### Step 3: Initialize Terminal

Create a new component for the terminal:

```typescript
"use client";

import React, { useEffect } from "react";

export default function TerminalComponent() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.Jupiter.init({
        displayMode: "integrated",
        integratedTargetId: "jupiter-terminal",
        endpoint: "https://mainnet.helius-rpc.com/?api-key=YOUR_API_KEY",
        formProps: {
          fixedOutputMint: false,
        },
      });
    }
  }, []);

  return (
    <div>
      <h1>Jupiter Terminal Demo</h1>
      <div
        id="jupiter-terminal"
        style={{
          width: "100%",
          height: "500px",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      />
    </div>
  );
}
```

## Best Practices

1. Always use a reliable RPC endpoint
2. Implement proper error handling
3. Consider using environment variables for sensitive data
4. Test thoroughly in development before deploying
5. Monitor swap success rates and user feedback
