<script>
  // The curtain. Shown in place of the page when nobody is signed in.
  let { onSignIn, busy = false, error = '' } = $props();
</script>

<div class="gate">
  <div class="panel">
    <span class="mark" aria-hidden="true"><i></i><i></i><i></i></span>

    <h1>Future of Case Management</h1>

    <p>
      This is an internal working draft. Sign in with your government account to read it.
    </p>

    {#if error}
      <p class="error" role="alert">{error}</p>
    {/if}

    <button class="go" onclick={onSignIn} disabled={busy}>
      {busy ? 'Signing in…' : 'Sign in with IDIR'}
    </button>

    <p class="fine">
      Nothing on this site is a government commitment, and none of it is a record of any real
      person.
    </p>
  </div>
</div>

<style>
  .gate {
    min-height: 70vh;
    display: grid;
    place-items: center;
    padding: 2rem var(--gutter);
  }
  .panel {
    max-width: 34rem;
  }
  .mark {
    display: inline-grid;
    gap: 3px;
    width: 2rem;
  }
  .mark i {
    display: block;
    height: 7px;
    border-radius: 4px;
  }
  .mark i:nth-child(1) { background: var(--river); }
  .mark i:nth-child(2) { background: var(--moss); width: 80%; }
  .mark i:nth-child(3) { background: var(--cedar); width: 60%; }
  h1 {
    font-size: var(--step-3);
    margin: 0.8rem 0 0.6rem;
  }
  p {
    color: var(--ink-soft);
    max-width: 46ch;
  }
  .go {
    font-family: var(--font-display);
    font-size: var(--step-0);
    font-weight: 700;
    margin: 1.4rem 0 1.8rem;
    padding: 0.7rem 1.4rem;
    min-height: 44px;
    border: 0;
    border-radius: 999px;
    background: var(--ink);
    color: var(--paper);
    cursor: pointer;
  }
  .go:hover:not(:disabled) {
    background: color-mix(in srgb, var(--ink) 85%, var(--paper));
  }
  .go:disabled {
    cursor: progress;
    opacity: 0.7;
  }
  .error {
    color: var(--ink);
    border-left: 3px solid var(--ochre);
    padding-left: 0.8rem;
  }
  .fine {
    font-size: var(--step--1);
  }
</style>
