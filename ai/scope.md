# Scope: Override Default Mintlify skill.md

## Goal

Replace the auto-generated Mintlify `skill.md` at `dev.jup.ag/skill.md` with a custom version sourced from the [Jupiter Agent Skills Repository](https://github.com/jup-ag/agent-skills).

## Context

- Mintlify auto-generates `skill.md` by analyzing docs content with an agentic loop.
- The auto-generated version is broad but generic — it reflects doc structure, not curated skill definitions.
- The `jup-ag/agent-skills` repo contains hand-crafted, code-ready skill definitions that are more precise and actionable for agent consumption.

## Approaches

### Option A: Static `skill.md` in Docs Repo (Simplest)

**How:** Place a `skill.md` file at the project root (`/skill.md`). Mintlify will serve this custom file instead of auto-generating one. When the file is present, auto-generation is suppressed.

**Source:** Manually author or script-generate the file from the `jup-ag/agent-skills` repo contents.

**Pros:**
- Zero infrastructure — just a file in the repo
- Full control over content and format
- Immediate, no build pipeline changes

**Cons:**
- Manual sync — changes to the skills repo require updating this file by hand (or via CI)
- Could drift out of date if not maintained

---

### Option B: CI-Generated `skill.md` from Skills Repo

**How:** Add a CI step (GitHub Action) that:
1. Pulls the latest skill definitions from `jup-ag/agent-skills`
2. Compiles them into a single `skill.md` following the agentskills.io spec
3. Commits the generated `skill.md` to the docs repo (or opens a PR)

**Trigger:** On push to `jup-ag/agent-skills` main branch (via repository dispatch or scheduled cron), or as part of the docs repo's own CI.

**Pros:**
- Always in sync with the skills repo
- Still uses Mintlify's native override mechanism (static file)
- Auditable — generated file is in version control

**Cons:**
- Requires CI setup and cross-repo coordination
- Need to define the compilation/template logic

---

### Option C: Build-Time Script in Docs Repo

**How:** Add a pre-build script (e.g., in `package.json` or a Makefile) that fetches the latest skills from the GitHub API (`jup-ag/agent-skills`) and generates `skill.md` before Mintlify builds.

**Pros:**
- Always fresh at build time
- No cross-repo CI wiring needed
- Can template the file with additional docs-specific context (workflows, integration notes)

**Cons:**
- Depends on GitHub API availability at build time
- Mintlify's build pipeline may not support custom pre-build hooks natively — would need to verify or use a workaround (e.g., generating on push via a simple GH Action in the docs repo itself)

---

### Option D: Hybrid — Static Base + CI Overlay

**How:** Maintain a hand-written `skill.md` template in the docs repo with static sections (metadata, context, workflows). Use CI to inject/update only the `skills` section from `jup-ag/agent-skills`.

**Pros:**
- Best of both worlds: curated narrative + automated skill definitions
- Partial updates reduce churn in PRs

**Cons:**
- More complex templating logic
- Need to define merge strategy for the skills section

---

## Recommendation

**Start with Option A** (static file) for immediate control, then graduate to **Option B** (CI-generated) once the skills repo stabilizes and the format is locked in. Option B is the long-term answer — it keeps the skill.md in sync automatically while still using Mintlify's native override mechanism.

## Required Format

Per the agentskills.io spec and Mintlify's requirements, a custom `skill.md` must include YAML frontmatter:

```yaml
---
name: Jupiter
description: DeFi infrastructure on Solana — swaps, limit orders, DCA, lending, prediction markets, and more.
license: MIT
compatibility:
  - claude
  - openai
  - langchain
  - vercel-ai-sdk
  - mcp
metadata:
  version: "1.0"
  source: https://github.com/jup-ag/agent-skills
allowed-tools:
  - http
---
```

Followed by markdown sections for: Capabilities, Skills, Workflows, Integration, and Context.

## Next Steps

1. Decide on approach (A, B, C, or D)
2. If Option A: draft the `skill.md` from current skills repo content
3. If Option B: define the GH Action workflow and template script
4. Test by deploying and verifying `dev.jup.ag/skill.md` serves the custom version
