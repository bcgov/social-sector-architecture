import { sveltekit } from '@sveltejs/kit/vite';
import yaml from '@rollup/plugin-yaml';
import { defineConfig } from 'vite';

// Public OIDC configuration, baked in at build time. Unset means the sign-in
// curtain is inert and the site is open, which is how it builds locally.
const define = {
  __OIDC_ISSUER__: JSON.stringify(process.env.PUBLIC_OIDC_ISSUER ?? ''),
  __OIDC_CLIENT_ID__: JSON.stringify(process.env.PUBLIC_OIDC_CLIENT_ID ?? ''),
  __OIDC_IDP_HINT__: JSON.stringify(process.env.PUBLIC_OIDC_IDP_HINT ?? 'idir'),
  // The site's own base path. Asset URLs are emitted relative, which makes
  // import.meta.env.BASE_URL "./" and useless for building an absolute
  // redirect URI, so the deploy's BASE_PATH is carried through directly.
  __BASE_PATH__: JSON.stringify((process.env.BASE_PATH ?? '').replace(/\/$/, ''))
};

export default defineConfig({ plugins: [yaml(), sveltekit()], define });
