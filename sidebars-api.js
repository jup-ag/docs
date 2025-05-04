// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  api: [
    {
      type: "category",
      label: "API Reference",
      collapsible: false,
      collapsed: false,
      link: {
        type: "generated-index",
        title: "API Reference",
        slug: "/api",
      },
      items: [
        {
          type: "category",
          label: "Ultra API Schema",
          link: {
            type: "generated-index",
            title: "Ultra API Schema",
            slug: "/api/ultra-api",
          },
          items: [
            {
              type: 'doc',
              id: 'api/ultra-api/order',
            },
            {
              type: 'doc',
              id: 'api/ultra-api/execute',
            },
            {
              type: 'doc',
              id: 'api/ultra-api/balances',
            },
            {
              type: 'doc',
              id: 'api/ultra-api/shield',
            },
            {
              type: 'doc',
              id: 'api/ultra-api/routers',
            },
          ],
        },
        {
          type: "category", 
          label: "Swap API Schema",
          link: {
            type: "generated-index",
            title: "Swap API Schema",
            slug: "/api/swap-api",
          },
          items: [
            {
              type: 'doc',
              id: 'api/swap-api/quote',
            },
            {
              type: 'doc',
              id: 'api/swap-api/swap',
            },
            {
              type: 'doc',
              id: 'api/swap-api/swap-instructions',
            },
            {
              type: 'doc',
              id: 'api/swap-api/program-id-to-label',
            },
          ],
        },
        {
          type: "category", 
          label: "Trigger API Schema",
          link: {
            type: "generated-index",
            title: "Trigger API Schema",
            slug: "/api/trigger-api",
          },
          items: [
            {
              type: 'doc',
              id: 'api/trigger-api/create-order',
            },
            {
              type: 'doc',
              id: 'api/trigger-api/execute',
            },
            {
              type: 'doc',
              id: 'api/trigger-api/cancel-order',
            },
            {
              type: 'doc',
              id: 'api/trigger-api/cancel-orders',
            },
            {
              type: 'doc',
              id: 'api/trigger-api/get-trigger-orders',
            },
          ],
        },
        {
          type: "category",
          label: "Recurring API Schema",
          link: {
            type: "generated-index",
            title: "Recurring API Schema",
            slug: "/api/recurring-api",
          },
          items: [
            {
              type: 'doc',
              id: 'api/recurring-api/create-order',
            },
            {
              type: 'doc',
              id: 'api/recurring-api/execute',
            },
            {
              type: 'doc',
              id: 'api/recurring-api/cancel-order',
            },
            {
              type: 'doc',
              id: 'api/recurring-api/price-deposit',
            },
            {
              type: 'doc',
              id: 'api/recurring-api/price-withdraw',
            },
            {
              type: 'doc',
              id: 'api/recurring-api/get-recurring-orders',
            },
          ],
        },
        {
          type: "category",
          label: "Token API Schema",
          link: {
            type: "generated-index",
            title: "Token API Schema",
            slug: "/api/token-api",
          },
          items: [
            {
              type: 'doc',
              id: 'api/token-api/token-information',
            },
            {
              type: 'doc',
              id: 'api/token-api/mints-in-market',
            },
            {
              type: 'doc',
              id: 'api/token-api/tradable',
            },
            {
              type: 'doc',
              id: 'api/token-api/tagged',
            },
            {
              type: 'doc',
              id: 'api/token-api/new',
            },
            {
              type: 'doc',
              id: 'api/token-api/all',
            },
          ],
        },
        {
          type: "category",
          label: "Price API Schema",
          link: {
            type: "generated-index",
            title: "Price API Schema",
            slug: "/api/price-api",
          },
          items: [
            {
              type: 'doc',
              id: 'api/price-api/price',
            },
          ],
        },
      ],
    },
  ],
};

module.exports = sidebars;
