# Annotations for Figma section: L · CREATE LAB — mirrors create facility (PD-41) (10026:17354)

Placement map below: each block is paste-ready onto a sticky beside the frame it names. Category tags are `[LOGIC]` `[DEV]` `[INT]` `[CONTENT]` `[A11Y]` `[VISUAL]` `[METRICS]` `[OPEN]`.

Source of truth for this audit: the Sep 9 2026 Lab Equipment Design meeting (Raphael, Ednah Kiome, Innocent Kithinji), `PRD.md`, the ratified `coldtrace-product-context`, `docs/coldtrace-domain.md` (the live product documented field by field), and the live form at dev-moenga.coldtrace.org/facility/new.

## ROW 1 — STEP 1 AND ITS LISTS

### L1 · Step 1 · Identification & location (10026:17355)
**[LOGIC] Region field.** A lab IS a facility. The hierarchy is Kenya Lab (global group, never selectable) then NPHL as region, then labs as facilities, with region always derived from facility. There is no host-hospital entity in V1, so the region is asked directly here rather than inherited from a parent. Ednah's "most labs are hosted within a hospital" is a fact about the world, not a field.

**[CONTENT] Only two fields are required.** Region and lab name, which are the facility form's own two required fields renamed. Everything else on this step is optional, exactly as the facility form has it, so a lab can be created from very little and completed later.

### L1b · Region — list open (10053:19048)
**[INT] Six regions.** NPHL sits first because it is the national reference lab and its own regional labs are created against it. The chosen region is marked in the list, not only shown in the field.

### L1c · Facility type — list open (10053:19456)
**[LOGIC] This field is a hierarchy level, not a kind of lab.** The values are Facility, Province, Division, District and Tarluka/Thesil, which are administrative tiers carried over from the facility form. A lab record takes Facility. It does not answer "what kind of lab is this" and must not be labelled as though it does.

### L1d · Status — list open (10053:19795)
**[LOGIC] Status here is ownership, not operational state.** Public, NGO or Private. It is not Active/Inactive and never indicates whether the lab is working.

### L12 · Cancel — discard confirm (10080:20736)
**[INT] Cancel confirms before discarding.** Nothing has been created, so there is nothing to undo, but everything typed across six steps is lost. Discard is the critical action and Keep editing is the safe default.

## ROW 2 — STEP 1 VARIANTS AND STEPS 2 TO 3

### L2 · Step 1 · NPHL regional lab (10039:17591)
**[LOGIC] Same form, different region.** Ednah called NPHL's own regional labs out as a distinct case, and the region is all that distinguishes them. There is no "not mapped to a facility" state: under this model a lab is itself a facility.

### L3 · Step 1 · Validation errors (10039:17877)
**[CONTENT] Errors are per field, not one summary.** Region and lab name each carry their own inline message, and no field is pre-filled, because nothing has been entered yet.

### L4 · Step 2 · Supply chain & logistics (10040:18073)
**[CONTENT] Carried over verbatim, vaccine names included.** Ednah called this section "still okay", and the PRD lists terminology neutralisation as out of scope for V1, so Vaccine Supply Point and Mode of Vaccine Supply keep their names and the live form's helper text.

### L4b · Supply levels — list open (10053:20511)
**[LOGIC] These are the platform's own codes.** Primary (PR), Sub-National 1 (SN1), Sub-National 2 (SN2), Lowest Distribution (LD), Service Points (SP). Not invented labels and not a free list.

### L5 · Step 3 · Lab inventory (10041:18437)
**[LOGIC] Vaccine services out, inventory in.** This is the one section Ednah replaced: "they don't do vaccine, so we can remove this and just link them to creating the inventory for that lab here." The section keeps the facility form's shape, a header with sub-grouped bands, and the vaccine-service group becomes how this lab's equipment gets added. Passive cold chain equipment stays, because labs do hold cold boxes.

## ROW 3 — STEPS 3 TO 6

### L5b · Inventory method — list open (10053:20839)
**[DEV] Both destinations already exist in this module.** Add one by one routes to the single add form, import routes to bulk import. This choice only decides where the user lands after saving; it creates nothing.

### L6 · Step 4 · Transport & waste management (10041:18769)
**[CONTENT] Kept deliberately, not by accident.** Ednah: "for consistency, we would rather do it instead of eliminating it. And it's relevant." Identical to the facility form, including the Functional units helper on every count.

### L7 · Step 5 · Lab staff (10040:18433)
**[CONTENT] The platform's own occupation vocabulary.** The Occupation taxonomy is Biomedical Engineer, Biomedical Technician, Cold Chain Technician, EPI Supervisor, Health Center Manager, Nurse, Partner, Vaccine Handler. There is no Lab Technologist in it, so these labels stay as the facility form has them. Stacked rather than side by side because the second label wraps and would push its own input out of line.

### L8 · Step 6 · Review & submit (10042:18823)
**[LOGIC] Step 6 does not exist in the facility form.** It was added deliberately: the facility form saves straight off section 5, but a lab is thirty-odd fields across five sections, so nothing is written without a last read-through. Every section is editable from here and nothing is created until Save Lab.

