<script>
  import { tick } from 'svelte';
  import PartDialog from './PartDialog.svelte';

  let { option } = $props();

  let openId = $state(null);
  let lastTrigger = null;

  // reading order of every part, zone by zone, for previous / next
  const order = $derived(option.zones.flatMap((z) => z.groups.flatMap((g) => g.components)));
  const zoneOf = $derived(
    Object.fromEntries(option.zones.flatMap((z) => z.groups.flatMap((g) => g.components.map((c) => [c, z.name]))))
  );

  const watchText = { gap: 'Cannot be met', limit: 'Weaker form', fixed: 'Fixed here', risk: 'Risk' };

  function open(id, el) {
    lastTrigger = el;
    openId = id;
  }

  function step(dir) {
    const i = order.indexOf(openId);
    openId = order[(i + dir + order.length) % order.length];
  }

  async function closed() {
    const id = openId;
    openId = null;
    await tick();
    // return focus to the part now showing, which may differ after previous / next
    const el = document.getElementById(`part-${option.id}-${id}`) ?? lastTrigger;
    el?.focus();
  }
</script>

<div
  class="diagram"
  style="--cols: {option.layout.columns}; --areas: {option.layout.areas.join(' ')}; --hue: var(--{option.hue})"
>
  {#each option.zones as zone}
    <div
      class="zone tone-{zone.tone}"
      class:circles={zone.shape === 'circle'}
      style="grid-area: {zone.id}"
      role="group"
      aria-labelledby="zone-{option.id}-{zone.id}"
    >
      <h3 id="zone-{option.id}-{zone.id}">{zone.name}</h3>
      {#if zone.blurb}<p class="blurb">{zone.blurb}</p>{/if}
      {#each zone.groups as group}
        {#if group.name}<h4>{group.name}</h4>{/if}
        <ul class="parts" class:single={group.components.length === 1}>
          {#each group.components as id}
            {@const c = option.components[id]}
            <li>
              <button
                type="button"
                class="part"
                id="part-{option.id}-{id}"
                aria-haspopup="dialog"
                onclick={(e) => open(id, e.currentTarget)}
              >
                <span class="name">{c.name}</span>
                {#if c.short && zone.shape !== 'circle'}<span class="short">{c.short}</span>{/if}
                {#if c.watch || c.procurement}
                  <span class="flags">
                    {#if c.watch}<span class="flag {c.watch.tone}">{watchText[c.watch.tone]}</span>{/if}
                    {#if c.procurement}<span class="flag proc">Procure</span>{/if}
                  </span>
                {/if}
              </button>
            </li>
          {/each}
        </ul>
      {/each}
    </div>
  {/each}
</div>

<dl class="key" aria-label="Key to the labels on the parts">
  <div><dt><span class="flag gap">Cannot be met</span></dt><dd>Something this option can't do</dd></div>
  <div><dt><span class="flag limit">Weaker form</span></dt><dd>Done, but in a weaker way</dd></div>
  <div><dt><span class="flag fixed">Fixed here</span></dt><dd>Solves a problem another option has</dd></div>
  <div><dt><span class="flag risk">Risk</span></dt><dd>An open question or risk to manage</dd></div>
  <div><dt><span class="flag proc">Procure</span></dt><dd>Has to be bought through procurement</dd></div>
</dl>

<PartDialog
  {option}
  partId={openId}
  zoneName={openId ? zoneOf[openId] : ''}
  position={openId ? `${order.indexOf(openId) + 1} of ${order.length}` : ''}
  onclose={closed}
  onstep={step}
/>

<style>
  .diagram {
    display: grid;
    gap: 0.9rem;
    grid-template-columns: 1fr;
  }
  @media (min-width: 62rem) {
    .diagram {
      grid-template-columns: var(--cols);
      grid-template-areas: var(--areas);
      align-items: stretch;
    }
  }
  @media (max-width: 61.99rem) {
    .zone { grid-area: auto !important; }
  }

  .zone {
    border-radius: var(--radius-m);
    padding: 1rem 1rem 1.1rem;
    border: 2px solid;
    min-width: 0;
  }
  .zone h3 {
    font-size: var(--step-1);
    margin: 0 0 0.2rem;
  }
  .zone h4 {
    font-family: var(--font-display);
    font-size: var(--step--1);
    font-weight: 700;
    margin: 0.9rem 0 0.4rem;
    color: var(--ink-soft);
  }
  .blurb {
    font-size: var(--step--1);
    color: var(--ink-soft);
    margin-bottom: 0.6rem;
  }

  .tone-experience { background: var(--z-experience); border-color: var(--z-border-experience); }
  .tone-api { background: var(--z-api); border-color: var(--z-border-api); }
  .tone-domain { background: var(--z-domain); border-color: var(--z-border-domain); }
  .tone-intelligence { background: var(--z-intelligence); border-color: var(--z-border-intelligence); }
  .tone-events { background: var(--z-events); border-color: var(--z-border-events); }
  .tone-commodity { background: var(--z-commodity); border-color: var(--z-border-commodity); }
  .tone-salesforce { background: var(--z-salesforce); border-color: var(--z-border-salesforce); }
  .tone-mulesoft { background: var(--z-mulesoft); border-color: var(--z-border-mulesoft); }
  .tone-ministry { background: var(--z-ministry); border-color: var(--z-border-ministry); }
  .tone-people { background: var(--z-people); border-color: var(--z-border-people); border-style: dashed; }

  .parts {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 10.5rem), 1fr));
  }
  .parts.single { grid-template-columns: 1fr; }
  .parts li { display: flex; }

  .part {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.2rem;
    min-height: 44px;
    width: 100%;
    text-align: left;
    padding: 0.7rem 0.8rem;
    border-radius: var(--radius-s);
    border: 1.5px solid var(--line-strong);
    background: var(--surface);
    color: var(--ink);
    font: inherit;
    cursor: pointer;
    box-shadow: 0 2px 0 var(--line-strong);
    transition: transform 120ms ease, box-shadow 120ms ease, border-color 120ms ease;
  }
  .part:hover {
    transform: translateY(-2px);
    border-color: var(--hue);
    box-shadow: 0 4px 0 var(--hue);
  }
  .part:active { transform: translateY(1px); box-shadow: 0 1px 0 var(--hue); }
  .name {
    font-family: var(--font-display);
    font-weight: 700;
    line-height: 1.2;
  }
  .short {
    font-size: var(--step--1);
    color: var(--ink-soft);
    line-height: 1.35;
  }
  .flags { display: flex; flex-wrap: wrap; gap: 0.3rem; margin-top: 0.3rem; }

  .flag {
    display: inline-block;
    font-family: var(--font-display);
    font-size: 0.78rem;
    font-weight: 700;
    line-height: 1.5;
    padding: 0 0.5rem;
    border-radius: 999px;
    border: 1.5px solid;
  }
  .flag.gap { color: #8c2416; border-color: #8c2416; background: #f7e3de; }
  .flag.limit { color: #6b4708; border-color: #8a5c0d; background: #f6ead2; }
  .flag.fixed { color: #33502a; border-color: #4f6b3a; background: #e3edd9; }
  .flag.risk { color: #3a4048; border-color: #4b535c; background: #e4e7e9; }
  .flag.proc { color: var(--ink); border-color: var(--ink); background: transparent; border-style: dashed; }

  /* side gateways drawn as circles, like the source drawing */
  .circles .parts { grid-template-columns: 1fr; justify-items: center; gap: 1rem; }
  .circles .part {
    width: 9rem;
    height: 9rem;
    flex: none;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  @media (max-width: 61.99rem) {
    .circles .parts { grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr)); }
  }

  .key {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem 1.5rem;
    margin: 1.2rem 0 0;
    font-size: var(--step--1);
  }
  .key div { display: flex; align-items: center; gap: 0.5rem; }
  .key dt, .key dd { margin: 0; }
</style>
