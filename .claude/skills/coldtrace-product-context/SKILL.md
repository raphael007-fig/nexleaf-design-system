---
name: "coldtrace-product-context"
description: "Raphael's living working knowledge of the ColdTrace / Nexleaf platform — how the product actually behaves, its real data model, thresholds, permission model, known structural gaps, and the log of design and flow decisions agreed so far. Load this whenever writing or reviewing a PRD, spec, ticket, or feature brief for ColdTrace; whenever making a product judgement call, prioritising, or pressure-testing an idea for the cold-chain product; whenever asked \"should we build X\", \"what am I missing\", or \"is this the right scope\" about ColdTrace; before designing any new ColdTrace screen or flow; and whenever a meeting, correction, or agreed decision changes how the product works — so this file gets updated in the same turn. Do NOT load for unrelated products or for pure design-system/component work."
---

# ColdTrace product context — what I know, and how it should change my judgement

Raphael Okojie is a designer at Nexleaf Analytics working on **ColdTrace**, a vaccine cold-chain
monitoring platform deployed across multiple countries (Kenya, Tanzania, Rwanda, Uganda, Mozambique,
Ghana, Bhutan, Bangladesh, Comoros and others), used by Ministries of Health, EPI programmes,
biomedical technicians and health-facility staff.

**This is a living file.** It is the judgement layer, and it is expected to drift out of date as we
design things — so §9 defines how it gets updated, and §10 is the running log of what we've agreed.

The exhaustive reference — every route, column, field label, tooltip and status string, from 57
Confluence pages plus a full read-only audit of production on 2026-08-06 — lives in the repo:

- `~/Documents/Design System/docs/coldtrace-domain.md` (~1,530 lines, auto-loads via `CLAUDE.md`)
- `~/Documents/Design System/docs/coldtrace-ux-findings.md` (84 ranked candidate findings, **not** tickets)

Read those when you need an exact label or route. Use *this* file to know what matters.

---

## 1. The six modules, and what they actually are

| Module | Product's own description | What it really is |
|---|---|---|
| Equipment Management | "Manage your equipment and maintenance in one place" | The core inventory + monitoring register. Densest, most designed. |
| Analytics & Reports | "Track performance for data driven decisions" | Overview + Reports Hub + Maps + Daily/Weekly/Monthly grids. ~5 incompatible page templates. |
| Training | "Your go-to hub for training materials and resources" | Admin-assigned LMS. Tracks → categories → courses → lessons. |
| ColdTrace Transport | "Monitor all your vaccines while in transit" | **Not monitoring — retrospective playback.** Trips are authored and closed by the field mobile app. |
| **Events** | "Manage notifications, subscriptions, and alerts" | **Alert delivery plumbing, not incident tracking.** Subscriptions, SMS gateways, 2.3M notification rows. No status, no assignee, no resolve. |
| Health Tech Hub | "View and respond to health tech service requests" | The incident workflow — service requests + technician performance. |

Switching modules **swaps the entire left sidebar**. "Home" in every module leaves the module for the
global launcher — there is no per-module home.

## 2. The truths that should change a product recommendation

**Monitored vs unmonitored is the real conditional axis on equipment — not functional status.**
An unmonitored CCE gets 2 header buttons and the sentence "This device is unmonitored". A monitored one
gets 4 and a live device card. `Functional` / `Faulty` / `Unknown` change only a chip. Any spec that
branches on functional status is probably branching on the wrong thing.

**A `Faulty` CCE carries no fault information.** No reason, no date, no reporter, no last-good-reading,
no connectivity indicator. Status is a chip and nothing more. This is a design gap, not a display gap.

**RTMD status is derived from upload recency and is invisible on the device page.** Today = Functional,
months stale = Faulty, years stale = Unknown — rendered only in the list. `Error Code` / `Error Message`
columns exist and are never populated. The only real evidence is inside `View Logs`.

