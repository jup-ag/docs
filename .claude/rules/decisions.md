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
| | | | |
