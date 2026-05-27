# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2026-05-27

### Added

- README now embeds a short demo video showing the multiplier in action.

### Changed

- `module.json` `compatibility.minimum` lowered from `14` to `13`. Foundry v13's
  Token class exposes `_getAnimationMovementSpeed(options) → number` with the
  same signature and return contract (grid size per second) as v14, per the
  official v13 API docs, so the existing wrap works unmodified. `verified`
  stays at `14` until a v13 drag-test confirms the multiplier visibly affects
  token slide speed in v13 in addition to v14.
- README and AGENTS.md compatibility statements updated to match the manifest
  (v13 minimum, v14 verified) so docs and `module.json` agree.

## [1.0.1] - 2026-05-26

### Added

- GitHub Actions release workflow (`.github/workflows/release.yml`): on push of
  a `v*` tag, builds `module.zip`, publishes a GitHub Release with manifest and
  zip attached, and POSTs to the Foundry package release API so the public
  listing updates automatically. Requires a `FOUNDRY_RELEASE_TOKEN` repo secret.
  The release is created as a *prerelease* first and only promoted to "latest"
  after the Foundry API call succeeds, so a Foundry-side failure cannot expose
  a half-released version to end users on auto-update.

### Changed

- `scripts/main.js` now uses optional chaining when reaching for
  `CONFIG.Token.objectClass.prototype`, so a future Foundry build that
  restructures `CONFIG.Token` will cleanly disable scaling instead of throwing
  during init.

### Security

- `.gitignore` now excludes `keys.txt`, `*.key`, `*.pem`, and `.env*` files to
  prevent accidental commit of secrets.

## [1.0.0] - 2026-05-26

### Added

- Initial release.
- World-scope **Token Animation Speed Multiplier** setting (range 0.1 – 10,
  step 0.1) that scales the visual rate at which tokens slide across the
  canvas when moved.
- System-agnostic — works with any Foundry game system.
