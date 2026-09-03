---
name: "prototype-review-then-publish"
description: "Raphael's delivery + sync protocol: ALWAYS give him the localhost URL first after prototype work, hand deploys to his dedicated Claude Code deploy session, ASK before publishing to design.nexleaf.org, and ASK before writing changes into Figma (he says \"go check it\" when he changes Figma himself). Trigger whenever prototype work in ~/Documents/Design System/prototype-hub is built or changed, when publishing/deploying to design.nexleaf.org, or when prototype and Figma have diverged."
---

# Prototype delivery + Figma sync protocol

Everything is hosted on **design.nexleaf.org**. Three surfaces; auto-deploy and the approval
gate coexist because they point at different paths:

| Surface | URL | Updated by |
|---|---|---|
| **Local review** | `http://localhost:5173/#/<project>/<slug>` | `npm run dev` — hot-reloads on every edit |
| **Preview** | `design.nexleaf.org/prototype-hub-preview/` | **auto** — deploy-hub watcher on save; CI on push |
| **Team / published** | `design.nexleaf.org/prototype-hub/` | **only on Raf's approval** — `npm run deploy` |

## Rule 1 — ALWAYS lead with the localhost URL

After **any** prototype work, the response opens with it. This is the thing he asks for most:

> Review at **http://localhost:5173/#/\<project\>/\<slug\>**
> (run `cd ~/Documents/Design\ System/prototype-hub && npm run dev` if it isn't running)

Vite hot-reloads, so once the dev server is up he sees every later edit instantly — never tell
him to restart it or rebuild. `ERR_CONNECTION_REFUSED` means the dev server isn't running;
Claude cannot start it (separate sandbox) — ask him to run it.

## Rule 2 — who does what

- **Cowork (this Claude):** design work, Figma writes, Jira, prototype code, the localhost link.
  **Cannot** `git push` or deploy — no GitHub/gcloud credentials in the sandbox.
- **Raf's dedicated Claude Code deploy session:** has the credentials, runs push + deploy.

So don't just print raw commands — hand over a **ready-to-paste prompt** for that session:

> Push and publish the prototype hub: `cd ~/Documents/Design\ System && git push`, then
> `cd prototype-hub && npm run deploy`. Report the "Verified live" line and the bundle hash.

Then **confirm the reported hash matches the local build** (`grep -o 'assets/index-[^"]*\.js'
prototype-hub/dist/index.html`). If gcloud errors with *Reauthentication required*, he needs
`gcloud auth login --no-launch-browser` — never handle the auth code, it belongs in his terminal.

## Rule 3 — ask before publishing to the team URL

> Want me to publish this to design.nexleaf.org?

Never publish unreviewed work to `/prototype-hub/`.

## Rule 4 — Figma sync is a two-way handshake, never silent

- **Prototype changed → ASK before writing to Figma:**
  > The prototype now does X; your Figma frames still show Y. Want me to update Figma?
  On approval, mirror per the canvas discipline in `FIGMA-MAP.md` (versioned frame, real library
  instances, annotated) and comment on the Jira ticket.
- **Figma changed → he says "go check it."** Read the frames, report what changed, update the
  prototype to match.
- **Every correction is a divergence** until it exists on both sides — spacing, copy, a control,
  a state. Report parity as a short list, then wait for the go-ahead.

## After delivery

Slack DM (what shipped + links) · Jira comment · prototype `CHANGELOG.md` · commit
`proto(<slug>): <what> — <why> [PD-XX]`.

## Don't break these

- **Do not disable or delete auto-deploy.** The watcher (`~/Documents/deploy-hub/watch.sh`)
  auto-deploys the hub to the **preview** path, plus the website / Storybook / maps. Keep it.
- **Do not point auto-deploy at `/prototype-hub/`** — that pushes unreviewed work to the team.
- CI (`.github/workflows/deploy-prototype-hub.yml`) deploys **preview on push**; live is a manual
  `workflow_dispatch` with `target: live`. Needs a `GCP_SA_KEY` secret Raf adds in GitHub.