### L10 · Step 6 · Saving — in progress (10080:20280)
**[INT] Both footer actions are disabled while the request is in flight**, so the form cannot be edited or double-submitted mid-save.

## ROW 4 — FAILURE AND SUCCESS

### L11 · Step 6 · Save failed (10080:20517)
**[LOGIC] Nothing was created and nothing was partially saved.** The banner says so explicitly and carries the retry, so the way forward is in the message rather than back in the footer.

### L9 · Lab created (10042:19072)
**[LOGIC] A new lab starts empty.** The lab exists and has no equipment, so the primary action is Add lab equipment rather than Done. A register with no records is the one thing this flow must not leave behind quietly.

## SECTION-WIDE ANNOTATIONS

**[LOGIC] Everything on these frames traces to a ratified source.** Every option list is the live facility form's own, read off dev-moenga.coldtrace.org/facility/new. Status is ownership. Supply levels are platform codes. Facility type is a hierarchy tier. None of these were inferred.

**[CONTENT] Only two field names change from the facility form: Facility name becomes Lab name and Facility code becomes Lab code.** Those are the two Ednah named. Terminology neutralisation is out of scope for V1, so nothing else is reworded.

**[VISUAL] Six steps, not five.** Review and Submit is additional to the facility form's five sections.

**[DEV] URL pattern: /facility becomes /facility/lab.**

## QA FLAGS: fix in frames before handoff

**All flags below were found and fixed during this audit. None are outstanding.**

1. **[LOGIC] "Lab type" labelled a field whose values are administrative tiers.** Was "Lab type" with values Facility / Province / Division / District / Tarluka/Thesil; now "Facility type". The old label told the reader the field answers "what kind of lab is this", which those values do not answer. `coldtrace-domain.md`: "Facility Type mixes an actual facility with four administrative tiers, so type is really hierarchy level." Fixed on 7 frames plus the L1c frame name, which had itself contradicted the label by naming "the facility form's own list".
2. **[CONTENT] L10 and L11 kept L8's subtitle after being cloned from it.** Both read "Check the lab reads correctly, then save" — stale on L10, where the save is already in flight and both buttons are disabled, and competing with the retry on L11. Now "Saving the lab. Nothing is created until this completes." and "Every section can still be edited from here."
3. **[CONTENT] L3 rendered the design-system placeholder "Error message" twice.** The validation frame was failing in exactly the way it exists to demonstrate. Both fields now carry real copy.
4. **[LOGIC] L3's region error had been silently reverted to rest state** by a later correction pass, so only one of two required fields was flagged. Restored.
5. **[CONTENT] L3 printed each error twice**, once inline and once as help text. Help is now off on the errored fields; the inline error owns the message.
6. **[INT] Six frames offered "Cancel" on steps after the first.** Only step 1 can cancel; L4, L4b, L5, L5b, L6 and L7 now read "Previous".
7. **[VISUAL] L4b's open list covered its own field**, 55px too high after a reflow. All five lists re-anchored to sit below their field.
8. **[VISUAL] The GPS label and the L5 sub-heads carried section rules** they should not, being field labels and sub-group titles rather than sections. De-ruled on 6 and 4 nodes.
9. **[VISUAL] 13 primary CTAs used a raw hex.** Now bound to `Color/bg/fill/fill-emphasis`, per the standing rule that the library Button's dark default is the outlier and the token is the answer.
10. **[CONTENT] The UI explained the design to the user.** The Region helper described the data model and the inventory banner opened "A lab has no vaccine services". The live form has no Region helper at all; the model explanation now lives in these annotations, and the banner leads with what the user does next.
11. **[CONTENT] L11's banner action rendered the literal "Label".** Now "Try again".

## MISSING FRAMES / STATES

None outstanding. Mirror-rule parity is exact: **12 prototype states, 17 frames, every state has at least one frame and every frame carries a valid state id.**

Three states were missing at the start of this audit and were added to both sides:

- `lab-submitting` (L10) — saving a lab is a server write that had no in-flight feedback
- `lab-submit-failed` (L11) — and no failure path
- `lab-cancel-confirm` (L12) — Cancel discarded six steps of entry with no confirmation

All three copy the cold-room install flow's existing pattern rather than introducing a second one.

States deliberately not drawn, with the reason:

| State | Why not |
|---|---|
| loading | Static form, no fetch |
| offline | Desk work (D7 web-only); the cold-room flow draws offline because installers walk to the cold store |
| permission | The create CTA is absent below Admin scope, so a blocked user never reaches this form |

## OPEN QUESTIONS

1. **[OPEN] Facility-versus-lab wording on fields Ednah did not name.** She explicitly renamed two: Facility name to Lab name, Facility code to Lab code. Three labels currently say "lab" where the live form says "facility" — "Enter lab (GPS) coordinates", the "Lab staff" section head, and the "Lab Staff" step label. Her "everything is the same where there's a facility put a slash lab" was said about the URL pattern and can be read either way. Left as built; one line from her settles it. This is cosmetic and does not affect the data model.

2. **[OPEN] `TextareaInput` has no Figma component** (Poltail-only per `FIGMA-MAP.md`), so L6's Waste disposal notes is drawn as a Text field. The single-add section makes the same substitution, so the board is at least consistent. DS ticket, not a frame fix.
