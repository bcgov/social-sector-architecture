import { buildOption } from './build-option.js';
import sStructure from './structure/salesforce-s.js';
import hStructure from './structure/salesforce-h.js';
import eStructure from './structure/event-driven.js';
import sWords from './content/salesforce-s.yaml';
import hWords from './content/salesforce-h.yaml';
import eWords from './content/event-driven.yaml';

export const options = [
  buildOption(sStructure, sWords),
  buildOption(hStructure, hWords),
  buildOption(eStructure, eWords)
];
export const bySlug = Object.fromEntries(options.map((o) => [o.slug, o]));
export const byId = Object.fromEntries(options.map((o) => [o.id, o]));

export const approachLabel = {
  buy: 'Buy',
  build: 'Build',
  'open-source': 'Open source',
  platform: 'Comes with the platform',
  existing: 'Already in government'
};
