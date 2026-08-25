# ColdTrace — UX findings from the live audit

Observed on production 2026-08-06 during a read-only audit of all six modules plus the administration
surfaces. Part I covers Equipment Management; Part II covers Analytics & Reports, Events, Health Tech Hub,
ColdTrace Transport, Training and admin.
**Nothing here is a ticket yet.** This is the candidate backlog — raise with engineering
and product before filing, and check each against the DP engineering board first.

Ranked roughly by user impact.

---

## P1 — data integrity users can see

**1. Decommissioned records are unreachable.**
KPI reads `Decommissioned 1`, but `Functional Status = Decommissioned` returns
`No Equipment found for the applied filters` and `Download ( 0 )`. The row appears in none of the
toolbar tabs (`Deployed 183` / `Installed 0` / `Not in use 0`). There is no path to the record.

**2. KPI cards contradict their own tables.**
- `/equipment`: `Total Equipment 184` beside `Download ( 223 )` and `1 – 10 of 223`.
- `Functional 144` → filtering to Functional returns `1 – 10 of 179`. `Unknown 34` → 38 rows.
- `Total 184` = `183 + 1`, which the tabs cannot reproduce.
Users can't tell which number is true or what scope each reflects.

**3. Two different "functional" counts for the same fleet.**
CCE list says `Functional 144`; Health Status says `Total Functional (Monitored) 51 (51 of 76)`. Same
region, same entity, undisclosed denominators. The list KPI silently mixes monitored and unmonitored
populations while the in-app glossary defines `Functional` as monitored-only.

**4. Maintenance history is disconnected from equipment.**
A rich Preventative Maintenance Summary exists at `/journal/:id/maintenance` and is linked from Activity
Log, but it never appears on the CCE's `Maintenance History` tab and has no link back to the CCE. So
`Maintenance History` is empty on every record — including ones chipped `Overdue` — and `Last Service
Date` stays `--`. The `Overdue` chip is therefore computed from a schedule against a blank date, not
from actual visits.

**5. A `Faulty` CCE tells you nothing about the fault.**
No fault reason, fault date, reporter, last-good-reading, or connectivity indicator anywhere on the
record. Status is a chip and nothing more.

**6. RTMD status is invisible on the RTMD page.**
Status is derived from upload recency and shown only in the list. The detail page has no status badge,
no "last seen", no connectivity dot. The only evidence is buried in `View Logs`. `Error Code` and
`Error Message` columns exist and are never populated.

---

## P2 — flows that break down

**7. Equipment Plot date stepper collapses the window.**
Default range is 30 days. The **first** press of `←` doesn't shift back a month — it collapses to a
**7-day** window, and every later press moves 7 days. Reaching data ~5 months old takes ~13 clicks. This
makes records with older data look empty (`No data available for the date range.`) when data exists.

**8. `View Daily Summary` exits the module and loses context.**
Navigates to `/viz/grid`, swaps the entire sidebar, **rewrites the global region** to the equipment's
region, and lands on a region-level grid with the originating CCE neither selected nor highlighted. No
breadcrumb back.

**9. `Create Service Request` drops its context.**
Goes to `/tech-hub/create-request?equipment=<id>`, swaps the sidebar, shows **no equipment summary** —
the equipment exists only in the query string. `Region *` isn't even prefilled from the equipment.

**10. `/device` is unusable without a region.**
Defaults to no region: all four KPIs read `--`, and the table dumps 101,137 rows (10,114 pages, mostly
`Phone_*` entries that look like internal records). It's also the **only list with no Filters drawer**,
so you can see per-status counts but cannot filter by status — the exact inverse of `/equipment`.

**11. Region scope is three unrelated systems on one account.**
`/equipment` uses a multi-select chip control hard-scoped to one region + sub-regions (clearing it
re-adds the region; no other country selectable). `/device` uses a single-select tree over the **global**
hierarchy, unpaginated, mixed with test groups (`0919_LA_devices`, `all_gateways`, `CTX-Test-Kenya`,
`Malawi device test`, `MSF_all`). `Activity Log` shows several countries with no scope restriction at all.

**12. `Quick Actions` hangs 20+ seconds and shifts layout.**
Bare centred spinner, no skeleton, no progress cue, no timeout — on the module's entry page. When it
resolves it pushes all content down, causing a layout shift that mis-targets clicks.

**13. Relative timestamps broken in the alert feed.**
`Maintenance Overdue` rows render a bare `ago` with no number. The working row reads `1 days ago`
(unpluralised).

