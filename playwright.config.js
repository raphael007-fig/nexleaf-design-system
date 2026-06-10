import { defineConfig, devices } from 'playwright/test';

// ── Cross-stack visual-regression gate (React + Angular) ──────────────────────
// Two Storybooks render the SAME shared design decisions (tokens + nx-*.css):
//   • React  (reference surface, port 6006)        — tests/visual/react.spec.js
//   • Angular (production surface, port 6007 static) — tests/visual/angular.spec.js
// Each stack gets its OWN committed baselines (the Playwright project name is
// part of the snapshot path). A failing diff means the look changed: intended →
// `npm run test:visual:update`; unintended → fix before merging. See
// PoltailDesign.md → "Visual gate".
//
// The Angular server builds the package (lib + bundled styles.css) and the
// static Storybook first, then serves it — so the gate always tests the exact
// artifact the @nexleaf/angular package ships.
export default defineConfig({
  testDir: './tests/visual',
  snapshotDir: './tests/visual/__snapshots__',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: 'list',
  expect: {
    // Small tolerance absorbs sub-pixel font rendering differences across machines.
    toHaveScreenshot: { maxDiffPixelRatio: 0.01, animations: 'disabled' },
  },
  webServer: [
    {
      // React (reference) — reuses an already-running Storybook dev server.
      command: 'npm run storybook -- --ci --quiet',
      url: 'http://localhost:6006',
      reuseExistingServer: true,
      timeout: 180_000,
    },
    {
      // Angular (production) — fresh package + static Storybook, served statically
      // (no dev-server lazy compile, so first navigation is instant).
      command: 'npm run build && npm run build-storybook && python3 -m http.server 6007 --directory storybook-static',
      cwd: 'angular',
      url: 'http://localhost:6007/iframe.html',
      reuseExistingServer: true,
      timeout: 600_000,
      env: { CI: '1', STORYBOOK_DISABLE_TELEMETRY: '1' },
    },
  ],
  projects: [
    {
      name: 'react-desktop',
      testMatch: /react\.spec\.js/,
      use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 860 }, baseURL: 'http://localhost:6006' },
    },
    {
      name: 'react-mobile',
      testMatch: /react\.spec\.js/,
      use: { ...devices['Desktop Chrome'], viewport: { width: 375, height: 812 }, baseURL: 'http://localhost:6006' },
    },
    {
      name: 'angular-desktop',
      testMatch: /angular\.spec\.js/,
      use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 860 }, baseURL: 'http://localhost:6007' },
    },
    {
      name: 'angular-mobile',
      testMatch: /angular\.spec\.js/,
      use: { ...devices['Desktop Chrome'], viewport: { width: 375, height: 812 }, baseURL: 'http://localhost:6007' },
    },
  ],
});
