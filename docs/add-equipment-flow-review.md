# Add Equipment Flow — review

Reviewed 2026-08-24 against `localhost:5180/add-equipment-flow/`, source read from the Vite dev
server. Nothing was changed. For Raf and Ednah (PM).

**What it is:** third-party / RTMD equipment onboarding, offered as **three competing prototypes**
of the same journey. The job on the table is choosing one — the differences are structural, not
cosmetic.

---

## 1. The three prototypes, and what actually separates them

| | **A** (`states.jsx`) | **B** (`statesB.jsx`) | **C** (`statesC.jsx`) |
|---|---|---|---|
| States | 34 | 29 | 31 |
| Step order | device **first**, facility later | **facility first**, then device | facility → **equipment details** → device |
| Third-party devices | **live integration** — pick provider, enter Device ID + access code, connect | **manual identification only** | manual identification only |
| Sensor assignment | one screen | one screen | **split by device type** — CT5 (A–D) vs CTX (pre-fed serials) |
| User-facing steps | unnumbered | 5 | 6 internally, **4 in the stepper** (Facility & Contacts · Equipment Details · RTMD & Sensor · Review & Submit) |

**A is a different product decision, not a different layout.** It assumes ColdTrace holds
integrations with third-party providers (Berlinger Fridge-tag/Q-tag, built-in Haier loggers) and
can authenticate to them: `provider-supported`, `connect`, `connected`, `connect-failed`,
`connect-unavailable`, `register`. Its copy commits to real behaviour — *"Once connected, readings
sync on the provider's schedule and manual recording is switched off for this equipment."*

B and C drop that entirely and just record the device's identity.

**This is the decision to make first**, because it's an engineering commitment, not a design
preference. Nothing in the current platform suggests these integrations exist — the audited product
has no provider-integration surface anywhere. If they're not on the roadmap, A's whole middle
section is fiction and B/C are the real candidates.

**Between B and C:** C moves equipment details *before* device selection and splits sensor
assignment by hardware type. That second point matches how the hardware actually differs — CT5
exposes sensors as A–D, CTX uses pre-registered sensor serials — so C encodes a real domain
distinction that B papers over. On that basis **C is the stronger of the two**.

---

## 2. Domain correctness — one clear contradiction

**Alarm-contact limit is wrong.** The flow says, in two places:

> "A facility can have up to **10** RTMD alarm contacts."
> "Contact limit reached — This facility has the maximum of **10** alarm contacts."

The live platform says **5**:

> "A facility can have up to 5 RTMD alarm contacts." — facility contacts panel, `/facility/:id`

Either the prototype is wrong, or the limit is being raised as part of this work. It needs an
explicit decision, because the `rtmd-contacts-limit` state is built around the number and the copy
is hard-coded.

