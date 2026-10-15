import { error } from '@sveltejs/kit';
import { bySlug, options } from '$lib/options.js';

export const entries = () => options.map((o) => ({ slug: o.slug }));

export function load({ params }) {
  const option = bySlug[params.slug];
  if (!option) error(404, 'No such option');
  return { slug: params.slug };
}
