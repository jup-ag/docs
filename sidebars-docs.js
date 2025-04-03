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
          id: 'index',
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
          type: 'html',
          value: '<div class="sidebar-line-break"></div>',
        },
      ],
    },
  ],
  misc: [
    {
      type: 'category',
      label: 'Legal & Guidelines',
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
          id: 'misc/support-guidelines',
        },
        {
          type: 'html',
          value: '<div class="sidebar-line-break"></div>',
        },
      ],
    },
  ],
  ultra: [
    {
      type: 'category',
      label: 'Ultra API',
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'ultra-api/index',
        },
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
      ],
    },
    {
      type: 'html',
      value: '<div class="sidebar-line-break"></div>',
    },
  ],
  swap: [
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
          id: 'swap-api/program-errors',
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
      type: 'category',
      label: 'Perp API',
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'perp-api/index',
        },
      ],
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
  toolkit: [
    {
      type: 'category',
      label: 'Jupiter Tool Kits',
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'tool-kits/swap-terminal',
        },
        {
          type: 'doc',
          id: 'tool-kits/terminal-walkthrough',
        },
        {
          type: 'doc',
          id: 'tool-kits/unified-wallet-kit',
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
