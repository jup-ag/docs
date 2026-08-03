#!/usr/bin/env node
/**
 * check-redirects.js — validate the `redirects` array in docs.json.
 *
 * Detects:
 *   1. Duplicate source paths
 *   2. Self-redirects (source === destination)
 *   3. Sources that shadow a live page (a page in docs.json navigation, or any
 *      .mdx/.md file on disk — Mintlify serves every file at its URL path, and
 *      a redirect takes precedence over the page, silently hiding it)
 *   4. Redirect chains (A -> B where B is itself a redirect source)
 *   5. Internal destinations that do not resolve to a live page or another
 *      redirect (warning only — likely a typo or a deleted page)
 *
 * Wildcard sources/destinations use the `:slug*` suffix. This script treats
 * `:slug*` as one-or-more path segments, matching how the redirects in this
 * repo are written (exact-path entries exist alongside their wildcard
 * variants, e.g. `/updates` and `/updates/:slug*`).
 *
 * Usage: node check-redirects.js
 * Exit code: 1 if any error is found, 0 otherwise (warnings do not fail).
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const docsJson = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs.json'), 'utf8'));

// Intentional chains, documented in .claude/rules/decisions.md.
// Format: [source, matched redirect source it chains into]
const ALLOWED_CHAINS = [
  // /updates -> /changelog -> https://developers.jup.ag/changelog
  // Kept deliberately when the changelog moved to the dev platform (DEV-595, DEV-718).
  ['/updates', '/changelog'],
];

// ---------------------------------------------------------------------------
// Collect live page paths
// ---------------------------------------------------------------------------

// From docs.json navigation: every string entry in a `pages` array is a page.
function collectNavPages(node, out) {
  if (typeof node === 'string') {
    out.add('/' + node.replace(/^\//, ''));
    // `x/index` is also served at `/x`
    if (node.endsWith('/index')) out.add('/' + node.slice(0, -'/index'.length));
    return;
  }
  if (Array.isArray(node)) {
    for (const item of node) collectNavPages(item, out);
    return;
  }
  if (node && typeof node === 'object') {
    for (const key of ['navigation', 'tabs', 'groups', 'pages', 'menu', 'items', 'anchors']) {
      if (node[key]) collectNavPages(node[key], out);
    }
  }
}

// From the filesystem: Mintlify serves EVERY .md/.mdx file at its URL path,
// whether or not it is in the navigation (unmaintained pages rely on this).
function collectFilePages(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectFilePages(full, out);
    } else if (/\.mdx?$/.test(entry.name)) {
      const rel = path.relative(ROOT, full).replace(/\.mdx?$/, '');
      out.add('/' + rel);
      if (rel.endsWith('/index')) out.add('/' + rel.slice(0, -'/index'.length));
    }
  }
}

const navPages = new Set();
collectNavPages(docsJson.navigation, navPages);
const filePages = new Set();
collectFilePages(ROOT, filePages);

// ---------------------------------------------------------------------------
// Redirect helpers
// ---------------------------------------------------------------------------

const redirects = docsJson.redirects || [];

const isExternal = (p) => /^https?:\/\//.test(p);
const isWildcard = (p) => p.includes(':slug*');
const wildcardBase = (p) => p.slice(0, p.indexOf('/:slug*'));

// Does a concrete path match a redirect source (exact or wildcard)?
function matchingSource(concretePath) {
  for (const r of redirects) {
    if (isWildcard(r.source)) {
      const base = wildcardBase(r.source);
      if (concretePath.startsWith(base + '/')) return r.source;
    } else if (r.source === concretePath) {
      return r.source;
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Checks
// ---------------------------------------------------------------------------

const errors = [];
const warnings = [];

// 1. Duplicate sources
const seen = new Map();
for (const r of redirects) {
  if (seen.has(r.source)) {
    errors.push(`duplicate source: ${r.source} -> ${r.destination} (also -> ${seen.get(r.source)})`);
  } else {
    seen.set(r.source, r.destination);
  }
}

for (const r of redirects) {
  const { source, destination } = r;

  // 2. Self-redirect
  if (source === destination) {
    errors.push(`self-redirect: ${source} -> ${destination}`);
    continue;
  }

  // 3. Source shadows a live page
  if (isWildcard(source)) {
    const base = wildcardBase(source);
    const shadowed = [...new Set([...navPages, ...filePages])].filter((p) => p.startsWith(base + '/'));
    for (const p of shadowed) {
      errors.push(`wildcard source ${source} shadows live page ${p} (redirects win over pages)`);
    }
  } else {
    if (navPages.has(source)) {
      errors.push(`source ${source} is a live page in docs.json navigation (redirect shadows it)`);
    } else if (filePages.has(source)) {
      errors.push(`source ${source} is a live file on disk (redirect shadows it, page becomes unreachable)`);
    }
  }

  // 4. Chains: destination is itself a redirect source
  if (!isExternal(destination)) {
    // A wildcard destination resolves to concrete paths under its base; only
    // its base-with-a-segment form can match another source, so check the base
    // pattern itself against wildcard sources and skip exact-source matching.
    const dest = isWildcard(destination) ? null : destination;
    if (dest) {
      const hit = matchingSource(dest);
      if (hit && hit !== source) {
        const allowed = ALLOWED_CHAINS.some(([s, via]) => s === source && via === hit);
        if (!allowed) {
          errors.push(`redirect chain: ${source} -> ${destination} -> (${hit} -> ${seen.get(hit)})`);
        }
      }

      // 5. Destination resolves to nothing (warning)
      if (!hit && !navPages.has(dest) && !filePages.has(dest)) {
        warnings.push(`destination ${dest} (from ${source}) is not a live page or redirect — possible typo or deleted page`);
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

console.log(`check-redirects: ${redirects.length} redirects, ${navPages.size} nav paths, ${filePages.size} file paths\n`);

if (warnings.length) {
  console.log(`⚠ ${warnings.length} warning(s):`);
  for (const w of warnings) console.log(`  - ${w}`);
  console.log('');
}

if (errors.length) {
  console.log(`✖ ${errors.length} error(s):`);
  for (const e of errors) console.log(`  - ${e}`);
  process.exit(1);
}

console.log('✔ no redirect conflicts found');
