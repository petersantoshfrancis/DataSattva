/* Contact form: client-side validation + submission to /api/enquiries.
   Server-side validation is authoritative; this layer only shortens the loop. */
(function () {
  'use strict';

  var form = document.getElementById('contact-form');
  if (!form) return;

  var status = document.getElementById('form-status');
  var submitBtn = form.querySelector('[type="submit"]');
  var fields = Array.prototype.slice.call(form.querySelectorAll('[data-required]'));

  var rules = {
    name: function (v) { return v.length >= 2 || 'Please enter your name.'; },
    email: function (v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || 'Enter a valid business email address.';
    },
    organisation: function (v) { return v.length >= 2 || 'Please enter your organisation name.'; },
    interest: function (v) { return !!v || 'Select an area of interest.'; },
    message: function (v) { return v.length >= 20 || 'Please add at least 20 characters so we can route your enquiry.'; },
    consent: function (v, el) { return el.checked || 'Please confirm you agree to be contacted about this enquiry.'; },
  };

  function errorFor(name) {
    return form.querySelector('[data-error-for="' + name + '"]');
  }

  function setError(el, msg) {
    var box = errorFor(el.name);
    if (box) box.textContent = msg || '';
    if (msg) el.setAttribute('aria-invalid', 'true');
    else el.removeAttribute('aria-invalid');
  }

  function validateField(el) {
    var rule = rules[el.name];
    if (!rule) return true;
    var value = el.type === 'checkbox' ? el.checked : el.value.trim();
    var result = rule(value, el);
    if (result === true) { setError(el, ''); return true; }
    setError(el, result);
    return false;
  }

  fields.forEach(function (el) {
    el.addEventListener('blur', function () { validateField(el); });
    el.addEventListener('input', function () {
      if (el.getAttribute('aria-invalid') === 'true') validateField(el);
    });
    el.addEventListener('change', function () { validateField(el); });
  });

  function setStatus(state, title, body) {
    if (!status) return;
    status.setAttribute('data-state', state);
    status.innerHTML = '<strong>' + title + '</strong>' + body;
    status.focus && status.focus();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var valid = true;
    var firstBad = null;
    fields.forEach(function (el) {
      if (!validateField(el)) { valid = false; if (!firstBad) firstBad = el; }
    });

    if (!valid) {
      setStatus('error', 'Please check the highlighted fields.', 'A few details are needed before the form can be sent.');
      if (firstBad) firstBad.focus();
      return;
    }

    var payload = {};
    new FormData(form).forEach(function (value, key) { payload[key] = value; });

    submitBtn.disabled = true;
    var originalLabel = submitBtn.textContent;
    submitBtn.textContent = 'Sending…';
    if (status) status.removeAttribute('data-state');

    fetch(form.getAttribute('action') || '/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(function (res) {
        return res.json().then(function (data) { return { ok: res.ok, status: res.status, data: data }; });
      })
      .then(function (r) {
        if (r.ok && r.data && r.data.ok) {
          form.reset();
          fields.forEach(function (el) { setError(el, ''); });
          setStatus(
            'success',
            'Thank you — your enquiry has been received.',
            (r.data.reference ? ' Your reference is <span class="form-status__ref">' + r.data.reference + '</span>.' : '') +
              ' A member of the DataSattva team will review it and respond to the email address you provided. If your enquiry is time-sensitive, please also write to the contact address on this page.'
          );
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
        } else {
          var msg = (r.data && r.data.message) || 'Something went wrong while sending your enquiry.';
          setStatus('error', 'Your enquiry could not be sent.', ' ' + msg + ' Please try again, or email us directly.');
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
        }
      })
      .catch(function () {
        setStatus(
          'error',
          'Your enquiry could not be sent.',
          ' The connection was interrupted. Please try again, or email us directly at the address on this page.'
        );
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      });
  });
})();
