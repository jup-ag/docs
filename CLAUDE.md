# CLAUDE.md — Jupiter Developer Docs

## Identity

You are working on the Jupiter Developer Documentation repo (jup-ag/docs).
This is a Mintlify-powered docs site serving dev.jup.ag.
The audience is developers integrating Jupiter's DeFi APIs and toolkits on Solana.

## Project Context

Jupiter is the leading DeFi aggregator on Solana. This repo contains all developer-facing
documentation across multiple API products, toolkits, and the developer platform.

### Active Initiative: Developer Platform Launch

We are in the process of a major docs overhaul as part of the new Developer Platform launch:

- [ ] New pricing structure docs
- [ ] New rate limit strategy docs
- [ ] Restructure `docs/` section → rename to `learn/` (rethink purpose given new `guides/`)
- [ ] Create new `guides/` section (hands-on, task-oriented walkthroughs)
- [ ] Combine docs with Developer Platform under the same domain
- [ ] Clean up and update all content to be AI-friendly

When working on tasks, check if they relate to this initiative and flag dependencies.

## Repo Structure

```
jup-ag/docs/
├── docs.json              # Mintlify config — navigation, theme, metadata
├── index.mdx              # Homepage
├── style.css              # Custom styles
├── package.json
├── vercel.json            # Deployment config
│
├── api-reference/         # OpenAPI-generated API reference pages
├── openapi-spec/          # OpenAPI spec files (source of truth for API reference)
├── blog/                  # Developer blog posts
├── docs/                  # Core product documentation (→ becoming `learn/`)
│   ├── ultra/             # Ultra Swap overview
│   ├── ultra-api/         # Ultra Swap API (get-order, execute-order, etc.)
│   ├── tokens/            # Tokens API
│   ├── price/             # Price API
│   ├── routing/           # DEX integration (Iris), MM integration (RFQ/JupiterZ)
│   └── ...                # swap-api, api-setup, etc.
├── get-started/           # Getting started / onboarding
├── tool-kits/             # Plugin/Terminal, Wallet Kit, Mobile Adapter, Referral Program
├── portal/                # Developer Portal docs (portal.jup.ag)
├── resources/             # Support, brand kit
├── updates/               # Changelog / developer updates
├── legal/                 # Legal docs, SDK/API license
├── snippets/              # Reusable MDX snippet components
├── static/                # Static assets (images, etc.)
├── logo/                  # Logo assets
│
└── .claude/
    └── rules/             # Product-specific learnings and context (see below)
```

## Key URLs

| Resource        | URL                              |
|-----------------|----------------------------------|
| Live docs       | https://dev.jup.ag               |
| Developer Portal| https://portal.jup.ag            |
| API (Lite)      | https://lite-api.jup.ag          |
| API (Dynamic)   | https://api.jup.ag               |
| API Status      | https://status.jup.ag            |
| GitHub          | https://github.com/jup-ag/docs   |

## Products & APIs

| Product             | Description                                       | Folder          |
|---------------------|---------------------------------------------------|-----------------|
| Ultra Swap API      | Flagship swap — RPC-less, gasless, MEV-protected  | `docs/ultra-api`|
| Metis Swap API      | Legacy swap API (being superseded by Ultra)        | `docs/swap-api` |
| Tokens API          | Comprehensive token information                    | `docs/tokens`   |
| Price API           | Heuristics-based token pricing                     | `docs/price`    |
| Plugin / Terminal   | Drop-in swap UI embed                              | `tool-kits/`    |
| Wallet Kit          | Wallet adapter toolkit                             | `tool-kits/`    |
| Referral Program    | Integrator fee earning via Ultra                   | `tool-kits/`    |
| DEX Routing (Iris)  | Integrate a DEX into Jupiter routing               | `docs/routing`  |
| MM Routing (RFQ)    | Integrate a MM into JupiterZ                       | `docs/routing`  |
| Developer Portal    | API key management, usage dashboard                | `portal/`       |

## .claude/rules/ — Product Learnings

Instead of separate claude.md files, use `.claude/rules/` to store product-specific
learnings, conventions, and context that accumulate over time. Claude will always
reference these when working on related content.

### Structure

```
.claude/rules/
├── ultra-swap.md         # Ultra API-specific patterns, gotchas, terminology
├── tokens-price.md       # Tokens + Price API conventions
├── toolkits.md           # Plugin, Wallet Kit, Referral Program notes
├── routing.md            # DEX/MM integration specifics
├── portal.md             # Developer Portal context
├── style-guide.md        # Writing voice, terminology, formatting decisions
└── ia-decisions.md       # Information architecture decisions and rationale
```

### What goes in rules files

- API behavior nuances discovered during writing (e.g., "Ultra API returns X when Y")
- Terminology decisions (e.g., "always say 'Ultra Swap' not 'Ultra API' in user-facing copy")
- Common developer pain points surfaced from Discord/GitHub issues
- Content patterns that worked well and should be reused
- IA decisions and their rationale (e.g., "we moved X to Y because Z")

## Modes

### Mode: Planning (Linear / PM)

When asked to plan, organize, or create issues:

