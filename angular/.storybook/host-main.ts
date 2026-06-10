// Stub bootstrap entry.
//
// Storybook's Angular builder reads the `storybook-host:build` target only to
// inherit its compiler options (tsConfig, polyfills, global `styles`). It
// overrides the actual webpack entry, so this `main` is never used to bootstrap
// an app — it exists solely to satisfy the browser builder's required `main`
// option. Keep it empty.
export {};
