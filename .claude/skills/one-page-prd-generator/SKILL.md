---
name: one-page-prd-generator
description: Create a concise, decision-focused One-Page PRD for small product improvements, UI updates, copy changes, workflow refinements, internal/admin tool tweaks, layout changes, fast experiments, and other low-risk feature requests. Use this skill whenever the user asks to write, draft, or scope a PRD, product spec, product requirements doc, "one pager," or feature brief — even if they only describe a rough feature idea, meeting note, screenshot, stakeholder request, or user pain point and say something like "turn this into a PRD" or "what should we build here." Trigger it for small-to-medium product asks that one designer and one engineer could align on quickly. Do NOT use it for large multi-team initiatives, AI/automation-heavy workflows, complex data or permission models, compliance/security-sensitive features, platform re-architecture, or major launches — for those, recommend a Lean PRD or Full PRD instead.
---

# One-Page PRD Generator

## Purpose

Turn a rough, messy, or informal product request into a concise, practical
One-Page PRD that lets product, design, engineering, and stakeholders quickly
agree on: what problem is being solved, who the user is, what's in and out of
scope, what must be built first, what can wait, what success looks like, and
what's still open.

The goal is a fast, useful product **decision document** — not a bloated
enterprise PRD. The document is short because the work is focused, not because
the thinking is weak.

## Operating Principle

**Use the smallest PRD that prevents the biggest misunderstanding.**

Document only what's needed to move forward safely and quickly. Don't try to
answer every possible product question.

## When to Use

Good fits: a small UI improvement, a copy/content update, a simple table /
filter / layout change, a minor workflow improvement, a small admin or internal
tool change, a status-display change, a mobile/web layout improvement, a
low-risk enhancement, a fast experiment, or anything one designer and one
engineer can reasonably align on quickly.

Poor fits (recommend a Lean PRD or Full PRD instead): large multi-team
initiatives, AI/automation-heavy workflows, complex data logic, complex
permission models, compliance/security-sensitive features, platform
architecture changes, high-risk operational workflows, or major launches.

## Input You Might Receive

A rough feature idea, a meeting note, a screenshot description, a design
problem, a stakeholder request, a technical request, a customer pain point, or a
rough solution direction. The input may be messy, incomplete, or informal — your
job is to structure it into a clear One-Page PRD.

---

## Step 1 — Classify the Request (complexity fit check)

Before writing, run a lightweight risk check so you (and the user) know a
One-Page PRD is the right tool.

| Risk Area | Low | Medium | High |
|---|---|---|---|
| User impact | Small group | Multiple user groups | Core workflow |
| Technical complexity | Simple UI / front-end | Some backend / API | Complex backend / integration |
| Data complexity | Static / simple | Some rules | Complex logic / state |
| Permission complexity | One role | Few roles | Many roles / orgs / regions |
| Operational risk | Low | Medium | High |
| Design complexity | Small UI change | Multi-screen | Complex workflow |

If most areas are Low or Medium, proceed.

If several areas are High, say clearly:

> "This may need a Lean PRD or Full PRD because the risk/complexity is higher."

Then still provide a best-effort One-Page PRD unless the user asks you to stop.

## Step 2 — Clarify Sparingly

Don't over-ask. If key details are missing, make reasonable assumptions and
**label them clearly as assumptions**. Only ask a question when the missing
information would completely change the PRD's direction.

Default behaviour: continue with best effort, capture unknowns under "Open
Questions," use placeholders only where necessary, and don't delay output.

## Step 3 — Write the PRD

Use this exact structure.

