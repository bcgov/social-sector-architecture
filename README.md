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

## Editing copy

1. Edit the words in the YAML files in `src/lib/content/`. `EDITING.md` explains
   the format: change the words, and keep the field names and indentation.
2. Check it in the browser with `npm run dev`.
3. Save it:

   ```bash
   npm run copy:save -- "Rewrite the Route H ledger explanation"
   ```

   This updates `copy.lock.txt` and commits your text and the lock together.

Your wording is protected in three ways:

- **The lock.** `copy.lock.txt` holds every string. `npm run copy:check` lists any
  string that differs from it, by location, e.g.
  `salesforce-h › components › ledger › why`.
- **The commit check.** A git pre-commit hook runs the copy check. Code changes
  that alter wording can't be committed unless the lock is updated too, and only
  `copy:save` / `copy:update` do that.
- **The Claude hook.** `scripts/guard-copy.sh` (wired in `../.claude/settings.json`)
  stops Claude from rewriting whole copy files. It also asks you first before
  Claude edits a content file that is new or has uncommitted changes, or runs `copy:save` /
  `copy:update`. `CLAUDE.md` sets out the same rules.

If you're midway through edits and want Claude to do other work, commit your
draft first with `copy:save`, or just leave it uncommitted and Claude will ask
before touching those files.

## Where the words live

Words and structure are kept apart:

- `src/lib/content/*.yaml`: every reader-facing word. `EDITING.md` lists the
  files, the format and the writing rules.
- `src/lib/structure/*.js`: each diagram's layout. `layout.areas` places the
  zones, and `zones[].groups[].parts` lists the parts in reading order, which the
  dialog's previous and next buttons follow.
- `src/lib/build-option.js` joins the two and stops the build with a list of
  mismatches if a part is in one but not the other.

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
