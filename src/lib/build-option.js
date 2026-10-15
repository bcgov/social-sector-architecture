// Joins an option's words (content/*.yaml) to its diagram structure (structure/*.js).
// Pure, so the copy-lock script can use it too. Throws a plain-language error
// when the two disagree, so a typo in a YAML file stops the build with a clear message.

export function buildOption(structure, words, file = `${structure.slug}.yaml`) {
  const problems = [];
  const zones = words.zones ?? {};
  const parts = words.parts ?? {};
  const placed = new Set();

  for (const z of structure.zones) {
    if (!zones[z.id]) problems.push(`zone "${z.id}" has no entry under zones:`);
    for (const g of z.groups) {
      if (g.id !== 'main' && !zones[z.id]?.groups?.[g.id]) {
        problems.push(`zone "${z.id}" needs a name for group "${g.id}" under groups:`);
      }
      for (const id of g.parts) {
        placed.add(id);
        if (!parts[id]) problems.push(`part "${id}" is in the diagram but has no entry under parts:`);
      }
    }
  }
  for (const id of Object.keys(parts)) {
    if (!placed.has(id)) problems.push(`part "${id}" is under parts: but not in the diagram (check the spelling)`);
  }
  if (problems.length) throw new Error(`${file}:\n  - ${problems.join('\n  - ')}`);

  return {
    id: structure.id,
    slug: structure.slug,
    name: words.name,
    nickname: words.nickname,
    hue: structure.hue,
    tagline: words.tagline ?? '',
    summary: words.summary ?? [],
    facts: words.facts ?? [],
    goodAt: words.goodAt ?? [],
    watchOut: words.watchOut ?? [],
    layout: structure.layout,
    zones: structure.zones.map((z) => ({
      id: z.id,
      name: zones[z.id].name,
      tone: z.tone,
      blurb: zones[z.id].blurb ?? '',
      shape: z.shape,
      groups: z.groups.map((g) => ({
        name: g.id === 'main' ? null : zones[z.id].groups[g.id],
        components: g.parts
      }))
    })),
    components: Object.fromEntries(
      Object.entries(parts).map(([id, p]) => [
        id,
        {
          name: p.name,
          short: p.short ?? '',
          what: p.what ?? '',
          does: p.does ?? '',
          why: p.why ?? '',
          buildBuy: p.buildBuy ?? null,
          watch: p.watch ?? null,
          procurement: p.procurement ?? false
        }
      ])
    )
  };
}
