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
              id: 'api/ultra-api/search',
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
          label: "Lend API Schema",
          link: {
            type: "generated-index",
            title: "Lend API Schema",
            slug: "/api/lend-api",
          },
          items: [
            {
              type: "category",
              label: "Earn (Beta)",
              link: {
                type: "generated-index",
                title: "Earn (Beta)",
                slug: "/api/lend-api/earn",
              },
              items: [
                {
                  type: 'doc',
                  id: 'api/lend-api/earn/deposit',
                },
                {
                  type: 'doc',
                  id: 'api/lend-api/earn/withdraw',
                },
                {
                  type: 'doc',
                  id: 'api/lend-api/earn/mint',
                },
                {
                  type: 'doc',
                  id: 'api/lend-api/earn/redeem',
                },
                {
                  type: 'doc',
                  id: 'api/lend-api/earn/deposit-instructions',
                },
                {
                  type: 'doc',
                  id: 'api/lend-api/earn/withdraw-instructions',
                },
                {
                  type: 'doc',
                  id: 'api/lend-api/earn/mint-instructions',
                },
                {
                  type: 'doc',
                  id: 'api/lend-api/earn/redeem-instructions',
                },
                {
                  type: 'doc',
                  id: 'api/lend-api/earn/stats',
                },
                {
                  type: 'doc',
                  id: 'api/lend-api/earn/tokens',
                },
                {
                  type: 'doc',
                  id: 'api/lend-api/earn/user-positions',
                },
                {
                  type: 'doc',
                  id: 'api/lend-api/earn/user-earnings',
                },
              ],
            },
            // {
            //   type: "category",
            //   label: "Borrow (Soon!)",
            //   link: {
            //     type: "generated-index",
            //     title: "Borrow (Soon!)",
            //     slug: "/api/lend-api/borrow",
            //   },
            //   items: [
            //   ],
            // },
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
              type: "category",
              label: "V2 (Beta)",
              link: {
                type: "generated-index",
                title: "Token API V2 (Beta)",
                slug: "/api/token-api/v2",
              },
              items: [
                {
                  type: 'doc',
                  id: 'api/token-api/v2/search',
                },
                {
                  type: 'doc',
                  id: 'api/token-api/v2/tag',
                },
                {
                  type: 'doc',
                  id: 'api/token-api/v2/category',
                },
                {
                  type: 'doc',
                  id: 'api/token-api/v2/recent',
                },
              ],
            },
            {
              type: "category",
              label: "V1 (Deprecated)",
              link: {
                type: "generated-index",
                title: "Token API V1 (Deprecated)",
                slug: "/api/token-api/v1",
              },
              items: [
                {
                  type: 'doc',
                  id: 'api/token-api/v1/token-information',
                },
                {
                  type: 'doc',
                  id: 'api/token-api/v1/mints-in-market',
                },
                {
                  type: 'doc',
                  id: 'api/token-api/v1/tradable',
                },
                {
                  type: 'doc',
                  id: 'api/token-api/v1/tagged',
                },
                {
                  type: 'doc',
                  id: 'api/token-api/v1/new',
                },
                {
                  type: 'doc',
                  id: 'api/token-api/v1/all',
                },
              ],
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
              type: "category",
              label: "V3 (Beta)",
              link: {
                type: "generated-index",
                title: "Price API V3 (Beta)",
                slug: "/api/price-api/v3",
              },
              items: [
                {
                  type: 'doc',
                  id: 'api/price-api/v3/price',
                },
              ],
            },
            {
              type: "category",
              label: "V2 (Deprecated)",
              link: {
                type: "generated-index",
                title: "Price API V2 (Deprecated)",
                slug: "/api/price-api/v2",
              },
              items: [
                {
                  type: 'doc',
                  id: 'api/price-api/v2/price',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

module.exports = sidebars;
