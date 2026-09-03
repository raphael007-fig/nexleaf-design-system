# Add lab equipment — single — change log

## 2026-09-03 — Built from the Kenya NPHL MVP brief
- **What:** Short catalog form: facility (scoped, region derived) → managed Type → name/make/model → asset tag (primary, dup-checked within region) → serial optional → location → Passive-vocab condition → date → notes. Monitorable type → post-save 'Set up monitoring' CTA into Phase 2. States: default, validation errors, saved+CTA.
- **Why:** Sep 2 Raf ↔ Ednah meeting — NPHL lab inventory MVP, cold-room-first. Built to the §10 recommended decisions (D1–D7).
- **Source:** Implementation brief (PRD.md in this project) · epic PD-41.
- **States:** driven from screens/states.jsx (shared registry) — deep-linkable via ?state=<id>.

## 2026-09-03 — §5.2 success behaviour corrected (Raf: "fix all one by one")
- **What:** Save no longer shows an interstitial confirmation panel. It now does exactly what §5.2 says: toast + return to the register with the new row highlighted ("Just added"). A monitorable type's toast carries the "Set up monitoring" action with duration 0 (house rule: a toast with a button must not vanish). Fridge/freezer "coming later" note moved inline under Type.
- **Source:** self-audit against the brief, 2026-09-03. Verified in-browser (toast + action + highlight all render).