**Maintenance is two halves that never meet.** The Preventative Maintenance Summary is genuinely rich
(four Yes/No/N-A accordion sections from the technician's form) but is linked only from Activity Log,
never from the CCE. So `Maintenance History` is empty on *every* record — including ones chipped
`Overdue` — and `Last Service Date` stays `--`. The `Overdue` chip is computed from a schedule against a
blank date. **Any maintenance PRD starts here.**

**The incident workflow has no timeline, no comments, and no audit trail.** No record of who changed a
status or when, no channel between technician and facility contact, no reason captured for a pause or
reassignment — while `Jobs Paused` and `Jobs Reassigned` are admin KPIs. The counts are kept; the
narrative is discarded.

**The SLA is measured but nothing acts on it.** `Due Date` is a *required field the requester sets*, not
derived from priority — so a High and a Low job can carry identical deadlines. A `Medium` job was
observed 48 days overdue, still `Open` and unassigned, with no escalation. `Past Due` is a tab you have
to go looking for.

**Assignment is blind.** You pick a technician from a flat list of names, while the system holds
`Equipment Expertise`, `User Regions`, `Language`, live job counts and completion rates — in three other
screens. An empty technician list renders as a normal empty dropdown with no message and no link to add
one.

**Region scoping is several unrelated systems on one account, and region defaults hide the data.** Four
modules show empty-by-default: Tech Hub service requests (all KPIs 0), Training Admin (1 table row under
a KPI reading 5,307), Equipment vs Devices using different region controls with different scopes,
Activity Log with no scope restriction at all. A loading state is visually indistinguishable from a zero
state. **Any new list or dashboard must explicitly decide its scoping and its zero-vs-loading treatment.**

**Test fixtures are interleaved with production country programmes in the region tree, unmarked** —
`chris testing`, `ColdTrace Demo`, `ArthiSubscriptionTest`, `all_gateways`, `BLE_Testing_*`. 3,007 region
nodes render fully expanded on one page with no search or pagination.

**Some flows exist only on mobile.** PPM capture (geolocation-gated on web), trip creation, coldbox
device assignment and the vaccine manifest are all authored in the field app. **Always ask which client
a PRD is for.** Similarly, catalogue admin (funding sources, equipment make/model, spare parts, gateways)
has no web route at all — presumably Django admin.

## 3. Thresholds and definitions — the programme's real numbers

Config inheritance is four tiers: **system default → top-level region → child region → per-device/CCE
override**, edited at `/device/bulk-config/:regionId`. Governance is asymmetric: **general device
settings are editable only at top-level regions**; alarm configs are overridable at every tier.
Inheritance state is communicated as a *sentence* ("Configuration inherited from Kenya"), not a
component — you cannot scan a page and see what's been customised.

**Alarm thresholds by equipment type** (`Cold Threshold` / `Cold Duration` / `Hot Threshold` /
`Hot Duration` / `Door Open Duration`):

| Type | Cold | Cold dur | Hot | Hot dur |
|---|---|---|---|---|
| Vaccine Refrigerator / WICR | 2 °C | 1 hr | 8 °C | **10 hrs** |
| Vaccine Freezer / WIFR | −25 °C | 10 hrs | −15 °C | 10 hrs |
| Ultra Cold Chain | −90 °C | 1 hr | −60 °C | 1 hr |
| Ambient / Cold Box / Vaccine Carrier / Unknown | 0 °C | 1 hr | 43 °C | 1 hr |

**Alarm delays are asymmetric for fridges** — hot excursions are tolerated 10× longer than cold. That is
deliberate cold-chain policy (freezing destroys vaccine; brief warming often doesn't), and any design
that presents hot and cold symmetrically is misrepresenting the domain.

`Door Open Duration` is set to 10 mins for every type and **surfaces nowhere in the product** — no
door-open alarm in any list, chart, KPI or alert vocabulary.

**Transport thresholds are payload-driven, not fixed.** Hot stays 8 °C, but the cold limit swings from
2 °C to ≈ −25 °C depending on whether the manifest is `(thawed)` or `(thawing)` — a 27-degree difference.
No alarm-delay concept exists in Transport at all.

**WHO / programme definitions used in reporting, verbatim:**
- Heat alarm — fridges and WICs: at least **10 hours above 8 °C**; freezers and WIFs: at least
  **1 hour above −15 °C**
- Freeze alarm — fridges and WICs: at least **1 hour below −0.5 °C**
- Sufficient data — CCEs sending **≥50%** of expected data
- Well-performing — **over 95% uptime**; poor-performing — below 95%
- Power risk — a CCE with **any day under 8 hours of power**
- Device-level: freeze alarm = below threshold **>30 mins**; heat alarm = above threshold **>120 mins**

**Device config defaults:** upload interval 1 hr · sampling interval 10 mins · repeat alarm every 6 hrs ·
alarm repeat times 28 · sensor disconnect 1 hr · power out duration 1 hr · battery low 20% for 30 mins.

**Maintenance status bands:** `Critical - Long Overdue` (>90 days) · `Maintenance Overdue` (30–90) ·
`Maintenance Due Soon` (<30) · `Recently Maintained` · `No Maintenance History`.
**CCE age buckets** have a hole: `New (<1 year)` · `Mature (3-5 years)` · `Legacy (>5 years)` —
nothing covers 1–3 years.

## 4. Vocabulary fragmentation — the standing tax

**Nine entities, nine status vocabularies.** CCE functional
(`Functional/Faulty/Unknown/Decommissioned`) · CCE deployment (`Deployed/Installed/Not in use`) · CCE
maintenance (`Unknown/OK/Upcoming/Due/Overdue`) · RTMD (same three + `Monitored/Unmonitored`) · Passive
(`Functional/Damaged–Needs Repair/Unusable/Decommissioned`) · Solar
(`Operational/Partially Operational/Non-Operational/Unknown`) · Spare Part
(`Unknown/In Stock/Low Stock/Out of Stock/Discontinued`) · Spare Request
(`Pending/Approved/Rejected`) · Service Request
(`Unknown/Open/Assigned/In Progress/Paused/Completed/Cancelled`).

Note the service-request list of 7 **contradicts the in-app Service Request Report, which documents only
4**. And `Unknown` is a database null promoted to a user-facing filter option in several places.

**Six competing names for the same alarm concepts:** `Freeze`/`Heat` (KPIs, Maps) ·
`Cold Alarm`/`In-Range`/`Hot Alarm`/`No Data` (chart legends) · `In Range`/`Hot`/`Freezing` (reports) ·
`hot alarm(s)`/`cool alarm(s)` (Daily tooltips) · `HIGH TEMP ALERT`/`LOW TEMP ALERT`/`NO DATA` (SMS) ·
`Hot`/`Cold`/`Freeze`/`No Data` (subscription config, where **Cold and Freeze are two separate
user-set thresholds** that no chart legend reflects).

**Legend semantics differ between adjacent pages.** Daily's red means "above 8 °C **for more than 120
minutes**"; Weekly's red means "> +8 °C" instantaneously; Weekly adds an amber tier Daily lacks; Monthly
drops the alarms legend while keeping the column. There is no Power legend at all.

**Whenever a PRD introduces a status, a colour or an alarm word, reconciling it against these sets is
part of the work — not a follow-up.**

## 5. Permissions — there is no role model

No role dropdown, no named roles, and Confluence's "dashboard account types" maps to nothing live.
Authorisation is **four region-scoped lists** on the user record, whose help text is the permission spec:

- `User Regions` — can install devices and view their data
- `Primary Region (Required)` — default landing scope only
- `Read Only Regions` — view only; cannot install or invite
- `Admin Regions` — install + view + invite + generate reports/subscriptions

One user can be admin in region A, installer in B, read-only in C. Plus a `Staff` flag and an `Admin`
Yes/No column. **These fields exist on the invite form and are absent from the edit form** — so there may
be no UI path to revoke someone's regional admin access. `Impersonate` is available on every user row and
in the global utility bar. User status is `Active: Yes/No` only — no invited/pending/disabled state, no
2FA surface anywhere.

`Occupation` is a separate taxonomy that reads like roles but isn't: `Biomedical Engineer` ·
`Biomedical Technician` · `Cold Chain Technician` · `EPI Supervisor` · `Health Center Manager` · `Nurse` ·
`Partner` · `Vaccine Handler`.

Two unreconciled hierarchies coexist: the **Region tree** (up to 8 levels) and **`Facility Type`** tiers
(`Facility` / `Province` / `Division` / `District` / `Tarluka/Thesil`), which is what surfaces in reports
as `Facility` → `Level 2 Area` → `Level 1 Area`.

Facility contacts are a **shared reusable entity**, not facility-owned fields — capped at
"up to 5 RTMD alarm contacts" with no counter and no stated behaviour at the cap.

## 6. Design conventions — what's canonical and what isn't

The **canonical list page** (Equipment Management) is: breadcrumb → H1 + region control + Download +
primary Add CTA → KPI card row → toolbar with **counted tabs** left, search + Filters + Columns right →
table → pagination. Filters in a **right drawer** (`Reset All` / `Apply`). Detail pages two-column with a
right rail of small single-purpose cards. Entry to a record is always an explicit `View` — never a
whole-row click.

**Almost nothing else follows it.** Analytics & Reports has ~5 incompatible templates, four different
pagers, and never puts region in the header. Events uses inline filter strips with explicit `Submit`.
Transport uses a card grid with no table, no KPIs and no tabs. Administration has four distinct layout
languages. Only `/training/admin` and Health Tech Hub's list come close, and both use a filter *popover*
instead of the drawer.

The genuinely shared vocabulary across all modules is: breadcrumb chips, the `ⓘ` tooltip, the
green/amber/red/grey status palette, Material selects and pagers, and the inline filter strip.
**Everything above that layer diverges** — so "consistent with the rest of the app" is an ambiguous
requirement and needs to name *which* pattern.

The **Equipment Plot** (temperature line + battery chart, threshold bands drawn from the sensor's own
config, `Uptime` / `Time In Range` / `Time below X` / `Time above Y`) is the product's reference
data-visualisation surface and is reused by the Daily and Weekly grids. Transport does **not** reuse it —
it has a weaker bespoke chart with auto-rescaling axes and no legend.

**Add Equipment breadcrumb (fixed):** `Home › Coldchain Equipment › Add Equipment` on every screen in
that flow — see the 2026-08-25 entry in §10.

**Charts are amCharts.** ColdTrace renders its temperature/battery plots with **amCharts** (Raf,
2026-09-07: *"coldtrace uses AM Charts"*). Prototypes must chart with amCharts too — a hand-drawn
inline SVG that merely looks like a chart is wrong, because it has no cursor, tooltips, axis ranges or
real time axis, and it will not match production behaviour. **Known DS gap:** the Poltail design system
ships no chart component, and the canonical Storybook page `Pages/Temperature Alert Detail` hand-draws
its own SVG `TempChart` — so there is nothing to compose from. Until a DS chart component exists, load
amCharts 5 (CDN globals `am5` / `am5xy`) and keep every colour on DS tokens, with the acceptable band
as an **axis range** (configuration drawn as a zone, never as typed-in data). Reference
implementation: `prototype-hub/src/projects/lab-inventory/screens/TempChart.jsx`.

## 7. How to use this when writing or reviewing a PRD

Load the relevant PRD skill for format (`prd-writer`, `one-page-prd-generator`) and
`prd-to-tickets` for decomposition. This skill supplies the domain judgement. Before drafting, resolve:

1. **Which client?** Web, field mobile app, or both. Several flows are mobile-only today.
2. **Monitored or unmonitored equipment?** That axis drives more UI than status does.
3. **What's the region scope, and what does zero look like?** Distinguish empty from loading from
   out-of-scope. Four existing modules get this wrong.
4. **Does this introduce a status, colour or alarm word?** If so, reconcile against §4 in the PRD, not later.
5. **Does it touch config?** Name the tier (system / top-level region / child region / device) and say
   what happens on override and revert. Remember device settings are top-level-region-only.
6. **Does it need history or attribution?** There is no timeline or audit component anywhere in the
   product. If the feature implies "who did this and when", that infrastructure doesn't exist yet — scope it.
7. **Does it depend on maintenance data?** `Maintenance History` and `Last Service Date` are empty
   platform-wide. Don't build on them without fixing the join.
8. **Is there an existing report that already covers this?** Six on-demand/scheduled reports exist and
   the Service Request Report currently returns all zeros — possibly unwired.
9. **Numbers must be defined.** Uptime, functional counts and totals already disagree between screens.
   State the denominator.
10. **Cite the finding number** from `coldtrace-ux-findings.md` when a PRD addresses a known gap, so the
    backlog and the spec stay linked.

## 8. Honest limits of this knowledge

- The audit was **read-only and non-destructive**. Create, edit, delete, assign, export and confirm
  flows were deliberately not exercised — so confirmation copy, validation, blast radius and success
  states for those are unknown.
- **PPM reporting** (`/equipment/:id/maintenance`) is geolocation-gated and was never entered. It is the
  largest single gap.
- **No `Decommissioned` CCE record is reachable** through the UI — the KPI says 1, the filter returns
  zero rows, and it appears in no tab. So decommissioned behaviour is unverified.
- Service requests in states other than `Open` were not reachable from the account used, so whether a
  `Completed` job records resolution notes, completion date or parts used is **unconfirmed** — though no
  container for them exists in the `Open` layout.
- Whether `Delete Region` and `Reprocess equipment` confirm before acting is **unknown** — neither was
  clicked.
- Findings were gathered by audit agents reporting back. Verbatim labels are reliable; if something reads
  oddly against the real product, treat this file as the likely error and correct it.

---

## 9. Keeping this current — the update protocol

**This file is expected to change as we work. Updating it is part of the task, not a follow-up.**
Do it in the **same turn** as the work that produced the new knowledge, without being asked.

### What triggers an update

| Trigger | Action |
|---|---|
| A meeting, Slack thread or transcript settles how a flow should work | Add to the **§10 decisions log**, and correct any section it contradicts |
| Raphael corrects me on domain behaviour ("that's not how X works") | Fix the relevant section **and** note it in §10 with the date |
| A PRD is approved | Log the decision in §10; move any resolved gap out of §2/§8 |
| A design or prototype is agreed and delivered | Log it in §10 with the Jira key, Figma link and prototype path |
| Engineering answers one of the §8 open limits | Replace the "unknown" with the answer and drop it from §8 |
| A new flow ships that changes real behaviour | Update §1–§6 so the judgement layer reflects the shipped product, not the audited one |
| One of the 84 findings gets fixed | Note it in §10; the finding stays in the file but marked resolved |
| A new module, entity or status appears | Add it to §1/§4 and reconcile against the existing vocabularies |

### Where each kind of knowledge goes — don't put everything here

- **This skill (§1–§6)** — judgement: how the product behaves, what constrains a decision. Keep it tight
  enough to stay readable. If a section grows past ~30 lines of detail, summarise here and push the
  detail to the domain doc.
- **§10 decisions log** — what we agreed and when. Append-only; never rewrite history, mark things
  superseded instead.
- **`docs/coldtrace-domain.md`** — exhaustive reference: exact routes, columns, field labels, verbatim
  tooltips and status strings. Anything you'd look up rather than reason with.
- **`docs/coldtrace-ux-findings.md`** — candidate findings and their resolution state. Never treat these
  as tickets until Raphael says so; check the DP engineering board first.
- **`FIGMA-MAP.md` + the `ds-components-only` skill** — design-system and Figma mechanics: component
  anatomy, layout rules, annotation style, audit traps. Product behaviour goes here; how to build it
  goes there.
- **Jira** — the actual tracked work. This file records decisions, not tasks.

### Rules for editing this file

- **Never delete an observation because it's inconvenient.** If it's been superseded, say so and date it.
- **Distinguish audited from agreed.** Audited = observed in production on a date. Agreed = a decision we
  made. Shipped = agreed and now live. Label which.
- **Correct in place, log the change.** A silent edit loses the reason.
- After a substantive update, tell Raphael in one line what changed — he should never have to ask
  "is this updated?"

## 10. Decisions log — agreed flows, designs and corrections

Append newest at the bottom. Format:

```
### YYYY-MM-DD — <short title>   [agreed | shipped | superseded]
- **Decision:** what we settled on.
- **Why:** the reasoning or the constraint that drove it.
- **Source:** meeting / Slack / PRD / Raphael's correction / engineering answer.
- **Affects:** which section above, which finding number, which Jira key.
- **Artefacts:** Figma link · prototype-hub path · Jira key.
```

### 2026-08-06 — baseline established   [audited]
- **Decision:** the platform knowledge in §1–§6 is the shared baseline for all ColdTrace product work.
- **Why:** design and PRD judgement was previously running on assumptions about how the product works.
- **Source:** 57 Confluence pages + a full read-only, non-destructive audit of production across all six
  modules and the administration surfaces (~150 screens and records opened).
- **Affects:** everything above. 84 candidate findings recorded separately.
- **Artefacts:** `docs/coldtrace-domain.md`, `docs/coldtrace-ux-findings.md`.

<!-- Add new entries below this line. -->


### 2026-08-24 — Add Equipment flow, second Ednah review (Prototype B corrections)   [agreed]
- **Decision:** One universal step order for ALL three monitoring methods, after the 3-way method
  choice: **Facility → Equipment details → Monitoring device (last) → Review & Submit**.
  "Equipment is the primary; monitoring is secondary." Facility informs region — never ask region
  as a separate field. This supersedes the July order (facility → RTMD/sensor → equipment).
- **Sensors:** sensor assignment is a **dropdown, never free text**. CTX sensor serials are
  pre-fed into the system (type-to-filter, assign an existing one). CT5 has exactly four sensors
  labelled **A–D** (one may be ambient, not tied to a CCE) — also a dropdown.
- **Removed from the flow entirely:** min/max alarm temperature fields (thresholds follow WHO
  recommendations, admin-only config — see §3 tiers) and the whole **second-compartment /
  compartment-select concept** — CCEs are single-compartment; fridge-vs-freezer is derived
  automatically from the make/model (PQS/WHO data), so the flow must never ask.
- **Why:** the installer stands in a room full of CCEs. Picking equipment first, then assigning a
  sensor, prevents attaching a sensor to the wrong fridge; make/model already discloses the type.
- **Confirmed:** contacts created in-flow join the facility's shared contact directory (consistent
  with §5). Prototype B's fully-manual third-party approach validated — **no automatic pairing for
  any non-Nexleaf device, including Haier** (integration ingests data after manual registration;
  inventory can later show "monitored by X" from the integration).
- **Adjacent gap surfaced (not Add Equipment scope):** ColdTrace has **no cold-room equipment
  type** — field teams fake multi-sensor cold rooms by duplicating equipment records per sensor.
  Equipment types come from PQS, and many records show type "unknown". Kenya National Lab
  onboarding (reagent monitoring, lab-equipment inventory, new user group) is a separate initiative.
- **Source:** Ednah ↔ Raphael meeting, 2026-08-24 (transcript shared in session).
- **Affects:** §2 (monitored axis), §3 (thresholds are config, not per-install input), §5 (shared
  contacts). Supersedes the RTMD-ordering part of the 2026-07-27 Prototype B build.
- **Artefacts:** built as **Prototype C** (same day) — `~/Documents/3rd Party Equipment flow/src/AddEquipmentFlowC.jsx`
  + `statesC.jsx` (localhost:5180, `?proto=c`). A and B unchanged for comparison. C also adds a
  success Toast on submission. Status: agreed + prototyped, awaiting Ednah's next review.

### 2026-08-25 — Add Equipment (Prototype C): IA, states and the mobile treatment   [agreed]
- **Breadcrumb / IA:** the flow sits under **`Home › Coldchain Equipment › Add Equipment`** on *every*
  screen — entry, wizard and success. It is NOT under Manual Temp. Recording, and the scan step does
  not get its own crumb: scanning is a step *inside* Add Equipment, not a sibling destination.
  Supersedes the Prototype C spec's §1 breadcrumb.
- **Three flows, distinguished:** MONITORED (Nexleaf RTMD — 4 steps: Facility & Contacts → Equipment
  Details → RTMD & Sensor → Review) · BUILT-IN/3RD PARTY (4 steps; the device step is inventory
  capture only) · UNMONITORED (**3 steps** — no device phase at all, so its stepper is shorter).
- **Search results are four distinct states**, not one: exact match (single, pre-selected) · multiple
  none selected (Continue disabled) · multiple one selected · "add as new" selected. Selection shows
  as a ring on the chosen panel. They had been built identically — **if two state frames render the
  same, one of them is wrong.**
- **Mobile (375) is a first-class target.** Modals become **bottom sheets**; the stepper keeps its full
  run of circles above a "Step N of T · Label" line; review rows stack label-above-value; action rows
  stack full-width. Mirrored mobile sections sit beside the desktop ones on the Changes page.
- **Still open — alarm contact limit.** The flow says a facility holds **10** RTMD alarm contacts;
  production enforces **5** (§5). Hard-coded in the copy and in the contact-limit state.
- **Duplication to resolve:** the empty Monitoring Device step now exists twice — as the step-3 arrival
  state and in the "Empty / first-run" row. Decide whether both are wanted.
- **Confirmed unchanged from 2026-08-24:** thresholds WHO-derived and admin-managed, never asked at
  installation · sensor assignment always a dropdown · third-party devices are inventory capture only,
  including Haier · location capture on RTMD configure is optional, never a hard stop · a QR code is
  required before the details step can complete.
- **Source:** Raphael's review passes across 2026-08-25.
- **Affects:** §5 (the 5-vs-10 contact cap conflict is now explicit), §6 (adds the Add Equipment
  breadcrumb as a fixed convention).
- **Artefacts:** Figma Changes page — six desktop sections with mirrored ` — MOBILE` sections beside
  them, 114 frames, 17 frame notes; PD-23; prototype `~/Documents/3rd Party Equipment flow` (`?proto=c`).
  Design-system and Figma mechanics from this work live in `FIGMA-MAP.md` and the `ds-components-only`
  skill, not here.


### 2026-09-03 — Kenya NPHL Lab MVP: prototype built to the Sep 2 brief   [agreed + prototyped]
- **Decision:** Lab is a new Inventory subsection (existing CCE/RTMD/Passive/Solar untouched).
  Hierarchy: Kenya Lab (global group, never selectable) → NPHL = region → labs = facilities;
  region always derived from facility. New `LabEquipment` entity — never a CCE variant, never in
  CCE counts/uptime denominators. `Type` (managed seeded list, NOT PQS) doubles as the
  monitored/cataloged switch — V1 monitors only the Walk-in Cold Room. Asset tag (the lab's own
  scheme) is the primary identifier; serial optional. Condition reuses Passive's 4-value vocab;
  "Old/New" = age → note, "Not set" for null (never "Unknown"). Roles via the four region lists;
  no data = surface hidden; loading ≠ empty ≠ out-of-scope, all three drawn distinctly.
- **Built to the §10 recommended answers:** D1 cold room = central "Central Cold Store" facility
  (pending Ednah) · D2 ONE cold-room record + N sensors (data model to confirm w/ Lucas; workaround
  rows must be tagged out of denominators) · D3 seeded type list, no admin UI · D4 hard 5-contact
  cap WITH a visible counter · D5 inherit WICR 2–8 °C bands (durations to confirm on site) ·
  D6 config-driven facilities (remaining labs drop in) · D7 web-only, responsive.
- **In-prototype rulings, pending confirmation:** QR code required before the cold-room details
  step completes (follows the CCE convention; brief's data model has no QR field — Ednah to
  confirm labs carry QR stickers). §5.2 success = toast + return-to-list with row highlighted;
  monitorable type's toast carries "Set up monitoring" (duration 0).
- **Open, with owners (on PD-41):** sensor placement capture point · destructive confirm for
  decommission via edit · whether Inventory Summary Report takes a register section ·
  "Manage contacts" destination.
- **Source:** Sep 2 Raf ↔ Ednah meeting → implementation brief pasted 2026-09-03; Raf's live
  corrections during the build (inCard banners everywhere, wizard frame on add/import — those
  are DS mechanics, recorded in ds-components-only, not here).
- **Artefacts:** prototype-hub `src/projects/lab-inventory` (6 flows, 39 states,
  localhost:5173/#/lab-inventory) · PD-41 · PRD.md working copy in the project. No Figma yet.
