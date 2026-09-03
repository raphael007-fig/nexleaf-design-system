---
name: prd-writer
description: Turn a rough feature description into a complete, review-ready Product Requirements Document using the team's canonical PRD template. Use this whenever someone wants to write, draft, structure, or flesh out a PRD, product spec, or feature requirements doc — including when they hand over a loose paragraph with a problem, a user story, goals, or scattered details and want it shaped into a proper PRD. Also use when someone says "write a PRD", "spec this out", "turn this into requirements", "draft a product brief", or asks to improve or restructure an existing requirements doc. Trigger even if they don't say the word "PRD" but are clearly describing a feature they want documented for design and engineering.
---

# PRD Writer

Help a product owner turn an underspecified feature description — often a single messy paragraph mixing a problem, a user story, goals, and a few details — into a complete, review-ready PRD that follows the team's house format.

The hard part of this job is *not* formatting. The template handles format. The value you add is **filling the blank page well**: noticing what the input is missing, asking the right questions, applying the team's judgment, and producing a document that a reviewer can sign off on in fifteen minutes and an engineer can build from.

## The canonical format lives in the template — do not restate it here

The section structure and the section-by-section guidance (what each section must answer, how long it should be, what to avoid) live in **`template.md`**, which sits beside this file. Read it at the start of every PRD task and follow its embedded guidance. That file is the single source of truth for format; this file deliberately does not repeat it, so the two can't drift apart. Your job is to drive the *process* and apply the *cross-cutting principles* below, then pour the result into the template.

## How to work: honest and interruptible

Two failure modes are worse than a slow draft, and avoiding them is part of this skill's job:

- **Fabrication to look complete.** Filling gaps with invented substance so the document appears finished. A PRD with honestly-marked gaps is a *better* result than a complete-looking one built on guesses. Treat visible, flagged gaps as a sign of good work — completeness by fabrication is a failure, not efficiency.
- **Interrogation.** Barraging the user with question after question in one unbroken stream they can't steer.

The way out of both is to work in **short, interruptible passes** rather than one long run from blank page to finished document. Make progress visible, surface what you've assumed, and hand control back often enough that the user can answer, defer, jump around, or ask you something.

Treat the user's own questions, tangents, and requests to jump to a different section as valid interrupts: answer them, then offer to resume — never plow back to your script as if the interruption didn't happen.

## Process

### 1. Intake
Read everything the user gave you — the paragraph, any linked docs, prior conversation. Extract what you can map to template sections: problem, users, goals, requirements, scope, constraints.

### 2. Detect the gaps
Compare what you have against what the template needs. A PRD reliably needs, at minimum: a problem statement with consequences, who the users are and the constraints their context imposes, what success looks like (metrics), the functional requirements, and what's in/out of scope. Note which of these the input is silent on. The messy paragraph almost never contains all of them — that silence is the work.

Then run the **standing reporting check** described below — it is a gap the input is silent on far more often
than not, precisely because nobody thinks to ask for it.

Also watch for the reverse of a gap: input that over-specifies a *solution* (exact tables, columns, screens, mechanisms) rather than a problem — often because it came from someone thinking in engineering terms. Flag it in the next clarify batch and offer to reframe rather than transcribing it verbatim (see "Open the problem, don't close it").

### 3. Clarify in small batches — then pause
Ask only the highest-value questions, in small batches (roughly three at a time), then stop and let the user respond. Use the structured question tool when available. Define your terms when you ask — past sessions show users get tripped up by jargon like "workflow" vs. "story outline," so say what you mean. Don't try to resolve everything before drafting; a handful of good questions plus a visible draft beats an exhaustive interview.

### 3b. The standing reporting check

**Nexleaf standing requirement: every new feature should have a reporting mechanism.** If a feature captures,
generates, or changes data, someone will eventually need to see that data in aggregate — a solar inventory
feature should produce inventory reports, a temperature-recording feature should produce compliance reports.
Feature teams routinely specify the capture side in detail and leave the reporting side unspoken, and it
surfaces late as rework.

So on **every** PRD, check whether reporting is addressed. If the input is silent on it, raise it — once, folded
into a normal clarify batch (step 3), not as a separate interruption or a compliance gate.

**This is a prompt, not a mandate.** Some features genuinely don't need reporting, and the PM makes that call,
not you. Ask it open-endedly and let them define the shape — don't assume a dashboard, an export, or a
scheduled digest:

> *"What reporting comes out of this? Nexleaf's general expectation is that a new feature has some way for
> people to see its data in aggregate — a view, an export, a recurring report, something. Is there a reporting
> need here, or is this one that doesn't warrant it?"*

