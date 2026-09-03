# Add lab equipment — single — change log

## 2026-09-03 — Built from the Kenya NPHL MVP brief
- **What:** Short catalog form: facility (scoped, region derived) → managed Type → name/make/model → asset tag (primary, dup-checked within region) → serial optional → location → Passive-vocab condition → date → notes. Monitorable type → post-save 'Set up monitoring' CTA into Phase 2. States: default, validation errors, saved+CTA.
- **Why:** Sep 2 Raf ↔ Ednah meeting — NPHL lab inventory MVP, cold-room-first. Built to the §10 recommended decisions (D1–D7).
- **Source:** Implementation brief (PRD.md in this project) · epic PD-41.
- **States:** driven from screens/states.jsx (shared registry) — deep-linkable via ?state=<id>.
