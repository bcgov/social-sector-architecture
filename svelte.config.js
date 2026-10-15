import adapter from '@sveltejs/adapter-static';

const base = process.env.BASE_PATH ?? '';

export default {
  kit: {
    adapter: adapter({ fallback: '404.html', strict: true }),
    paths: { base, relative: true },
    prerender: { handleHttpError: 'warn' }
  }
};
