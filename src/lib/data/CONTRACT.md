# Data contract

Every page renders from the files in this folder. Agents fill content; the UI
reads these shapes and nothing else. Keep IDs, zone layout and component keys
exactly as the skeletons define them.

## Architecture files (`salesforce-s.js`, `salesforce-h.js`, `event-driven.js`)

```js
export default {
  id: 's' | 'h' | 'e',
  slug: 'salesforce-s',            // URL segment under /options/
  name: 'Salesforce S',            // display name
  nickname: 'All on Salesforce',   // 2–4 words, plain
  hue: 'river' | 'moss' | 'cedar',
  tagline: '',                     // one sentence, ≤ 18 words
  summary: ['', ''],               // 2–3 short paragraphs for the top of the page
  facts: [{ label: '', value: '' }],   // 3–4 facts, e.g. effort, first release
  goodAt: [''],                    // 3–5 plain statements
  watchOut: [''],                  // 3–5 plain statements
  layout: {
    columns: '…',                  // CSS grid-template-columns for wide screens
    areas: ['"a b"', '"c c"']      // grid-template-areas rows, using zone ids
  },
  zones: [
    {
      id: 'people', name: 'People and partners', tone: 'people',
      blurb: '',                   // one plain sentence describing the zone
      shape: 'box' | 'circle',     // circle only for the side gateways
      groups: [{ name: 'Experience' | null, components: ['id', …] }]
    }
  ],
  components: {
    id: {
      name: '',                    // label on the diagram
      short: '',                   // 3–8 words under the label
      what: '',                    // What it is. 1–3 sentences.
      does: '',                    // What it does. 1–3 sentences.
      why: '',                     // Why you should care. 1–3 sentences, about
                                   // staff, clients, money, risk or time.
      buildBuy: null | {
        approach: 'buy' | 'build' | 'open-source' | 'platform' | 'existing',
        label: '',                 // e.g. "Buy: part of the Salesforce licence"
        summary: '',               // 2–3 sentences: what was compared and why
        options: [{ name: '', kind: 'buy'|'build'|'open-source'|'existing', note: '' }]
      },
      watch: null | { tone: 'gap' | 'limit' | 'fixed', text: '' },
      procurement: false           // true if it must be bought commercially
    }
  }
};
```

`approach` meanings: `buy` a commercial product bought for this; `build` the
team writes it; `open-source` free software the team runs; `platform` comes
with a product already bought (e.g. part of the Salesforce licence); `existing`
something government already runs.

`watch.tone`: `gap` the option cannot meet a need; `limit` met in a weaker
form; `fixed` this option fixes a problem another option has.

## `timeline.js`

```js
export const team = [{ role: '', count: '', focus: '' }];
export const plans = {
  s: Plan, h: Plan, e: Plan
};
// Plan:
{
  summary: '',                 // 2–3 sentences
  firstValueMonth: 0,          // month the first real people use something real
  totalMonths: 0,
  realism: '',                 // honest note on this team size vs the estimate
  assumptions: [''],
  phases: [{
    id: '', name: '', start: 0, end: 0,   // months from project start (0-based)
    lane: 'foundation' | 'release' | 'migration' | 'retire',
    goal: '',                              // one sentence
    releases: [{ month: 0, name: '', who: '', what: '' }],
    blockedBy: ['procurement id']
  }],
  procurement: [{
    id: '', item: '', why: '',
    leadMonths: 0,             // typical procurement time
    blocks: ['phase id'],
    startBy: ''                // plain words, e.g. "Before month 1"
  }]
}
```

## `problems.js`

```js
export const intro = '';
export const problems = [{
  id: '', title: '', who: '',     // who feels it
  see: '',                        // what people experience
  apparent: '',                   // what it looks like is causing it
  real: '',                       // what is really causing it
  example: ''                     // short story or figure; may be placeholder
}];
export const placeholder = true;  // the UI shows a "sample text" notice while true
```

## Writing rules for every string

- Grade 8 reading level. Short sentences, mostly under 20 words. Common words.
- Explain technical terms in plain words the first time, or avoid them.
  Say "the ministry's own servers" not "ministry infrastructure" where you can.
- Use "employment assistance", never "income assistance".
  Use "child protection", never "child welfare". Never call systems an "estate".
- No-AI-slop: no delve, foster, leverage, utilize, facilitate, empower,
  streamline, robust, cutting-edge, seamless, transformative, elevate,
  harness, paramount, game changer. No "It's not X, it's Y". No em dashes.
  No "it's worth noting". No rhetorical questions. No inspirational kickers.
- Be concrete: numbers, names and examples from the sources beat adjectives.
- Never invent figures. If a source does not give a number, leave it out.
- Nothing on the site is a government commitment; don't write as if it were.
