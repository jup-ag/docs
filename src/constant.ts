export const navbarConfigs = {
  "/docs": [
    { to: "/docs/",
      label: "APIs",
      position: "left",
      items: [
        { to: "/docs/", label: "Get Started", position: "left" },
        { to: "/docs/ultra-api/", label: "Ultra API", position: "left" },
        { to: "/docs/swap-api/get-quote", label: "Swap API", position: "left" },
        { to: "/docs/trigger-api/create-order", label: "Trigger API", position: "left" },
        { to: "/docs/recurring-api/create-order", label: "Recurring API", position: "left" },
        { to: "/docs/token-api/", label: "Token API", position: "left" },
        { to: "/docs/price-api/", label: "Price API", position: "left" },
        { to: "/docs/perp-api/", label: "Perp API", position: "left" },
      ],
    },
    { to: "/docs/dex-integration", label: "DEX Integration", position: "left" },
    { to: "/docs/tool-kits/swap-terminal", label: "Tool Kits", position: "left" },
    { to: "/docs/api", label: "API Reference", position: "left" },
    { to: "/docs/misc/sdk-api-license-agreement", label: "Misc", position: "left" },
  ],
  "/search": [
    {
      to: "/docs/",
      label: "APIs",
      position: "left",
      items: [
        { to: "/docs/", label: "Get Started", position: "left" },
        { to: "/docs/ultra-api/", label: "Ultra API", position: "left" },
        { to: "/docs/swap-api/get-quote", label: "Swap API", position: "left" },
        { to: "/docs/trigger-api/create-order", label: "Trigger API", position: "left" },
        { to: "/docs/recurring-api/create-order", label: "Recurring API", position: "left" },
        { to: "/docs/token-api/", label: "Token API", position: "left" },
        { to: "/docs/price-api/", label: "Price API", position: "left" },
        { to: "/docs/perp-api/", label: "Perp API", position: "left" },
      ],
    },
    { to: "/docs/dex-integration", label: "DEX Integration", position: "left" },
    { to: "/docs/tool-kits/swap-terminal", label: "Tool Kits", position: "left" },
    { to: "/docs/api", label: "API Reference", position: "left" },
    { to: "/docs/misc/sdk-api-license-agreement", label: "Misc", position: "left" },
  ],
  "/": [
    {
      to: "/docs/",
      label: "APIs",
      position: "left",
      items: [
        { to: "/docs/", label: "Get Started", position: "left" },
        { to: "/docs/ultra-api/", label: "Ultra API", position: "left" },
        { to: "/docs/swap-api/get-quote", label: "Swap API", position: "left" },
        { to: "/docs/trigger-api/create-order", label: "Trigger API", position: "left" },
        { to: "/docs/recurring-api/create-order", label: "Recurring API", position: "left" },
        { to: "/docs/token-api/", label: "Token API", position: "left" },
        { to: "/docs/price-api/", label: "Price API", position: "left" },
        { to: "/docs/perp-api/", label: "Perp API", position: "left" },
      ],
    },
    { to: "/docs/dex-integration", label: "DEX Integration", position: "left" },
    { to: "/docs/tool-kits/swap-terminal", label: "Tool Kits", position: "left" },
    { to: "/docs/api", label: "API Reference", position: "left" },
    { to: "/docs/misc/sdk-api-license-agreement", label: "Misc", position: "left" },
  ],
  "/ecosystem": [
    {
      to: "/docs/",
      label: "APIs",
      position: "left",
      items: [
        { to: "/docs/", label: "Get Started", position: "left" },
        { to: "/docs/ultra-api/", label: "Ultra API", position: "left" },
        { to: "/docs/swap-api/get-quote", label: "Swap API", position: "left" },
        { to: "/docs/trigger-api/create-order", label: "Trigger API", position: "left" },
        { to: "/docs/recurring-api/create-order", label: "Recurring API", position: "left" },
        { to: "/docs/token-api/", label: "Token API", position: "left" },
        { to: "/docs/price-api/", label: "Price API", position: "left" },
        { to: "/docs/perp-api/", label: "Perp API", position: "left" },
      ],
    },
    { to: "/docs/dex-integration", label: "DEX Integration", position: "left" },
    { to: "/docs/tool-kits/swap-terminal", label: "Tool Kits", position: "left" },
    { to: "/docs/api", label: "API Reference", position: "left" },
    { to: "/docs/misc/sdk-api-license-agreement", label: "Misc", position: "left" },
  ],
};

// used in landing page /src/pages/index.tsx
export const API_CARDS = [
  {
    title: "Ultra API",
    links: [
      { text: "Docs", href: "/docs/ultra-api/" },
      { text: "Schemas", href: "/docs/api/ultra-api/" },
    ],
  },
  {
    title: "Swap API",
    links: [
      { text: "Docs", href: "/docs/swap-api/get-quote" },
      { text: "Schemas", href: "/docs/api/swap-api/" },
    ],
  },
  {
    title: "Trigger API",
    links: [
      { text: "Docs", href: "/docs/trigger-api/create-order" },
      { text: "Schemas", href: "/docs/api/trigger-api/" },
    ],
  },
  {
    title: "Recurring API",
    links: [
      { text: "Docs", href: "/docs/recurring-api/create-order" },
      { text: "Schemas", href: "/docs/api/recurring-api/" },
    ],
  },
  {
    title: "Token API",
    links: [
      { text: "Docs", href: "/docs/token-api/" },
      { text: "Schemas", href: "/docs/api/token-api/" },
    ],
  },
  {
    title: "Price API",
    links: [
      { text: "Docs", href: "/docs/price-api/" },
      { text: "Schemas", href: "/docs/api/price-api/" },
    ],
  },
];

export const TOOL_KIT_CARDS = [
  {
    title: "Swap Terminal",
    links: [
      { text: "Playground", href: "https://terminal.jup.ag/" },
      { text: "Docs", href: "/docs/tool-kits/swap-terminal" },
    ],
  },
  {
    title: "Unified Wallet Kit",
    links: [
      { text: "Playground", href: "https://unified.jup.ag/" },
      { text: "Docs", href: "/docs/tool-kits/unified-wallet-kit" },
    ],
  },
  {
    title: "NPM Package",
    links: [
      { text: "NPM", href: "https://www.npmjs.com/package/@jup-ag/api" },
      {
        text: "Example",
        href: "https://github.com/jup-ag/jupiter-quote-api-node/tree/main/example",
      },
    ],
  },
];

export const DRWG_CARDS = [
  {
    title: "Example Scripts",
    links: [
      {
        text: "Typescript",
        href: "https://github.com/Jupiter-DevRel/typescript-examples",
      },
      {
        text: "Python",
        href: "https://github.com/Jupiter-DevRel/python-examples",
      },
    ],
  },
  {
    title: "Jupiverse Kit",
    links: [
      { text: "Playground", href: "https://www.jupiversekit.xyz/" },
      { text: "GitHub", href: "https://github.com/dannweeeee/jupiverse-kit" },
    ],
  },
];
