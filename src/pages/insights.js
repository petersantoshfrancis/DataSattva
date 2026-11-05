import { pageHead, layout, pageHero, ctaCloser } from '../lib/layout.js';
import { icon } from '../lib/icons.js';
import { org, ctas, contact } from '../data/site.js';
import { insights, insightCategories, categoryLabel, getInsight } from '../data/insights.js';

/* Category slug → ?category= query support is handled by the static list plus
   client-side filtering in tools (see build). For simplicity and no-JS support,
   the index lists all articles and provides anchor links per category. */

export function insightsIndex() {
  const head = pageHead({
    title: 'Insights — DPDP Act & Rules explainers and privacy implementation | DataSattva',
    description:
      'Editorial writing on India’s DPDP Act and Rules, privacy governance, third-party data risk, consent management, data mapping and privacy technology — written for practitioners and business leaders.',
    path: '/insights/',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'DataSattva Insights',
        url: `${org.url}/insights/`,
        description: 'Explainers and practical writing on India’s data protection framework.',
        publisher: { '@type': 'Organization', name: 'DataSattva' },
      },
    ],
  });

  const byCategory = insightCategories
    .map((c) => ({ ...c, items: insights.filter((i) => i.category === c.slug) }))
    .filter((c) => c.items.length);

  const content = `
${pageHero({
  eyebrow: 'Insights & knowledge',
  title: 'Writing about the framework, and the work of implementing it.',
  lede: 'Explainers on the DPDP Act and Rules, and practical notes on governance, data mapping, third-party risk, consent and rights handling. Written for people who have to make the thing work.',
  crumbs: [{ label: 'Home', href: '/' }, { label: 'Insights' }],
})}

<section class="section">
  <div class="container">
    <p class="notice-strip">
      <span aria-hidden="true">${icon('info', 16)}</span>
      <span><strong>Editorial note.</strong> The articles below are draft content, published to demonstrate the editorial structure, categories and long-form layout. Publication dates and author details have not been supplied and are not invented. Regulatory statements in each article have been checked against the notified Act and Rules; anything unverified is flagged within the article.</span>
    </p>

    <div class="feature-strip">
      ${insights
        .slice(0, 1)
        .map(
          (a) => `<a class="feature-strip__link" href="/insights/${a.slug}/">
          <span class="tag tag--saffron">Start here</span>
          <span class="feature-strip__title">${a.title}</span>
          <span class="feature-strip__more">${a.readingTime} ${icon('arrow')}</span>
        </a>`
        )
        .join('')}
    </div>

    <div class="pill-nav" style="margin-bottom:2rem" role="navigation" aria-label="Categories">
      <a href="/insights/" aria-current="true">All (${insights.length})</a>
      ${byCategory.map((c) => `<a href="#cat-${c.slug}">${c.label} (${c.items.length})</a>`).join('')}
    </div>

    <div class="grid grid--3">
      ${insights
        .map((a, i) => {
          const featured = i === 0;
          return `<a class="card insight-card${featured ? ' insight-card--feature' : ''}" href="/insights/${a.slug}/">
        <div class="insight-card__top">
          <span class="insight-card__cat">${categoryLabel(a.category)}</span>
          ${a.draft ? '<span class="draft-badge">Draft content</span>' : ''}
        </div>
        <h3>${a.title}</h3>
        <p>${a.excerpt}</p>
        <div class="insight-card__foot">
          <span>${a.readingTime}</span><span aria-hidden="true">·</span>
          <span>${a.date || 'Publication date pending'}</span><span aria-hidden="true">·</span>
          <span>${a.author || 'Author to be confirmed'}</span>
        </div>
      </a>`;
        })
        .join('')}
    </div>
  </div>
</section>

<section class="section section--paper">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">By category</p>
      <h2>Browse the library</h2>
    </div>
    <div class="grid grid--2" style="gap:1rem">
      ${byCategory
        .map(
          (c) => `<div class="card" id="cat-${c.slug}">
        <div style="display:flex;justify-content:space-between;align-items:baseline;gap:0.75rem;flex-wrap:wrap">
          <h3 style="font-size:1rem;margin:0">${c.label}</h3>
          <span class="xsmall muted">${c.items.length} article${c.items.length > 1 ? 's' : ''}</span>
        </div>
        <ul style="list-style:none;padding:0;margin:0.85rem 0 0;display:grid;gap:0.55rem;font-size:0.88rem">
          ${c.items.map((a) => `<li style="margin:0"><a href="/insights/${a.slug}/">${a.title}</a></li>`).join('')}
        </ul>
      </div>`
        )
        .join('')}
    </div>
  </div>
</section>

${ctaCloser({
  title: 'Reading is the easy part.',
  body: 'Applying the framework to your own systems, contracts and processes is where the work is. Start with an indicative assessment, or a conversation about where your exposure sits.',
  primary: ctas.assessment,
  secondary: ctas.contact,
})}
`;

  return layout({ path: '/insights/', head, content, scripts: '<script src="/assets/main.js" defer></script>' });
}

