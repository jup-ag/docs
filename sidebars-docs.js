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
          type: 'doc',
          id: 'api-faq',
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
        {
          type: 'doc',
          id: 'misc/audits',
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
        {
          type: 'doc',
          id: 'ultra-api/search-token',
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
          id: 'swap-api/requote-with-lower-max-accounts',
        },
        {
          type: 'doc',
          id: 'swap-api/solana-unity-sdk',
        },
        {
          type: 'doc',
          id: 'tool-kits/plugin/README',
          label: 'Integrate Jupiter Plugin',
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
      label: 'Versions',
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'token-api/v2',
        },
        {
          type: 'doc',
          id: 'token-api/v1',
        },
      ],
    },
    {
      type: 'category',
      label: 'Expanding on Token API',
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'token-api/organic-score',
        },
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
  price: [
    {
      type: 'doc',
      id: 'price-api/README',
    },
    {
      type: 'html',
      value: '<div class="sidebar-line-break"></div>',
    },
    {
      type: 'category',
      label: 'Versions',
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'price-api/v3',
        },
        {
          type: 'doc',
          id: 'price-api/v2',
        },
      ],
    },
    {
      type: 'html',
      value: '<div class="sidebar-line-break"></div>',
    },
  ],
  lend: [
    {
      type: 'doc',
      id: 'lend-api/README',
    },
    {
      type: 'html',
      value: '<div class="sidebar-line-break"></div>',
    },
    {
      type: 'category',
      label: 'Lend API',
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'lend-api/earn',
        },
        {
          type: 'doc',
          id: 'lend-api/borrow',
        },
      ],
    },
    {
      type: 'html',
      value: '<div class="sidebar-line-break"></div>',
    },
  ],
  send: [
    {
      type: 'doc',
      id: 'send-api/README',
    },
    {
      type: 'html',
      value: '<div class="sidebar-line-break"></div>',
    },
    {
      type: 'category',
      label: 'Send API',
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'send-api/invite-code',
        },
        {
          type: 'doc',
          id: 'send-api/craft-send',
        },
        {
          type: 'doc',
          id: 'send-api/craft-clawback',
        },
        {
          type: 'doc',
          id: 'send-api/manage-invites',
        },
      ],
    },
    {
      type: 'html',
      value: '<div class="sidebar-line-break"></div>',
    },
  ],
  studio: [
    {
      type: 'doc',
      id: 'studio-api/README',
    },
    {
      type: 'html',
      value: '<div class="sidebar-line-break"></div>',
    },
    {
      type: 'category',
      label: 'Studio API',
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'studio-api/create-token',
        },
        {
          type: 'doc',
          id: 'studio-api/claim-fee',
        },
      ],
    },
    {
      type: 'html',
      value: '<div class="sidebar-line-break"></div>',
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
      label: 'Jupiter Plugin',
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'tool-kits/plugin/README',
        },
        {
          type: 'doc',
          id: 'tool-kits/plugin/nextjs-app-example',
        },
        {
          type: 'doc',
          id: 'tool-kits/plugin/react-app-example',
        },
        {
          type: 'doc',
          id: 'tool-kits/plugin/html-app-example',
        },
        {
          type: 'doc',
          id: 'tool-kits/plugin/customization',
        },
        {
          type: 'doc',
          id: 'tool-kits/plugin/faq',
        },
      ],
    },
    {
      type: 'html',
      value: '<div class="sidebar-line-break"></div>',
    },
    {
      type: 'category',
      label: 'Jupiter Mobile Adapter',
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'tool-kits/mobile-adapter/README',
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
    {
      type: 'category',
      label: 'Jupiter Referral Program',
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'tool-kits/referral-program/README',
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
