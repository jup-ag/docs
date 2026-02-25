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

### [YYYY-MM-DD] Rename `docs/` → `learn/`
**Status:** proposed
**Scope:** rename, navigation, redirect
**Files affected:** `docs/`, `docs.json`, `vercel.json`

**Context:** With the introduction of the new `guides/` section (task-oriented,
hands-on walkthroughs), the existing `docs/` section needs a clearer identity.
Currently `docs/` is a catch-all — it holds API overviews, conceptual explanations,
and integration guides all mixed together.

**Decision:** Rename `docs/` to `learn/` to clearly distinguish it from `guides/`.

**Rationale:**
<!-- PLACEHOLDER: Finalize your rationale. Draft reasoning below. -->
- `learn/` = conceptual understanding (what Ultra Swap is, how routing works, architecture)
- `guides/` = task completion (how to integrate Ultra Swap in 10 minutes, how to add fees)
- `api-reference/` = reference lookup (endpoints, parameters, response schemas)
- This three-part split (learn / guides / reference) follows the Diátaxis documentation framework
- "docs" is too generic when the entire site is docs

**Alternatives considered:**
- Keep `docs/` and just add `guides/` alongside → confusing overlap, "docs" means nothing specific
- Rename to `concepts/` → too academic, developers might skip it
- Rename to `overview/` → implies shallow content, not deep dives

**Migration notes:**
- All internal links from `docs/X` → `learn/X` need updating across the repo
- Add redirects in `vercel.json` for every current `docs/` path
- Update `docs.json` navigation
- Update any external links we control (README, portal, blog posts)
- Announce in developer updates

---

### [YYYY-MM-DD] Create new `guides/` section
**Status:** proposed
**Scope:** new-section, navigation
**Files affected:** new `guides/` folder, `docs.json`

**Context:** Developers need step-by-step, goal-oriented content that gets them
from zero to working integration. Current content mixes conceptual explanations
with integration steps, making it hard to follow.

**Decision:** Create a dedicated `guides/` section for task-oriented walkthroughs.

**Rationale:**
- Developers searching "how to integrate Jupiter swap" need a clear, linear path
- Separating guides from conceptual docs lets each type do its job well
- Guides are the highest-value content for onboarding and reducing support load

**Planned guides:**
<!-- PLACEHOLDER: Add your planned guides list -->
- [ ] Quick Start: Your first Ultra Swap integration
- [ ] Adding fees with the Referral Program
- [ ] Migrating from Metis Swap API to Ultra
- [ ] {ADD MORE}

**Structure convention for guides:**
```
guides/
├── quick-start.mdx             # First integration, < 10 min
├── add-fees.mdx                # Referral program setup
├── migrate-metis-to-ultra.mdx  # Migration guide
└── ...
```

Each guide should: have a clear goal in the title, state prerequisites upfront,
be completable in one sitting, end with a working result.

---

### [YYYY-MM-DD] Combine docs with Developer Platform under same domain
**Status:** proposed
**Scope:** navigation, folder-structure
**Files affected:** `docs.json`, `portal/`, potentially new sections

**Context:** Currently, developer docs (dev.jup.ag) and the Developer Portal
(portal.jup.ag) are separate. The new Developer Platform launch brings them
under a unified experience.

**Decision:** <!-- PLACEHOLDER: Document the specific approach once decided -->

**Open questions:**
<!-- PLACEHOLDER: Fill in as you work through these -->
- Does portal content move into this repo, or does it stay separate with cross-links?
- How does the nav handle portal-specific content (dashboard, API key management)?
- Do we need a `platform/` section distinct from `portal/`?

---

### [YYYY-MM-DD] New pricing structure documentation
**Status:** proposed
**Scope:** new-section or new pages
**Files affected:** TBD

**Context:** New Developer Platform introduces a new pricing structure that
replaces or updates the current API access model.

**Decision:** <!-- PLACEHOLDER: Where does pricing content live? -->

**Open questions:**
- Does pricing live in `portal/` (since it's tied to API key tiers)?
- Or in `learn/` as a standalone concept page?
- Or in `get-started/` since it's foundational to onboarding?
- How does it relate to rate limit docs?

---

### [YYYY-MM-DD] New rate limit strategy documentation
**Status:** proposed
**Scope:** new pages
**Files affected:** TBD

**Context:** Ultra API now uses Dynamic Rate Limits that scale with swap volume.
This is a new model that needs clear documentation.

**Decision:** <!-- PLACEHOLDER -->

**Notes from existing content:**
- Current docs mention: "Dynamic Rate Limits are now applied to Ultra API.
  No Pro plans or payment needed. Simply generate the universal API Key via Portal.
  Rate limits scale together with your swap volume."
- This content currently lives inline in the Ultra API pages
- Needs its own dedicated page with full explanation of the scaling model

---

## Content Type Definitions

Reference these when deciding where new content belongs:

| Section         | Purpose                          | Format                  | Example                                    |
|-----------------|----------------------------------|-------------------------|--------------------------------------------|
| `get-started/`  | Onboarding, first steps          | Sequential, short       | "Get your API key", "Choose your product"  |
| `learn/`        | Concepts, architecture, why      | Explanatory, deep       | "How Ultra Swap works", "Routing engine"   |
| `guides/`       | Task completion, how-to          | Step-by-step, hands-on  | "Integrate Ultra in 10 min", "Add fees"    |
| `api-reference/`| Endpoint specs, params, schemas  | Generated from OpenAPI  | GET /ultra/v1/order                        |
| `tool-kits/`    | SDK/toolkit integration          | Setup + usage           | Plugin embed, Wallet Kit                   |
| `portal/`       | Platform features                | Feature-oriented        | API key management, usage dashboard        |
| `resources/`    | Support, community, brand        | Reference               | Discord links, brand kit                   |
| `updates/`      | Changelog                        | Chronological           | "Ultra V3 launch", "New rate limits"       |
| `blog/`         | Announcements, deep dives        | Narrative               | "Why we built Ultra", "Routing explained"  |

## Redirect Log

Track all redirects added to `vercel.json` here for visibility:

| Old Path | New Path | Date | Reason |
|----------|----------|------|--------|
| <!-- As you make changes, log redirects here --> | | | |