<script>
  import { base } from '$app/paths';
  import { bySlug, options } from '$lib/options.js';
  import Diagram from '$lib/components/Diagram.svelte';

  let { data } = $props();
  const option = $derived(bySlug[data.slug]);
  const index = $derived(options.indexOf(option));
  const next = $derived(options[(index + 1) % options.length]);
  const partCount = $derived(Object.keys(option.components).length);
</script>

<svelte:head>
  <title>{option.name}: {option.nickname} | Future of Case Management</title>
  <meta name="description" content={option.tagline} />
</svelte:head>

<article style="--hue: var(--{option.hue}); --hue-tint: var(--{option.hue}-tint)">
  <header class="hero">
    <div class="wrap">
      <p class="count">Option {index + 1} of {options.length}</p>
      <h1>{option.name}</h1>
      <p class="nick">{option.nickname}</p>
      {#if option.tagline}<p class="tagline">{option.tagline}</p>{/if}
    </div>
  </header>

  <div class="wrap intro">
    <div class="summary">
      {#each option.summary as para}<p>{para}</p>{/each}
    </div>
    {#if option.facts.length}
      <dl class="facts">
        {#each option.facts as f}
          <div>
            <dt>{f.label}</dt>
            <dd>{f.value}</dd>
          </div>
        {/each}
      </dl>
    {/if}
  </div>

  <section class="wrap map" aria-labelledby="map-h">
    <div class="map-head">
      <h2 id="map-h">How the parts fit together</h2>
      <p>
        There are {partCount} parts. Select any part to see what it is, what it does, why it
        matters, and whether the ministry would build it or buy it.
      </p>
    </div>
    <Diagram {option} />
  </section>

  <section class="wrap verdict" aria-label="Strengths and cautions">
    <div class="col good">
      <h2>What it does well</h2>
      <ul>{#each option.goodAt as g}<li>{g}</li>{/each}</ul>
    </div>
    <div class="col watch">
      <h2>What to watch</h2>
      <ul>{#each option.watchOut as w}<li>{w}</li>{/each}</ul>
    </div>
  </section>

  <nav class="wrap onward" aria-label="Keep reading">
    <a class="next" href="{base}/options/{next.slug}/" style="--n: var(--{next.hue})">
      <span>Next option</span>
      <strong>{next.name}: {next.nickname}</strong>
    </a>
    <a class="plain" href="{base}/timeline/">See how long {option.name} would take</a>
  </nav>
</article>

<style>
  .hero {
    background: var(--hue);
    color: var(--on-hue);
    padding-block: clamp(3rem, 8vw, 6rem) clamp(2.5rem, 6vw, 4.5rem);
    position: relative;
    overflow: hidden;
  }
  /* contour lines: a quiet nod to a topographic map */
  .hero::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      repeating-radial-gradient(circle at 88% 120%, transparent 0 22px, color-mix(in srgb, var(--on-hue) 12%, transparent) 22px 23px);
    pointer-events: none;
  }
  .hero .wrap { position: relative; z-index: 1; }
  .hero h1 { margin: 0; }
  .count { font-family: var(--font-display); font-weight: 600; margin-bottom: 0.4rem; }
  .nick {
    font-family: var(--font-display);
    font-size: var(--step-2);
    font-weight: 500;
    margin: 0.2rem 0 1rem;
  }
  .tagline { font-size: var(--step-1); max-width: 40ch; margin: 0; }

  .intro {
    display: grid;
    gap: 2rem;
    padding-block: 3rem 1rem;
  }
  @media (min-width: 56rem) {
    .intro { grid-template-columns: 1.4fr 1fr; align-items: start; }
  }
  .summary p:first-child { font-size: var(--step-1); line-height: 1.5; }

  .facts {
    margin: 0;
    display: grid;
    gap: 0.75rem;
  }
  .facts div {
    background: var(--hue-tint);
    border-left: 6px solid var(--hue);
    border-radius: 0 var(--radius-m) var(--radius-m) 0;
    padding: 0.8rem 1rem;
  }
  .facts dt { font-size: var(--step--1); color: var(--ink-soft); }
  .facts dd {
    margin: 0.1rem 0 0;
    font-family: var(--font-display);
    font-weight: 750;
    font-size: var(--step-1);
    line-height: 1.2;
  }

  .map { padding-top: 3rem; }
  .map-head { margin-bottom: 1.5rem; }

  .verdict {
    display: grid;
    gap: 1.25rem;
    padding-top: 4rem;
  }
  @media (min-width: 50rem) { .verdict { grid-template-columns: 1fr 1fr; } }
  .col {
    border-radius: var(--radius-l);
    padding: 1.6rem 1.8rem 1rem;
    background: var(--surface);
    border: 2px solid var(--line);
  }
  .col h2 { font-size: var(--step-2); }
  .col ul { padding-left: 1.2rem; margin: 0 0 1rem; }
  .col li { margin-bottom: 0.6rem; }
  .good { border-top: 8px solid var(--moss); }
  .watch { border-top: 8px solid var(--ochre); }

  .onward {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem 2rem;
    padding-top: 4rem;
  }
  .next {
    display: grid;
    gap: 0.2rem;
    padding: 1.2rem 1.6rem;
    border-radius: var(--radius-m);
    background: var(--n);
    color: var(--on-hue);
    text-decoration: none;
    min-width: min(100%, 20rem);
  }
  .next strong { font-family: var(--font-display); font-size: var(--step-1); }
  .next:hover strong { text-decoration: underline; }
  .plain { font-weight: 700; }
</style>
