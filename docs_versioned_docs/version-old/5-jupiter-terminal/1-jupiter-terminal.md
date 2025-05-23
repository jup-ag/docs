---
sidebar_label: "Overview"
description: Explore Jupiter Terminal for seamless DApp integration with a feature-rich API. Start now with easy templates and guides. Visit our demo!
title: Jupiter Terminal Docs
---

<head>
    <title>Jupiter Terminal Docs: Elevate Your DApp Integration</title>
    <meta name="twitter:card" content="summary" />
</head>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ModalModeImgUrl from './modal-mode.jpg';
import IntegratedModeImgUrl from './integrated-mode.jpg';
import WidgetModeImgUrl from './widget-mode.jpg';


<img src="/terminal/demo/terminal-hero.gif" />

Jupiter Terminal is an open-sourced, lite version of Jupiter. This terminal provides end-to-end swap flow functionality by linking it in your HTML with just a few lines of code. Terminal runs on the v3 swap protocol supporting Instant Routing, Smart Token Filtering, Ecosystem Token List support.

Provided with the code are several templates to get you started and auto generated code snippets.

<details>
  <summary>
    <div>
      <div><b>It is as easy as this!</b></div>
    </div>
  </summary>

Copy paste this into a `.html` file and change your directory to that file.

Using for example `npx http-server` and you can view in your localhost

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Jupiter Terminal Integration</title>
  <!-- Preload script -->
  <script src="https://terminal.jup.ag/main-v2.js" data-preload></script>
</head>
<body>
  <!-- Container for the terminal -->
  <div id="jupiter-terminal"></div>

  <!-- Initialize the widget -->
  <script>
    window.addEventListener('DOMContentLoaded', () => {
      window.Jupiter.init({
        containerId: 'jupiter-terminal', // ID of the container div
        endpoint: 'https://api.mainnet-beta.solana.com', // Solana RPC endpoint
      });
    });
  </script>
</body>
</html>

```
</details>

:::tip Jupiter Terminal Links
- Demo: https://terminal.jup.ag/
- Repo: https://github.com/jup-ag/terminal
- Detailed implementation guide: [Get a step-by-step walkthrough](./terminal-integration-guide)
:::

## Core Features

- `main-v2.js` bundle (~73.6Kb gzipped)

  - app bundle (~952Kb gzipped) are loaded on-demand when `init()` is called
  - alternatively, preload app bundle with `data-preload` attributes

- Agnostic

  - Work with any dApp, `Integrated` or as a standalone `Widget`, or `Modal`
  - Any framework, React, Plain HTML, and other frameworks.
  - Responsive on any screen size

- Form customisation

  - From Full swap experience, Payment Flow, to Ape-ing tokens
  - Fixed input/output amount, or mint
  - ExactIn, and ExactOut (e.g. Payment) swap mode

- Built-in Wallets

  - Wallet Standard
  - Passthrough Wallet from your dApp
  - Powered by [Unified Wallet Kit](https://github.com/TeamRaccoons/wallet-kit)

- Lite, but powerful

  - Jupiter v6 API with Metis **(New✨)**
  - State sharing with syncProps() **(New✨)**
  - Price API integration, with high decimal/precision support to trade meme tokens
  - ExactOut (e.g Payment)

- Fees Support
  - Customisable fees
  - Track fees with [Jupiter Referral Dashboard](https://referral.jup.ag/dashboard)

## Getting Started

- [Demo + Auto Code Gen](https://terminal.jup.ag)
- [TLDR Example](https://github.com/jup-ag/terminal/tree/main/src/content)


### 1. Setup HTML

Terminal is designed to work anywhere the web runs, including React, Plain HTML/JS, and many other frameworks.

```html
<!-- Attach the loading script in your <head /> -->
<script src="https://terminal.jup.ag/main-v2.js" />

<!-- Optionally, preload for better experience, or integrated mode -->
<script src="https://terminal.jup.ag/main-v2.js" data-preload />
```

### 2. Initialize Jupiter Terminal

#### Scenario 1: Terminal as part of your dApp (Passthrough Wallet)

Your dApp already has a `<WalletProvider />`.

```tsx
window.Jupiter.init({ enableWalletPassthrough: true });
```

Then, synchronise wallet state between your dApp and Jupiter Terminal with `syncProps()`

```tsx
import { useWallet } from '@solana/wallet-adapter-react'; // Or @jup-ag/wallet-adapter;

