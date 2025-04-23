---
sidebar_label: "React App Example"
description: "A step-by-step guide to integrating Jupiter Terminal into a React application."
title: "React App Example"
---

<head>
    <title>Terminal React App Example</title>
    <meta name="twitter:card" content="summary" />
</head>

## Step 1: Add TypeScript Support

Create a type declaration file `terminal.d.ts` in your project's types folder:

```typescript
declare global {
  interface Window {
    Jupiter: JupiterTerminal;
  }
}
```

## Step 2: Embed the Terminal Script

In your `index.html`, add the Jupiter Terminal script:

```html
<head>
  <script src="https://terminal.jup.ag/main-v4.js" data-preload defer></script>
</head>
```

## Step 3: Initialize Terminal

There are two ways to initialize Jupiter Terminal in a React application:

### Method 1: Using Window Object

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

### Method 2: Using @jup-ag/terminal Package

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
