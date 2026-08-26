# Prompt for the prototype / deploy Claude Code session

Copy everything below the line into that session.

---

Work in `~/Documents/3rd Party Equipment flow` (the Add Equipment prototype, Jira **PD-23**).

**Settled decisions — Figma is the source of truth. Do not "correct" these.**

1. **A facility can hold a maximum of 10 alarm contacts.** `MAX_ALARM_CONTACTS = 10` in
   `src/AddEquipmentFlow.jsx` is correct and stays. The live ColdTrace platform currently enforces
   5 — that is a known divergence, it is deliberate, and the design is ahead of the platform. Do not
   change 10 to 5 anywhere, including banner copy.
2. **The added-contacts list pages at 5 rows**, on every viewport. `CONTACTS_PER_PAGE = 5`. Ten
   stacked rows push the wizard footer off-screen on mobile, so desktop and mobile use the same page
   size rather than disagreeing.
3. **The "Add alarm contacts" field is never hidden**, including at and over the cap. Only the helper
   row below it swaps from "Search and select contacts, or Create a new contact" to the
   **Contact limit reached** info banner.
4. **The field summarises the selection as chips** (`SearchSelectMulti` with `tagsInside`): the first
   contact as a removable `Tag` labelled `` `${name} · ${phone}` `` clamped to 50% of the row, then a
   **non-removable** `+ N others`, then the clear-all ✕. This already works — don't rebuild it.

**What changed in the working copy and needs verifying**

`src/AddEquipmentFlow.jsx` was edited but **never run**. Added:

- `CONTACTS_PER_PAGE = 5` next to `MAX_ALARM_CONTACTS`
- `const [contactPage, setContactPage] = useState(0)`
- a clamped page index (`Math.min(contactPage, contactPageCount - 1)`) so removing contacts can't
  strand you on an empty page
- the DS `Pagination` component in `type="table"` mode with a `Showing X–Y of N` label, rendered
  only when `added.length > CONTACTS_PER_PAGE`
- `import { Pagination } from '@ds/components/Pagination/Pagination.jsx'`

**Please do:**

1. `npm run dev`, then open
   `localhost:5180/add-equipment-flow/?proto=c&state=facility`
2. Add contacts one at a time up to 10 and confirm, at desktop width and under 920px:
   - the chips in the field track the selection, first in full then `+ N others`
   - the pager appears at 6 contacts, never before
   - `Showing 1–5 of N` is correct on both pages
   - removing contacts from the last page doesn't leave you on an empty page
   - at 10, the **Contact limit reached** banner shows and the field is still visible and usable
3. Also verify two earlier changes that were never run in a browser:
   - the breadcrumb reads **Home › Coldchain Equipment › Add Equipment** on every step
   - the compact `Stepper` under ~920px shows **the full run of numbered circles** plus a
     "Step X of Y · Label" line — *not* a single circle
4. Report anything that looks wrong rather than fixing it silently — the Figma board is built to
   match this and both sides have to move together.

**Housekeeping**

- `~/Documents/3rd Party Equipment flow` is **not a git repo**. Today's changes exist on disk with no
  history. Please `git init`, commit as
  `proto(add-equipment): contacts list pages at 5, cap stays 10 [PD-23]`, and set up a remote.
- `~/Documents/Design System` has **6 unpushed commits**. Please `git push`.
- Do not deploy to design.nexleaf.org without Raf's explicit go-ahead.
