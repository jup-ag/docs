import React from "react";
import Layout from "@theme/Layout";
import { API_CARDS, TOOL_KIT_CARDS, DRWG_CARDS } from "../utils/homeCards";

const JupiterExplore = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 md:py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white shadow-md p-6 rounded-2xl flex flex-col h-full">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Integrate APIs
            </h2>
            <p className="text-gray-600 text-sm text-left py-1">
              Develop with the most comprehensive set of APIs offering a full
              range of Jupiter Products like{" "}
              <a href="/docs/ultra-api/" className="underline text-gray-800">
                Ultra
              </a>
              , <a href="/docs/swap-api/" className="underline text-gray-800">
                Swap
              </a>
              , <a href="/docs/trigger-api/" className="underline text-gray-800">
                Trigger
              </a>
              , <a href="/docs/recurring-api/" className="underline text-gray-800">
                Recurring
              </a>
              , and more.
            </p>
          </div>
          <div className="mt-6 flex gap-3">
            <a
              href="/docs/"
              className="flex-1 bg-[#66A2E8] !text-white font-semibold py-2 px-1 rounded-lg text-center hover:bg-[#66A2E8]/90 transition-colors !no-underline text-sm"
            >
              Get Started
            </a>
            <a
              href="/docs/api-setup/"
              className="flex-1 bg-[#66A2E8] !text-white font-semibold py-2 px-1 rounded-lg text-center hover:bg-[#66A2E8]/90 transition-colors !no-underline text-sm"
            >
              Setup API Key
            </a>
          </div>
        </div>
        <div className="bg-white shadow-md p-6 rounded-2xl flex flex-col h-full">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Tool Kits
            </h2>
            <p className="text-gray-600 text-sm text-left py-1">
              For those looking for no-code solutions, we provide a customizable
              Swap Terminal kit for you to develop faster and smoother.
            </p>
          </div>
          <a
            href="/docs/tool-kits/"
            className="mt-6 bg-[#66A2E8] !text-white font-semibold py-2 px-3 rounded-lg text-center hover:bg-[#66A2E8]/90 transition-colors !no-underline text-sm"
          >
            Explore Tool Kits
          </a>
        </div>
        <div className="bg-white shadow-md p-6 rounded-2xl flex flex-col h-full">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Get Routed
            </h2>
            <p className="text-gray-600 text-sm text-left py-1">
              If you are a decentralized exchange or market maker and have an interest to be part of our
              routing engines, refer to the routing integration guides.
            </p>
          </div>
          <div className="mt-6 flex gap-3">
            <a
              href="/docs/routing/dex-integration"
              className="flex-1 bg-[#66A2E8] !text-white font-semibold py-2 px-1 rounded-lg text-center hover:bg-[#66A2E8]/90 transition-colors !no-underline text-sm"
            >
              DEX Integration
            </a>
            <a
              href="/docs/routing/rfq-integration"
              className="flex-1 bg-[#66A2E8] !text-white font-semibold py-2 px-1 rounded-lg text-center hover:bg-[#66A2E8]/90 transition-colors !no-underline text-sm"
            >
              RFQ Integration
            </a>
          </div>
        </div>
        <div className="bg-white shadow-md p-6 rounded-2xl flex flex-col h-full">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Expansive Ecosystem
            </h2>
            <p className="text-gray-600 text-sm text-left py-1">
              Explore our ecosystem of projects and protocols that are part of
              our routing engine, or utilize Jupiter's developer tools to build
              their applications.
            </p>
          </div>
          <a
            href="/ecosystem"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 bg-[#66A2E8] !text-white font-semibold py-2 px-3 rounded-lg text-center hover:bg-[#66A2E8]/90 transition-colors !no-underline text-sm"
          >
            Explore Ecosystem
          </a>
        </div>
      </div>
    </div>
  );
};

