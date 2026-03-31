# Information Architecture Decisions

Log every structural decision here with rationale. This is the source of truth
for why the site is organized the way it is. When making IA changes, add an entry
BEFORE making the change.

## Format

```
### [YYYY-MM-DD] Decision Title
**Status:** proposed | accepted | implemented | reverted
**Scope:** navigation | folder-structure | rename | redirect | new-section
**Files affected:** list of files/folders
**Linear issue:** ISSUE-ID (if applicable)

**Context:** Why this decision came up.
**Decision:** What we decided.
**Rationale:** Why this over alternatives.
**Alternatives considered:** What we didn't pick and why.
**Migration notes:** Redirects, link updates, etc.
```

---

## Active Decisions

### [2026-03-09] Extract sub-guides from comprehensive guides
**Status:** accepted
**Scope:** folder-structure
**Files affected:** `guides/` section
**Linear issue:** DEVREL-56 (spawned DEVREL-68, DEVREL-69)

**Context:** The Metis Swap guide (DEVREL-56) grew to cover quoting, building, signing, sending, error handling, route debugging, and execution optimisation. Cramming it all into one page made it too long and hard to navigate.
**Decision:** When a guide exceeds ~200 lines or covers 3+ distinct topics, extract focused sub-guides into separate Linear issues.
**Rationale:** Shorter, focused pages are easier to find, link to, and maintain. Each sub-guide can be reviewed independently.
**Alternatives considered:** Keep everything in one long page with anchor links. Rejected because it makes navigation and updates harder.

### [2026-03-10] Restructure Trigger API reference and docs for V2
**Status:** implemented
**Scope:** folder-structure | navigation | redirect
**Files affected:** `docs/trigger/`, `api-reference/trigger/`, `openapi-spec/trigger/`, `docs.json`
**Linear issue:** DEVREL-75

**Context:** Trigger Order API V2 introduced vault-based architecture. Needed docs pages, API reference, and OpenAPI spec for V2 while preserving V1.
**Decision:**
- Docs: V2 pages as main `docs/trigger/` section, V1 moved to `docs/trigger/v1/` in collapsed dropdown (`"expanded": false`)
- API reference: restructured from `api-reference/trigger/` (V1) + `api-reference/trigger-v2/` (V2) to `api-reference/trigger/v1/` + `api-reference/trigger/v2/` with overview at `api-reference/trigger`
- OpenAPI specs: `openapi-spec/trigger/v1/trigger.yaml` + `openapi-spec/trigger/v2/trigger.yaml`
**Rationale:** Matches the established pattern used by Price API (`price/v2`, `price/v3`) and Tokens API (`tokens/v1`, `tokens/v2`). Consistent structure makes it easier to add V3 in the future.
**Alternatives considered:** Separate top-level groups (`Trigger V1`, `Trigger V2`) — rejected because it doesn't match existing API patterns.
**Migration notes:** Redirects added for old V1 API reference paths (`/api-reference/trigger/create-order` → `/api-reference/trigger/v1/create-order`, etc.). No redirects needed for `trigger-v2` paths as they never existed in prod.

### [2026-03-12] Restructure Lend docs into Earn/Borrow/Advanced hierarchy
**Status:** implemented
**Scope:** folder-structure | navigation | redirect
**Files affected:** `docs/lend/`, `docs.json`
**Linear issue:** DEVREL-74

**Context:** Lend docs were initially structured as flat groups (Architecture, Lend API, Lend SDK). The product has two distinct user journeys (depositing to earn yield vs borrowing against collateral) plus advanced CPI recipes.
**Decision:**
- Top-level: overview, architecture, API-vs-SDK comparison, getting started
- Subfolders: `earn/` (deposit, withdraw, read-data, API), `borrow/` (create-position, deposit, borrow, repay, withdraw, combined, CPI, API), `flashloan/`, `liquidity/` (overview, analytics), `advanced/` (multiply, unwind, repay-with-collateral, vault-swap), `resources/` (IDL/types)
- Two redirects: `/docs/lend/sdk` → `/docs/lend/api-vs-sdk`, `/docs/lend/liquidation` → `/docs/lend/borrow/liquidation`
**Rationale:** Mirrors the Earn/Borrow product distinction. Keeps advanced CPI recipes separate from basic SDK usage so beginners aren't overwhelmed. Consistent with how other products (Ultra, Trigger) use subfolders for distinct capabilities.
**Alternatives considered:** Keep flat structure with all pages at `docs/lend/`. Rejected because 20+ pages in one folder is hard to navigate and doesn't reflect the two-sided product model.

