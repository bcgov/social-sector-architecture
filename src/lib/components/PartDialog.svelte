<script>
  import { approachLabel } from '$lib/options.js';

  /** @type {{ option: any, partId: string | null, zoneName: string, onclose: () => void, onstep: (dir: number) => void, position: string }} */
  let { option, partId, zoneName, onclose, onstep, position } = $props();

  let dialog = $state();
  const part = $derived(partId ? option.components[partId] : null);

  $effect(() => {
    if (!dialog) return;
    if (part && !dialog.open) dialog.showModal();
    if (!part && dialog.open) dialog.close();
  });

  const watchLabel = { gap: 'Cannot be met', limit: 'Met in a weaker form', fixed: 'Fixed in this option', risk: 'Risk to watch' };
  const kindLabel = { buy: 'Buy', build: 'Build', 'open-source': 'Open source', existing: 'Already in government' };

  function onclick(e) {
    // a click on the backdrop lands on the dialog element itself
    if (e.target === dialog) dialog.close();
  }
</script>

<dialog
  bind:this={dialog}
  aria-labelledby="part-title"
  style="--hue: var(--{option.hue}); --hue-tint: var(--{option.hue}-tint)"
  onclose={onclose}
  {onclick}
>
  {#if part}
    <div class="sheet">
      <header>
        <p class="where">{option.name}, in {zoneName}</p>
        <h2 id="part-title">{part.name}</h2>
        {#if part.short}<p class="short">{part.short}</p>{/if}
        <button class="close" type="button" onclick={() => dialog.close()}>
          <span aria-hidden="true">✕</span><span class="visually-hidden">Close</span>
        </button>
      </header>

      <div class="body">
        <section>
          <h3>What it is</h3>
          <p>{part.what}</p>
        </section>
        <section>
          <h3>What it does</h3>
          <p>{part.does}</p>
        </section>
        <section class="why">
          <h3>Why it matters to you</h3>
          <p>{part.why}</p>
        </section>

        {#if part.watch}
          <aside class="watch {part.watch.tone}">
            <h3>{watchLabel[part.watch.tone]}</h3>
            <p>{part.watch.text}</p>
          </aside>
        {/if}

        {#if part.buildBuy}
          <section class="bb">
            <h3>Build or buy</h3>
            <p class="verdict">
              <span class="chip {part.buildBuy.approach}">{approachLabel[part.buildBuy.approach]}</span>
              {#if part.buildBuy.label}<span>{part.buildBuy.label}</span>{/if}
            </p>
            <p>{part.buildBuy.summary}</p>
            {#if part.buildBuy.options?.length}
              <h4>What was compared</h4>
              <ul class="compared">
                {#each part.buildBuy.options as o}
                  <li>
                    <span class="kind">{kindLabel[o.kind] ?? o.kind}</span>
                    <strong>{o.name}</strong>
                    {#if o.note}<span class="note">{o.note}</span>{/if}
                  </li>
                {/each}
              </ul>
            {/if}
            {#if part.procurement}
              <p class="proc">Has to be bought through a government procurement before work that needs it can start.</p>
            {/if}
          </section>
        {/if}
      </div>

      <footer>
        <button type="button" onclick={() => onstep(-1)}>Previous part</button>
        <span class="pos">{position}</span>
        <button type="button" onclick={() => onstep(1)}>Next part</button>
      </footer>
    </div>
  {/if}
</dialog>

<style>
  dialog {
    width: min(42rem, 100% - 2rem);
    max-height: min(90vh, 52rem);
    padding: 0;
    border: none;
    border-radius: var(--radius-l);
    background: var(--surface);
    color: var(--ink);
    box-shadow: 0 30px 80px -20px rgb(20 27 23 / 0.55);
  }
  dialog::backdrop {
    background: rgb(20 27 23 / 0.55);
    backdrop-filter: blur(3px);
  }
  dialog[open] { animation: rise 220ms cubic-bezier(0.2, 0.8, 0.2, 1); }
  @keyframes rise {
    from { opacity: 0; transform: translateY(16px) scale(0.98); }
  }
  .sheet { display: flex; flex-direction: column; max-height: inherit; }

  header {
    position: relative;
    padding: 1.6rem 4.5rem 1.4rem 1.75rem;
    background: var(--hue);
    color: var(--on-hue);
  }
  header h2 { font-size: var(--step-2); margin: 0.2rem 0 0.3rem; }
  .where { margin: 0; font-size: var(--step--1); opacity: 0.92; }
  .short { margin: 0; font-size: var(--step-0); }

  .close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 2px solid currentColor;
    background: transparent;
    color: inherit;
    font-size: 1.1rem;
    cursor: pointer;
  }

  .body { overflow-y: auto; padding: 1.4rem 1.75rem 0.5rem; }
  section { margin-bottom: 1.1rem; }
  h3 { font-size: var(--step-0); margin: 0 0 0.25rem; letter-spacing: 0; }
  h4 { font-family: var(--font-display); font-size: var(--step--1); margin: 0.9rem 0 0.4rem; }
  .why {
    border-left: 5px solid var(--hue);
    padding-left: 1rem;
  }
  .why p { font-size: var(--step-0); }

  .watch {
    border-radius: var(--radius-m);
    padding: 0.9rem 1.1rem 0.2rem;
    margin-bottom: 1.1rem;
    border: 2px solid;
  }
  .watch.gap { border-color: #9b2c1f; background: color-mix(in srgb, #9b2c1f 9%, var(--surface)); }
  .watch.limit { border-color: var(--ochre); background: color-mix(in srgb, var(--ochre) 10%, var(--surface)); }
  .watch.fixed { border-color: var(--moss); background: color-mix(in srgb, var(--moss) 10%, var(--surface)); }
  .watch.risk { border-color: var(--line-strong); border-style: dashed; background: var(--surface-2); }
  .watch h3::before { margin-right: 0.4rem; }
  .watch.gap h3::before { content: '✕'; }
  .watch.limit h3::before { content: '◐'; }
  .watch.fixed h3::before { content: '✓'; }
  .watch.risk h3::before { content: '!'; font-weight: 800; }

  .bb {
    background: var(--hue-tint);
    border-radius: var(--radius-m);
    padding: 1rem 1.1rem 0.4rem;
  }
  .verdict { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; font-weight: 700; }
  .chip {
    display: inline-block;
    padding: 0.15rem 0.7rem;
    border-radius: 999px;
    background: var(--ink);
    color: var(--paper);
    font-family: var(--font-display);
    font-size: var(--step--1);
    font-weight: 700;
  }
  .compared { list-style: none; padding: 0; margin: 0 0 0.8rem; display: grid; gap: 0.5rem; }
  .compared li {
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 0.6rem;
    align-items: baseline;
    font-size: var(--step--1);
  }
  .kind {
    grid-row: span 2;
    font-family: var(--font-display);
    font-weight: 700;
    border: 1.5px solid var(--line-strong);
    border-radius: 999px;
    padding: 0 0.5rem;
    white-space: nowrap;
  }
  .note { grid-column: 2; color: var(--ink-soft); }
  .proc {
    font-size: var(--step--1);
    font-weight: 700;
  }
  .proc::before { content: '◆ '; color: var(--ochre); }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    padding: 0.8rem 1.25rem;
    border-top: 1px solid var(--line);
  }
  footer button {
    min-height: 44px;
    padding: 0 1rem;
    border-radius: 999px;
    border: 2px solid var(--ink);
    background: transparent;
    color: var(--ink);
    font: 600 var(--step--1) var(--font-display);
    cursor: pointer;
  }
  footer button:hover { background: var(--ink); color: var(--paper); }
  .pos { font-size: var(--step--1); color: var(--ink-soft); }

  @media (max-width: 40rem) {
    dialog { width: 100%; max-width: 100%; max-height: 100%; height: 100%; border-radius: 0; }
    .sheet { height: 100%; }
    .body { flex: 1; }
  }
</style>