export function insightPage(slug) {
  const a = getInsight(slug);
  if (!a) return null;

  const head = pageHead({
    title: `${a.title} | DataSattva Insights`,
    description: a.excerpt,
    path: `/insights/${a.slug}/`,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: a.title,
        description: a.excerpt,
        articleSection: categoryLabel(a.category),
        url: `${org.url}/insights/${a.slug}/`,
        publisher: { '@type': 'Organization', name: 'DataSattva', url: org.url },
        inLanguage: 'en-IN',
        isAccessibleForFree: true,
        ...(a.date ? { datePublished: a.date } : {}),
        ...(a.author ? { author: { '@type': 'Person', name: a.author } } : { author: { '@type': 'Organization', name: 'DataSattva' } }),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${org.url}/` },
          { '@type': 'ListItem', position: 2, name: 'Insights', item: `${org.url}/insights/` },
          { '@type': 'ListItem', position: 3, name: a.title, item: `${org.url}/insights/${a.slug}/` },
        ],
      },
    ],
  });

  const related = insights
    .filter((x) => x.slug !== a.slug)
    .sort((x, y) => (y.category === a.category ? 1 : 0) - (x.category === a.category ? 1 : 0))
    .slice(0, 2);

  const body = a.blocks
    .map((b) => {
      if (b.type === 'h2') return `<h2>${b.text}</h2>`;
      if (b.type === 'h3') return `<h3>${b.text}</h3>`;
      if (b.type === 'p') return `<p>${b.text}</p>`;
      if (b.type === 'ul') return `<ul>${b.items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
      if (b.type === 'ol') return `<ol>${b.items.map((i) => `<li>${i}</li>`).join('')}</ol>`;
      if (b.type === 'callout')
        return `<div class="callout"><p class="callout__title">${b.title}</p><p>${b.text}</p></div>`;
      if (b.type === 'quote') return `<blockquote class="pull-quote">${b.text}</blockquote>`;
      return '';
    })
    .join('\n');

  const content = `
${pageHero({
  eyebrow: categoryLabel(a.category),
  title: a.title,
  lede: a.lede,
  crumbs: [{ label: 'Home', href: '/' }, { label: 'Insights', href: '/insights/' }, { label: categoryLabel(a.category), href: '/insights/' }],
  meta: `<span>${a.readingTime}</span><span aria-hidden="true">·</span>
    <span>${a.author ? 'By ' + a.author : 'Author to be confirmed'}</span><span aria-hidden="true">·</span>
    <span>${a.date || 'Publication date pending'}</span>`,
})}

<section class="section">
  <div class="container">
    <div class="grid grid--sidebar">
      <article class="article-body">
        ${a.draft ? `<p class="notice-strip" style="margin-bottom:2rem"><span aria-hidden="true">${icon('info', 16)}</span><span><strong>Draft content.</strong> This article is published to demonstrate the editorial layout. Author and publication date have not been supplied and have not been invented. Regulatory statements have been checked against the notified Act and Rules.</span></p>` : ''}

        <div class="article-body__intro" style="font-size:1.08rem;line-height:1.65;color:var(--ink-70);border-left:3px solid var(--blue);padding-left:1.25rem;margin-bottom:2rem">
          ${a.excerpt}
        </div>

        ${body}

        <hr class="divider">
        <div class="notice-strip notice-strip--info" style="margin-bottom:0">
          <span aria-hidden="true">${icon('info', 16)}</span>
          <span>This article is general information about India’s data protection framework. It is not legal advice, it does not account for your organisation’s facts, and regulatory positions should be confirmed against the Act, the Rules and current Gazette notifications.</span>
        </div>

        <div class="card mt-7" style="background:var(--paper)">
          <h2 style="font-size:1.2rem">Where this fits in a programme</h2>
          <p class="small muted">The area discussed here is one of the twelve covered by our readiness assessment, and one of the ten advisory service areas. If it is the part of the framework you are currently working on, these are the most useful next steps.</p>
          <div class="btn-row mt-5">
            <a class="btn btn--primary btn--sm" href="${ctas.assessment.href}">Take the 3-minute assessment ${icon('arrow')}</a>
            <a class="btn btn--ghost btn--sm" href="/services/">See advisory services</a>
            <a class="btn btn--ghost btn--sm" href="/dpdp-act-and-rules/">Read the DPDP explainer</a>
          </div>
        </div>

        ${related.length ? `<div class="mt-7">
          <h2 style="font-size:1.2rem">Related articles</h2>
          <div class="related mt-5">
            ${related
              .map(
                (r) => `<a class="card insight-card" href="/insights/${r.slug}/">
              <div class="insight-card__top"><span class="insight-card__cat">${categoryLabel(r.category)}</span>${r.draft ? '<span class="draft-badge">Draft</span>' : ''}</div>
              <h3 style="font-size:1rem">${r.title}</h3>
              <div class="insight-card__foot"><span>${r.readingTime}</span></div>
            </a>`
              )
              .join('')}
          </div>
        </div>` : ''}
      </article>

      <aside>
        <div class="card aside-card">
          <p class="card__kicker">Article details</p>
          <dl style="margin:0.85rem 0 0;font-size:0.84rem">
            ${[
              ['Category', categoryLabel(a.category)],
              ['Reading time', a.readingTime],
              ['Author', a.author || 'To be confirmed'],
              ['Published', a.date || 'Pending'],
              ['Status', a.draft ? 'Draft content' : 'Published'],
            ]
              .map(
                ([k, v]) =>
                  `<div style="display:flex;gap:0.75rem;padding:0.45rem 0;border-bottom:1px solid var(--line-soft)"><dt style="color:var(--ink-50);flex:0 0 42%">${k}</dt><dd style="margin:0;color:var(--navy);flex:1">${v}</dd></div>`
              )
              .join('')}
          </dl>
          <hr class="divider" style="margin:1.25rem 0">
          <p class="card__kicker">Free assessment</p>
          <p class="small muted">An indicative view of your readiness across twelve obligation areas, in about three minutes.</p>
          <a class="btn btn--primary btn--sm btn--block mt-5" href="${ctas.assessment.href}">${ctas.assessmentShort.label}</a>
          <p class="xsmall muted mt-5 mb-0">Questions about this article? Write to <a href="mailto:${contact.email}">${contact.email}</a>.</p>
        </div>
      </aside>
    </div>
  </div>
</section>

${ctaCloser()}
`;

  return layout({ path: `/insights/${a.slug}/`, head, content, scripts: '<script src="/assets/main.js" defer></script>' });
}