---

## P3 — consistency and polish

**14. Five entities, five incompatible status vocabularies.**
CCE `Functional/Faulty/Unknown/Decommissioned` · Passive `Functional/Damaged–Needs Repair/Unusable/
Decommissioned` · Solar `Operational/Partially Operational/Non-Operational/Unknown` · Spare Part
`Unknown/In Stock/Low Stock/Out of Stock/Discontinued` · Spare Request `Pending/Approved/Rejected`. Worth
a deliberate decision about which are genuinely different states and which are synonyms.

**15. Four filter implementations for one job.**
Right drawer (`Reset All`/`Apply`) · anchored popover with no heading (`Clear`/`Apply Filters`) · inline
auto-applying · inline with `Submit`.

**16. Three editing implementations.**
Modal (`CANCEL`/`SAVE`, uppercase) · inline field swap (`Save`/`Cancel` as text links) · separate page.

**17. Three tab treatments and three tab jobs.**
Treatments: rounded pills · boxed folder tabs (RTMD Details) · icon segmented controls (Health Status).
Jobs: cross-entity routing · filtering one list · switching panels. A tab that navigates to another
route (`Temperature Monitoring Devices` → `/device`) shouldn't look like a tab that swaps a panel.

**18. Four names for one concept — date range.**
`From`/`To` · `Install Date From`/`Install Date To` · `Start Date`/`End Date` · `Start`/`Through`.

**19. Mixed date formats on one screen.**
Performance shows `07/02/2026` in the filter and `2026-02-07` in the heading directly beneath it. DD/MM
vs ISO ambiguity is a real hazard in a multi-country deployment.

**20. Eleven ad-hoc empty states, none with a CTA.**
`No History` · `No results found.` · `No passive equipment matches your search.` ·
`No Additional Sensors` · `No contacts currently in this facility.` · `No data available` ·
`No temperature data available` · `No excursion data available` · `No QR Code Assigned` ·
`No freeze threshold set for this device` · `No data available for the date range.`
None offers the relevant action even where one exists in the page header.

**21. Unset values render as an empty grey chip.**
The `--` pill reads as a broken component rather than "no value". Inconsistent too: `Maintenance Status`
is an `Unknown` chip on one record and a bare `--` on another.

**22. Electrification's empty state is hundreds of identical grey rows** instead of one message.

**23. Performance and Electrification look like a different product.**
Server-rendered static chart images — saturated default colours, rotated overlapping axis labels, no
interactivity, no responsive behaviour — plus one unstyled bordered HTML table, sitting beside carefully
designed DS pages.

**24. Raw identifiers leak into the UI.**
`Equipment ID: 69988468a0f6e230afde4507` on the PPM summary. Composite machine strings on Installation
Detail: `<serial> - <facility> - <make>|<model> - <last6ofIMEI>_<sensorId>`, wrapping over two lines.
Facility slugs (`Embakasi_West_SC_store-Umoja_HC`) and device IDs with sensor-index suffixes (`..._0`).
Spare part names with inconsistent delimiters: `HBD-116 :: Thermostat`, `TCW2000 AC :: Sensor E70 part`,
`TCW 2000 AC: Displayer Electric cards`.

**25. `Ambient` is modelled as a CCE**, forcing meaningless fields onto it — `Serial Number --`,
`Install Date --`, `Power Source Unknown`, `Maintenance Schedule: Every quarter` on a bare sensor.

**26. Casing and control-type inconsistencies.**
`Out Of Stock` (KPI) vs `Out of Stock` (chip). `CANCEL`/`SAVE` vs `Save`/`Cancel`. `View` is an outlined
button in list tables but a plain text link in Activity Log and Previous Installations. `View Logs` /
`Select Another RTMD` / `Edit Settings` are text links where comparable pages use buttons.

**27. Row `⋮` menu ≠ detail `Actions` menu.**
CCE row: `Edit` · `Decommission` · `Delete` · `Create Service Request`. Detail: `Edit Information` ·
`Decommission Equipment` · `Delete Equipment` — different set, different labels.

**28. Destructive actions behind a small unlabelled kebab.**
`Delete` and `Decommission` sit inside a `⋮` icon with no tooltip.

**29. Toolbar controls vanish between sibling views.**
Passive Equipment `Detailed View` → `Summary View` removes `Search` and `Columns` with no explanation.

