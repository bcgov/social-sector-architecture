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
- [ ] Content: timeline.js (agent)
- [x] Content: problems.js + home.js (causes are Sample: text)
- [x] UI: layout, home, option pages, diagram + modal (untested)
- [x] UI: problems page, timeline page (untested)
- [ ] Accessibility audit (axe) and reading-level pass

## QA log

- axe 4.10 (wcag2a/aa, 21aa, 22aa, best-practice): 0 violations on home, problems, three option pages, light and dark.
- Dialog: keyboard open, next, Escape, focus returns to the part last shown. Desktop and mobile.
- Flesch-Kincaid grade per file: home 5.0, problems 6.7, S 7.9, H 7.1, E 7.5.
- QA scripts live in the session scratchpad (puppeteer-core + system Chrome), not in the project.
