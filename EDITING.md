# Editing the site's words

All the words on the site live in `src/lib/content/`, one YAML file per page:

| File | What it holds |
| --- | --- |
| `home.yaml` | The home page: headline, why, how to read, the side-by-side table |
| `salesforce-s.yaml`, `salesforce-h.yaml`, `event-driven.yaml` | One option each: the summary, facts, strengths and cautions, the box names on the diagram, and every part's pop-up |
| `problems.yaml` | The problems page. Set `placeholder: false` when the real causes replace the sample text |
| `timeline.yaml` | The team, the three plans and the purchases |

## How YAML works here

```yaml
  ledger:                      # the part's id: leave it as is
    name: Ledger               # short values sit on one line
    what: >-                   # ">-" starts a paragraph; write it on the lines below
      A ledger is the book of every dollar owed, paid, recovered or written off.
      Wrap the lines however you like. They join into one paragraph.
    procurement: true          # true or false
```

- Change the words; keep the name before each colon (`what:`, `does:`) and the indentation.
- Inside a `>-` paragraph, anything goes: colons, quotes, apostrophes, `#`.
- A one-line value that has a colon followed by a space needs a `>-` paragraph
  instead. The build will tell you if you get this wrong.
- List items start with `- `. Add or remove whole items to change a list.
- To leave out an optional field, such as a part's `watch:` note, delete the
  field and everything indented under it.

### Fields with fixed values

| Field | Allowed values |
| --- | --- |
| `buildBuy.approach` | `buy`, `build`, `open-source`, `platform` (comes with a product already bought), `existing` (government already runs it) |
| `buildBuy.options[].kind` | `buy`, `build`, `open-source`, `existing` |
| `watch.tone` | `gap` (can't be met), `limit` (weaker form), `fixed` (fixed by this option), `risk` (open question) |
| timeline `lane` | `foundation`, `release`, `migration`, `retire` |
| timeline `start`, `end`, `month`, `firstValueMonth`, `totalMonths`, `leadMonths` | numbers of months from the project start; 0 is the first month |

## Saving

```bash
npm run dev                                   # check it at http://localhost:5173
npm run copy:save -- "what you changed"       # record the wording and commit it
```

If a YAML file has a mistake, `npm run dev` and `copy:save` name the file and
the line.

## What's not in these files

The diagram layout lives in `src/lib/structure/*.js`: where each zone sits and
which parts each zone holds. To add, remove or move a part, change both its
structure file and its YAML file. If they disagree, the build lists every
mismatch, for example `part "ledger" is in the diagram but has no entry under parts:`.

## Writing rules

- Grade 8 reading level: short sentences, common words.
- Say "employment assistance", not "income assistance"; "child protection", not
  "child welfare"; never "estate".
- No em dashes; no puffery (robust, seamless, leverage, transformative).
- Don't invent figures. If a source doesn't give a number, leave it out.
- Nothing on the site is a government commitment.
