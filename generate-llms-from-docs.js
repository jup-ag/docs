#!/usr/bin/env node

/**
 * Generate llms.txt from docs.json navigation structure.
 * Walks the nav tree directly (tabs → products → versions → groups → pages)
 * so output mirrors the site structure. Deprecated pages are skipped.
 * Follows llms.txt standard: https://llmstxt.org/#format
 */

const fs = require("fs");
const path = require("path");

const BASE_URL = "https://dev.jup.ag";
const baseFolder = __dirname;

const docsJson = JSON.parse(
  fs.readFileSync(path.join(baseFolder, "docs.json"), "utf8"),
);
const navigation = docsJson.navigation || {};
const topLevelNav = navigation.tabs;

if (!topLevelNav) {
  throw new Error("No navigation.tabs found in docs.json");
}

// --- Section summaries ---

const PRODUCT_SUMMARIES = {
  Swap: "Token swap API with managed execution (/order) and custom transaction building (/build).",
  Tokens: "Token metadata, search, verification, and organic score APIs.",
  Price: "Real-time heuristics-based USD token pricing.",
  Lend: "Lending protocol with Earn (deposit yield), Borrow (collateralised loans), and Flashloans.",
  Perps:
    "Leveraged perpetuals trading on Solana (on-chain program, no REST API).",
  Trigger:
    "Vault-based limit orders with single, OCO (TP/SL), and OTOCO order types.",
  Recurring:
    "Automated dollar-cost averaging (DCA) with time-based recurring orders.",
  Prediction: "Binary prediction markets for real-world events.",
  More: "Portfolio aggregation, Send (token transfers), Studio (token creation), and Lock (token vesting).",
  "Get Started": "Setup guides for environment, tooling, and first API calls.",
};

const TAB_SUMMARIES = {
  AI: "AI-first developer experience — AI-friendly docs, CLI, agent skills, llms.txt, MCP integration, ecosystem tools, and everything AI agents need to build on Jupiter.",
  "Tool Kits":
    "Drop-in UI components (Plugin, Wallet Kit) and the Referral Program SDK.",
  Changelog: "Changelog, release notes, and developer blog.",
  Resources: "Support channels, brand assets, and community resources.",
};

// --- Frontmatter extraction (cached) ---

const frontmatterCache = new Map();

function extractFrontmatter(pagePath) {
  if (frontmatterCache.has(pagePath)) return frontmatterCache.get(pagePath);

  const candidates = [
    path.join(baseFolder, pagePath + ".mdx"),
    path.join(baseFolder, pagePath + ".md"),
    path.join(baseFolder, pagePath, "index.mdx"),
    path.join(baseFolder, pagePath, "index.md"),
  ];

  let filePath;
  for (const c of candidates) {
    if (fs.existsSync(c)) {
      filePath = c;
      break;
    }
  }

  if (!filePath) {
    console.error(`File not found: ${pagePath}`);
    frontmatterCache.set(pagePath, null);
    return null;
  }

  try {
    const content = fs.readFileSync(filePath, "utf8");
    const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
    if (!match) {
      console.error(`No frontmatter: ${filePath}`);
      frontmatterCache.set(pagePath, null);
      return null;
    }

    let title,
      description,
      llmsDescription,
      deprecated = false;
    match[1].split("\n").forEach((line) => {
      line = line.trim();
      if (!line || line.startsWith("#")) return;
      const colonIndex = line.indexOf(":");
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim();
        let value = line.substring(colonIndex + 1).trim();
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }
        if (key === "title") title = value;
        if (key === "description") description = value;
        if (key === "llmsDescription") llmsDescription = value;
        if (key === "deprecated" && value === "true") deprecated = true;
      }
    });

    if (deprecated) {
      frontmatterCache.set(pagePath, null);
      return null;
    }

    if (!title || !description) {
      console.error(`Missing title or description: ${filePath}`);
      frontmatterCache.set(pagePath, null);
      return null;
    }

    const result = { title, description: llmsDescription || description };
    frontmatterCache.set(pagePath, result);
    return result;
  } catch (e) {
    console.error(e.message);
    frontmatterCache.set(pagePath, null);
    return null;
  }
}

// --- Output building ---

let output = "";
const seenUrls = new Set();

function emit(text) {
  output += text;
}

function emitHeading(text, depth) {
  if (output && !output.endsWith("\n\n")) {
    emit(output.endsWith("\n") ? "\n" : "\n\n");
  }
  emit(`${"#".repeat(Math.min(depth, 6))} ${text}\n\n`);
}

function emitEntry(pagePath) {
  if (pagePath === "index") return false; // skip root homepage
  const fm = extractFrontmatter(pagePath);
  if (!fm) return false;
  const url = `${BASE_URL}/${pagePath}.md`;
  if (seenUrls.has(url)) return false;
  seenUrls.add(url);
  emit(`- [${fm.title}](${url}): ${fm.description}\n`);
  return true;
}

// --- Nav tree walkers ---