**30. Pagination state leaks across tabs.**
Spare Parts `All` → `Requests` keeps `page=2`, so the second tab can open partway down a list the user
never scrolled.

**31. Editable-looking fields that aren't.**
In RTMD inline edit mode, `BLE Firmware Override` and `WiFi Firmware Override` stay static among live
inputs, and `Custom Configuration` is permanently greyed with no explanation of what would enable it.

**32. A tooltip points at a control that isn't there.**
The `Default Configuration` tooltip says *click "View Region Config"*, but that link only renders when
the scope is already `Region Configuration`.

**33. `New Task` is a poor label** for a menu containing `Create Spare Part` and `Restock Spare Part` —
neither is a task, and the dropdown affordance isn't visible on the button.

**34. `Description` column carries no information.**
Empty on every row of `Previous Installations` inspected.

**35. Equipment Plot brush/mini-map is ~40px wide and unlabelled**, at the bottom-left of the chart area.

---

# Part II — findings from the remaining five modules

## P1 — safety and access risk (administration)

**36. `Delete Region` is a bare inline button on a list of 3007 rows**, at the same visual weight as
`View Details`. Regions own devices, facilities, users, subscriptions and the whole configuration tree.
No danger styling, no icon differentiation, no separator, no attached-object count to warn what's beneath.
Whether a confirmation exists is unverified — nobody clicked it. **Highest-risk control found.**

**37. `Reprocess equipment` sits right next to it** with no tooltip, no scope statement, no runtime or
reversibility hint. Anyone hunting for "refresh" will click it.

**38. Permissions can be granted at invite but appear unrevocable through the UI.**
`User Regions` / `Read Only Regions` / `Admin Regions` exist on `/users/invite` and are **absent from
`/users/:id/update`**. If that's the real state, there is no self-service way to remove someone's admin
access to a region in a production health system. Needs engineering confirmation; if a path exists it is
undiscoverable.

**39. `Impersonate` on every row of 1371 users** plus a global utility-bar button. Full session takeover
with no observed confirmation, no persistent "you are impersonating X" indicator accounted for, and no
audit field on the user record. `Last Login` is the only trace — and impersonation would corrupt it.

**40. No user lifecycle states.** `Active: Yes/No` is the whole model. An invited-but-never-activated user
is indistinguishable from an active one; `Date Joined` renders `--`. No pending-invite list, no resend, no
expiry signal. **No 2FA surface exists anywhere.**

**41. Changing `Parent Region` silently changes who may edit device configuration.** Blanking it promotes
a region to top-level and unlocks General Device Settings; nesting it demotes and locks them. Help text
says only "Leave blank to make this region a top level region."

**42. `Use My Location` on the facility *edit* form** will overwrite surveyed GPS coordinates with the
admin's office location on one stray click. No undo, no confirm.

**43. Test fixtures interleaved with production country programmes**, unmarked, in the region tree
everyone must scroll: `chris testing`, `ArthiSubscriptionTest`, `Aaviza CTX Testing`, `ColdTrace Demo`,
`all_gateways`, `BLE_Testing_*`, `0919_LA_devices`. A user assigning a technician or device can pick a
fixture with no warning.

## P1 — clinical-safety-adjacent

**44. The 45 alarm-threshold fields have zero tooltips** while the 14 device-plumbing fields have thorough
ones. The fields that decide whether a vaccine alarm fires are the undocumented ones. `Cold Duration` /
`Hot Duration` semantics are never stated.

**45. Inheritance state is a sentence, not a component.** `Default Configuration for a X` /
`Configuration inherited from Y` / `Custom Configuration set for Z` are three plain-text strings, with the
action set changing silently underneath (`Override` vs `View`+`Override` vs `Update`+`Remove`). No badge,
no colour, no chip. **You cannot scan the page and see which of the nine equipment types have been
customised** — you read nine sentences. In the region inspected 7 of 9 were on system defaults and 2 were
inherited: exactly the drift that should be visible at a glance.

**46. `Remove` on a custom region configuration has no stated blast radius.** It reverts every device in
the region and every inheriting child region to system defaults. Rendered inline as `UpdateRemove` with no
separator.

**47. `Override` offers no diff.** You can't see what you're diverging from, and nothing on the device page
tells you the parent value changed later.

**48. `Submit` next to a region selector on Bulk Configuration is dangerously ambiguous** — unclear what
it applies, to how many devices, and whether per-device success is reported.

