# Site copy belongs to the author

The wording on this site is written and owned by the author. Leave it alone
unless the task is explicitly a copy change.

- Copy lives in `src/lib/data/*.js` and in text inside `.svelte` files. Refactors,
  restyling, accessibility fixes and dependency upgrades must leave every
  reader-facing string as it is: body text, headings, titles, meta descriptions,
  `aria-label` text and the strings in the data files.
- Before starting work, run `git status`. Uncommitted changes in `src/lib/data/`
  are the author's work in progress. Don't edit, revert, stash or commit those
  files. If the task needs them, stop and ask.
- Change files with Edit, never Write. Write replaces the whole file, and that is
  how wording drifts. A hook (`scripts/guard-copy.sh`) blocks Write on existing
  copy files.
- Run `npm run copy:check` before calling a non-copy change done. If it fails,
  your change altered wording: put the text back.
- Never run `npm run copy:update` or `copy:save` unless the author asked for that
  exact wording change. The hook asks the author first.
- When the author asks for a copy change, make only the change asked for. Commit it
  with `npm run copy:save -- "<what changed>"`, so the text and the lock land
  in one commit.