const JupiterAPI = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 pb-12 md:pb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {API_CARDS.map((card, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-5 flex flex-col"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {card.title}
            </h3>
            <div className="flex gap-2 text-gray-600">
              {card.links.map((link, linkIndex) => (
                <a
                  key={linkIndex}
                  href={link.href}
                  {...(!link.href.startsWith("/")
                    ? {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      }
                    : {})}
                  className="pr-2 !text-gray-600 hover:!text-[#66A2E8] transition-colors text-sm"
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const JupiterToolKit = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 pb-12 md:pb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TOOL_KIT_CARDS.map((card, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-5 flex flex-col"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {card.title}
            </h3>
            <div className="flex gap-2 text-gray-600">
              {card.links.map((link, linkIndex) => (
                <a
                  key={linkIndex}
                  href={link.href}
                  {...(!link.href.startsWith("/")
                    ? {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      }
                    : {})}
                  className="pr-2 !text-gray-600 hover:!text-[#66A2E8] transition-colors text-sm"
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DRWG = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 pb-12 md:pb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {DRWG_CARDS.map((card, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-5 flex flex-col"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {card.title}
            </h3>
            <div className="flex gap-2 text-gray-600">
              {card.links.map((link, linkIndex) => (
                <a
                  key={linkIndex}
                  href={link.href}
                  {...(!link.href.startsWith("/")
                    ? {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      }
                    : {})}
                  className="pr-2 !text-gray-600 hover:!text-[#66A2E8] transition-colors"
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const JupiterCommunity = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 pb-12 md:pb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <a
          href="https://discord.gg/jup"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white shadow-md rounded-xl p-6 flex items-center gap-4 hover:bg-gray-50 transition-colors hover:no-underline"
        >
          <div className="bg-gray-100 p-3 rounded-xl w-12 h-12 flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-gray-800"
            >
              <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z" />
            </svg>
          </div>
          <div>
            <h3 className="text-gray-800 text-xl font-semibold">Get Support</h3>
            <p className="text-gray-600">Join our Discord Community</p>
          </div>
        </a>

        <a
          href="https://github.com/jup-ag/space-station/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white shadow-md rounded-xl p-6 flex items-center gap-4 hover:bg-gray-50 transition-colors hover:no-underline"
        >
          <div className="bg-gray-100 p-3 rounded-xl w-12 h-12 flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-gray-800"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </div>
          <div>
            <h3 className="text-gray-800 text-xl font-semibold">
              Feedback & Contribute
            </h3>
            <p className="text-gray-600">Share your suggestions on GitHub</p>
          </div>
        </a>
      </div>
    </div>
  );
};

const JupiterFooter = () => {
  return (
    <footer className="w-full bg-gray-100 py-8 border-t border-gray-200">
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center gap-6">
          {/* Main row with all elements */}
          <div className="flex flex-col items-center w-full gap-6">
            {/* Social links */}
            <div className="flex justify-center gap-3">
              <a
                href="https://discord.gg/jup"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-700 hover:text-primary hover:bg-gray-300 transition-all transform hover:scale-110"
                aria-label="Discord"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z" />
                </svg>
              </a>
              <a
                href="https://github.com/jup-ag"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-700 hover:text-primary hover:bg-gray-300 transition-all transform hover:scale-110"
                aria-label="GitHub"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
              <a
                href="https://t.me/jup_dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-700 hover:text-primary hover:bg-gray-300 transition-all transform hover:scale-110"
                aria-label="Telegram"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.554.223l.198-2.8 5.094-4.613c.222-.196-.047-.304-.342-.108l-6.295 3.959-2.713-.848c-.59-.183-.601-.59.123-.873l10.59-4.082c.503-.18.94.106.399 1.17z" />
                </svg>
              </a>
              <a
                href="https://x.com/JupiterExchange"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-700 hover:text-primary hover:bg-gray-300 transition-all transform hover:scale-110"
                aria-label="X (Twitter)"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://support.jup.ag/hc/en-us"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-700 hover:text-primary hover:bg-gray-300 transition-all transform hover:scale-110"
                aria-label="Help Center"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
              </a>
              <a
                href="https://status.jup.ag"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-700 hover:text-primary hover:bg-gray-300 transition-all transform hover:scale-110"
                aria-label="Status"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
                </svg>
              </a>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-center">
              <a
                href="/docs/misc/sdk-api-license-agreement"
                className="text-gray-700 hover:text-primary transition-colors hover:underline text-xs"
              >
                SDK & API License
              </a>
              <a
                href="/docs/misc/terms-of-use"
                className="text-gray-700 hover:text-primary transition-colors hover:underline text-xs"
              >
                Terms of Use
              </a>
              <a
                href="/docs/misc/privacy-policy"
                className="text-gray-700 hover:text-primary transition-colors hover:underline text-xs"
              >
                Privacy Policy
              </a>
              <a
                href="/docs/misc/integrator-guidelines"
                className="text-gray-700 hover:text-primary transition-colors hover:underline text-xs"
              >
                Integrator Guidelines
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center">
              <p className="text-gray-600 text-xs">
                © {new Date().getFullYear()} Jupiter. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Content = () => {
  return (
    <div className="w-full min-h-screen text-gray-800 flex flex-col items-center bg-white">
      <div className="bg-gray-300 w-full h-[1px]" />

      <div className="w-full flex flex-col">
        <div className="bg-gray-100 w-full flex flex-col justify-center items-center text-center py-10 md:py-20 px-4">
          <div className="relative">
            <div
              className={`
                font-bold max-md:max-w-full 
                text-5xl xl:text-6xl 
                leading-[1] py-2
                bg-gradient-to-r from-[#00BEF0] via-[#8DE3A3] to-[#C7F284] 
                text-transparent bg-clip-text
              `}
            >
              Jupiter Developer Docs
              <span className="inline-block ml-2 bg-[#66A2E8] text-white text-[10px] px-1.5 py-0.5 rounded-md transform align-top relative top-4 md:top-2">
                Beta
              </span>
            </div>
            <JupiterExplore />
          </div>
        </div>
        <div className="py-8"></div>
        <div className="w-full max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Browse by API
          </h2>
          <p className="text-gray-600 text-base mb-6">
            Most comprehensive set of endpoints to integrate Jupiter Products
            into your applications
          </p>
        </div>
        <JupiterAPI />
        <div className="w-full max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Browse by Tool Kits
          </h2>
          <p className="text-gray-600 text-base mb-6">
            Ready-to-use components and libraries to accelerate your development
          </p>
        </div>
        <JupiterToolKit />
        <div className="w-full max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Developed by DevRel Working Group
          </h2>
          <p className="text-gray-600 text-base mb-6">
            Community-driven resources and examples to help you build with
            Jupiter
          </p>
        </div>
        <DRWG />
        <div className="w-full max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            We'd love to hear from you!
          </h2>
          <p className="text-gray-600 text-base mb-6">
            Join our community and share your feedback to help us improve
          </p>
        </div>
        <JupiterCommunity />
      </div>
      <JupiterFooter />
    </div>
  );
};

export default function Home(): JSX.Element {
  return (
    <div className="home overflow-hidden">
      <Layout>
        <Content />
      </Layout>
    </div>
  );
}
