# Future of Case Management: the three options

A plain-language site for interest-holders who know the business but not the
technology. It covers three ways to replace ICM: SaaS CRM S, SaaS CRM H and
event-driven. Each option has a diagram you can click. There is also a page on
today's problems and a switchable delivery timeline.

This is a separate project from `../site`, with its own repository. Like that
site, it publishes to GitHub Pages and can sit behind an IDIR sign-in curtain.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in build/
npm run preview
```

## Publishing to GitHub Pages

`.github/workflows/pages.yml` builds and deploys on every push to `main`. It
runs the copy check first, so a deploy fails if the wording differs from
`copy.lock.txt`. To switch it on, once the repository is on GitHub:

1. Settings → Pages → Build and deployment → Source: **GitHub Actions**.
2. Push to `main`, or run the workflow by hand from the Actions tab.

The site is served from `https://<org>.github.io/<repo>/`. The workflow sets
`BASE_PATH` to `/<repo>` from the repository name, so renaming the repository
needs nothing else. For a user or org site (`<org>.github.io`), change
`BASE_PATH` in the workflow to an empty string. `static/.nojekyll` stops Pages
running Jekyll over the build, which would drop the `_app` folder.

## The sign-in curtain

The site can ask for a government sign-in before it shows anything. It is
**a curtain, not access control.** The pages are prerendered, so every word is
in the HTML before anyone signs in, and anyone who reads the page source or a
public repository can read it. If the content needs real protection it has to
move off Pages, behind a server that checks the session.

It is off unless configured. Set these repository variables (Settings →
Secrets and variables → Actions → Variables):

| Variable | Value |
| --- | --- |
| `PUBLIC_OIDC_ISSUER` | `https://loginproxy.gov.bc.ca/auth/realms/standard` (`dev.` and `test.` prefixes for the other environments) |
| `PUBLIC_OIDC_CLIENT_ID` | the client ID from your SSO integration request |
| `PUBLIC_OIDC_IDP_HINT` | optional, defaults to `idir`; skips the identity-provider chooser |

Request the client from the Common Hosted Single Sign-On self-service app at
https://bcgov.github.io/sso-requests/:

- Ask for a **public** client. A static site cannot keep a secret, so this uses
  authorization code flow with PKCE.
- Register the site root, `https://<org>.github.io/<repo>/`, as the redirect
  URI and the post-logout redirect URI. Every sign-in returns there and the app
  restores the page the reader asked for. Add `http://localhost:5173/` to sign
  in while developing. This must be a separate client from `../site`'s, or that
  client must list both sites' URIs.

To try it locally:

```bash
PUBLIC_OIDC_ISSUER=https://dev.loginproxy.gov.bc.ca/auth/realms/standard \
PUBLIC_OIDC_CLIENT_ID=<your-client-id> \
npm run dev
```

With the variables unset, `npm run dev` and `npm run build` give an open site.

How it works: `src/lib/sso.js` holds the flow (the same file as `../site`),
`src/lib/components/SignIn.svelte` is the panel, and `+layout.svelte` decides
after hydration whether to show the page or the panel. The session lives in
`sessionStorage` and lasts as long as the tab. The inline script in `app.html`
hides the prerendered content before first paint so it is not flashed on the
way to the sign-in panel.

## Editing copy

1. Edit the words in the YAML files in `src/lib/content/`. `EDITING.md` explains
   the format: change the words, and keep the field names and indentation.
2. Check it in the browser with `npm run dev`.
3. Save it:

   ```bash
   npm run copy:save -- "Rewrite the Route H ledger explanation"
   ```

   This updates `copy.lock.txt` and commits your text and the lock together.

Your wording is protected in three ways:

- **The lock.** `copy.lock.txt` holds every string. `npm run copy:check` lists any
  string that differs from it, by location, e.g.
  `crm-h › components › ledger › why`.
- **The commit check.** A git pre-commit hook runs the copy check. Code changes
  that alter wording can't be committed unless the lock is updated too, and only
  `copy:save` / `copy:update` do that.
- **The Claude hook.** `scripts/guard-copy.sh` (wired in `../.claude/settings.json`)
  stops Claude from rewriting whole copy files. It also asks you first before
  Claude edits a content file that is new or has uncommitted changes, or runs `copy:save` /
  `copy:update`. `CLAUDE.md` sets out the same rules.

If you're midway through edits and want Claude to do other work, commit your
draft first with `copy:save`, or just leave it uncommitted and Claude will ask
before touching those files.

## Where the words live

Words and structure are kept apart:

- `src/lib/content/*.yaml`: every reader-facing word. `EDITING.md` lists the
  files, the format and the writing rules.
- `src/lib/structure/*.js`: each diagram's layout. `layout.areas` places the
  zones, and `zones[].groups[].parts` lists the parts in reading order, which the
  dialog's previous and next buttons follow.
- `src/lib/build-option.js` joins the two and stops the build with a list of
  mismatches if a part is in one but not the other.

## Design

- One colour per option, used everywhere: river (S), moss (H), cedar (event-driven).
- Schibsted Grotesk for headings, Atkinson Hyperlegible Next for body text. Both are self-hosted.
- Diagram parts are real buttons in an HTML grid. Each opens a native `<dialog>`,
  which traps focus, closes on Escape, and returns focus to the part.
- Part labels: *Cannot be met*, *Weaker form*, *Fixed here*, *Risk*, *Procure*.
  Each label is text, so colour is never the only signal.

## Accessibility

Target is WCAG 2.2 AA. Checked with axe-core 4.10 in light and dark modes, at
desktop and phone widths. Targets are at least 44px, motion respects
`prefers-reduced-motion`, and the header stops being sticky on narrow screens so
it can't cover focused items.

## Sources

Facts come from the project's research in `../projects/001-icm-modernization/`:
RSCH-005 v1.1 for the SaaS CRM routes, target-architecture-v2 and RSCH-002
v1.4 for event-driven, and RSCH-003 v1.1 and ADR-010 for payments. Nothing on
the site is a government decision.
