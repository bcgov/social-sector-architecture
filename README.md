# Future of Case Management: the three options

A plain-language site for interest-holders who know the business but not the
technology. It covers three ways to replace ICM: Salesforce S, Salesforce H and
event-driven. Each option has a diagram you can click. There is also a page on
today's problems and a switchable delivery timeline.

This is a separate project from `../site`. That site's copy is locked and it
publishes to GitHub Pages. This one is not deployed anywhere.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in build/
npm run preview
```

## Where the words live

All reader-facing text sits in `src/lib/data/`. The pages only lay it out.
`src/lib/data/CONTRACT.md` describes each file's shape and the writing rules
(grade 8, plain words, no AI-slop phrasing).

| File | Page |
| --- | --- |
| `home.js` | Home: hero, why, how to read, side-by-side table |
| `salesforce-s.js`, `salesforce-h.js`, `event-driven.js` | One option page each: summary, facts, diagram, every part's dialog |
| `problems.js` | The problem. `apparent` and `real` are sample text; set `placeholder = false` when the real analysis replaces them |
| `timeline.js` | Timeline: team, one plan per option, procurement |

The diagram layout sits in each option file: `layout.areas` places the zones
and `zones[].groups` lists the parts in reading order. Keep component keys
stable. The dialog's previous and next buttons follow that order.

## Design

- One colour per option, used everywhere: river (S), moss (H), cedar (event-driven).
- Schibsted Grotesk for headings, Atkinson Hyperlegible Next for body text. Both are self-hosted.
- Diagram parts are real buttons in an HTML grid. Each opens a native `<dialog>`,
  which traps focus, closes on Escape, and returns focus to the part.
- Part labels: *Cannot be met*, *Weaker form*, *Fixed here*, *Risk*, *Procure*.
  Each label is text, so colour is never the only signal.

## Accessibility

Target is WCAG 2.2 AA. Checked with axe-core 4.10 in light and dark modes, at
desktop and phone widths. Targets are at least 44px, motion respects
`prefers-reduced-motion`, and the header stops being sticky on narrow screens so
it can't cover focused items.

## Sources

Facts come from the project's research in `../projects/001-icm-modernization/`:
RSCH-005 v1.1 for the Salesforce routes, target-architecture-v2 and RSCH-002
v1.4 for event-driven, and RSCH-003 v1.1 and ADR-010 for payments. Nothing on
the site is a government decision.