**49. Transport charts are unreadable as a set.** Two coldboxes on the same trip render on
auto-rescaled y-axes (−28…12 vs 0…12), so a nurse comparing them compares different rulers. Threshold
values are never stated in text — only dashed lines to eyeball. Tooltip prints `Temperature: 9.6` with no
`°C`. No legend explains that green/red/blue markers mean in-range/hot/cold.

**50. `Door Open Duration` (10 mins) is configured but surfaces nowhere.** No door-open alarm appears in
any list, chart, KPI or alert vocabulary.

## P1 — workflow integrity

**51. Service requests have no timeline, no comments, no audit trail.** No record of who changed a status
or when, no channel between technician and facility contact, and no reason captured for a pause or
reassignment — even though `Jobs Paused` and `Jobs Reassigned` are admin KPIs. The counts are kept; the
narrative is thrown away. **Biggest structural gap in the incident workflow.**

**52. The SLA is decorative.** A `Medium` job was observed **48 days overdue, `Open`, unassigned** — and
nothing escalated. `Past Due` is a tab you must choose to visit. Overdue+unassigned is the single most
important state in an incident system and it has no push surface and no colour on the landing page.

**53. `Due Date` is set by the requester, not derived from priority.** A `High` and a `Low` job can carry
identical deadlines. If priority doesn't drive the deadline, priority is just a colour.

**54. The equipment hand-off is half-broken.** Equipment → request works; request → equipment works. But
**creating** a request about a specific asset from the web is impossible: `?equipment=` is ignored and the
form has no equipment field. The `Equipment` block on Job Details is populated by a path a web user
can't take.

**55. Assignment is blind.** You pick a technician from a flat list of names while the system holds
`Equipment Expertise`, `User Regions`, `Language`, live job counts and completion rates — in three other
screens. Surfacing even "3 open jobs · expertise: B Medical" beside each name would change every dispatch
decision. And an empty technician list renders as a normal empty dropdown with **no message and no link to
`Add a technician`** — the exact fix the user needs at that moment.

**56. Transport excursions have no notification path at all.** No recipients, no log, no acknowledgement.
Excursions surface only retrospectively as counts, plus a free-text survey.

**57. `Post Trip Survey` is the only excursion explanation and it's inert.** `Excursion reasons:` and
`Actions taken:` appear to come from a closed set (identical strings recur across unrelated trips), but
render as prose, aren't filterable, aren't counted, and aren't linked to the specific coldbox or the
excursion window on the chart. The richest causal data in the module does nothing.

**58. Training progress bug reported by real users six months ago, still live.** `My Learning ▸
Not Started` returns `No unstarted lessons found` while unstarted lessons are visible on Home.
**Three of the five most-liked community posts are the same complaint, four of five with zero replies.**
The Community tab is functioning as an unmonitored bug tracker.

## P2 — the empty-by-default trap (now seen in four modules)

**59. Region defaults hide the data.** `Tech Hub ▸ Service Requests`: chip pre-set, `No Requests found`,
all five KPIs `0`. `Training Admin`: `Filters` silently pre-set to a region, **1 row in the table while
the KPIs above read 5,307 / 2,355 / 165 / 2,787** — KPIs unfiltered, table filtered, nothing says so.
`/trips` inverts it: no region preselected and an ~8s `Loading…` with no skeleton, so it reads as broken.
A first-time user concludes the product is empty.

**60. A loading state is visually indistinguishable from a zero state.** Chrome and empty KPI cards
showing `0` render before the fetch resolves, so you read `Total Requests 0` and believe it.

**61. 3007 region nodes, fully expanded, no search, no pagination, no collapse.** Finding a region means
Ctrl-F. On a clinic connection this page is close to unusable — and it's the entry point for region config.
The Tech Hub region picker is worse: a ~5-row scrolling viewport over hundreds of hierarchical
sub-counties, tree indent rendered as a raw `»` glyph.

## P2 — Transport has no aggregate view

**62. 9,450 trips, zero KPIs, zero filters beyond region + free-text search, no sort, no date range, no
"trips with excursions" filter.** Answering "how many transport excursions last month?" means paging 378
pages of cards. Meanwhile `Transport (NVO)` and `Transport (User)` exist as scheduled Summary Report
types — the aggregate exists in email but not on screen.

**63. Driver and Manager render as raw personal email addresses** on cards and detail, frequently the same
address for both. No name, no avatar, no role chip. Personal Gmail addresses of health workers as the
primary human identifier in a production list.