- Break work into issues sized for a single focused session (1-3 files changed)
- Always specify which files/folders are affected
- Tag with product area and initiative if applicable
- Flag dependencies between issues explicitly
- Use this label taxonomy:
  - Area: `ultra`, `tokens`, `price`, `routing`, `toolkits`, `portal`, `platform`
  - Type: `content-new`, `content-update`, `restructure`, `cleanup`, `config`
  - Priority: `p0-blocker`, `p1-launch`, `p2-improvement`, `p3-nice-to-have`

### Mode: Writing

When creating or editing documentation content:

#### Voice & Tone
<!-- PLACEHOLDER: Fill in your specific voice preferences. Suggestions below. -->
- Write for developers who want to ship fast — be direct, skip the fluff
- Lead with what the developer can DO, not what Jupiter IS
- Use "you" to address the developer, not "the user" or "developers"
- {YOUR_TONE_PREFERENCE: e.g., "casual but precise", "technical but approachable"}

#### Page Structure Convention
Every docs page should follow this pattern:

```mdx
---
title: "{Clear, action-oriented title}"
description: "{One-line description — this is used by search and AI}"
---

{Optional: callout/note if there's a prerequisite or important context}

{Brief intro paragraph — what this is and why you'd use it (2-3 sentences max)}

## Quick Start / Usage
{Get the developer to a working example ASAP}

## {Core concept sections as needed}

## {Advanced / configuration sections}

## Related
{Links to related pages}
```

#### AI-Friendly Content Guidelines
Since we're optimizing for AI consumption:

- Every page MUST have a clear, descriptive `title` and `description` in frontmatter
- Use descriptive headings (not "Overview" — say what the overview is about)
- Include complete, runnable code examples — not pseudocode
- Define parameters and types explicitly in tables or structured lists
- Avoid ambiguous pronouns — repeat the noun ("the transaction", not "it")
- Include the API endpoint URL in every code example, not just the path

#### Code Examples
- Default to TypeScript/JavaScript for code samples
- Always show the full, minimal working example first, then explain
- Use `@solana/web3.js` v1 unless the page is specifically about v2 migration
- Always include error handling in examples
- Use these real addresses for examples:
  - SOL mint: `So11111111111111111111111111111111111111112`
  - USDC mint: `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v`
  <!-- PLACEHOLDER: Add more standard example addresses if needed -->

#### Mintlify Components
Prefer these Mintlify components where appropriate:

- `<CodeGroup>` — for multi-language examples
- `<Tabs>` — for variant approaches (e.g., Lite vs Dynamic API)
- `<Card>` / `<CardGroup>` — for navigation to related pages
- `<Tip>`, `<Note>`, `<Warning>` — for callouts (use sparingly)
- `<ResponseField>` — for API response documentation
- `<ParamField>` — for API parameter documentation
- Snippets from `snippets/` — check for existing reusable components before creating new ones

### Mode: QC / Cleanup

When reviewing or cleaning up content, check:

#### Content Quality
- [ ] Frontmatter has `title` and `description` — both are accurate and descriptive
- [ ] No stale API endpoints or deprecated parameters
- [ ] Code examples are complete and runnable (not just fragments)
- [ ] No broken internal links (`[[link]]` or relative paths resolve correctly)
- [ ] Terminology is consistent with `.claude/rules/style-guide.md`

#### Structure
- [ ] Page is in the correct folder for its content type
- [ ] `docs.json` navigation is updated if page was added/moved/renamed
- [ ] Related pages link to each other
- [ ] No orphaned pages (exist in filesystem but not in `docs.json` navigation)

#### AI-Readiness
- [ ] Headings are descriptive, not generic
- [ ] Parameters/responses are documented in structured format (tables or typed lists)
- [ ] No critical info buried only in callout boxes or expandable sections
- [ ] Page stands alone — a developer (or AI) can understand it without reading 3 other pages

## Mintlify Config

The site config lives in `docs.json` (NOT `mint.json` — this repo uses the newer format).
When modifying navigation, always:

1. Edit `docs.json` navigation arrays
2. Verify the file path matches an actual `.mdx` file
3. Run `mint broken-links` to check for issues
4. Preview with `mint dev` at localhost:3000

## Git & Workflow Conventions

<!-- PLACEHOLDER: Fill in your branch/PR conventions -->
- Branch naming: `{type}/{short-description}` (e.g., `content/ultra-rate-limits`, `restructure/docs-to-learn`)
- Commit messages: {YOUR_PREFERENCE: e.g., conventional commits, freeform, etc.}
- PRs: {YOUR_PREFERENCE: e.g., "always squash merge", "include Linear issue link"}

## Things to Always Check Before Committing

1. `mint broken-links` passes
2. `docs.json` is valid JSON
3. Any new pages are added to `docs.json` navigation
4. No placeholder text like "TODO" or "Lorem ipsum" left in content
5. OpenAPI spec changes in `openapi-spec/` are reflected in `api-reference/` pages
6. Images/assets added to `static/` are actually referenced somewhere

## Do NOT

- Create new top-level folders without explicit approval — the IA is intentional
- Change `docs.json` theme/branding settings unless specifically asked
- Remove or rename existing pages without checking for inbound links and setting up redirects in `vercel.json`
- Assume API behavior — check the OpenAPI specs in `openapi-spec/` or the live API reference
- Write marketing copy — this is developer documentation, not a landing page