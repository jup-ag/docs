// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const apiSidebars = require('./sidebars-api');

const sidebars = {
  docs: [
    {
      type: 'category',
      label: 'Development',
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'README',
        },
        {
          type: 'doc',
          id: 'environment-setup',
        },
        {
          type: 'doc',
          id: 'development-basics',
        },
        {
          type: 'html',
          value: '<div class="sidebar-line-break"></div>',
        },
      ],
    },
    {
      type: 'category',
      label: 'Portal',
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'api-setup',
        },
        {
          type: 'doc',
          id: 'api-responses',
        },
        {
          type: 'doc',
          id: 'api-rate-limit',
        },
        {
          type: 'html',
          value: '<div class="sidebar-line-break"></div>',
        },
      ],
    },
  ],
  routing: [
    {
      type: 'doc',
      id: 'routing/README',
    },
    {
      type: 'html',
      value: '<div class="sidebar-line-break"></div>',
    },
    {
      type: 'category',
      label: 'Routing Integrations',
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'routing/dex-integration',
        },
        {
          type: 'doc',
          id: 'routing/rfq-integration',
        },
      ],
    },
  ],
  misc: [
    {
      type: 'category',
      label: 'Legal & Guidelines',
      link: {
        type: 'generated-index',
        slug: '/misc',
      },
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'misc/sdk-api-license-agreement',
        },
        {
          type: 'doc',
          id: 'misc/terms-of-use',
        },
        {
          type: 'doc',
          id: 'misc/privacy-policy',
        },
        {
          type: 'doc',
          id: 'misc/integrator-guidelines',
        },
      ],
    },
  ],
  ultra: [
    {
      type: 'doc',
      id: 'ultra-api/README',
    },
    {
      type: 'html',
      value: '<div class="sidebar-line-break"></div>',
    },
    {
      type: 'category',
      label: 'Ultra API',
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'ultra-api/get-order',
        },
        {
          type: 'doc',
          id: 'ultra-api/execute-order',
        },
        {
          type: 'doc',
          id: 'ultra-api/get-balances',
        },
        {
          type: 'doc',
          id: 'ultra-api/get-shield',
        },
      ],
    },
    {
      type: 'html',
      value: '<div class="sidebar-line-break"></div>',
    },
    {
      type: 'category',
      label: 'Ultra API Guides',
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'ultra-api/add-fees-to-ultra',
        },
      ],
    },
    {
      type: 'html',
      value: '<div class="sidebar-line-break"></div>',
    },
  ],
  swap: [
    {
      type: 'doc',
      id: 'swap-api/README',
    },
    {
      type: 'html',
      value: '<div class="sidebar-line-break"></div>',
    },
    {
      type: 'category',
      label: 'Swap API',
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'swap-api/get-quote',
        },
        {
          type: 'doc',
          id: 'swap-api/build-swap-transaction',
        },
        {
          type: 'doc',
          id: 'swap-api/send-swap-transaction',
        },
      ],
    },
    {
      type: 'html',
      value: '<div class="sidebar-line-break"></div>',
    },
    {
      type: 'category',
      label: 'Swap API Guides',
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'swap-api/add-fees-to-swap',
        },
        {
          type: 'doc',
          id: 'swap-api/payments-through-swap',
        },
        {
          type: 'doc',
          id: 'swap-api/solana-unity-sdk',
        },
        {
          type: 'doc',
          id: 'tool-kits/swap-terminal',
          label: 'Integrate Swap Terminal',
        },
      ],
    },
    {
      type: 'html',
      value: '<div class="sidebar-line-break"></div>',
    },
    {
      type: 'category',
      label: 'Debugging',
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'swap-api/common-errors',
        },
        {
          type: 'doc',
          id: 'api-responses',
        },
      ],
    },
    {
      type: 'html',
      value: '<div class="sidebar-line-break"></div>',
    },
  ],
  trigger: [
    {
      type: 'doc',
      id: 'trigger-api/README',
    },
    {
      type: 'html',
      value: '<div class="sidebar-line-break"></div>',
    },
    {
      type: 'category',
      label: 'Trigger API',
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: 'doc',
          label: 'Create Order',
          id: 'trigger-api/create-order',
        },
        {
          type: 'doc',
          id: 'trigger-api/execute-order',
        },
      ],
    },
    {
      type: 'html',
      value: '<div class="sidebar-line-break"></div>',
    },
    {
      type: 'category',
      label: 'Order Management',
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'trigger-api/cancel-order',
        },
        {
          type: 'doc',
          id: 'trigger-api/get-trigger-orders',
        },
      ],
    },
    {
      type: 'html',
      value: '<div class="sidebar-line-break"></div>',
    },
    {
      type: 'category',
      label: 'Debugging',
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'trigger-api/best-practices',
        },
      ],
    },
  ],
  recurring: [
    {
      type: 'doc',
      id: 'recurring-api/README',
    },
    {
      type: 'html',
      value: '<div class="sidebar-line-break"></div>',
    },
    {
      type: 'category',
      label: 'Recurring API',
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'recurring-api/create-order',
        },
        {
          type: 'doc',
          id: 'recurring-api/execute-order',
        },
      ],
    },
    {
      type: 'html',
      value: '<div class="sidebar-line-break"></div>',
    },
    {
      type: 'category',
      label: 'Order Management',
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'recurring-api/cancel-order',
        },
        {
          type: 'doc',
          id: 'recurring-api/deposit-price-order',
        },
        {
          type: 'doc',
          id: 'recurring-api/withdraw-price-order',
        },
        {
          type: 'doc',
          id: 'recurring-api/get-recurring-orders',
        },
      ],
    },
    {
      type: 'html',
      value: '<div class="sidebar-line-break"></div>',
    },
    {
      type: 'category',
      label: 'Debugging',
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'recurring-api/best-practices',
        },
      ],
    },
  ],
  perp: [
    {
      type: 'doc',
      id: 'perp-api/README',
    },
    {
      type: 'html',
      value: '<div class="sidebar-line-break"></div>',
    },
    {
      type: 'category',
      label: 'Perp Program',
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'perp-api/position-account',
        },
        {
          type: 'doc',
          id: 'perp-api/position-request-account',
        },
        {
          type: 'doc',
          id: 'perp-api/pool-account',
        },
        {
          type: 'doc',
          id: 'perp-api/custody-account',
        },
      ],
    },
    {
      type: 'html',
      value: '<div class="sidebar-line-break"></div>',
    },
  ],
  token: [
    {
      type: 'doc',
      id: 'token-api/README',
    },
    {
      type: 'html',
      value: '<div class="sidebar-line-break"></div>',
    },
    {
      type: 'category',
      label: 'Expanding the Token API',
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'token-api/token-tag-standard',
        },
      ],
    },
    {
      type: 'html',
      value: '<div class="sidebar-line-break"></div>',
    },
  ],
  toolkit: [
    {
      type: 'doc',
      id: 'tool-kits/README',
    },
    {
      type: 'html',
      value: '<div class="sidebar-line-break"></div>',
    },
    {
      type: 'category',
      label: 'Jupiter Terminal',
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'tool-kits/terminal/README',
        },
        {
          type: 'doc',
          id: 'tool-kits/terminal/nextjs-app-example',
        },
        {
          type: 'doc',
          id: 'tool-kits/terminal/react-app-example',
        },
        {
          type: 'doc',
          id: 'tool-kits/terminal/html-app-example',
        },
        {
          type: 'doc',
          id: 'tool-kits/terminal/customization',
        },
        {
          type: 'doc',
          id: 'tool-kits/terminal/faq',
        },
      ],
    },
    {
      type: 'html',
      value: '<div class="sidebar-line-break"></div>',
    },
    {
      type: 'category',
      label: 'Jupiter Wallet Kit',
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'tool-kits/wallet-kit/README',
        },
      ],
    },
    {
      type: 'html',
      value: '<div class="sidebar-line-break"></div>',
    },
  ],
  ...apiSidebars,
};

module.exports = sidebars;
