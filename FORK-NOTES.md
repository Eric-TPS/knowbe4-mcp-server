# Fork notes

This is a personal fork of [`mirage-security/knowbe4-mcp-server`](https://github.com/mirage-security/knowbe4-mcp-server).

**Upstream base commit:** `ed4ac2d0cf15da2b6c07f4cfe1345903bbac9a48` (first published commit after `Added npm action`).

Kept as a fork so upstream changes can be merged deliberately rather than arriving transparently via `npm install`. Run this from source — do **not** `npm install knowbe4-mcp-server` from the public registry.

## Patches applied on top of upstream

### 1. URL-encode path segments in API endpoint strings

Upstream interpolated tool arguments directly into endpoint paths, e.g.
`\`/v1/users/${args.user_id}\``. A malformed or hostile `user_id` like
`"../account"` could change the shape of the URL. Authentication still
scoped the caller to their own KnowBe4 account, so this was
defense-in-depth rather than a live vulnerability — but worth fixing.

Every interpolated path segment now passes through a `seg()` helper that
wraps `encodeURIComponent(String(...))`. Affects 14 endpoint constructions
covering users, groups, phishing campaigns/security-tests/recipients, and
training store-purchases/policies/campaigns/enrollments.

### 2. Add a 30-second timeout to `fetch()` calls

Upstream had no timeout, so a stalled KnowBe4 response would hang the MCP
tool call indefinitely. Added `AbortSignal.timeout(30_000)` to the single
`fetch()` in `callKB4API`.

## Other observations captured during review

These aren't patched — called out so they stay on the radar:

- Error messages concatenate upstream response body text. Minor info leak
  to the MCP caller if KnowBe4 ever echoes input in errors.
- `any` return types throughout; no runtime response validation.
- Tests (`tests/*.test.ts`) are integration tests against the live
  KnowBe4 API — they hit the real service using your key. Won't run in CI
  without credentials, and don't cover the routing logic in `index.ts`.
- No lifecycle (`preinstall`/`install`/`postinstall`) scripts anywhere in
  the 91 transitive dependencies — install-time is clean.
- `.github/workflows/npm-publish.yml` auto-publishes on release. If we
  merge upstream updates, re-read this workflow before pulling.
