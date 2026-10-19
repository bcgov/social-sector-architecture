<script>
  import { base } from '$app/paths';
  import content from '$lib/content/problems.yaml';

  const { intro, problems, placeholder } = content;

  const layers = [
    { key: 'see', label: 'What people see' },
    { key: 'apparent', label: 'What seems to cause it' },
    { key: 'real', label: 'What really causes it' }
  ];
</script>

<svelte:head>
  <title>The problem with ICM today | Future of Case Management</title>
  <meta name="description" content="Six problems with ICM, from what people see down to what really causes them." />
</svelte:head>

<header class="wrap head">
  <h1>Dig below the surface</h1>
  <p class="lede">{intro}</p>
  {#if placeholder}
    <p class="notice" role="note">
      <strong>Everyone agrees on the itch, nobody agrees on where to scratch.</strong> Despite the pervasiveness of the issues plaguing ICM, 
      identifying root causes so they can be resolved has proven elusive. After years of research, some core problems have become clear.
    </p>
  {/if}
</header>

<div class="wrap legend" aria-hidden="true">
  {#each layers as l, i}<span class="sw s{i + 1}">{l.label}</span>{/each}
</div>

<ol class="wrap list">
  {#each problems as p, i}
    <li class="problem">
      <div class="top">
        <span class="num" aria-hidden="true">{i + 1}</span>
        <div>
          <h2 id="p-{p.id}">{p.title}</h2>
          <p class="who">Felt by: {p.who}</p>
        </div>
      </div>
      <dl class="strata">
        {#each layers as l, j}
          <div class="layer s{j + 1}">
            <dt>{l.label}</dt>
            <dd>{p[l.key]}</dd>
          </div>
        {/each}
      </dl>
      {#if p.example}
        <p class="example"><span>Example</span> {p.example}</p>
      {/if}
    </li>
  {/each}
</ol>

<section class="wrap next">
  <h2>Three ways forward</h2>
  <p>Each option deals with these root causes in a different way. See what each one would change.</p>
  <a class="button" href="{base}/options/crm-s/">Start with SaaS CRM S</a>
</section>

<style>
  .head { padding-block: clamp(3rem, 8vw, 6rem) 1.5rem; }
  .head h1 { max-width: 12ch; }
  .notice {
    border: 2px dashed var(--ochre);
    border-radius: var(--radius-m);
    padding: 0.8rem 1rem;
    background: color-mix(in srgb, var(--ochre) 8%, var(--paper));
  }

  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2.5rem;
  }
  .sw {
    padding: 0.3rem 0.9rem;
    border-radius: 999px;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: var(--step--1);
  }

  .s1 { background: var(--soil-1); color: var(--ink); }
  .s2 { background: var(--soil-2); color: var(--ink); }
  .s3 { background: var(--soil-3); color: var(--soil-3-ink); }

  .list { list-style: none; padding: 0; display: grid; gap: 3.5rem; }

  .top { display: flex; gap: 1.2rem; align-items: flex-start; margin-bottom: 1rem; }
  .num {
    font-family: var(--font-display);
    font-weight: 820;
    font-size: var(--step-4);
    line-height: 0.85;
    color: var(--cedar);
    min-width: 1.2ch;
  }
  .top h2 { margin: 0.2rem 0 0.3rem; }
  .who { margin: 0; color: var(--ink-soft); font-weight: 700; }

  .strata {
    margin: 0;
    border-radius: var(--radius-l);
    overflow: hidden;
  }
  .layer {
    display: grid;
    gap: 0.3rem 2rem;
    padding: 1.2rem clamp(1.1rem, 3vw, 2rem);
  }
  @media (min-width: 50rem) {
    .layer { grid-template-columns: 14rem 1fr; }
  }
  /* each layer is deeper, so it sits a little further in, like a cut bank */
  .layer.s2 { padding-left: clamp(1.6rem, 5vw, 3.5rem); }
  .layer.s3 { padding-left: clamp(2.1rem, 7vw, 5rem); padding-block: 1.6rem; }
  .layer dt { font-family: var(--font-display); font-weight: 750; }
  .layer dd { margin: 0; max-width: 62ch; }
  .layer.s3 dd { font-size: var(--step-1); line-height: 1.45; }

  .example {
    margin-top: 1rem;
    font-size: var(--step--1);
    color: var(--ink-soft);
    max-width: 70ch;
  }
  .example span {
    font-family: var(--font-display);
    font-weight: 700;
    color: var(--ink);
    margin-right: 0.3rem;
  }

  .next {
    margin-top: 5rem;
    padding: clamp(2rem, 5vw, 3.5rem);
    border-radius: var(--radius-l);
    background: var(--river);
    color: var(--on-hue);
  }
  .button {
    display: inline-flex;
    align-items: center;
    min-height: 48px;
    padding: 0 1.5rem;
    border-radius: 999px;
    background: var(--on-hue);
    color: var(--river);
    font-family: var(--font-display);
    font-weight: 700;
    text-decoration: none;
  }
</style>