**Things the flow gets right** (worth saying, because they're easy to get wrong):

- Alarm thresholds are correctly described as **administrator-managed and WHO-derived**, not set
  during installation — matches the real config model (system default → region → device override).
- Region is **derived from the facility**, not entered — matches the platform.
- Equipment type is **detected from the make/model (PQS)** rather than asked for.
- Location capture on RTMD configure is **optional and explicitly non-blocking** — a deliberate
  improvement on the live product, where maintenance reporting is hard-gated behind a geolocation
  grant.

---

## 3. Design-system compliance

Audited at source level, not by eye.

**Good — better than the last two things I reviewed:**

- **21+ real DS components** imported from the Design System repo: `Page`, `Card`, `Btn`, `Banner`,
  `Badge`, `Tag`, `Modal`, `Cell`, `Divider`, `Checkbox`, `RadioButton`/`RadioGroup`, `TextInput`,
  `NumberInput`, `TextareaInput`, `SelectInput`, `SearchSelect`, `SearchSelectMulti`, `Upload`,
  `Stepper`, `DateField`, `Toast`, `OptionCard`, `CardSectionTitle`, `Illustration`,
  `ScanQrCodeBody`, `AppShell`, `PolarisIcon`.
- **Zero hardcoded colours.** Every colour is a token (`TEXT_SUBDUED`, `BG_INFO`, `COLOR_PRIMARY`…).
  One `#303030` in the state files, and that's the icon colour passed to a DS icon.
- 164 component instances vs 109 intrinsic elements in the main file, and the intrinsics are almost
  all layout `div`/`span`/`p` — which is allowed.

**One real violation: hand-drawn icons.**

Eleven locally-defined SVG icon components — `IcoSearch`, `IcoQr`, `IcoThermometer`, `IcoDevice`,
`IcoCloud`, `IcoLocation`, `IcoCamera`, `IcoCheckCircle`, `IcoClipboard`, `IcoUser`, plus
`QrPreview` — and **zero uses of `PolarisIconImg` / `POLARIS_ICON_DATA`** in the flow file.

This is the rule that already produced one correction (the hand-drawn caret that rendered yellow).
Fix: map each to its Polaris equivalent (`SearchIcon`, `QrCodeIcon`, `ThermometerIcon`,
`MobileIcon`, `CloudIcon`, `LocationIcon`, `CameraIcon`, `CheckCircleIcon`, `ClipboardIcon`,
`PersonIcon`), and where no Polaris icon exists, add the SVG to `POLARIS_ICON_DATA` and comment on
**PD-16** rather than keeping a local one.

Local composition wrappers — `StepFrame`, `ScanScreen`, `ResultPanel`, `FormSection`, `ReviewRows`,
`ReviewSection`, `CircleMedia` — are fine. They compose DS parts rather than replacing them.

---

## 4. State coverage — genuinely strong

This is the most complete state set I've seen in these prototypes. Present and well-written:

| Category | States |
|---|---|
| Entry variants | `full-serial-search`, `full-qr-scan`, `full-equipment-management`, `entry-serial`, `entry-qr` |
| Not-found / unassigned | `no-equipment-found`, `unassigned-qr` |
| Validation errors | `serial-exists`, `qr-assigned`, `missing-details` |
| Limits | `rtmd-contacts-limit` |
| Failure (A only) | `connect-failed`, `connect-unavailable` |
| Destructive confirm | `cancel` — "Discard this equipment?" |
| Success variants | `success`, `success-rtmd`, `success-thirdparty` |

The error copy is specific and recovery-oriented rather than generic — e.g.
*"An equipment record with this serial number already exists. Search for it in Manual Temperature
Recording instead of creating a duplicate."* and *"Nothing you've entered will be lost."*
Three distinct success states with different next-actions is the right call.

**Gaps:**

1. **No loading state anywhere.** Serial search, QR check, RTMD lookup and submit all hit a server.
   With ColdTrace's real latency — the live `Quick Actions` panel spins 20+ seconds — a wizard with
   no pending state will read as broken.
2. **No offline state.** These are field devices in health facilities with unreliable connectivity.
   The flow has no answer for "you're offline mid-wizard".
3. **No submit-failure state.** There's `connect-failed` in A, but nothing for "creating the
   equipment record failed" after Review & Submit. That's the most expensive possible failure —
   the user has filled six screens.
4. **No permission-denied state for location.** Configure asks for location access; there's no
   state for the user declining, even though it's described as optional.
5. **Success has no "what if the device never reports" path.** `success-rtmd` says readings upload
   automatically — no guidance if they don't.

---

## 5. Layout and shell

**The wizard steps drop the app shell.** `scan` renders inside `AppShell` — side nav, breadcrumb,
Ask AI, region, avatar. But `facility`, `rtmd-details`, `rtmd-configure` and the rest render as a
bare full-page form with no nav and no breadcrumb.

That may be deliberate — a focused task mode is a legitimate pattern. But it's currently
*undeclared*: there's no visible framing that says "you have left the app to complete a task", no
persistent exit affordance beyond `Cancel`, and the transition happens silently between step 0 and
step 1. Worth an explicit decision either way.

**Content column is narrow and left-aligned** on the wizard steps — form fields sit at ~570–595px
against a left edge, while the stepper spans the full width. On the `scan` screen the content is
centred instead. So alignment changes between states of the same flow. At 1440 this is less
pronounced than on an ultrawide, but the inconsistency is structural, not just a big-monitor
artefact.

*(Checked and dismissed: the stepper shows 4 steps while the internal state labels count to 6.
That's not a defect — the labels are the prototype's own state index, and the four user-facing
steps group them correctly.)*

---

## 6. What I'd put to Ednah

1. **Do the third-party integrations in prototype A exist, or are they planned?** This decides
   whether A is viable at all. Nothing in the current platform supports them.
2. **Is the alarm-contact limit changing from 5 to 10?** The prototype assumes 10; the product
   enforces 5.
3. **Is the wizard meant to leave the app shell?** Deliberate focus mode, or an oversight.
4. **Which prototype are we building?** My read: **C**, on the grounds that it front-loads the
   facility, keeps the equipment record independent of the device, and splits sensor assignment by
   CT5 vs CTX to match the hardware.

## 7. What I'd do next, on your say-so

- Replace the 11 hand-drawn icons with Polaris equivalents; log any genuine gaps on PD-16.
- Add the five missing states — loading, offline, submit-failure, location-denied, device-never-reports.
- Resolve the contact-limit number.
- Settle the shell question and make alignment consistent across states.
- Then mirror the chosen prototype into Figma with annotations, and open a Jira ticket under the
  right epic.

**Nothing has been changed and nothing has been filed.**
