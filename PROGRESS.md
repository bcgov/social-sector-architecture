# Progress: simplified options site

Plain-language SvelteKit site for non-technical interest-holders. It explains
three architecture options for replacing ICM: Salesforce S, Salesforce H and
event-driven. Kept separate from `../site`, whose copy is locked.

## Decisions

- 2026-10-15: timelines for all three options, switchable (user choice).
- Standalone project at `site-simple/`, static build, not deployed anywhere.
- Colour per option, used everywhere: river = S, moss = H, cedar = event-driven.
- Type: Schibsted Grotesk (display) + Atkinson Hyperlegible Next (body), self-hosted.
- Diagrams are HTML grids of buttons (not SVG); each opens a native `<dialog>`.
- Event-driven diagram shows one data integration gateway, not the two in the source drawing.
- The problems page uses three soil layers: what people see, what seems to cause it,
  and the real cause.

## Sources

- Route S / H: `projects/001-icm-modernization/research/ARC-001-RSCH-005-v1.1*.md`
- Event-driven: `projects/001-icm-modernization/external/target-architecture-v2.md`,
  user's simplified diagram, `research/ARC-001-RSCH-002-v1.4-executive-summary.md`
- Payments: `research/ARC-001-RSCH-003-v1.1.md`

## Status

- [x] Scaffold, tokens, data contract, skeleton data
- [x] Content: salesforce-s.js ("Worker console" renamed "Worker screens")
- [x] Content: salesforce-h.js (renames: Service front door, Change feed, Analysis store)
- [x] Content: event-driven.js (watch notes retagged as "risk"; 8 components marked not yet analysed)
- [x] Content: timeline.js (first value: S month 13, H month 13, E month 9; totals 100/120/106 months at 12 people)
- [x] Content: problems.js + home.js (causes are Sample: text)
- [x] UI: layout, home, option pages, diagram + modal (tested)
- [x] UI: problems page, timeline page (tested)
- [x] Accessibility audit (axe) and reading-level pass

## QA log

- axe 4.10 (wcag2a/aa, 21aa, 22aa, best-practice): 0 violations on home, problems, three option pages, light and dark.
- Dialog: keyboard open, next, Escape, focus returns to the part last shown. Desktop and mobile.
- Flesch-Kincaid grade per file: home 5.0, problems 6.7, S 7.9, H 7.1, E 7.5.
- QA scripts live in the session scratchpad (puppeteer-core + system Chrome), not in the project.
- Timeline: 0 axe violations; switcher works by keyboard and from the URL hash (#s, #h, #e); grade 7.8.
- Mobile header no longer sticky (WCAG 2.4.11 focus not obscured).

## Open items for the project lead

- Problems page: `apparent` and `real` are sample text. Set `placeholder = false` once replaced.
- Timeline assumptions to check: 7-month Salesforce licence procurement (no source); the event-driven plan
  puts a read-only worker view ahead of the architecture's Module 0; all payment phases assume the
  Comptroller General accepts a new ministry payment system; Route H's ministry-side effort uses a floor
  from RSCH-002/003, and the event-driven total is assembled from stand-in figures.
- Event-driven: 8 components have no build-vs-buy research behind them; they say "not yet analysed".

## 2026-10-15: copy moved to YAML

- Words: `src/lib/content/*.yaml` (folded `>-` blocks for prose). Diagram layout: `src/lib/structure/*.js`.
  `src/lib/build-option.js` joins them and fails the build on mismatched part ids.
- Proof of no wording change: the copy snapshot was identical line for line (1,637 lines, headers aside),
  and all 7 prerendered pages render identical HTML (asset hashes normalised).
- Guard hook now covers `src/lib/content/`, and treats untracked content files as the author's work.
- `EDITING.md` is the author's guide; `src/lib/data/CONTRACT.md` retired.
