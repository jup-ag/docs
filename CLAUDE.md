# CLAUDE.md — Jupiter Developer Docs

## Identity

You are working on the Jupiter Developer Documentation repo (jup-ag/docs).
This is a Mintlify-powered docs site serving dev.jup.ag.
The audience is developers integrating Jupiter's DeFi APIs and toolkits on Solana.

## Project Context

Jupiter is the leading DeFi super app on Solana. This repo contains all developer-facing
documentation across multiple API products, toolkits, and the developer platform.

## Repo Structure

IMPORTANT: ONLY TOUCH THESE FILES AND FOLDERS (AND THEIR CONTENTS), DO NOT TOUCH THE OTHER FILES IN THE REPO.
IF REQUIRED, ALWAYS ASK FOR PERMISSION FIRST.

```
jup-ag/docs/
├── docs.json              # Mintlify config — navigation, theme, metadata
├── index.mdx              # Homepage
├── generate-llms-from-docs.js  # Script to regenerate llms.txt from frontmatter
├── llms.txt               # LLM-optimized site index (auto-generated, do not edit manually)
├── style.css              # Custom styles
├── package.json
├── vercel.json            # Deployment config
│
├── openapi-spec/          # OpenAPI spec files (source of truth for API reference)
├── docs/                  # Core product documentation
│   ├── ultra/             # Ultra Swap API
│   ├── swap/              # Metis Swap API
│   ├── tokens/            # Tokens API
│   ├── price/             # Price API
│   └── ...                # All other APIs and products
├── get-started/           # Getting started/onboarding
├── portal/                # Developer Portal docs (portal.jup.ag)
├── ai/                    # AI-first developer experience
├── guide/                 # Guides and tutorials
├── resources/             # Support, brand kit, and community resources
├── updates/               # Changelog / developer updates
├── snippets/              # Reusable MDX snippet components
├── static/                # Static assets (images, etc.)
│
└── .claude/
    └── rules/             # Permanent context — auto-loaded every session
        ├── decisions.md
        ├── product-learning.md
        └── style-guide.md
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

## Sections

| Section             | Description                                        | Folder          |
|---------------------|----------------------------------------------------|-----------------|
| Get Started         | A quick start and resources for getting started    | `get-started/`  |
| Portal              | API key management, price, rate limit, dashboard   | `portal/`       |
| Docs                | Core product documentation covering each API       | `docs/`         |
| Guides              | Step-by-step guides for developer intent tasks     | `guides/`       |
| API Reference       | OpenAPI specifications for every API endpoint      | `api-reference/`|
| Tool Kits           | SDKs and toolkits for developers                   | `tool-kits/`    |
| AI                  | AI workflow and resources for AI agents            | `ai/`           |
| Resources           | Support, brand kit, and community resources        | `resources/`    |
| Updates             | Changelog / developer updates                      | `updates/`      |

## Products & APIs

| Product             | Description                                        | Folder          |
|---------------------|----------------------------------------------------|-----------------|
| Developer Portal    | API key management, price, rate limit, dashboard   | `portal/`       |
| Ultra Swap API      | Flagship swap — RPC-less, gasless, MEV-protected   | `docs/ultra`    |
| Metis Swap API      | Legacy swap API - customizable and composable      | `docs/swap`     |
| Tokens API          | Comprehensive token information                    | `docs/tokens`   |
| Price API           | Heuristics-based token pricing                     | `docs/price`    |
| More APIs           | More APIs and products                             | `docs/*`        |
| Plugin              | Drop-in swap widget embed                          | `tool-kits/plugin`    |
| Wallet Kit          | Wallet adapter toolkit                             | `tool-kits/wallet-kit`    |
| Referral Program    | Integrator fee earning via Ultra                   | `tool-kits/referral-program`    |

## .claude/rules/ — Permanent Context

Auto-loaded every session. Three files:
- **`style-guide.md`** — Voice, terminology, formatting conventions, page patterns
- **`decisions.md`** — Information architecture decisions with rationale and migration notes
- **`product-learning.md`** — All product-specific knowledge in one file: undocumented behavior,
  ambiguities, known issues, open questions. Organized by product with `# Product Name` headings.
  Add entries here whenever you discover something non-obvious that a future session would
  benefit from knowing.

---

## Workflow

Every task follows this flow. Do not skip steps.

### 1. Understand

When the user comes with an intent:
- Read the relevant `.claude/rules/` files for context
- Scan the affected folders and pages to understand what exists
- Check `docs.json` for current navigation structure
- If the intent is unclear or could go multiple directions, **ask questions before proceeding**
- Do not assume scope — confirm with the user

### 2. Plan

Propose what needs to be done:
- Which pages to create, update, move, or delete
- What the content should cover
- Any dependencies or ordering
- Flag anything that needs a human decision

For small tasks (1-3 pages), a brief summary is enough.
For larger tasks (4+ pages), present a structured breakdown with clear scope per task.

**Wait for the user to confirm the plan before writing.**

### 3. Track

Create a Linear issue for the work using the Linear MCP tools:
- **Project:** `Claude Docs` (ID: `claude-docs-06e0a5a0fec6`)
- **Team:** `Developer Platform`
- **Title:** Action-oriented, specific — `[Area] Verb + what`
  - ✅ `[Ultra] Rewrite get-order page with complete code example`
  - ❌ `Update Ultra docs`
- **Description** with:
  - Summary — what and why (2-3 sentences)
  - Files affected — explicit list
  - Acceptance criteria — checkbox list so it's clear when the task is done
  - Out of scope — what this issue does NOT cover
- **Labels** from this taxonomy:
  - Area: `ultra`, `swap`, `tokens`, `price`, `routing`, `toolkits`, `portal`, `platform`, `ai`, `guides`, `get-started`
  - Type: `content-new`, `content-update`, `restructure`, `cleanup`, `config`
- **Initial status:** `Todo` (work is planned but not yet actively being worked on)

If the work breaks down into distinct, self-contained pieces, create sub-issues
under the parent. Each sub-issue should be independently completable — a clear
description of what needs to be done, which files to touch, and when it's done.

**Linear issue lifecycle — follow this exactly:**

| Status        | When                                                  |
|---------------|-------------------------------------------------------|
| `Todo`        | Issue created, work is planned                        |
| `In Progress` | Actively working on the code changes                  |
| `In Review`   | PR is open and waiting for human review               |
| `Done`        | PR is approved, merged, and deployed                  |

Never mark an issue as `Done` until the PR is merged. The issue status must
reflect the actual state of the work, not the state of the code.

### 4. Write & Review

Do the work following the Writing and Reviewing guidelines below. After writing:
- Self-review against the Reviewing checklist
- Ensure all acceptance criteria from the Linear issue are met

### 5. Ship

Once the work is ready:
- Run through the Reviewing and Pre-Commit checklists
- Create the branch, commit, and open a PR via `gh` CLI
- Reference the Linear issue in the PR body with a link: `Fixes [DEV-XX](https://linear.app/raccoons/issue/DEV-XX)`
- Update the Linear issue to `In Review`
- Once the PR is approved and merged, update the Linear issue to `Done`

---

## Writing

When creating or editing documentation content:

### Frontmatter Requirements

Every page MUST include these frontmatter fields:

```mdx
---
title: "{Clear, action-oriented title}"
description: "{Short, UI-friendly description — displayed on cards and nav}"
llmDescription: "{Detailed, LLM-optimized description — used in llms.txt for AI consumption. Be thorough: explain what this page covers, what APIs/concepts are involved, what a developer will learn, and when they need this page. 1-3 sentences.}"
---
```

**`description` vs `llmDescription`:**
- `description` is for humans scanning the UI — keep it concise and scannable (< 120 chars ideal)
- `llmDescription` is for AI systems consuming llms.txt — be verbose, specific, and keyword-rich.
  Think: "If an AI agent is deciding whether to read this page, what would it need to know?"

**Example:**
```mdx
---
title: "Get Order"
description: "Request a swap order from Ultra API"
llmDescription: "How to request a swap order from Jupiter's Ultra Swap API using the GET /ultra/v1/order endpoint. Covers required parameters (inputMint, outputMint, amount, taker), optional parameters (referralAccount, slippageBps), response fields including swapType, routePlan, and the base64-encoded transaction. Includes complete TypeScript code example with error handling."
---
```

### Voice & Tone

- Write for developers who want to ship fast. Be direct and skip introductory fluff.
- Lead with what the developer can DO, not what Jupiter IS.
- Use "you" to address the developer, not "the user" or "developers".
- Technical but approachable: professional and precise, not cold or overly formal.
- Clear, direct sentence structure. Avoid em dashes for asides — use commas, periods, or restructure the sentence.
- Word choices and sentence structure should be simple enough for AI systems to parse unambiguously.

### Page Structure Convention

Every page should follow this pattern:

```mdx
---
title: "{Clear, action-oriented title}"
description: "{UI-friendly, concise}"
llmDescription: "{LLM-optimized, detailed}"
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

### AI-Friendly Content Guidelines

Since we're optimizing for AI consumption:

- Every page MUST have `title`, `description`, AND `llmDescription` in frontmatter
- Use descriptive headings (not "Overview" — say what the overview is about)
- Include complete, runnable code examples — not pseudocode
- Define parameters and types explicitly in tables or structured lists
- Avoid ambiguous pronouns — repeat the noun ("the transaction", not "it")
- Include the API endpoint URL in every code example, not just the path

### Code Examples

- Default to TypeScript/JavaScript for code samples
- Always show the full, minimal working example first, then explain
- Use `@solana/web3.js` v1 unless the page is specifically about v2 migration
- Always include error handling in examples
- Use these real addresses for examples:
  - SOL mint: `So11111111111111111111111111111111111111112`
  - USDC mint: `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v`

### Mintlify Components

Prefer these Mintlify components where appropriate:

- `<CodeGroup>` — for multi-language examples
- `<Tabs>` — for variant approaches (e.g., Lite vs Dynamic API)
- `<Card>` / `<CardGroup>` — for navigation to related pages
- `<Tip>`, `<Note>`, `<Warning>` — for callouts (use sparingly)
- `<ResponseField>` — for API response documentation
- `<ParamField>` — for API parameter documentation
- If any other Mintlify components are needed, ask the user for permission first.

---

## Reviewing

When reviewing or cleaning up content, run through these checklists:

### Content Quality
- [ ] Frontmatter has `title`, `description`, AND `llmDescription` — all accurate
- [ ] `llmDescription` is detailed enough for an AI to understand the page's purpose
- [ ] No stale API endpoints or deprecated parameters
- [ ] Code examples are complete and runnable (not just fragments)
- [ ] No broken internal links (`[[link]]` or relative paths resolve correctly)
- [ ] Terminology is consistent with `.claude/rules/style-guide.md`

### Structure
- [ ] Page is in the correct folder for its content type
- [ ] `docs.json` navigation is updated if page was added/moved/renamed
- [ ] Related pages link to each other
- [ ] No orphaned pages (exist in filesystem but not in `docs.json` navigation)

### AI-Readiness
- [ ] Headings are descriptive, not generic
- [ ] Parameters/responses are documented in structured format (tables or typed lists)
- [ ] No critical info buried only in callout boxes or expandable sections
- [ ] Page stands alone — a developer (or AI) can understand it without reading 3 other pages

---

## llms.txt Generation

**CRITICAL: Before every PR or content change, always run:**

```bash
node generate-llms-from-docs.js
```

This script regenerates `llms.txt` from the frontmatter (`title` + `llmDescription`)
of every page in the repo. We do this because Mintlify's auto-generated llms.txt
is poor quality — our script produces a much better, more descriptive version.

**Workflow:**
1. Write or update content (including `llmDescription` in frontmatter)
2. Run `node generate-llms-from-docs.js`
3. Commit the updated `llms.txt` alongside your content changes
4. Never edit `llms.txt` manually — it will be overwritten

If `llmDescription` is missing from a page, the script may fall back to `description`
or produce a poor entry. Always ensure `llmDescription` is present.

## Mintlify Config

The site config lives in `docs.json`.
When modifying navigation, always:

1. Edit `docs.json` navigation arrays
2. Verify the file path matches an actual `.mdx` file
3. Run `mint broken-links` to check for broken links
4. Preview with `mint dev` at localhost:3000

## Pre-Commit Checklist

Always run/check before committing:

1. `node generate-llms-from-docs.js` — regenerate llms.txt
2. `mint broken-links` — check for broken links
3. `docs.json` is valid JSON
4. Any new pages are added to `docs.json` navigation
5. All new/updated pages have `title`, `description`, AND `llmDescription`
6. No placeholder text like "TODO" or "Lorem ipsum" left in content
7. OpenAPI spec changes in `openapi-spec/` are reflected in `api-reference/` pages
8. Images/assets added to `static/` are actually referenced somewhere

## Pull Requests

Use `gh` CLI for all GitHub operations.

```bash
# Create a branch
git checkout -b {type}/{short-description}

# Make changes, stage and commit
git add -A
git commit -m "{commit message}"

# Push and open a PR — always use --body-file to avoid shell escaping issues
gh pr create --title "{PR title}" --body-file /tmp/pr-body.md

# Update an existing PR description
gh pr edit --body-file /tmp/pr-body.md

# Check PR status / diff
gh pr view
gh pr diff
```

### PR Description Format

```markdown
## Summary
{What changed and why — 2-3 sentences}

## Changes
{Brief list of what was added, modified, or removed}

## Linear Issues
{Link each issue with its Linear URL}
- Fixes [DEV-XX](https://linear.app/raccoons/issue/DEV-XX) — {issue title}
- Fixes [DEV-XX](https://linear.app/raccoons/issue/DEV-XX) — {issue title}

## Checklist
- [ ] `node generate-llms-from-docs.js` run
- [ ] `mint broken-links` passes
- [ ] All pages have `title`, `description`, `llmDescription`
- [ ] `docs.json` navigation updated (if applicable)
- [ ] Redirects added (if paths changed)
```

### Conventions

- Branch naming: `{type}/{short-description}` (e.g., `feat/ultra-rate-limits`, `fix/swap-api-example`)
- Commit messages: Conventional commits (`feat:`, `fix:`, `chore:`, `docs:`), with action-oriented descriptions that mirror the Linear issue title format. Example: `feat: [ultra] rewrite get-order page with complete code example`
- Merge strategy: Squash merge (`--squash`).

## Path Changes — Minimize at All Costs

Renaming files, moving folders, or changing URL paths breaks external links, AI agent
references, bookmarks, and indexed search results. The cost is always higher than it looks.

- **Default to NO** on any path change unless it is absolutely required.
- If a path change is unavoidable, you MUST:
  1. Add a redirect in `docs.json` (under the `redirects` array)
  2. Update all internal links repo-wide (`grep` for the old path)
  3. Run `mint broken-links` and confirm zero breakage
  4. Note the redirect in `.claude/rules/decisions.md` under the Redirect Log
- If you're unsure whether a rename is worth it, **don't do it** — ask the user.

## Do NOT

- Create new top-level folders without explicit approval — the IA is intentional
- Change `docs.json` theme/branding settings unless specifically asked
- Rename, move, or delete pages without explicit approval — path stability matters
- Assume API behavior — check the OpenAPI specs in `openapi-spec/` or the live API reference
- Write marketing copy — this is developer documentation, not a landing page
- Edit `llms.txt` manually — always regenerate via the script