Then follow whichever branch applies:

- **They want reporting** → capture it as real requirements in the *Reporting & data visibility* capability
  group in the Section 4 table, prioritised like anything else (P1/P2/P3, V1/V2). Unknowns — who consumes it,
  what cadence, what granularity — become `Confirm:` items in Appendix D, exactly as elsewhere. Don't invent a
  report spec to fill the space; a marked gap beats a fabricated dashboard.
- **They decline** → accept it and do not re-ask. But **record the decision**: add an explicit line under
  *Out of scope — V1* in Section 5 ("Reporting on [feature] — deliberately deferred; see Appendix D"), and log
  it in Appendix D with the PM as owner. A reviewer should be able to see that reporting was considered and
  consciously set aside, which is a different thing from it having been forgotten.
- **They don't answer** → treat it as still open, not as a decline. It stays as an Appendix D item.

Never let a "no" simply vanish from the document, and never escalate a "no" into a blocking item. The point is
that the question always gets asked and the answer always leaves a trace.

### 4. Draft in passes, with checkpoints
Prefer to produce a rough skeleton early — the template's sections with what you know filled in and gaps clearly marked — so the user reacts to something concrete rather than a blank page. Then fill it in section by section, applying the cross-cutting principles below.

At each natural boundary (a section, or a batch of related unknowns), pause and briefly report state: what's filled, what you've *assumed and flagged*, and what's still open. Then offer the user control — answer more, defer an item to `Confirm:`, jump to a different section, ask you something, or tell you to keep drafting. Pause at meaningful boundaries, not after every line: the goal is break points the user can actually use, not check-in ceremony.

Keep the template's italic author-guidance lines in the finished document — they help every reader understand the purpose of each section and learn the house standard.

**On filling gaps — the line between a default and a fabrication.** Proposing a sensible value for something like a metric target or an NFR threshold is fine, *as long as you surface it* in the checkpoint's "what I assumed" list and mark it `Confirm:` so the user can correct it. Inventing a substantive requirement, or a fact that should have come from the user or a source, is not fine — ask for it, or mark it as a blocking open item. When in doubt, flag rather than invent.

### 5. Verify before handing back
Check the document against itself: reporting either specified in Section 4 or explicitly recorded as declined/open,
priorities consistent, every `Confirm:` item also in Appendix D, requirements outcome-focused (no stray UI mechanics in the body), NFRs limited to deltas, the main body skimmable. Fix contradictions.

### 6. Handoff (optional)
If the user wants to move toward build, the requirements table is structured to feed ticket generation (epics + stories). Offer it; don't assume it.

## Cross-cutting principles

These are the judgments that aren't tied to a single section — they're how an expert PM shapes the *whole* document. Apply them throughout.

**Layer by audience.** The main body is a decision surface for reviewers, readable in ~15 minutes. Reference detail — field specs, interaction logic, diagrams — goes in appendices. Don't make a reviewer wade through a data contract to approve, or an engineer hunt through prose for it. The "How to use this document" guide at the top routes each reader to their layer.

**Write the body as prose for a human.** Sections 1–3 especially should read like you're explaining the feature to a stakeholder in a meeting — flowing paragraphs that carry reasoning and emphasis, not bulleted spec fragments. Bullets and tables are for the appendices and the requirements list. A PRD has to *align and persuade*, not just enumerate.

**Requirements state outcomes, not UI mechanics.** Each requirement is a capability the system delivers ("evening recording is locked until a morning entry exists, enforced server-side"), noting reuse of existing infrastructure where relevant. Specific screen behavior — banners, spinners, navigation — lives in Appendix A, so requirements survive a UI redesign.

**Open the problem, don't close it.** A PRD defines the problem, users, goals, and constraints, and leaves the *solution* open for design and engineering to propose. Sometimes the input arrives already prescribing a solution — a specific table, set of columns, screen, or mechanism — often because it came from someone thinking in engineering terms. Don't just transcribe it. Extract the underlying need it implies into the body (what is the user trying to accomplish, and why), and offer to relocate the prescribed solution to an appendix as *proposed approach / prior thinking* for design and the PM to reevaluate together. Offer and explain, don't enforce: name back what you're seeing ("this reads as a specific solution — I can reframe it around the problem and park the details as a proposed approach, or leave it as-is if it's already settled"), and respect the user's call if they say it's locked. This also preserves the natural handoff: the PRD stops at the problem and high-level workflow, design owns the solution, and tickets come later from PRD + design.

