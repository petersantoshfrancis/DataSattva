/* =============================================================================
   DataSattva DPDP Readiness Assessment — client runtime
   Runs entirely in the browser. Answers are never transmitted; the score,
   findings and downloadable summary are produced locally.
   ============================================================================= */
(function () {
  'use strict';

  var DATA = window.__DS_ASSESSMENT__;
  if (!DATA) return;

  var form = document.getElementById('assess-form');
  if (!form) return;

  var Q = DATA.questions;
  var MAXWEIGHT = Q.reduce(function (s, q) { return s + 3 * q.weight; }, 0);

  var steps = Array.prototype.slice.call(form.querySelectorAll('[data-step]'));
  var progressFill = document.querySelector('[data-progress-fill]');
  var progressText = document.querySelector('[data-progress-text]');
  var formWrap = document.getElementById('assess-form-wrap');
  var resultsEl = document.getElementById('assess-results');
  var live = document.getElementById('assess-live');
  var current = 0;

  /* ---------------------------------------------------------------- helpers */
  function announce(msg) {
    if (live) { live.textContent = ''; window.setTimeout(function () { live.textContent = msg; }, 60); }
  }

  function severity(score, weight) {
    if (score >= 3) return null;
    if (score === 0) return weight === 3 ? 'critical' : 'high';
    if (score === 1) return weight >= 2 ? 'critical' : 'high';
    if (score === 2) return weight === 3 ? 'high' : 'moderate';
    return null;
  }

  function categoryFor(pct, criticalCount) {
    var base;
    if (pct >= 85) base = DATA.categories[0];
    else if (pct >= 65) base = DATA.categories[1];
    else if (pct >= 45) base = DATA.categories[2];
    else base = DATA.categories[3];

    var order = ['leading', 'established', 'developing', 'foundational'];
    var idx = order.indexOf(base.key);
    if (criticalCount > 0 && idx < 2) {
      base = DATA.categories[2];
      base = Object.assign({}, base, {
        capped: true,
        summary:
          base.summary +
          ' The overall band has been limited because one or more foundational areas scored at the lowest level: a strong average does not offset a missing core obligation.',
      });
    }
    if (criticalCount >= 3 && idx < 3) {
      base = Object.assign({}, DATA.categories[3], {
        capped: true,
        summary:
          DATA.categories[3].summary +
          ' Three or more foundational areas scored at the lowest level, which places the practice at the earliest stage regardless of the average.',
      });
    }
    return base;
  }

  function val(name) {
    var els = form.querySelectorAll('[name="' + name + '"]');
    for (var i = 0; i < els.length; i++) {
      if (els[i].type === 'radio') { if (els[i].checked) return els[i].value; }
      else if (els[i].value) return els[i].value.trim();
    }
    return '';
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* ------------------------------------------------------------- navigation */
  function showStep(i, focusHeading) {
    current = Math.max(0, Math.min(steps.length - 1, i));
    steps.forEach(function (s, idx) {
      s.hidden = idx !== current;
    });
    var pct = Math.round((current / (steps.length - 1)) * 100);
    if (progressFill) progressFill.style.width = pct + '%';
    if (progressText) {
      progressText.textContent =
        current === 0 ? 'Step 1 of 3 · Organisation profile'
        : current === 1 ? 'Step 2 of 3 · Readiness questions'
        : 'Step 3 of 3 · Review and results';
    }
    if (focusHeading) {
      var h = steps[current].querySelector('[data-step-heading]');
      if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
      var top = document.getElementById('start');
      if (top) window.scrollTo({ top: top.offsetTop - 96, behavior: 'smooth' });
    }
    announce(progressText ? progressText.textContent : '');
  }

  function setError(el, msg) {
    var box = document.querySelector('[data-error-for="' + el.name + '"]');
    if (box) box.textContent = msg;
    if (msg) el.setAttribute('aria-invalid', 'true');
    else el.removeAttribute('aria-invalid');
  }

  function validateStep(index) {
    var step = steps[index];
    var ok = true;
    var firstBad = null;

    step.querySelectorAll('[data-required]').forEach(function (el) {
      var name = el.name;
      var group = form.querySelectorAll('[name="' + name + '"]');
      var filled = false;
      if (el.type === 'radio') {
        group.forEach(function (g) { if (g.checked) filled = true; });
      } else {
        filled = !!(el.value && el.value.trim());
        if (filled && el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(el.value.trim())) {
          setError(el, 'Enter a business email address in the format name@company.com.');
          filled = false;
        } else if (filled && el.type === 'email') {
          setError(el, '');
        } else {
          setError(el, filled ? '' : 'This field is required.');
        }
      }
      if (el.type === 'radio') {
        var box = document.querySelector('[data-error-for="' + name + '"]');
        if (box) box.textContent = filled ? '' : 'Select the option that best describes your organisation.';
      }
      if (!filled) { ok = false; if (!firstBad) firstBad = el; }
    });

    if (!ok && firstBad) {
      var target = firstBad.type === 'radio' ? form.querySelector('[name="' + firstBad.name + '"]') : firstBad;
      if (target) target.focus({ preventScroll: false });
      announce('Please complete the required fields on this step.');
    }
    return ok;
  }

  /* ---------------------------------------------------------------- scoring */
  function compute() {
    var total = 0;
    var findings = [];
    Q.forEach(function (q) {
      var selected = form.querySelector('input[name="' + q.id + '"]:checked');
      var score = selected ? Number(selected.value) : null;
      if (score === null) return;
      total += score * q.weight;
      var sev = severity(score, q.weight);
      if (sev) {
        findings.push({
          id: q.id,
          area: q.area,
          weight: q.weight,
          score: score,
          severity: sev,
          text: q.why,
          service: q.service,
        });
      }
    });
    var pct = Math.round((total / MAXWEIGHT) * 100);
    var rank = { critical: 0, high: 1, moderate: 2 };
    findings.sort(function (a, b) {
      return rank[a.severity] - rank[b.severity] || b.weight - a.weight || a.score - b.score;
    });
    var counts = { critical: 0, high: 0, moderate: 0 };
    findings.forEach(function (f) { counts[f.severity]++; });
    return { pct: pct, findings: findings, counts: counts };
  }

  /* ---------------------------------------------------------------- results */
  function ring(pct) {
    var r = 66, c = 2 * Math.PI * r;
    var dash = (pct / 100) * c;
    var colour = pct >= 65 ? '#2F80FF' : pct >= 45 ? '#FFB020' : '#FF6B5E';
    return (
      '<div class="score-ring"><svg width="172" height="172" viewBox="0 0 172 172" aria-hidden="true">' +
      '<circle cx="86" cy="86" r="' + r + '" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="12"/>' +
      '<circle cx="86" cy="86" r="' + r + '" fill="none" stroke="' + colour + '" stroke-width="12" stroke-linecap="round" stroke-dasharray="' + dash.toFixed(1) + ' ' + c.toFixed(1) + '"/>' +
      '</svg><div class="score-ring__val"><span class="score-ring__num">' + pct + '<span style="font-size:1.1rem">%</span></span><span class="score-ring__of">Readiness</span></div></div>'
    );
  }

  function barFor(area, score, weight, sev) {
    var pct = Math.round((score / 3) * 100);
    var cls = sev || 'ok';
    return (
      '<div class="bar-row">' +
      '<span class="bar-row__area"><span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + esc(area) + '</span><span class="bar-row__wt">W' + weight + '</span></span>' +
      '<div class="bar-row__track"><div class="bar-row__fill bar-row__fill--' + cls + '" style="width:' + pct + '%"></div></div>' +
      '<span class="bar-row__pct">' + pct + '%</span>' +
      '</div>'
    );
  }

  function serviceHref(slug) {
    return (DATA.linkBase || '/services/') + slug + '/';
  }

  function serviceTitle(slug) {
    var s = (DATA.services || {})[slug];
    return s ? s.title : 'Advisory support';
  }

  function renderResults() {
    var r = compute();
    var cat = categoryFor(r.pct, r.counts.critical);
    var answered = Q.length;

    var findingsHtml = r.findings.length
      ? r.findings
          .map(function (f) {
            var iconChar = f.severity === 'critical' ? '!' : f.severity === 'high' ? '!' : 'i';
            return (
              '<div class="finding finding--' + f.severity + '">' +
              '<span class="finding__badge" aria-hidden="true"><strong>' + iconChar + '</strong></span>' +
              '<div><h3>' + esc(f.area) + ' <span class="tag tag--' + f.severity + '">' + f.severity + ' gap</span></h3>' +
              '<p>' + esc(f.text) + '</p>' +
              '<div class="finding__foot"><a class="link-arrow" href="' + esc(serviceHref(f.service)) + '">Explore ' + esc(serviceTitle(f.service)) + ' &rarr;</a></div>' +
              '</div></div>'
            );
          })
          .join('')
      : '<div class="notice-strip notice-strip--info" style="margin:0"><span aria-hidden="true">✓</span><span>No gaps were flagged at the level tested by this instrument. Note that this is a self-reported, indicative view: the value now lies in producing evidence for each area rather than in the score itself.</span></div>';

    var priorities = r.findings.slice(0, 3);

    resultsEl.innerHTML =
      '<div class="result-print-head">' +
      '<strong>DataSattva — DPDP Readiness Assessment Summary</strong><br>' +
      '<span class="small">Generated ' + esc(new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })) + ' · Indicative self-assessment · Not a compliance certification</span>' +
      '</div>' +
      '<div class="score-panel">' +
      ring(r.pct) +
      '<div>' +
      '<span class="score-panel__cat">' + esc(cat.label) + ' readiness</span>' +
      '<h2 style="font-size:clamp(1.4rem,1.2rem + 1vw,1.9rem)">Indicative readiness score: ' + r.pct + ' out of 100</h2>' +
      '<p>' + esc(cat.summary) + '</p>' +
      '</div></div>' +

      '<div class="grid grid--3 mt-6">' +
      '<div class="gap-tile gap-tile--critical"><div class="gap-tile__n">' + r.counts.critical + '</div><div class="gap-tile__l">Critical gaps</div><p class="xsmall muted mb-0 mt-5">Foundational areas scoring at the lowest level.</p></div>' +
      '<div class="gap-tile gap-tile--high"><div class="gap-tile__n">' + r.counts.high + '</div><div class="gap-tile__l">High gaps</div><p class="xsmall muted mb-0 mt-5">Areas where process exists but is incomplete or unevidenced.</p></div>' +
      '<div class="gap-tile gap-tile--moderate"><div class="gap-tile__n">' + r.counts.moderate + '</div><div class="gap-tile__l">Moderate gaps</div><p class="xsmall muted mb-0 mt-5">Areas that need strengthening rather than rebuilding.</p></div>' +
      '</div>' +

      '<div class="mt-7">' +
      '<h2 style="font-size:1.35rem">Priority areas for further review</h2>' +
      '<p class="small muted" style="max-width:70ch">Ordered by severity and by how foundational the area is. A high overall score does not remove a critical item from this list.</p>' +
      '<div class="mt-5">' + findingsHtml + '</div>' +
      '</div>' +

      '<div class="card card--pad-lg mt-7">' +
      '<h3 style="font-size:1.05rem">Area-by-area view</h3>' +
      '<p class="small muted">Score as a percentage of the maximum for each area. Weight is shown because a low score in a foundational area matters more than the same score elsewhere.</p>' +
      '<div class="mt-5">' +
      Q.map(function (q) {
        var sel = form.querySelector('input[name="' + q.id + '"]:checked');
        var sc = sel ? Number(sel.value) : 0;
        return barFor(q.area, sc, q.weight, severity(sc, q.weight));
      }).join('') +
      '</div>' +
      '</div>' +

      '<div class="card card--pad-lg mt-7" style="background:var(--paper)">' +
      '<h2 style="font-size:1.25rem">Suggested next steps</h2>' +
      '<ol class="num-list mt-5">' +
      DATA.nextSteps.map(function (s) {
        return '<li><strong>' + esc(s.title) + '</strong>' + esc(s.body) + '</li>';
      }).join('') +
      '</ol>' +
      (priorities.length
        ? '<div class="notice-strip notice-strip--info mt-5" style="margin-bottom:0"><span aria-hidden="true">i</span><span><strong>Where we would start:</strong> ' +
          esc(priorities.map(function (p) { return p.area; }).join(', ')) +
          '. These carry the most weight in the scoring model and are usually the dependencies for everything else.</span></div>'
        : '') +
      '</div>' +

      '<div class="card mt-6">' +
      '<h2 style="font-size:1.1rem">About this result</h2>' +
      '<p class="small muted">You answered ' + answered + ' questions, each scored 0 to 3 and weighted by how foundational the area is. The readiness score is the weighted total divided by the maximum possible weighted total. Individual gap severity combines the score with the weight, so a low score in a foundational area is treated more seriously than the same score in a peripheral one. The overall band is capped when critical gaps are present.</p>' +
      '<p class="small muted mb-0">' + esc(DATA.disclaimerShort) + ' The score reflects self-reported practice at a point in time and is not a legal determination of compliance. Regulatory positions should be confirmed against the Act, the Rules and current Gazette notifications.</p>' +
      '</div>' +

      '<div class="card mt-6 no-print" id="share-result">' +
      '<div style="display:flex;gap:0.6rem;align-items:flex-start;margin-bottom:1rem">' +
      '<span aria-hidden="true" style="color:var(--blue-700);flex-shrink:0">' +
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/></svg></span>' +
      '<div><h2 style="font-size:1.1rem;margin-bottom:0.25rem">Want this result reviewed by the DataSattva team?</h2>' +
      '<p class="small muted mb-0">Optional. We will email this summary to DataSattva and reply with a short, no-obligation view of where to start. Your answers are sent only if you complete the form below.</p></div></div>' +
      '<form id="share-form" novalidate>' +
      '<div class="field-row">' +
      '<div class="field"><label for="share-name">Full name <span aria-hidden="true" style="color:var(--risk)">*</span></label>' +
      '<input class="input" type="text" id="share-name" name="name" autocomplete="name" data-share-required><span class="error-text" data-share-error-for="name" role="alert"></span></div>' +
      '<div class="field"><label for="share-email">Business email <span aria-hidden="true" style="color:var(--risk)">*</span></label>' +
      '<input class="input" type="email" id="share-email" name="email" autocomplete="email" inputmode="email" data-share-required><span class="error-text" data-share-error-for="email" role="alert"></span></div>' +
      '</div>' +
      '<div class="field"><label for="share-org">Organisation</label>' +
      '<input class="input" type="text" id="share-org" name="organisation" autocomplete="organization"></div>' +
      '<div class="field"><label for="share-note">Anything we should know? <span class="muted" style="font-weight:400">(optional)</span></label>' +
      '<textarea class="textarea" id="share-note" name="message" rows="3" style="min-height:84px"></textarea></div>' +
      '<div class="field"><label class="checkbox-row" for="share-consent">' +
      '<input type="checkbox" id="share-consent" name="consent" value="yes" data-share-required>' +
      '<span>I agree that DataSattva may use these details and my assessment summary to respond to this request, in accordance with the <a href="/privacy/">website privacy notice</a>. <span aria-hidden="true" style="color:var(--risk)">*</span></span></label>' +
      '<span class="error-text" data-share-error-for="consent" role="alert"></span></div>' +
      '<div class="btn-row"><button type="submit" class="btn btn--primary" data-share-submit>Send my result to DataSattva</button>' +
      '<a class="btn btn--ghost" href="/contact/">Contact us instead</a></div>' +
      '<div class="form-status" id="share-status" role="status" aria-live="polite"></div>' +
      '</form></div>' +

      '<div class="assess-actions mt-6 no-print">' +
      '<button type="button" class="btn btn--primary" data-download>Download results summary ' + '</button>' +
      '<button type="button" class="btn btn--ghost" data-restart>Restart the assessment</button>' +
      '<a class="btn btn--ghost" href="' + esc(DATA.contactHref || '/contact/') + '">Discuss this result with DataSattva</a>' +
      '</div>' +
      '<p class="xsmall muted mt-5 no-print">Prefer a printed copy? Use your browser’s print function — this page is set up to print cleanly.</p>';

    formWrap.hidden = true;
    resultsEl.hidden = false;
    shareWire();
    resultsEl.setAttribute('tabindex', '-1');
    resultsEl.focus({ preventScroll: true });
    var top = document.getElementById('start');
    if (top) window.scrollTo({ top: top.offsetTop - 96, behavior: 'smooth' });
    announce('Assessment complete. Indicative readiness score ' + r.pct + ' out of 100, category ' + cat.label + '.');
  }

  /* -------------------------------------------------------------- download */
  function download() {
    var r = compute();
    var cat = categoryFor(r.pct, r.counts.critical);
    var lines = [];
    var pad = function (s) { return s; };

    lines.push('DATASATTVA — DPDP READINESS ASSESSMENT SUMMARY');
    lines.push('='.repeat(58));
    lines.push('Generated: ' + new Date().toLocaleString('en-IN'));
    lines.push('');
    lines.push('Organisation profile');
    lines.push('--------------------');
    ['OrgType', 'Industry', 'Size', 'DigitalData', 'IndiaNexus'].forEach(function (k) {});
    lines.push('Organisation type    : ' + (val('orgType') || 'Not provided'));
    lines.push('Industry             : ' + (val('industry') || 'Not provided'));
    lines.push('Size                 : ' + (val('size') || 'Not provided'));
    lines.push('Processes digital PD : ' + (val('digitalData') || 'Not provided'));
    lines.push('India nexus          : ' + (val('indiaNexus') || 'Not provided'));
    lines.push('');
    lines.push('Indicative readiness score: ' + r.pct + '/100  (' + cat.label + ')');
    lines.push('Critical gaps: ' + r.counts.critical + '   High gaps: ' + r.counts.high + '   Moderate gaps: ' + r.counts.moderate);
    lines.push('');
    lines.push('Assessment summary');
    lines.push('------------------');
    lines.push(cat.summary);
    lines.push('');
    lines.push('Priority areas for further review');
    lines.push('--------------------------------');
    if (r.findings.length) {
      r.findings.forEach(function (f, i) {
        lines.push((i + 1) + '. [' + f.severity.toUpperCase() + '] ' + f.area);
        lines.push('   ' + f.text);
        lines.push('   Related service: ' + serviceTitle(f.service));
      });
    } else {
      lines.push('No gaps flagged at the level tested. Produce evidence for each area.');
    }
    lines.push('');
    lines.push('Area scores');
    lines.push('-----------');
    Q.forEach(function (q) {
      var sel = form.querySelector('input[name="' + q.id + '"]:checked');
      var sc = sel ? Number(sel.value) : 0;
      lines.push(pad((q.area + ' '.repeat(34)).slice(0, 34)) + (sc * 100 / 3).toFixed(0).padStart(3) + '%  (weight ' + q.weight + ')');
    });
    lines.push('');
    lines.push('Suggested next steps');
    lines.push('--------------------');
    DATA.nextSteps.forEach(function (s, i) {
      lines.push((i + 1) + '. ' + s.title);
      lines.push('   ' + s.body);
    });
    lines.push('');
    lines.push('Important');
    lines.push('---------');
    lines.push(DATA.disclaimerShort);
    lines.push('The score is based on self-reported answers and is not a legal determination of compliance.');
    lines.push('DataSattva provides advisory and implementation support, not legal advice.');
    lines.push('Regulatory position as at ' + DATA.verifiedOn + '.');

    var blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'datasattva-dpdp-readiness-summary.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
    announce('Results summary downloaded.');
  }

  /* ----------------------------------------------------------------- wiring */
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (current < steps.length - 1) {
      if (validateStep(current)) showStep(current + 1, true);
      return;
    }
    if (!validateStep(current)) return;
    renderResults();
  });

  form.querySelectorAll('[data-next]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (validateStep(current)) showStep(current + 1, true);
    });
  });

  form.querySelectorAll('[data-prev]').forEach(function (btn) {
    btn.addEventListener('click', function () { showStep(current - 1, true); });
  });

  /* ---------------------------------------------- optional result sharing */
  function shareWire() {
    var formEl = document.getElementById('share-form');
    if (!formEl || formEl.dataset.wired === '1') return;
    formEl.dataset.wired = '1';

    var statusEl = document.getElementById('share-status');
    var submitEl = formEl.querySelector('[data-share-submit]');

    function setErr(name, msg) {
      var box = formEl.querySelector('[data-share-error-for="' + name + '"]');
      if (box) box.textContent = msg || '';
      var input = formEl.querySelector('[name="' + name + '"]');
      if (input) {
        if (msg) input.setAttribute('aria-invalid', 'true');
        else input.removeAttribute('aria-invalid');
      }
    }

    formEl.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      var name = formEl.querySelector('[name="name"]').value.trim();
      var email = formEl.querySelector('[name="email"]').value.trim();
      var consent = formEl.querySelector('[name="consent"]').checked;

      if (name.length < 2) { setErr('name', 'Please enter your name.'); ok = false; } else setErr('name', '');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { setErr('email', 'Enter a valid business email address.'); ok = false; } else setErr('email', '');
      if (!consent) { setErr('consent', 'Please confirm you agree to be contacted.'); ok = false; } else setErr('consent', '');

      if (!ok) {
        var bad = formEl.querySelector('[aria-invalid="true"]');
        if (bad) bad.focus();
        return;
      }

      var r = compute();
      var cat = categoryFor(r.pct, r.counts.critical);
      var payload = {
        kind: 'assessment',
        name: name,
        email: email,
        organisation: formEl.querySelector('[name="organisation"]').value.trim(),
        message: formEl.querySelector('[name="message"]').value.trim(),
        consent: 'yes',
        score: r.pct,
        band: cat.label,
        gapsCritical: r.counts.critical,
        gapsHigh: r.counts.high,
        gapsModerate: r.counts.moderate,
        priorities: r.findings.slice(0, 3).map(function (f) { return f.area; }).join(', '),
        pageSource: '/readiness-assessment/',
      };

      submitEl.disabled = true;
      var original = submitEl.textContent;
      submitEl.textContent = 'Sending…';
      if (statusEl) { statusEl.removeAttribute('data-state'); statusEl.textContent = ''; }

      fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
        .then(function (res) { return res.json().then(function (d) { return { ok: res.ok, data: d }; }); })
        .then(function (out) {
          submitEl.disabled = false;
          submitEl.textContent = original;
          if (out.ok && out.data && out.data.ok) {
            formEl.reset();
            formEl.querySelectorAll('[data-share-error-for]').forEach(function (b) { b.textContent = ''; });
            if (statusEl) {
              statusEl.setAttribute('data-state', 'success');
              statusEl.innerHTML = '<strong>Thank you — your result has been sent.</strong>' +
                (out.data.reference ? ' Reference <span class="form-status__ref">' + out.data.reference + '</span>.' : '') +
                ' We will review it and reply to the email address you provided.';
            }
            announce('Assessment result sent to DataSattva.');
          } else {
            if (statusEl) {
              statusEl.setAttribute('data-state', 'error');
              statusEl.innerHTML = '<strong>We could not send it.</strong> ' + ((out.data && out.data.message) || 'Please try again, or email us directly.');
            }
          }
        })
        .catch(function () {
          submitEl.disabled = false;
          submitEl.textContent = original;
          if (statusEl) {
            statusEl.setAttribute('data-state', 'error');
            statusEl.innerHTML = '<strong>We could not send it.</strong> The connection was interrupted. Please try again, or email us directly.';
          }
        });
    });
  }

  resultsEl.addEventListener('click', function (e) {
    if (e.target.closest('[data-download]')) download();
    if (e.target.closest('[data-restart]')) {
      form.reset();
      form.querySelectorAll('[aria-invalid]').forEach(function (el) { el.removeAttribute('aria-invalid'); });
      form.querySelectorAll('[data-error-for]').forEach(function (el) { el.textContent = ''; });
      resultsEl.hidden = true;
      resultsEl.innerHTML = '';
      formWrap.hidden = false;
      showStep(0, true);
      announce('Assessment reset. All answers cleared.');
    }
  });

  /* Update progress as questions are answered in step 2 */
  var step2 = steps[1];
  if (step2) {
    step2.addEventListener('change', function () {
      var answered = Q.filter(function (q) {
        return !!form.querySelector('input[name="' + q.id + '"]:checked');
      }).length;
      var t = document.querySelector('[data-answered]');
      if (t) t.textContent = answered + ' of ' + Q.length + ' answered';
    });
  }

  showStep(0, false);
})();