function walkPages(pages, headingDepth) {
  let count = 0;
  let afterSubgroup = false;

  for (const page of pages) {
    if (typeof page === "string") {
      if (afterSubgroup) {
        emit("\n");
        afterSubgroup = false;
      }
      if (emitEntry(page)) count++;
    } else if (page?.pages) {
      emitHeading(page.group, headingDepth);
      count += walkPages(page.pages, headingDepth + 1);
      afterSubgroup = true;
    }
  }
  return count;
}

function walkGroup(group, headingDepth) {
  const name = group.group?.trim();
  if (name) {
    emitHeading(name, headingDepth);
    return walkPages(group.pages || [], headingDepth + 1);
  }
  return walkPages(group.pages || [], headingDepth);
}

function walkVersion(version, headingDepth) {
  if (version.tag === "Unmaintained") return 0;
  emitHeading(version.version, headingDepth);
  let count = 0;
  for (const group of version.groups || []) {
    count += walkGroup(group, headingDepth + 1);
  }
  return count;
}

function walkProduct(product) {
  emitHeading(product.product, 2);
  if (PRODUCT_SUMMARIES[product.product]) {
    emit(`${PRODUCT_SUMMARIES[product.product]}\n\n`);
  }
  let count = 0;
  if (product.versions) {
    for (const version of product.versions) {
      count += walkVersion(version, 3);
    }
  }
  if (product.groups) {
    for (const group of product.groups) {
      count += walkGroup(group, 3);
    }
  }
  return count;
}

function walkTopLevel(item) {
  if (item.products) {
    for (const product of item.products) {
      walkProduct(product);
    }
  } else if (item.groups) {
    const sectionName = item.tab;
    emitHeading(sectionName, 2);
    if (TAB_SUMMARIES[sectionName]) {
      emit(`${TAB_SUMMARIES[sectionName]}\n\n`);
    }
    for (const group of item.groups) {
      walkGroup(group, 3);
    }
  }
}

// --- Build output ---

// Header
emit("# Jupiter\n\n");
emit(
  "> Jupiter is DeFi infrastructure on Solana providing swap, lending, perpetuals, limit-order, DCA, and portfolio APIs.\n",
);
emit(
  "> **Swap API V2** (recommended): `/order` for managed execution, `/build` for custom transactions. Base URL: `https://api.jup.ag/swap/v2`.\n",
);
emit(
  "> All endpoints require an `x-api-key` header — generate a free key at [portal.jup.ag](https://portal.jup.ag).\n\n",
);

emit("## Quick Reference\n\n");
emit(
  "- Swap API V2 (recommended): `GET /swap/v2/order` + `POST /swap/v2/execute` or `GET /swap/v2/build`\n",
);
emit("- Trigger (limit orders): `POST /trigger/v2/orders/price`\n");
emit("- Recurring (DCA): `POST /recurring/v1/createOrder`\n");
emit("- Lend: `POST /lend/v1/earn/deposit`\n");
emit("- Price: `GET /price/v3?ids={mints}`\n");
emit("- Tokens: `GET /tokens/v2/search?query={query}`\n");
emit("- Portfolio: `GET /portfolio/v1/positions?wallet={address}`\n\n");

// Walk navigation
for (const item of topLevelNav) {
  walkTopLevel(item);
}

// Footer
emitHeading("Optional", 2);
emit(
  "- [Dev Portal](https://portal.jup.ag/): Access the Jupiter Portal to manage API key, access to metrics and logs\n",
);
emit(
  "- [API Status](https://status.jup.ag/): Check the status of Jupiter APIs\n",
);
emit(
  `- [Stay Updated](${BASE_URL}/resources/support): Get support and stay updated with Jupiter\n`,
);

// --- Clean up empty sections ---
// A section is empty if it has no `- [` entries before the next same-or-higher-level heading.

function removeEmptySections(text) {
  let result = text;
  for (let pass = 0; pass < 10; pass++) {
    const lines = result.split("\n");
    const kept = [];
    let changed = false;

    for (let i = 0; i < lines.length; i++) {
      const headingMatch = lines[i].match(/^(#{2,6}) /);
      if (!headingMatch) {
        kept.push(lines[i]);
        continue;
      }

      const level = headingMatch[1].length;
      let hasEntries = false;
      for (let j = i + 1; j < lines.length; j++) {
        const nextMatch = lines[j].match(/^(#{1,6}) /);
        if (nextMatch && nextMatch[1].length <= level) break;
        if (lines[j].startsWith("- [")) {
          hasEntries = true;
          break;
        }
      }

      if (hasEntries) {
        kept.push(lines[i]);
      } else {
        changed = true;
        // Also skip non-heading, non-entry lines that belong to this empty section
        // (summary text, blank lines) until the next heading or entry
        while (
          i + 1 < lines.length &&
          !lines[i + 1].match(/^#{1,6} /) &&
          !lines[i + 1].startsWith("- [")
        ) {
          i++;
        }
      }
    }

    result = kept.join("\n");
    if (!changed) break;
  }
  return result;
}

output = removeEmptySections(output);
output = output.replace(/\n{3,}/g, "\n\n").trim() + "\n";

// --- Write ---

fs.writeFileSync(path.join(baseFolder, "llms.txt"), output, "utf8");

const entries = output.match(/^- \[/gm);
console.log(`✅ Generated llms.txt: ${entries ? entries.length : 0} entries`);
