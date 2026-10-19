<script>
  import '@fontsource-variable/schibsted-grotesk';
  import '@fontsource/atkinson-hyperlegible-next/400.css';
  import '@fontsource/atkinson-hyperlegible-next/400-italic.css';
  import '@fontsource/atkinson-hyperlegible-next/700.css';
  import '../app.css';
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { base } from '$app/paths';
  import { goto } from '$app/navigation';
  import { options } from '$lib/options.js';
  import SignIn from '$lib/components/SignIn.svelte';
  import { enabled as gateOn, session, signIn, signOut, complete } from '$lib/sso.js';

  let { children } = $props();

  // The page is prerendered with its content in place, so `locked` starts
  // false and the curtain is drawn after hydration. app.html hides the
  // content before first paint so the copy is not flashed on the way.
  let locked = $state(false);
  let who = $state(null);
  let busy = $state(false);
  let gateError = $state('');

  function settle() {
    who = session();
    locked = gateOn && !who;
    // app.html hid the prerendered content before paint; hydration owns it now.
    document.documentElement.removeAttribute('data-prelock');
  }

  onMount(async () => {
    if (!gateOn) return;
    settle();
    try {
      const returnTo = await complete();
      settle();
      if (returnTo) await goto(returnTo, { replaceState: true });
    } catch (e) {
      gateError = e instanceof Error ? e.message : String(e);
      settle();
    }
  });

  async function startSignIn() {
    busy = true;
    gateError = '';
    try {
      await signIn(page.url.pathname);
    } catch (e) {
      gateError = e instanceof Error ? e.message : String(e);
      busy = false;
    }
  }

  const links = [
    { href: '/problems/', label: 'The problem' },
    ...options.map((o) => ({ href: `/options/${o.slug}/`, label: o.name, hue: o.hue })),
    { href: '/timeline/', label: 'Timeline' }
  ];

  const current = (href) => page.url.pathname.replace(base, '') === href;
</script>

<svelte:head>
  {#if gateOn}<meta name="sso-gate" content="on" />{/if}
</svelte:head>

<a class="skip" href="#main">Skip to content</a>

<header class="masthead">
  <div class="wrap bar">
    <a class="brand" href="{base}/">
      <span class="mark" aria-hidden="true"><i></i><i></i><i></i></span>
      <span>Future of Case Management</span>
    </a>
    {#if locked}
      {#if who}
        <p class="who">Signed in as {who.name} <button class="out" onclick={signOut}>Sign out</button></p>
      {/if}
    {:else}
    <nav aria-label="Main">
      <ul>
        {#each links as l}
          <li>
            <a
              href="{base}{l.href}"
              aria-current={current(l.href) ? 'page' : undefined}
              style={l.hue ? `--hue: var(--${l.hue})` : undefined}
              class:option={l.hue}>{l.label}</a
            >
          </li>
        {/each}
      </ul>
    </nav>
    {/if}
  </div>
</header>

<main id="main" tabindex="-1">
  {#if locked}
    <SignIn onSignIn={startSignIn} {busy} error={gateError} />
  {:else}
    {@render children()}
  {/if}
</main>

<footer class="foot">
  <div class="wrap">
    <p>
      A brief guide on three options for replacing ICM. It draws on six years of research and daily experience with ICM, and the feedback, advice,
      grievances, and analyses of dozens. Nothing herein is an official government position, decision, or commitment. It is offered for discussion and consideration. 
      Views are those of the author and may not reflect the official position of government.
    </p>
    <p class="draft">Draft for discussion</p>
  </div>
</footer>

<style>
  .masthead {
    position: sticky;
    top: 0;
    z-index: 20;
    background: color-mix(in srgb, var(--paper) 92%, transparent);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--line);
  }
  @media (max-width: 48rem) {
    .masthead { position: static; }
  }
  .bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem 1.5rem;
    padding-block: 0.6rem;
  }
  .brand {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    font-family: var(--font-display);
    font-weight: 760;
    letter-spacing: -0.01em;
    text-decoration: none;
    min-height: 44px;
  }
  .mark {
    display: inline-grid;
    gap: 2px;
    width: 1.4rem;
  }
  .mark i {
    display: block;
    height: 5px;
    border-radius: 3px;
  }
  .mark i:nth-child(1) { background: var(--river); }
  .mark i:nth-child(2) { background: var(--moss); width: 80%; }
  .mark i:nth-child(3) { background: var(--cedar); width: 60%; }

  nav ul {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  nav a {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    min-height: 44px;
    padding: 0 0.75rem;
    border-radius: 999px;
    font-family: var(--font-display);
    font-weight: 600;
    font-size: var(--step--1);
    text-decoration: none;
  }
  nav a.option::before {
    content: '';
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
    background: var(--hue);
  }
  nav a:hover { background: var(--surface-2); }
  nav a[aria-current='page'] {
    background: var(--ink);
    color: var(--paper);
  }

  .who {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin: 0;
    font-family: var(--font-display);
    font-size: var(--step--1);
    color: var(--ink-soft);
  }
  .out {
    font: inherit;
    color: var(--ink);
    background: none;
    border: 1px solid var(--line-strong);
    border-radius: 999px;
    min-height: 44px;
    padding: 0 0.9rem;
    cursor: pointer;
  }
  .out:hover { background: var(--surface-2); }

  main:focus { outline: none; }

  .foot {
    margin-top: 6rem;
    padding-block: 2.5rem 3rem;
    background: var(--ink);
    color: var(--paper);
  }
  .foot p { color: inherit; }
  .draft {
    display: inline-block;
    font-family: var(--font-display);
    font-weight: 700;
    border: 2px solid currentColor;
    border-radius: 999px;
    padding: 0.2rem 0.8rem;
  }
</style>
