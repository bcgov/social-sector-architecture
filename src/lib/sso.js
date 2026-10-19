// A sign-in curtain over a static site.
//
// This is not access control. The site is prerendered and served by GitHub
// Pages, so every word is in the HTML before anyone signs in, and anyone who
// reads the page source or the repository can read it. What this gives you is
// an unambiguous "this is internal, sign in with your IDIR" front door.
//
// Authorization code flow with PKCE against Pathfinder SSO (Keycloak). The
// client must be registered as a *public* client: a static site cannot keep a
// client secret. Configured at build time with PUBLIC_OIDC_ISSUER and
// PUBLIC_OIDC_CLIENT_ID; with either unset the curtain is inert and the site
// behaves as it always has.

const ISSUER = __OIDC_ISSUER__.replace(/\/$/, '');
const CLIENT_ID = __OIDC_CLIENT_ID__;
const IDP_HINT = __OIDC_IDP_HINT__;

const HELD = 'sso.held';
const FLIGHT = 'sso.flight';
const CONFIG = 'sso.config';

export const enabled = Boolean(ISSUER && CLIENT_ID);

const store = {
  get(key) {
    try {
      const raw = sessionStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* private window, or storage disabled: the sign-in will not persist */
    }
  },
  drop(key) {
    try {
      sessionStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  }
};

function random(bytes) {
  const a = new Uint8Array(bytes);
  crypto.getRandomValues(a);
  return [...a].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function base64url(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

async function challenge(verifier) {
  return base64url(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier)));
}

function claimsOf(jwt) {
  try {
    const payload = jwt.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(payload), (c) => c.charCodeAt(0))));
  } catch {
    return {};
  }
}

async function discover() {
  const cached = store.get(CONFIG);
  if (cached?.issuer === ISSUER) return cached.doc;
  const res = await fetch(`${ISSUER}/.well-known/openid-configuration`);
  if (!res.ok) throw new Error(`The sign-in service did not respond (${res.status}).`);
  const doc = await res.json();
  store.set(CONFIG, { issuer: ISSUER, doc });
  return doc;
}

// The redirect URI has to match what is registered, exactly, so every sign-in
// comes back to the site root and we restore the page they wanted afterwards.
function redirectUri() {
  return `${location.origin}${__BASE_PATH__}/`;
}

export function session() {
  if (!enabled) return null;
  const held = store.get(HELD);
  if (!held) return null;
  if (Date.now() >= held.expires_at) {
    store.drop(HELD);
    return null;
  }
  return held;
}

export async function signIn(returnTo = location.pathname + location.search) {
  const { authorization_endpoint } = await discover();
  const verifier = random(48);
  const state = random(16);
  store.set(FLIGHT, { verifier, state, returnTo });

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    scope: 'openid profile email',
    redirect_uri: redirectUri(),
    state,
    code_challenge: await challenge(verifier),
    code_challenge_method: 'S256'
  });
  if (IDP_HINT) params.set('kc_idp_hint', IDP_HINT);

  location.assign(`${authorization_endpoint}?${params}`);
}

// Returns the path to return to once a redirect has been exchanged, or null
// when this page load is not a sign-in callback.
export async function complete() {
  const url = new URL(location.href);
  const code = url.searchParams.get('code');
  const failure = url.searchParams.get('error');
  if (!code && !failure) return null;

  const flight = store.get(FLIGHT);
  store.drop(FLIGHT);
  const clean = () => history.replaceState(null, '', url.pathname);

  if (failure) {
    clean();
    throw new Error(url.searchParams.get('error_description') || failure);
  }
  if (!flight || flight.state !== url.searchParams.get('state')) {
    clean();
    throw new Error('That sign-in could not be verified. Please try again.');
  }

  const { token_endpoint } = await discover();
  const res = await fetch(token_endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: CLIENT_ID,
      code,
      redirect_uri: redirectUri(),
      code_verifier: flight.verifier
    })
  });
  clean();
  if (!res.ok) throw new Error(`Sign-in did not complete (${res.status}).`);

  const granted = await res.json();
  const who = claimsOf(granted.id_token ?? '');
  store.set(HELD, {
    hint: granted.id_token,
    expires_at: Date.now() + (granted.expires_in ?? 300) * 1000,
    name: who.display_name || who.name || who.preferred_username || 'Signed in',
    email: who.email ?? ''
  });
  return flight.returnTo || null;
}

export async function signOut() {
  const held = store.get(HELD);
  store.drop(HELD);
  const { end_session_endpoint } = await discover();
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    post_logout_redirect_uri: redirectUri()
  });
  if (held?.hint) params.set('id_token_hint', held.hint);
  location.assign(`${end_session_endpoint}?${params}`);
}
