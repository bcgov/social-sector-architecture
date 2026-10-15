<script>
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import { options, byId } from '$lib/options.js';
  import { team, plans } from '$lib/data/timeline.js';

  let chosen = $state('e');

  onMount(() => {
    const h = location.hash.slice(1);
    if (plans[h]) chosen = h;
  });

  function choose(id) {
    chosen = id;
    history.replaceState(history.state, '', `#${id}`);
  }

  const option = $derived(byId[chosen]);
  const plan = $derived(plans[chosen]);
  const span = $derived(Math.max(plan.totalMonths, ...plan.phases.map((p) => p.end)));
  const years = $derived(Array.from({ length: Math.ceil(span / 12) + 1 }, (_, i) => i));
  const phaseName = $derived(Object.fromEntries(plan.phases.map((p) => [p.id, p.name])));
  const procName = $derived(Object.fromEntries(plan.procurement.map((p) => [p.id, p.item])));

  const pct = (m) => `${(m / span) * 100}%`;
  const asYears = (m) => {
    const y = m / 12;
    return y < 1 ? `${m} months` : `${Number.isInteger(y) ? y : y.toFixed(1)} years`;
  };
  const months = (a, b) => (a === b ? `Month ${a + 1}` : `Months ${a + 1} to ${b}`);
  const laneLabel = {
    foundation: 'Groundwork',
    release: 'Release to users',
    migration: 'Moving data',
    retire: 'Switching off the old system'
  };
</script>

<svelte:head>
  <title>Timeline | Future of Case Management</title>
  <meta name="description" content="How long each option would take a small team, when people first see value, and what has to be bought first." />
</svelte:head>

<header class="wrap head">
  <h1>Value early, then every few months</h1>
  <p class="lede">
    Each plan puts something real in front of staff or clients as early as it can, then releases
    on a steady beat. That can make the whole project longer. It also means less risk and
    sooner benefits.
  </p>
</header>

