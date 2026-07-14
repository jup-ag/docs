{/* MDX-safe template: `mint broken-links` parses every .md/.mdx in the tree, so this file and
    any copy in dx-findings/ must be valid MDX. Use {/* */} comments, and backtick every
    angle-bracket placeholder so MDX does not try to parse it as a JSX tag. */}

# `<Product>` `<Feature>` — Developer Experience Findings (`<ISSUE-ID>`)

Feedback for the `<Product>` engineers, gathered while documenting the **`<feature>`**
(`<live-api-base>/...`). Everything below was verified against primary sources, not taken at
face value:

- The live `<live-api-base>/...` endpoints (read + write)
- A full lifecycle executed and confirmed on **mainnet** (`<step → step → step>`)
- `<sdk-package>` (`<relevant functions/constants>`)
- First-party FE usage in `<fe-repo>` (`<path/to/component>`)

{/* Companion to `<other-findings-file>` where relevant; cross-reference overlaps. */}

**Severity:** 🔴 high (wrong/failed txns or broken mental model) · 🟡 medium (friction, surprise) · 🟢 good (works well, keep it).

Mainnet evidence (`<context, e.g. vault/pair/account ids>`):
| Step | Endpoint | Signature |
|------|----------|-----------|
| `<step>` | `<METHOD /path>` | `<tx signature>` |
| `<step>` | `<METHOD /path>` | `<tx signature>` |

---

## 1. API ↔ SDK discrepancies (the headline)

Places where the REST API and the SDK do the **same operation differently**, so an
integrator's mental model breaks when they move between surfaces.

| # | Finding | Severity | Detail | Recommended action |
|---|---------|----------|--------|--------------------|
| 1.1 | `<one-line finding>` | 🔴/🟡/🟢 | `<what you observed, with concrete evidence: endpoint, error code, signature, what the SDK/FE does instead>` | `<specific action for the engineers>` |

## 2. REST API internal inconsistencies

Analogous calls that return different shapes / behave differently within the same API.

| # | Finding | Severity | Detail | Recommended action |
|---|---------|----------|--------|--------------------|
| 2.1 | `<finding>` | 🟡 | `<detail + evidence>` | `<action>` |

## 3. Protocol / UX surprises

Behaviours that are correct but surprising, and the response gives no signal.

| # | Finding | Severity | Detail | Recommended action |
|---|---------|----------|--------|--------------------|
| 3.1 | `<finding>` | 🔴 | `<detail + error code + evidence>` | `<action>` |

## 4. Dogfooding / canonical surface

Is the public surface the one Jupiter itself uses? Drift/under-testing risk if not.

| # | Finding | Severity | Detail | Recommended action |
|---|---------|----------|--------|--------------------|
| 4.1 | `<finding>` | 🟡 | `<detail + evidence>` | `<action>` |

## 5. What's already good 🟢

- `<thing that works well and should be kept / mirrored elsewhere>`

---

### Top 3 asks
1. **`<highest-impact ask>`** — `<one line on why>`.
2. **`<second>`** — `<why>`.
3. **`<third>`** — `<why>`.

{/*
Format notes (keep this file faithful to the DEV-461 worked example):
- Lead with the headline class of finding (usually API↔SDK), not the easy ones.
- Every Detail cell carries concrete evidence: a tx signature, an error code/name, the exact
  endpoint, or the exact SDK/FE line that diverges. No claim without evidence.
- Severity is about integrator impact: 🔴 = wrong/failed tx or broken mental model,
  🟡 = friction/surprise, 🟢 = good (call these out too; they're signal for the engineers).
- Recommended action is distinct from the problem statement and is actionable by the owning team.
- Cross-reference sibling findings files by relative finding id (e.g. "see lend-dx-findings 3.2").
- MDX-safe: backtick bare angle brackets (e.g. `Record<string, T>`) or mint broken-links fails.
*/}
