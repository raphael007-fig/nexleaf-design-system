import { test, expect } from 'playwright/test';

// Angular Storybook (production surface, port 6007 static). The FULL story set —
// this is the artifact engineering ships, so every story is locked. Each id gets
// its own baselines at both viewports (angular-* projects in playwright.config.js).
const STORIES = [
  // Buttons + badges + banners + tags
  'components-btn--variants',
  'components-btn--full-width',
  'components-badge--tones',
  'components-banner--types',
  'components-banner--with-title',
  'components-banner--in-card',
  'components-tag--states',
  // Form controls
  'components-inputs-textinput--states',
  'components-inputs-numberinput--states',
  'components-inputs-selectinput--states',
  'components-inputs-textareainput--states',
  'components-checkbox--states',
  'components-radiogroup--states',
  'components-toggle--states',
  'components-upload--states',
  // Display + data
  'components-card--layout-types',
  'components-metriccard--states',
  'components-metriccard--loading',
  'components-lists-cell--states',
  'components-lists-cell--loading',
  'components-indextable--basic',
  'components-tooltip--placement',
  'components-skeleton--shapes',
  // Navigation
  'components-navigation-tabs--basic',
  'components-navigation-pagination--types',
  'components-navigation-breadcrumbs--trail',
  'components-navigation-topbar--states',
  'components-navigation-topbar--loading',
  'components-navigation-header-page--record-variant',
  'components-navigation-header-page--default',
  'components-navigation-navcard--home',
  'components-navigation-navcard--sub-home',
  'components-navigation-navcard--loading',
  'components-navigation-toolbar--full-toolbar',
  'components-navigation-toolbar--minimal',
  'components-navigation-side-navigation--docked-rail',
  'components-navigation-side-navigation--collapsed',
  'components-navigation-side-navigation--loading',
  // Overlays (static-open)
  'components-overlays--modal-open',
  'components-overlays--bottom-sheet-open',
  'components-overlays--slide-over-open',
  // Responsive patterns
  'patterns-responsive-menudrawer--open',
  'patterns-responsive-menudrawer--loading',
  'patterns-responsive-equipmentcard--list',
  'patterns-responsive-equipmentcard--loading',
  'patterns-responsive-equipmentcard--states',
  'patterns-responsive-tertiaryactions--desktop',
  'patterns-responsive-tertiaryactions--mobile',
];

for (const id of STORIES) {
  test(id, async ({ page }) => {
    await page.goto(`/iframe.html?id=${id}&viewMode=story`);
    await page.waitForSelector('#storybook-root', { state: 'attached' });
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(700);
    await expect(page.locator('#storybook-root')).toHaveScreenshot(`${id}.png`);
  });
}