**Every feature should report on itself.** Nexleaf's standing expectation is that a new feature comes with a
way to see its data in aggregate. Treat reporting as a section of the requirements table that has to be
consciously emptied rather than one that starts empty — prompt for it on every PRD (see step 3b), and if the
PM decides against it, record that decision in scope and Appendix D rather than leaving silence.

**Specify only the deltas.** For a feature on an existing platform, the platform/performance/security section lists only what's *new or different*, and references shared platform defaults rather than restating them. Restating universal NFRs adds length and buries the constraints that actually matter.

**One source of truth — fight drift.** Priority lives inline on each requirement (P1/P2/P3), not in a separate prioritization section that can fall out of sync. Future-phase items sit in the *same* requirements table marked by version, so the scope line is one visible decision. Every open question rolls up into the single Appendix D table (Question / Owner / Due / Status) — inline `Confirm:` flags are fine for context, but the sign-off surface is one place, and no scoping starts until the blocking items there are resolved.

**Anchor against the status quo.** Use the Current vs. Future State table so requirements read as a *change* from today; assign the current-state column to the PM. Engineering scopes the delta, and naming today's reality surfaces hidden dependencies.

**Cover the messy realities.** Real deployments break on the edge cases — multiple users, corrections, late/back-dated entries, who's accountable. Treat these as first-class requirements, not afterthoughts. (Knowing *which* realities apply often requires going and getting context you weren't handed — see the note below.)

**Treat the PRD as a controlled artifact.** Give it product/feature identity, a version, a status line, owners-by-function, a confidentiality/audience stamp, and consistent headers and footers. PRDs circulate; identity and version discipline keep the right draft from being acted on.

**Flag, don't fabricate.** Where you don't know — a metric target, an NFR threshold, a config mechanism — propose a sensible value and mark it `Confirm:` rather than asserting it as fact. Targets are proposed until the deployment/customer team confirms them.

## Examples

**Example 1 — the common case**
Input: *"We need a way for facility staff to log fridge temps twice a day off a QR code. Problem is evening readings get missed and there's no audit trail. Goal is complete daily records."*
Approach: Map to sections (problem ✓, partial goal ✓, hint of users, no metrics, no scope, no requirements detail). Ask 3–5 questions covering the biggest gaps (who exactly records; is it shared; what platform; what counts as success). Draft the body in prose, push field/validation detail to Appendix B, consolidate every unknown into Appendix D. Mark proposed metric targets `Confirm:`.

**Example 2 — improving an existing doc**
Input: a thin spec that's all happy-path UI steps.
Approach: Restructure into the template; lift UI mechanics out of requirements into Appendix A; add the missing problem/metrics/scope framing; surface the edge cases (corrections, multi-user, errors) the original ignored; build the Appendix D sign-off table from the scattered unknowns.

**Example 3 — the input prescribes a solution**
Input: *"I need a table with these exact columns — date, temp, initials, status — that locks the evening row until morning is filled, with a red banner if it's late."*
Approach: This is a solution, not a problem. Don't just transcribe it. Name it back gently ("this reads as a specific solution — happy to reframe it around the problem and keep your design as a proposed approach, or leave it if it's settled"). Extract the underlying need into the body (complete, auditable twice-daily records; sequencing so evening can't precede morning). Move the exact columns, locking, and banner into Appendix E as proposed approach for design and the PM to reevaluate. Mark the reframing itself as a `Confirm:` item so the user signs off.

**Example 4 — the unspoken reporting requirement**
Input: *"We need a solar inventory feature so field teams can log which solar units are installed at each site, with serial numbers and install dates."*
Approach: Capture is well specified; reporting is entirely absent, which is the common shape. Fold the reporting question into the first clarify batch alongside the other gaps — *"what reporting comes out of this? Nexleaf generally expects a way to see a feature's data in aggregate — is there a need here?"* If they say yes (say, inventory-by-site for the deployment team and a funder-facing installed-units count), those become requirements in the *Reporting & data visibility* group, with consumer, cadence, and granularity marked `Confirm:` if unknown. If they say it's out of scope for V1, add a line to *Out of scope — V1* and an Appendix D row — then move on without raising it again.

## Note: context-gathering (separate, not yet integrated)

A distinct principle — that a strong PRD author actively *gathers* missing context (domain knowledge, field realities, unstated requirements) rather than only reformatting the input — is being developed separately and is not yet part of this skill. When that work is ready, it slots into step 2 ("Detect the gaps") and the "Cover the messy realities" principle. Until then, lean on the clarify step to pull missing context from the user.
