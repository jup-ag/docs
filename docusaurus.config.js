// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require('prism-react-renderer');
const lightTheme = themes.github;
const darkTheme = themes.dracula;
const redirects = require('./redirects.json');
require("dotenv").config();

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Jupiter Developer Docs",
  staticDirectories: ["static"],
  tagline: "Build with the most comprehensive APIs and no-code tool kits powered by Jupiter",
  favicon: "img/favicon.ico",
  customFields: {
    // Put your custom environment here
  },
  // Set the production url of your site here
  url: "https://dev.jup.ag",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "Raccoons", // Usually your GitHub org/user name.
  projectName: "Jupiter Developer Docs", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  stylesheets: [
    {
      href: "https://fonts.googleapis.com",
      rel: "preconnect",
    },
    {
      href: "https://fonts.gstatic.com",
      rel: "preconnect",
      crossOrigin: true,
    },
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
  ],

  presets: [
    // [
    //   "classic",
    //   /** @type {import('@docusaurus/preset-classic').Options} */
    //   ({
    //     docs: {
    //       sidebarPath: require.resolve("./sidebars.js"),
    //       // Please change this to your repo.
    //       // Remove this to remove the "edit this page" links.
    //       sidebarCollapsed: false,
    //       editUrl: "https://github.com/jup-ag/docs/tree/main/",
    //     },

    //     blog: {
    //       showReadingTime: true,
    //       // Please change this to your repo.
    //       // Remove this to remove the "edit this page" links.
    //       // editUrl:
    //       //   "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
    //       blogSidebarTitle: "All posts",
    //       blogSidebarCount: "ALL",
    //     },
    //     theme: {
    //       customCss: require.resolve("./src/css/custom.css"),
    //     },
    //   }),
    // ],
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          id: 'docs',
          lastVersion: 'current',
          versions: {
            current: {
              label: 'Latest',
              path: '',
              badge: false,
            },
            old: {
              label: 'Old',
              path: 'old',
              banner: 'unmaintained',
            }
          },
          sidebarPath: require.resolve("./sidebars-docs.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/jup-ag/docs/tree/main/",
          // docLayoutComponent: "@theme/DocPage",
          docItemComponent: "@theme/ApiItem", // Derived from docusaurus-theme-openapi-docs
        },
        theme: {
          customCss: [
            require.resolve("./src/css/custom.css"),
            require.resolve("./src/css/navbar.css"),
            require.resolve("./src/css/sidebar.css"),
            require.resolve("./src/css/searchbar.css"),
            require.resolve("./src/css/openapi.css"),
          ],
        },
      }),
    ],
  ],
  plugins: [
    [
      "content-docs",
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: "guides",
        path: "guides",
        routeBasePath: "guides",
        sidebarPath: require.resolve("./sidebars-guides.js"),
        sidebarCollapsed: true,
        editUrl: "https://github.com/jup-ag/docs/tree/main/",
      }),
    ],
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: 'api',
        docsPluginId: 'docs',
        config: {
          ultra: {
            specPath: "openapi/ultra.yaml",
            outputDir: "docs/api/ultra-api",
          },
          swap: {
            specPath: "openapi/swap.yaml",
            outputDir: "docs/api/swap-api",
          },
          trigger: {
            specPath: "openapi/trigger.yaml",
            outputDir: "docs/api/trigger-api",
          },
          recurring: {
            specPath: "openapi/recurring.yaml",
            outputDir: "docs/api/recurring-api",
          },
          token: {
            specPath: "openapi/token.yaml",
            outputDir: "docs/api/token-api",
          },
          price: {
            specPath: "openapi/price.yaml",
            outputDir: "docs/api/price-api",
          },
        },
      },
    ],
    [
      "@docusaurus/plugin-client-redirects",
      { redirects }
    ],
    async function myPlugin() {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
        {
          property: "description",
          content:
            "Jupiter Developer Docs provides comprehensive documentation, tool kits and references for developing with the Jupiter API.",
        },
        {
          property: "og:image",
          content: "img/dev-meta.png",
        },
        {
          name: "theme-color",
          content: "#000000",
        },
      ],
      colorMode: {
        defaultMode: "light",
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: "",
        logo: {
          alt: "Jupiter Logo",
          src: "img/jupiter-logo.svg",
          width: 28,
          height: 28,
        },
        items: [
          { to: 'docs/index', label: 'Docs', position: 'left' },
          { type: 'search', position: 'right' },
        ],
      },
      algolia: {
        // The application ID provided by Algolia
        appId: "D6VF00EQ1A",
        // Public API key: it is safe to commit it
        apiKey: "37fcbbea886f4051c45861b1b582dd02",
        indexName: "jup",
        contextualSearch: true,
      },
      prism: {
        theme: lightTheme,
        darkTheme: darkTheme,
        additionalLanguages: ["bash", "json", "rust"],
      },
      languageTabs: [
        {
          highlight: "bash",
          language: "curl",
          logoClass: "curl",
        },
        {
          highlight: "javascript",
          language: "nodejs",
          logoClass: "nodejs",
        },
        {
          highlight: "python",
          language: "python",
          logoClass: "python",
        },
        {
          highlight: "rust",
          language: "rust",
          logoClass: "rust",
        },
      ],
      announcementBar: {
        id: 'zendesk-migration',
        content: 'We have migrated our User Guides from Station to our new Support System. Please visit <a target="_blank" rel="noopener noreferrer" href="https://jupiverse.zendesk.com/hc/en-us">Jupiter Helpdesk</a> for the latest guides.',
        backgroundColor: '#FFA500',
        textColor: '#000000',
        isCloseable: false,
      }
    }),
  themes: ['docusaurus-theme-openapi-docs'],
};

module.exports = config;