```markdown
# One-Page PRD: [Feature / Request Name]

## 1. Summary
What is being built and why. 2–4 sentences.

## 2. Problem
Be specific: who has the problem, what is difficult / unclear / slow / risky,
why the current experience isn't good enough, and what happens if nothing
changes. Avoid vague statements like "users need a better experience." Prefer
"Technicians cannot understand why equipment is marked as Unknown, which causes
unnecessary follow-ups and delays troubleshooting."

## 3. User
| User Type | Goal | Pain Point |
|---|---|---|
| Primary user |  |  |
| Secondary user |  |  |
| Stakeholder |  |  |
If users are unclear, infer from context and mark as assumption.

## 4. Goal
2–4 clear statements of what improves once this ships.

## 5. Core User Decision
The decision this feature helps the user make — e.g. "Should I investigate this
equipment? Create a ticket? Reorder? Update missing data? Escalate? Trust this
status?" A PRD defines the decision the product enables, not just what users see.

## 6. Scope
### Included
What this PRD covers.
### Out of Scope
What is intentionally excluded — this protects speed and prevents scope creep.

## 7. Priority and Progressive Build
| Requirement | Priority | Release Stage | Rationale |
|---|---|---|---|
|  | P0 / Must Have | Must Have |  |
|  | P1 / MVP | MVP |  |
|  | P2 / V1 | V1 |  |
|  | P3 / V2 | V2 |  |
|  | P4 / Later | Later |  |

## 8. Requirements
| ID | Requirement | Acceptance Criteria |
|---|---|---|
| R1 |  |  |
| R2 |  |  |
| R3 |  |  |
Make each requirement specific and testable. Avoid "show more details." Prefer
"When the status is Unknown, show the reason category, last data received, and
recommended next action."

## 9. UX / Design Notes
Only what design needs to move fast: required screens, required states, key
components, mobile considerations, UX copy needed, empty/loading/error states,
progressive disclosure needs. Be specific.

## 10. Data / Logic / Permissions
Required data and source, business rules, state/status logic, permission rules,
known edge cases. Flag low data confidence.
| Data / Logic Item | Needed For MVP? | Confidence | Notes |
|---|---|---|---|
|  | Yes / No | High / Medium / Low |  |

## 11. Success Measure
| Metric | Target / Signal | Why It Matters |
|---|---|---|
|  |  |  |

## 12. Risks and Trade-Offs
| Risk / Trade-Off | Impact | Mitigation |
|---|---|---|
|  |  |  |

## 13. Open Questions
| Question | Owner | Needed By |
|---|---|---|
|  |  |  |

## 14. Decision
Decision: Approved / Needs Changes / Parked
Decision owner:
Next step:
```

### Priority definitions

- **P0 / Must Have** — cannot launch without this.
- **P1 / MVP** — smallest useful first release.
- **P2 / V1** — improves workflow completion.
- **P3 / V2** — optimises, automates, or scales.
- **P4 / Later** — useful but not needed now.

Progressive build principle: MVP proves value → V1 completes the workflow → V2
improves efficiency → Later adds intelligence or advanced capability.

## Step 4 — Quality Check

After the PRD, include a short critique titled **PRD Quality Check**. Rate it out
of 10 and explain what would make it stronger, using this checklist:

- Is the problem specific?
- Is the user clear?
- Is the core user decision clear?
- Is MVP separated from V1/V2?
- Are out-of-scope items clear?
- Are requirements testable?
- Are data/logic assumptions visible?
- Are success measures practical?
- Are open questions captured?

If the PRD scores below 8/10, say what's missing and improve it. The target is a
practical 9/10 or 10/10 for a fast-moving team.

---

## Final Output Order

Always output in this order:

1. Complexity fit check
2. One-Page PRD
3. PRD Quality Check
4. What might be missing
5. Recommended next step

## Writing Style

Be clear, concise, and product-focused. Prefer specific problem statements,
clear prioritisation, direct trade-offs, MVP/V1/V2 separation, practical
acceptance criteria, and user-decision framing. Avoid generic UX fluff, academic
wording, long explanations, bloated enterprise sections, unnecessary tables, and
vague statements. Don't treat a stakeholder request as automatically valid —
pressure-test it against the problem.

## Worked Example

If the user says: *"Create a PRD for showing why equipment status is Unknown,"*
don't just write "add more information to status." Produce something like:

- **Problem**: users can't understand what "Unknown" means.
- **Core decision**: should they investigate, wait, update metadata, or create a ticket?
- **MVP**: show reason, last data received, last sync, recommended next action.
- **V1**: allow metadata update and ticket linking.
- **V2**: alerts and automation.
- **Later**: AI diagnosis and predictive root cause.
- **Out of scope**: automated ticket creation, advanced reporting, predictive diagnosis.