**64. Google Maps embeds in trip cards swallow the mouse wheel** — with a 4-up grid of maps, roughly 70%
of the viewport is a scroll trap. The trip modal doesn't close on Escape. The card's only row action is an
unlabelled external-link glyph with no tooltip. The standalone trip page is ~590px wide in a 1568px
window with a third of the screen empty, no `<h1>` and no breadcrumb.

## P3 — vocabulary and consistency

**65. Two entity types share the `/users` table** — full accounts and contact-only records —
distinguished only by their action set (`View Contact` vs `View User`). Blank `Name` cells and
phone-numbers-as-`Username` compound it.

**66. `Facility Type` mixes a facility with four administrative tiers** (`Province`, `Division`,
`District`, `Tarluka/Thesil`), so "type" is really "hierarchy level" and the field name lies. Two
unreconciled hierarchies coexist: the Region tree and the Facility-Type tiers. `Tarluka/Thesil` is a
misspelling of Taluka/Tehsil and is India-specific vocabulary in a global product.

**67. `Occupation` conflicts with role names used elsewhere** — `Health Center Manager` here vs
`Head of Health Centre` in Training. American and British spelling mixed inside one product.

**68. Training uses three words for one model** — KPIs say **Courses** (`Total Assigned Courses`), tabs
and buttons say **Lessons** (`All Lessons`, `Assign Lesson`), and `Course Name` + `Lesson Title` are
separate columns. Plus `Assign Date` vs `Assigned Date`, `Assigned By` vs `Assigner`.

**69. `Unknown` is a user-facing option** in `Job Status`, `Issue Priority` and the equipment alarm-config
type list. A database null promoted to product vocabulary. Label it `Not set` or backfill.

**70. Four names for one action** — `Enter Service Request` / `+ Create Service Request` /
`create-request` / `Create Request`. And four vocabularies for "no value" on one screen: `Unavailable`,
`Unknown`, `--`, `No X available`.

**71. Live typos shipped:** `Check our our training modules` (two places) · tab `Top Delinquence` ·
content title `Overview, Use and Data Intepretation` · `Default Configuration for a Unknown` / `for a
Ambient` / `for a Ultra Cold Chain` · `Tarluka/Thesil` · lowercase "coldtrace" in invite copy ·
breadcrumbs `Daily/Weekly/Monthly Vizualization` · `heirarchies` in an Overview tooltip.

**72. Unexplained jargon in headers:** `SR Completion Rate`, `Points Earned`,
`Technicians with > 90%` (of what?), `IMEI4 + Sensor`.

**73. Button casing splits within a module** — sentence case on Job Details (`Edit Job`), ALL CAPS on both
Tech Hub forms (`CANCEL` / `SAVE` / `INVITE USER`).

**74. `/accounts/profile` silently redirects to `/home`** — a broken documented route whose children
(`/accounts/profile/subscriptions/*`) still work.

**75. `Timezone` exposes the raw IANA database** (`W-SU`, `Zulu`, `Universal`, `US/Indiana-Starke`) to
health-programme staff, paired on the region form with a cascade checkbox whose reach (up to 7 levels
down) is unstated.

**76. The `Columns` chooser on Facilities offers only `Latitude` / `Longitude`** — a full
column-management affordance for two fields, while genuinely useful columns aren't optional.

**77. The Nexleaf AI / `Ask AI` launcher overlays every admin screen** including the destructive Regions
list, and intercepts bottom-right clicks near pagination.

**78. The "up to 5 RTMD alarm contacts" cap is prose with no counter** — no `3 of 5`, no disabled-add
state, no stated behaviour at the cap.

**79. Training's learner side ignores the localisation model its admin side enforces** — English and
Kinyarwanda cards mixed in one grid with no language indicator on the card and no language preference.

**80. No certificates** for 2,787 completed courses. Either out of scope or a notable gap.

**81. Videos have no completion event** — no "Mark complete", no next/previous lesson navigation.

**82. `Popular Trainings` and `Recently Viewed` re-render on every training route**, including inside
`My Learning` tabs where they compete with the tab's own (often empty) content.

**83. Tech Hub `Filters` is a small right-anchored popover (~170px)**, not the canonical full-height right
drawer — and the service-request list has **no `Download`** while the technician leaderboard does.

**84. The Tech Hub landing is a click tax** — four links that all exist in the sidebar, on a screen
showing no information. It could be the module's real dashboard: overdue count, unassigned count,
my-region queue.
