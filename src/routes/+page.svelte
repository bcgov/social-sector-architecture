<script>
  import { base } from '$app/paths';
  import { options, byId } from '$lib/options.js';
  import { hero, why, optionsIntro, compare, howToRead, cta } from '$lib/data/home.js';
</script>

<svelte:head>
  <title>Future of Case Management: three ways to replace ICM</title>
  <meta name="description" content={hero.lede} />
</svelte:head>

<section class="hero" aria-labelledby="hero-h">
  <div class="wrap">
    <h1 id="hero-h">{hero.title}</h1>
    <p class="lede">{hero.lede}</p>
  </div>

  <ul class="strata wrap">
    {#each options as o, i}
      <li style="--hue: var(--{o.hue}); --i: {i}">
        <a href="{base}/options/{o.slug}/">
          <span class="n" aria-hidden="true">{i + 1}</span>
          <span class="name">{o.name}</span>
          <span class="nick">{o.nickname}</span>
          <span class="tag">{o.tagline}</span>
        </a>
      </li>
    {/each}
  </ul>
</section>

<section class="wrap why" aria-labelledby="why-h">
  <h2 id="why-h">{why.heading}</h2>
  <div class="why-body">
    {#each why.paragraphs as p}<p>{p}</p>{/each}
    <p><a class="link" href="{base}/problems/">Read about the problems with ICM today</a></p>
  </div>
</section>

<section class="band" aria-labelledby="read-h">
  <div class="wrap read">
    <div>
      <h2 id="read-h">{optionsIntro.heading}</h2>
      <p>{optionsIntro.text}</p>
    </div>
    <div class="howto">
      <h3>{howToRead.heading}</h3>
      <ol>
        {#each howToRead.steps as s}<li>{s}</li>{/each}
      </ol>
    </div>
  </div>
</section>

<section class="wrap compare" aria-labelledby="cmp-h">
  <h2 id="cmp-h">{compare.heading}</h2>
  <table>
    <thead>
      <tr>
        <td></td>
        {#each ['s', 'h', 'e'] as k}
          <th scope="col" style="--hue: var(--{byId[k].hue})">
            <a href="{base}/options/{byId[k].slug}/">{byId[k].name}</a>
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each compare.rows as r}
        <tr>
          <th scope="row">{r.question}</th>
          {#each ['s', 'h', 'e'] as k}
            <td data-label={byId[k].name} style="--hue: var(--{byId[k].hue})">{r[k]}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</section>

<section class="wrap cta" aria-labelledby="cta-h">
  <h2 id="cta-h">{cta.heading}</h2>
  <p>{cta.text}</p>
  <a class="button" href="{base}/timeline/">See the timelines</a>
</section>

<style>
  .hero { padding-block: clamp(3rem, 9vw, 7rem) 2rem; }
  .hero h1 {
    max-width: 14ch;
    margin-bottom: 1.5rem;
  }
  .hero .lede { max-width: 46ch; margin-bottom: 3rem; }

  /* the three options as stacked strata */
  .strata {
    list-style: none;
    padding: 0;
    display: grid;
    gap: 0;
  }
  .strata li {
    animation: settle 700ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
    animation-delay: calc(var(--i) * 120ms + 150ms);
  }
  @keyframes settle {
    from { opacity: 0; transform: translateY(-18px); }
  }
  .strata a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-areas: 'n name' 'n nick' 'n tag';
    column-gap: 1.25rem;
    padding: 1.5rem clamp(1.2rem, 3vw, 2.5rem);
    background: var(--hue);
    color: var(--on-hue);
    text-decoration: none;
    transition: padding 180ms ease;
  }
  .strata li:first-child a { border-radius: var(--radius-l) var(--radius-l) 0 0; }
  .strata li:last-child a { border-radius: 0 0 var(--radius-l) var(--radius-l); }
  .strata a:hover { padding-left: clamp(1.8rem, 4vw, 3.5rem); }
  .strata a:hover .name { text-decoration: underline; text-decoration-thickness: 0.06em; }
  @media (min-width: 56rem) {
    .strata a {
      grid-template-columns: 4rem minmax(12rem, 1fr) 1.4fr;
      grid-template-areas: 'n name tag' 'n nick tag';
      align-items: center;
    }
  }
  .n {
    grid-area: n;
    font-family: var(--font-display);
    font-weight: 820;
    font-size: var(--step-3);
    line-height: 1;
    opacity: 0.55;
  }
  .name {
    grid-area: name;
    font-family: var(--font-display);
    font-weight: 800;
    font-size: var(--step-3);
    letter-spacing: -0.03em;
    line-height: 1;
  }
  .nick { grid-area: nick; font-family: var(--font-display); font-weight: 500; font-size: var(--step-1); }
  .tag { grid-area: tag; margin-top: 0.6rem; max-width: 46ch; }

  .why {
    display: grid;
    gap: 1rem 3rem;
    padding-block: 5rem 4rem;
  }
  @media (min-width: 56rem) { .why { grid-template-columns: 1fr 1.3fr; } }
  .why-body p:first-child { font-size: var(--step-1); line-height: 1.5; }
  .link { font-weight: 700; }

  .band {
    background: var(--surface-2);
    padding-block: 4rem;
  }
  .read { display: grid; gap: 2rem 3rem; }
  @media (min-width: 56rem) { .read { grid-template-columns: 1.2fr 1fr; } }
  .howto {
    background: var(--surface);
    border-radius: var(--radius-l);
    padding: 1.5rem 1.75rem 0.75rem;
  }
  .howto ol { padding-left: 1.3rem; }
  .howto li { margin-bottom: 0.6rem; }
  .howto li::marker { font-family: var(--font-display); font-weight: 800; }

  .compare { padding-top: 5rem; }
  table { width: 100%; border-collapse: separate; border-spacing: 0; }
  thead th {
    text-align: left;
    padding: 0.8rem 1rem;
    background: var(--hue);
    font-family: var(--font-display);
    font-size: var(--step-1);
  }
  thead th a { color: var(--on-hue); }
  thead th:nth-child(2) { border-radius: var(--radius-m) 0 0 0; }
  thead th:last-child { border-radius: 0 var(--radius-m) 0 0; }
  tbody th {
    text-align: left;
    font-family: var(--font-display);
    font-weight: 700;
    padding: 1rem 1.25rem 1rem 0;
    vertical-align: top;
    width: 22%;
  }
  tbody td {
    padding: 1rem;
    vertical-align: top;
    border-bottom: 1px solid var(--line);
    background: var(--surface);
  }
  tbody tr th { border-bottom: 1px solid var(--line); }

  @media (max-width: 47.99rem) {
    thead { display: none; }
    table, tbody, tr, th, td { display: block; width: auto; }
    tbody tr { margin-bottom: 1.5rem; }
    tbody th { padding: 0 0 0.5rem; border: none !important; font-size: var(--step-1); }
    tbody td {
      border-left: 6px solid var(--hue);
      border-bottom: none;
      margin-bottom: 0.4rem;
      border-radius: 0 var(--radius-s) var(--radius-s) 0;
    }
    tbody td::before {
      content: attr(data-label);
      display: block;
      font-family: var(--font-display);
      font-weight: 700;
      font-size: var(--step--1);
    }
  }

  .cta {
    margin-top: 5rem;
    padding: clamp(2rem, 5vw, 3.5rem);
    border-radius: var(--radius-l);
    background: var(--ink);
    color: var(--paper);
  }
  .cta h2 { max-width: 20ch; }
  .button {
    display: inline-flex;
    align-items: center;
    min-height: 48px;
    padding: 0 1.5rem;
    border-radius: 999px;
    background: var(--paper);
    color: var(--ink);
    font-family: var(--font-display);
    font-weight: 700;
    text-decoration: none;
  }
  .button:hover { background: var(--focus-halo); color: #1f2a24; }
</style>