### [2026-03-17] Swap API V2 docs structure
**Status:** implemented
**Scope:** folder-structure | navigation | new-section
**Files affected:** `docs/swap/`, `docs/swap/v2/`, `api-reference/swap/`, `openapi-spec/swap/v2/`, `docs.json`
**Linear issue:** DEVREL-83

**Context:** Jupiter unified its swap APIs (Ultra and Metis) into a single Swap API at `api.jup.ag/swap/v2`. Needed a complete documentation structure for three endpoints (`/order`, `/build`, `/execute`) while preserving existing V1 docs.
**Decision:**
- Top-level overview at `docs/swap/index.mdx` with comparison table (order vs build)
- V2 pages: `order-and-execute.mdx`, `build/index.mdx`, `build/other-instructions.mdx`, `routing.mdx`, `fees.mdx`, `migration.mdx`
- Advanced guides as standalone pages under `docs/swap/v2/advanced/` (CU simulation, gasless, reduce latency, reduce tx size)
- Existing Metis pages moved to `docs/swap/v1/` with collapsed nav
- API reference: `api-reference/swap/v2/` with `order.mdx`, `build.mdx`, `execute.mdx`
- OpenAPI spec: `openapi-spec/swap/v2/swap.yaml`
**Rationale:** Follows the same V1/V2 restructure pattern established by Trigger (DEVREL-75). V2 is primary, V1 collapsed. Advanced guides split into individual pages to avoid one long page (per DEVREL-56 decision).
**Alternatives considered:** Keeping advanced as a single page. Rejected because each technique (gasless, CU sim, reduce tx size) is a distinct use case that benefits from its own page.
**Migration notes:** V1 paths preserved at `docs/swap/v1/`. No redirects needed as old Metis paths were already at `docs/swap/`.

### [2026-03-19] Move Advanced group to top-level nav sibling
**Status:** implemented
**Scope:** navigation
**Files affected:** `docs.json`
**Linear issue:** DEVREL-83

**Context:** Advanced pages were nested inside the Swap V2 group in the sidebar, making them harder to discover.
**Decision:** Move "Advanced" group to be a sibling of the Swap V2 group at the same nesting level.
**Rationale:** Advanced techniques apply across both `/order` and `/build` paths, so they shouldn't be nested under either. Top-level placement improves discoverability.

---

## Content Type Definitions

Reference these when deciding where new content belongs:

| Section         | Purpose                          | Format                  | Example                                    |
|-----------------|----------------------------------|-------------------------|--------------------------------------------|
| `get-started/`  | Onboarding, first steps          | Sequential, short       | "Get your API key", "Choose your product"  |
| `docs/`         | Core product documentation       | Explanatory, deep       | "How Swap API works", "Routing engine"   |
| `guides/`       | Task completion, how-to          | Step-by-step, hands-on  | "Integrate Ultra in 10 min", "Add fees"    |
| `api-reference/`| Endpoint specs, params, schemas  | Generated from OpenAPI  | GET /swap/v2/order                        |
| `tool-kits/`    | SDK/toolkit integration          | Setup + usage           | Plugin embed, Wallet Kit                   |
| `portal/`       | Platform features                | Feature-oriented        | API key management, pricing, rate limits, usage dashboard        |
| `ai/`           | AI workflow and agent resources  | Reference + how-to      | llms.txt, skill.md, AI agent integration   |
| `resources/`    | Support, community, brand        | Reference               | Discord links, brand kit                   |
| `updates/`      | Changelog                        | Chronological           | "Ultra V3 launch", "New rate limits"       |

## Redirect Log

Track all redirects added to `vercel.json` here for visibility:

