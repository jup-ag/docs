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

---

## Content Type Definitions

Reference these when deciding where new content belongs:

| Section         | Purpose                          | Format                  | Example                                    |
|-----------------|----------------------------------|-------------------------|--------------------------------------------|
| `get-started/`  | Onboarding, first steps          | Sequential, short       | "Get your API key", "Choose your product"  |
| `docs/`         | Core product documentation       | Explanatory, deep       | "How Ultra Swap works", "Routing engine"   |
| `guides/`       | Task completion, how-to          | Step-by-step, hands-on  | "Integrate Ultra in 10 min", "Add fees"    |
| `api-reference/`| Endpoint specs, params, schemas  | Generated from OpenAPI  | GET /ultra/v1/order                        |
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