const passthroughWalletContextState = useWallet();
useEffect(() => {
  if (!window.Jupiter.syncProps) return;
  window.Jupiter.syncProps({ passthroughWalletContextState });
}, [passthroughWalletContextState.connected, props]);
```

#### Scenario 2: Standalone Terminal

Your dApp does not have a `<WalletProvider />`, or is a plain HTML/JS website.

```tsx
window.Jupiter.init({});
```



### 3. Setup other props
:::tip Before you start, get a Free/Paid RPC
Some recommended RPC providers include [Quicknode](https://quicknode.com/), [Helius](https://www.helius.dev/) & [Triton One](https://triton.one/).
You can then use the RPC endpoint with Terminal.
:::
```tsx
window.Jupiter.init({
  /** Required
   * Solana RPC endpoint
   * We do not recommend using the public RPC endpoint for production dApp, you will get severely rate-limited
  */
  endpoint: 'https://api.mainnet-beta.solana.com',
  // ...other props
});
```

### 4. Finishing touches
Terminals are light but full of features, such as customizing form behavior, fees, styling, and much more.

[Go to our Demo](https://terminal.jup.ag) to explore all these features, with automatically generated integration code.

Or, [check out our fully typed API reference](https://github.com/jup-ag/terminal/blob/main/src/types/index.d.ts) for more details.

<img src="/terminal/demo/terminal-codegen.gif" />


---

<br/>
<br/>
<br/>

## Additional API Reference

### Typescript Support

Since Jupiter Terminal is only importable via CDN, to get proper typing, you can create a typing declaration `jupiter-terminal.d.ts` file in your project, and copy the contents in [src/types/index.d.ts](https://github.com/jup-ag/terminal/blob/main/src/types/index.d.ts)

```tsx
declare global {
  interface Window {
    Jupiter: JupiterTerminal;
  }
}
// ...
// ...
// ...
```

---

### Fee Support

Similar to Jupiter, Jupiter Terminal supports fee for integrators.

There are no protocol fees on Jupiter, but integrators can introduce a platform fee on swaps. The platform fee is provided in basis points, e.g. 20 bps for 0.2% of the token output.

Refer to Adding your own fees docs for more details.

_Note: You will need to create the Token fee accounts to collect the platform fee._

```tsx
import { getPlatformFeeAccounts } from '@jup-ag/react-hook';

// Jupiter Core provides a helper function that returns all your feeAccounts
const platformFeeAndAccounts = {
  feeBps: 50,
  feeAccounts: await getPlatformFeeAccounts(
    connection,
    new PublicKey('BUX7s2ef2htTGb2KKoPHWkmzxPj4nTWMWRgs5CSbQxf9'), // The platform fee account owner
  ), // map of mint to token account pubkey
};

window.Jupiter.init({
  // ...
  platformFeeAndAccounts,
});
```

---

### Resuming / Closing Activity

- Everytime `init()` is called, it will create a new activity.

- If you want to resume the previous activity, you can use `resume()`.

- `close()` function only hide the widget.

```tsx
if (window.Jupiter._instance) {
  window.Jupiter.resume();
}

window.Jupiter.close();
```


### Strict Token List

- `strictTokenList?: boolean;`
- Default: `true`

The Jupiter Token List API is an open, collaborative, and dynamic token list to make trading on Solana more transparent and safer for users and developers.
It is true by default to ensure that only validated tokens are shown.

---

### Default Explorer

- `defaultExplorer?: 'Solana Explorer' | 'Solscan' | 'Solana Beach' | 'SolanaFM';`
- Default: `Solana Explorer`

The default explorer is set to `Solana Explorer`;

You can change the default explorer by passing in the explorer name to the `defaultExplorer` prop.

---

### onSuccess/onSwapError callback

`onSuccess()` reference can be provided, and will be called when swap is successful.

While `onSwapError()` will be called when an error has occurred.

```tsx
window.Jupiter.init({
  onSuccess: ({ txid, swapResult }) => {
    console.log({ txid, swapResult });
  },
  onSwapError: ({ error }) => {
    console.log('onSwapError', error);
  },
});
```

### Customising styles: CSSProperties

Any CSS-in-JS can be injected to the outer-most container via containerStyles API.

Examples:

- Custom zIndex

```tsx
window.Jupiter.init({
  // ...
  containerStyles: { zIndex: 100 },
});
```

- Custom height

```tsx
window.Jupiter.init({
  // ...
  containerStyles: { maxHeight: '90vh' },
});
```

### Customising className: Tailwind className

Tailwind classes can be injected to the outer-most container via containerClassName API.

Example:

- Custom breakpoints

```tsx
window.Jupiter.init({
  // ...
  containerClassName: 'max-h-[90vh] lg:max-h-[600px]',
});
```

---

### Upcoming feature / Experimentation

- [ ] Limit Order
- [ ] DCA
- [ ] Experiment separate bundle for passthroughWallet