| Old Path | New Path | Date | Reason |
|----------|----------|------|--------|
| `/api-reference/trigger/create-order` | `/api-reference/trigger/v1/create-order` | 2026-03-10 | V1/V2 restructure (DEVREL-75) |
| `/api-reference/trigger/execute` | `/api-reference/trigger/v1/execute` | 2026-03-10 | V1/V2 restructure (DEVREL-75) |
| `/api-reference/trigger/cancel-order` | `/api-reference/trigger/v1/cancel-order` | 2026-03-10 | V1/V2 restructure (DEVREL-75) |
| `/api-reference/trigger/cancel-orders` | `/api-reference/trigger/v1/cancel-orders` | 2026-03-10 | V1/V2 restructure (DEVREL-75) |
| `/api-reference/trigger/get-trigger-orders` | `/api-reference/trigger/v1/get-trigger-orders` | 2026-03-10 | V1/V2 restructure (DEVREL-75) |
| `/ai/ecosystem` | `/ai` | 2026-03-23 | Ecosystem page removed in AI section rework (PR #857) |

### [2026-03-23] Tabs-based navigation with per-product dropdown menu
**Status:** implemented
**Scope:** navigation | folder-structure | redirect
**Files affected:** `docs.json`, `generate-llms-from-docs.js`, `llms.txt`, `docs/swap/`, `api-reference/swap/`, `docs/trigger/`, `api-reference/trigger/`
**Linear issue:** DEVREL-115

**Context:** Original tabs-based nav with separate Docs, API Reference, Guides, and Tool Kits tabs didn't scale. Developers had to jump between tabs to understand one product. AI/LLM retrieval got fragmented context. Anchors-based nav was tried but Mintlify's product switcher had UX issues, so we switched to tabs with a dropdown menu.
**Decision:**
- Root nav uses tabs (mint theme): Get Started, Docs, AI, Tool Kits, Changelog, Resources
- Docs tab uses dropdown menu (`menu` with `item` entries) for product selection (Swap, Tokens, Price, Lend, Trigger, Recurring, Prediction, Perps, More)
- Docs + guides + API ref colocated per product within each menu item
- API versioning: latest version has no URL prefix, legacy keeps prefix (Next.js pattern)
- Swap: two versions (Swap V2 Latest, Swap V1 Unmaintained - Ultra V1 and Metis merged into single Swap V1)
- Trigger: two versions (Trigger V2 Latest, Trigger V1 Unmaintained)
- Routing merged into Swap as a group (not a standalone product)
- Tokens and Price split into separate menu items
- Thin products (Portfolio, Send, Studio, Lock) combined into "More"
- Consistent group naming: no "API" suffix on first groups (Swap, Trigger, Recurring)
- Guides distributed to parent products; guides index page in Get Started for browse-all
- AI section uses environment-based tool guide (local agents vs hosted agents)
- llms.txt generator rewritten to walk nav tree directly (tabs -> groups/menu -> pages)
- get-started/overview deprecated (redundant with landing page)
- Get Started is a tab with groups (Portal, setup pages), not a product
- Tool Kits is a tab with groups (Plugin, Wallet Kit, Referral Program)
**Rationale:** Tabs with dropdown menu gives product-centric navigation without the UX issues of anchors/product switcher. Single retrieval gets full product context for both humans and LLMs.
**Alternatives considered:**
1. Anchors with product switcher - tried, reverted due to Mintlify UX issues with version selectors.
2. Keep separate tabs with cross-linking - rejected because it fragments product context.
**Migration notes:** Redirects added for all old /v2/ swap and trigger URLs, old /docs/routing/* paths. Two orphaned guides (Ultra swap, Metis custom swap) deprecated with Warning callouts. Theme: mint.

### [2026-03-28] Move all doc paths under /docs/* via Mintlify toggle
**Status:** implemented
**Scope:** folder-structure | redirect
**Files affected:** `docs.json`, 120+ MDX files, `generate-llms-from-docs.js`, `llms.txt`, `CLAUDE.md`, 13 product folders moved
**Linear issue:** DEVREL-133

**Context:** Developer Platform is taking over `dev.jup.ag`. All docs URLs need to move under `/docs/*` so the gateway can route with a single prefix instead of 9 separate ones.
**Decision:**
- Use Mintlify's "Host at /docs" toggle instead of moving folders into a `docs/` subfolder
- Move 13 product folders (swap, tokens, price, lend, lock, perps, portfolio, prediction, recurring, send, studio, trigger, ultra) OUT of `docs/` to repo root so the toggle doesn't cause `/docs/docs/...` double-prefixing
- All internal links and redirects use unprefixed paths (Mintlify handles the `/docs/` prefix automatically)
- All Mintlify-managed pages live under `/docs/` prefix, no exceptions. No gateway path rewriting.
- `llms.txt` generator updated with `/docs/` subpath for all content URLs
- Only `developers.jup.ag/docs` points to Mintlify
**Rationale:** The toggle approach is the only way to serve `llms.txt` and `skill.md` at `/docs/llms.txt` and `/docs/skill.md` (Mintlify only serves these from repo root). Moving content into a `docs/` folder would cause double-prefixing. Keeping all Mintlify content strictly under `/docs/` with no holdouts simplifies gateway routing to a single prefix rule.
**Alternatives considered:**
1. Move content folders into `docs/` subfolder (Option A) — rejected because it causes `/docs/docs/...` with the toggle, and without the toggle `llms.txt` can't be served under `/docs/`.
2. No toggle, just folder moves — rejected because `llms.txt` and `skill.md` would only be accessible at root, not at `/docs/llms.txt`.
3. Gateway path rewriting for root URL holdouts (blog, changelog, resources, legal) — initially implemented, then rejected in favor of the simpler approach of putting everything under `/docs/`.

### [2026-03-31] Cloudflare domain-level redirects for old paths
**Status:** implemented
**Scope:** redirect
**Files affected:** Cloudflare redirect rules (external to this repo)
**Linear issue:** DEVREL-133

**Context:** After deploying PR #864 (DEVREL-133), old URLs without the `/docs/` prefix (e.g. `/get-started`, `/swap/order-and-execute`) would 404 since all content now lives under `/docs/*`. These old paths are shared in bookmarks, indexed by search engines (Google), and cached by AI agents.
**Decision:** Add Cloudflare domain-level redirects on `dev.jup.ag` to redirect old root paths to their `/docs/` equivalents (e.g. `/get-started` -> `/docs/get-started`). This is handled outside the docs repo at the infrastructure level.
**Rationale:** Domain-level redirects are the cleanest solution: they catch all traffic before it hits Mintlify, preserve SEO link equity, and don't require maintaining redirect rules in `docs.json` or `vercel.json`. Keeps the docs repo focused on content, infrastructure concerns handled at the edge.

## Redirect Log

| Old path | New path | Date | Reason |
|----------|----------|------|--------|
| `/docs/swap/*` | `/swap/*` | 2026-03-28 | Product folders moved to root for toggle compatibility (DEVREL-133) |
| `/docs/tokens/*` | `/tokens/*` | 2026-03-28 | Product folders moved to root (DEVREL-133) |
| `/docs/price/*` | `/price/*` | 2026-03-28 | Product folders moved to root (DEVREL-133) |
| `/docs/lend/*` | `/lend/*` | 2026-03-28 | Product folders moved to root (DEVREL-133) |
| `/docs/lock/*` | `/lock/*` | 2026-03-28 | Product folders moved to root (DEVREL-133) |
| `/docs/perps/*` | `/perps/*` | 2026-03-28 | Product folders moved to root (DEVREL-133) |
| `/docs/portfolio/*` | `/portfolio/*` | 2026-03-28 | Product folders moved to root (DEVREL-133) |
| `/docs/prediction/*` | `/prediction/*` | 2026-03-28 | Product folders moved to root (DEVREL-133) |
| `/docs/recurring/*` | `/recurring/*` | 2026-03-28 | Product folders moved to root (DEVREL-133) |
| `/docs/send/*` | `/send/*` | 2026-03-28 | Product folders moved to root (DEVREL-133) |
| `/docs/studio/*` | `/studio/*` | 2026-03-28 | Product folders moved to root (DEVREL-133) |
| `/docs/trigger/*` | `/trigger/*` | 2026-03-28 | Product folders moved to root (DEVREL-133) |
| `/docs/ultra/*` | `/ultra/*` | 2026-03-28 | Product folders moved to root (DEVREL-133) |
