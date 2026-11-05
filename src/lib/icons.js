/** Inline SVG icon set. Stroke-based, 24px grid, currentColor. */

const s = (paths, opts = {}) =>
  `<svg viewBox="0 0 24 24" width="${opts.size || 20}" height="${opts.size || 20}" fill="none" stroke="currentColor" stroke-width="${opts.sw || 1.7}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths}</svg>`;

export const icons = {
  compass: () => s(`<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.1 4.9-4.9 2.1 2.1-4.9z"/>`),
  governance: () => s(`<path d="M12 3 3 7.5h18z"/><path d="M6 11v6M10 11v6M14 11v6M18 11v6"/><path d="M3 21h18"/>`),
  map: () => s(`<path d="m9 4 6 2 6-2v14l-6 2-6-2-6 2V6z"/><path d="M9 4v14M15 6v14"/>`),
  consent: () => s(`<path d="M4 5h16v10H8l-4 4z"/><path d="m9 10 2 2 3.5-3.5"/>`),
  rights: () => s(`<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6 1.2 0 2.3.3 3.2.9"/><path d="m15 17 2 2 4-4"/>`),
  network: () => s(`<circle cx="12" cy="5" r="2.4"/><circle cx="5" cy="18" r="2.4"/><circle cx="19" cy="18" r="2.4"/><path d="M12 7.4v4.2M12 11.6 6.3 16.2M12 11.6l5.7 4.6"/>`),
  retention: () => s(`<path d="M4 7h16"/><path d="M6 7v13h12V7"/><path d="M9 7V4h6v3"/><path d="M10 11v5M14 11v5"/>`),
  shield: () => s(`<path d="M12 3 5 6v6c0 4.3 2.9 8.2 7 9 4.1-.8 7-4.7 7-9V6z"/><path d="m9 12 2 2 4-4"/>`),
  document: () => s(`<path d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7z"/><path d="M14 3v4h4"/><path d="M9 12h6M9 16h6"/>`),
  people: () => s(`<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M16 5.2a3 3 0 0 1 0 5.6M17.5 14.2c2 .8 3.5 2.9 3.5 5.3"/>`),
  check: () => s(`<path d="m5 13 4 4 10-10"/>`, { size: 16, sw: 2.2 }),
  chevron: () => s(`<path d="m9 5 7 7-7 7"/>`, { size: 16 }),
  arrow: () => s(`<path d="M4 12h15M13 6l6 6-6 6"/>`, { size: 16 }),
  alert: () => s(`<circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16.5h.01"/>`, { size: 18 }),
  info: () => s(`<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 8h.01"/>`, { size: 18 }),
  clock: () => s(`<circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.2 2"/>`, { size: 18 }),
  lock: () => s(`<rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>`, { size: 18 }),
  scale: () => s(`<path d="M12 4v16M7 20h10"/><path d="M12 7 5 10l3 4h-3 3zM12 7l7 3-3 4h3-3"/>`, { size: 18 }),
  layers: () => s(`<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>`, { size: 18 }),
  target: () => s(`<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>`, { size: 18 }),
  route: () => s(`<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.5 6h5a4 4 0 0 1 0 8h-3a4 4 0 0 0 0 8h5"/>`, { size: 18 }),
  download: () => s(`<path d="M12 4v11M7.5 10.5 12 15l4.5-4.5"/><path d="M4 19h16"/>`, { size: 18 }),
  restart: () => s(`<path d="M20 12a8 8 0 1 1-2.6-5.9"/><path d="M20 4v4h-4"/>`, { size: 16 }),
  mail: () => s(`<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>`, { size: 18 }),
  pin: () => s(`<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>`, { size: 18 }),
  book: () => s(`<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 5.5v15"/>`, { size: 18 }),
  external: () => s(`<path d="M14 4h6v6"/><path d="M20 4 11 13"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>`, { size: 14 }),
  flag: () => s(`<path d="M5 21V4"/><path d="M5 5h11l-1.5 4L16 13H5z"/>`, { size: 18 }),
  grid: () => s(`<rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/>`, { size: 18 }),
  eye: () => s(`<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>`, { size: 18 }),
};

export const icon = (name, size) => {
  const fn = icons[name] || icons.check;
  const out = fn();
  if (!size) return out;
  return out.replace(/width="\d+" height="\d+"/, `width="${size}" height="${size}"`);
};

/** Brand mark: a "sattva" balance glyph built from a data lattice. */
export const brandMark = (cls = 'brand__mark') => `
<svg class="${cls}" viewBox="0 0 40 40" role="img" aria-label="DataSattva">
  <defs>
    <linearGradient id="bm-g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#2F80FF"/>
      <stop offset="100%" stop-color="#0B1F3A"/>
    </linearGradient>
  </defs>
  <rect x="0.5" y="0.5" width="39" height="39" rx="10" fill="url(#bm-g)"/>
  <path d="M12 26.5v-6.8M20 26.5V13M28 26.5v-9.6" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round" opacity="0.95"/>
  <path d="M9.5 30.5h21" stroke="#FFB020" stroke-width="2.4" stroke-linecap="round"/>
  <circle cx="20" cy="10.2" r="2.1" fill="#FFB020"/>
</svg>`;
