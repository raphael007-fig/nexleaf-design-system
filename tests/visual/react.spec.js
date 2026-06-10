import { test, expect } from 'playwright/test';

// React Storybook (reference surface, port 6006). Curated, static-rendering
// stories across the responsive + navigation surfaces. Screenshotted at both
// viewports via the two react-* projects in playwright.config.js. Keep this
// list representative, not exhaustive — it's a regression tripwire.
const STORIES = [
  // Assembled hybrid shell (Primary / Secondary / Tertiary) + bare shell
  'patterns-responsive-app-shell--responsive-app',
  'patterns-responsive-app-shell--shell-only',
  // Application Layout (AppShell-based)
  'pages-application-layout--sectioned-layout',
  'pages-application-layout--home-layout',
  // Progressive top bar across its forced states
  'components-navigation-topbar--wide',
  'components-navigation-topbar--compact',
  'components-navigation-topbar--mobile',
  // Page header variants
  'components-navigation-header-page--with-title-disclosure',
  'components-navigation-header-page--record-variant',
  // Responsive list + record actions
  'patterns-responsive-equipmentcard--list',
  'patterns-responsive-tertiaryactions--desktop',
  'patterns-responsive-tertiaryactions--mobile',
];

for (const id of STORIES) {
  test(id, async ({ page }) => {
    await page.goto(`/iframe.html?id=${id}&viewMode=story`);
    await page.waitForSelector('#storybook-root', { state: 'attached' });
    // Let fonts, illustrations, and any entrance settle before snapshotting.
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(700);
    await expect(page.locator('#storybook-root')).toHaveScreenshot(`${id}.png`);
  });
}
