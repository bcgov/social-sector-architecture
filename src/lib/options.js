import s from './data/salesforce-s.js';
import h from './data/salesforce-h.js';
import e from './data/event-driven.js';

export const options = [s, h, e];
export const bySlug = Object.fromEntries(options.map((o) => [o.slug, o]));
export const byId = Object.fromEntries(options.map((o) => [o.id, o]));

export const approachLabel = {
  buy: 'Buy',
  build: 'Build',
  'open-source': 'Open source',
  platform: 'Comes with the platform',
  existing: 'Already in government'
};
