/*
 * Public API surface of @nexleaf/angular
 *
 * Angular delivery layer for the Nexleaf Design System. Every component is a
 * template-only wrapper that emits the shared `nx-*` CSS classes — import
 * `tokens.css` and the component stylesheets (the per-component CSS files) in
 * your app for styling. NgModule pattern: import the per-component NxXxxModule.
 */

export * from './lib/accordion/accordion.component';
export * from './lib/accordion/accordion.module';

export * from './lib/badge/badge.component';
export * from './lib/badge/badge.module';

export * from './lib/banner/banner.component';
export * from './lib/banner/banner.module';

export * from './lib/btn/btn.component';
export * from './lib/btn/btn.module';

export * from './lib/card/card.component';
export * from './lib/card/card.module';

export * from './lib/cell/cell.component';
export * from './lib/cell/cell.module';

export * from './lib/checkbox/checkbox.component';
export * from './lib/checkbox/checkbox.module';

export * from './lib/date-picker/date-picker.component';
export * from './lib/date-picker/date-picker.module';

export * from './lib/divider/divider.component';
export * from './lib/divider/divider.module';

export * from './lib/index-table/index-table.component';
export * from './lib/index-table/index-table.module';

export * from './lib/metric-card/metric-card.component';
export * from './lib/metric-card/metric-card.module';

export * from './lib/nav-card/nav-card.component';
export * from './lib/nav-card/nav-card.module';

export * from './lib/number-input/number-input.component';
export * from './lib/number-input/number-input.module';

export * from './lib/option-list/option-list.component';
export * from './lib/option-list/option-list.module';

export * from './lib/page/page.component';
export * from './lib/page/page.module';

export * from './lib/pagination/pagination.component';
export * from './lib/pagination/pagination.module';

export * from './lib/polaris-icon/polaris-icon.component';
export * from './lib/polaris-icon/polaris-icon.module';

export * from './lib/radio/radio.component';
export * from './lib/radio/radio.module';

export * from './lib/search-select/search-select.component';
export * from './lib/search-select/search-select.module';

export * from './lib/select-input/select-input.component';
export * from './lib/select-input/select-input.module';

export * from './lib/tabs/tabs.component';
export * from './lib/tabs/tabs.module';

export * from './lib/tag/tag.component';
export * from './lib/tag/tag.module';

export * from './lib/text-input/text-input.component';
export * from './lib/text-input/text-input.module';

export * from './lib/textarea-input/textarea-input.component';
export * from './lib/textarea-input/textarea-input.module';

export * from './lib/toggle/toggle.component';
export * from './lib/toggle/toggle.module';

export * from './lib/toolbar/toolbar.component';
export * from './lib/toolbar/toolbar.module';

export * from './lib/tooltip/tooltip.component';
export * from './lib/tooltip/tooltip.module';

export * from './lib/upload/upload.component';
export * from './lib/upload/upload.module';

/* ── Responsive overlay layer (ColdTrace hybrid shell) ───────────────────────── */
export * from './lib/overlay/focus-trap.directive';
export * from './lib/overlay/scroll-lock.service';
export * from './lib/overlay/overlay.module';

export * from './lib/slide-over/slide-over.component';
export * from './lib/slide-over/slide-over.module';

export * from './lib/menu-drawer/menu-drawer.component';
export * from './lib/menu-drawer/menu-drawer.module';

export * from './lib/bottom-sheet/bottom-sheet.component';
export * from './lib/bottom-sheet/bottom-sheet.module';

export * from './lib/equipment-card/equipment-card.component';
export * from './lib/equipment-card/equipment-card.module';

export * from './lib/tertiary-actions/tertiary-actions.component';
export * from './lib/tertiary-actions/tertiary-actions.module';

export * from './lib/top-bar/top-bar.component';
export * from './lib/top-bar/top-bar.module';

export * from './lib/app-shell/app-shell.component';
export * from './lib/app-shell/app-shell.module';

export * from './lib/side-navigation/side-navigation.component';
export * from './lib/side-navigation/side-navigation.module';

/* ── Parity layer (ported to match the React set) ────────────────────────────── */
export * from './lib/skeleton/skeleton.component';
export * from './lib/skeleton/skeleton.module';

export * from './lib/modal/modal.component';
export * from './lib/modal/modal.module';

export * from './lib/popover/popover.component';
export * from './lib/popover/popover.module';

// Navigation-sync helpers (single-source engine for nav + breadcrumb + title switcher)
export * from './lib/nav-sync/nav-sync';