<section class="wrap team" aria-labelledby="team-h">
  <h2 id="team-h">The team</h2>
  <ul>
    {#each team as t}
      <li>
        <span class="count">{t.count}</span>
        <span class="role">{t.role}</span>
        <span class="focus">{t.focus}</span>
      </li>
    {/each}
  </ul>
</section>

<section class="plan" style="--hue: var(--{option.hue}); --hue-tint: var(--{option.hue}-tint)" aria-labelledby="plan-h">
  <div class="wrap">
    <fieldset class="switch">
      <legend>Show the plan for</legend>
      {#each options as o}
        <label style="--h: var(--{o.hue})">
          <input type="radio" name="plan" value={o.id} checked={chosen === o.id} onchange={() => choose(o.id)} />
          <span>{o.name}</span>
        </label>
      {/each}
    </fieldset>

    <div aria-live="polite">
      <h2 id="plan-h">{option.name}: {option.nickname}</h2>
      <p class="summary">{plan.summary}</p>

      <dl class="stats">
        <div><dt>First people use it</dt><dd>{asYears(plan.firstValueMonth)}</dd></div>
        <div><dt>Whole project</dt><dd>{asYears(plan.totalMonths)}</dd></div>
        <div><dt>Things to buy first</dt><dd>{plan.procurement.length}</dd></div>
      </dl>
    </div>

    <h3 class="chart-h">Phases</h3>
    <div class="chart">
      <div class="axis" aria-hidden="true">
        {#each years as y}
          {#if y * 12 <= span}
            <span style="left: {pct(y * 12)}">{y === 0 ? 'Start' : `Year ${y}`}</span>
          {/if}
        {/each}
        <span class="first" style="left: {pct(plan.firstValueMonth)}">First value</span>
      </div>
      <ol class="rows">
        {#each plan.phases as p}
          <li class="row lane-{p.lane}">
            <div class="label">
              <strong>{p.name}</strong>
              <span>{months(p.start, p.end)}, {laneLabel[p.lane] ?? p.lane}</span>
            </div>
            <div class="track" aria-hidden="true">
              <span class="bar" style="left: {pct(p.start)}; width: {pct(Math.max(p.end - p.start, 0.5))}"></span>
              {#each p.releases as r}
                <span class="tick" style="left: {pct(r.month)}"></span>
              {/each}
              <span class="firstline" style="left: {pct(plan.firstValueMonth)}"></span>
            </div>
            <details class="more">
              <summary>What this phase delivers</summary>
              <p>{p.goal}</p>
              {#if p.releases.length}
                <ul class="releases">
                  {#each p.releases as r}
                    <li>
                      <strong>Month {r.month + 1}: {r.name}.</strong>
                      {r.what} <em>For {r.who}.</em>
                    </li>
                  {/each}
                </ul>
              {/if}
              {#if p.blockedBy.length}
                <p class="blocked">Waits on: {p.blockedBy.map((b) => procName[b] ?? b).join(', ')}</p>
              {/if}
            </details>
          </li>
        {/each}
      </ol>
      <p class="chart-key" aria-hidden="true">
        <span class="k foundation"></span>Groundwork
        <span class="k release"></span>Release to users
        <span class="k migration"></span>Moving data
        <span class="k retire"></span>Switching off the old system
        <span class="k tickk"></span>A release
      </p>
    </div>

    <h3>What has to be bought first</h3>
    <p>Anything bought from a company goes through government procurement. Work that needs it can't start until it lands.</p>
    {#if plan.procurement.length}
      <div class="table-wrap" role="region" aria-label="Purchases and what they hold up" tabindex="0">
        <table>
          <thead>
            <tr>
              <th scope="col">Purchase</th>
              <th scope="col">Why it's needed</th>
              <th scope="col">Typical time to buy</th>
              <th scope="col">Start buying</th>
              <th scope="col">Holds up</th>
            </tr>
          </thead>
          <tbody>
            {#each plan.procurement as x}
              <tr>
                <th scope="row">{x.item}</th>
                <td>{x.why}</td>
                <td>{x.leadMonths} months</td>
                <td>{x.startBy}</td>
                <td>{x.blocks.map((b) => phaseName[b] ?? b).join(', ')}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {:else}
      <p>Nothing in this plan has to be bought commercially.</p>
    {/if}

    <div class="realism">
      <h3>Is this realistic?</h3>
      <p>{plan.realism}</p>
      <details>
        <summary>The assumptions behind this plan</summary>
        <ul>{#each plan.assumptions as a}<li>{a}</li>{/each}</ul>
      </details>
    </div>

    <p><a href="{base}/options/{option.slug}/">See the parts of {option.name}</a></p>
  </div>
</section>

<style>
  .head { padding-block: clamp(3rem, 8vw, 6rem) 1rem; }
  .head h1 { max-width: 13ch; }

  .team { padding-block: 2rem 3rem; }
  .team h2 { font-size: var(--step-2); }
  .team ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 0.75rem;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 13rem), 1fr));
  }
  .team li {
    display: grid;
    gap: 0.15rem;
    padding: 1rem 1.1rem;
    background: var(--surface);
    border-radius: var(--radius-m);
    border: 1.5px solid var(--line);
  }
  .count { font-family: var(--font-display); font-weight: 820; font-size: var(--step-2); line-height: 1; color: var(--cedar); }
  .role { font-family: var(--font-display); font-weight: 700; }
  .focus { font-size: var(--step--1); color: var(--ink-soft); }

  .plan {
    background: var(--hue-tint);
    padding-block: 3rem 4rem;
    border-top: 10px solid var(--hue);
  }

  .switch {
    border: none;
    padding: 0;
    margin: 0 0 2rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .switch legend { font-family: var(--font-display); font-weight: 700; margin-bottom: 0.6rem; }
  .switch label { position: relative; }
  .switch input { position: absolute; opacity: 0; inset: 0; margin: 0; cursor: pointer; }
  .switch span {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    min-height: 48px;
    padding: 0 1.3rem;
    border-radius: 999px;
    border: 2px solid var(--ink);
    background: var(--surface);
    font-family: var(--font-display);
    font-weight: 700;
  }
  .switch span::before { content: ''; width: 0.75rem; height: 0.75rem; border-radius: 50%; background: var(--h); }
  .switch input:checked + span { background: var(--ink); color: var(--paper); }
  .switch input:focus-visible + span { outline: 3px solid var(--focus); outline-offset: 3px; box-shadow: 0 0 0 7px var(--focus-halo); }

  .summary { font-size: var(--step-1); line-height: 1.5; }

  .stats { display: flex; flex-wrap: wrap; gap: 0.75rem; margin: 1.5rem 0 2.5rem; }
  .stats div {
    background: var(--surface);
    border-radius: var(--radius-m);
    padding: 0.9rem 1.2rem;
    min-width: 11rem;
  }
  .stats dt { font-size: var(--step--1); color: var(--ink-soft); }
  .stats dd { margin: 0; font-family: var(--font-display); font-weight: 800; font-size: var(--step-2); line-height: 1.1; }

  .chart {
    background: var(--surface);
    border-radius: var(--radius-l);
    padding: 1.2rem clamp(0.8rem, 2vw, 1.6rem) 1rem;
    margin-bottom: 3rem;
    --label: 15rem;
  }
  .axis {
    position: relative;
    height: 2.4rem;
    margin-left: var(--label);
    font-size: 0.8rem;
    color: var(--ink-soft);
  }
  .axis span { position: absolute; top: 0; transform: translateX(-2px); white-space: nowrap; border-left: 1px solid var(--line-strong); padding-left: 4px; }
  .axis .first { top: 1.2rem; color: var(--ink); font-weight: 700; border-left: 2px solid var(--ink); }
  .rows { list-style: none; padding: 0; margin: 0; }
  .row {
    display: grid;
    grid-template-columns: var(--label) 1fr;
    column-gap: 0;
    align-items: center;
    border-top: 1px solid var(--line);
    padding-block: 0.5rem;
  }
  .label { padding-right: 1rem; display: grid; line-height: 1.3; }
  .label strong { font-family: var(--font-display); font-size: var(--step--1); }
  .label span { font-size: 0.8rem; color: var(--ink-soft); }
  .track { position: relative; height: 1.6rem; }
  .bar { position: absolute; top: 0.3rem; height: 1rem; border-radius: 999px; }
  .tick {
    position: absolute;
    top: 0.05rem;
    width: 0.75rem;
    height: 0.75rem;
    margin-left: -0.375rem;
    transform: translateY(0.38rem) rotate(45deg);
    background: var(--surface);
    border: 2px solid var(--ink);
  }
  .firstline { position: absolute; top: -0.5rem; bottom: -0.5rem; border-left: 2px dashed var(--ink); }
  .more { grid-column: 1 / -1; font-size: var(--step--1); }
  .more summary { cursor: pointer; min-height: 32px; display: flex; align-items: center; font-weight: 700; width: max-content; max-width: 100%; }
  .more p, .more ul { max-width: 70ch; }
  .releases { padding-left: 1.2rem; }
  .releases li { margin-bottom: 0.4rem; }
  .blocked { font-weight: 700; }
  .blocked::before { content: '◆ '; color: var(--ochre); }

  .lane-foundation .bar, .k.foundation { background: var(--line-strong); }
  .lane-release .bar, .k.release { background: var(--hue); }
  .lane-migration .bar, .k.migration { background: var(--ochre); }
  .lane-retire .bar, .k.retire { background: repeating-linear-gradient(45deg, var(--cedar) 0 6px, transparent 6px 10px); border: 2px solid var(--cedar); }

  .chart-key { display: flex; flex-wrap: wrap; align-items: center; gap: 0.4rem 0.6rem; font-size: 0.8rem; margin: 1rem 0 0; }
  .k { display: inline-block; width: 1.4rem; height: 0.7rem; border-radius: 999px; margin-left: 0.6rem; }
  .k.tickk { width: 0.65rem; height: 0.65rem; border-radius: 0; transform: rotate(45deg); border: 2px solid var(--ink); }

  @media (max-width: 44rem) {
    .chart { --label: 0rem; }
    .row { grid-template-columns: 1fr; }
    .label { padding: 0 0 0.3rem; }
    .axis { margin-left: 0; }
  }

  .table-wrap { overflow-x: auto; border-radius: var(--radius-m); background: var(--surface); margin-bottom: 3rem; }
  table { width: 100%; min-width: 44rem; border-collapse: collapse; font-size: var(--step--1); }
  th, td { text-align: left; vertical-align: top; padding: 0.8rem 1rem; border-bottom: 1px solid var(--line); }
  thead th { font-family: var(--font-display); background: var(--surface-2); }
  tbody th { font-family: var(--font-display); }

  .realism {
    border-left: 8px solid var(--ochre);
    background: var(--surface);
    border-radius: 0 var(--radius-m) var(--radius-m) 0;
    padding: 1.2rem 1.5rem 0.6rem;
    margin-bottom: 2rem;
  }
  .realism summary { cursor: pointer; font-weight: 700; min-height: 32px; }
</style>
