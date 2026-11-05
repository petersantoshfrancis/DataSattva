/* Header behaviour, mobile navigation and progressive reveal. No dependencies. */
(function () {
  'use strict';

  var header = document.getElementById('site-header');
  var toggle = document.querySelector('[data-nav-toggle]');
  var navEl = document.querySelector('[data-nav]');

  if (header) {
    var onScroll = function () {
      header.setAttribute('data-scrolled', window.scrollY > 8 ? 'true' : 'false');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (toggle && navEl) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      navEl.setAttribute('data-open', open ? 'true' : 'false');
      if (open) {
        var first = navEl.querySelector('a');
        if (first) first.focus({ preventScroll: true });
      }
    };

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });

    navEl.addEventListener('click', function (e) {
      if (e.target.closest('a') && window.matchMedia('(max-width: 1180px)').matches) {
        setOpen(false);
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 1180 && toggle.getAttribute('aria-expanded') === 'true') setOpen(false);
    });
  }

  /* Reveal on scroll — respects reduced motion via CSS. */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* Scroll-spy for the knowledge-page sub-navigation and article TOC. */
  var spyLinks = document.querySelectorAll('[data-spy] a[href^="#"], .toc a[href^="#"]');
  if (spyLinks.length && 'IntersectionObserver' in window) {
    var targets = [];
    spyLinks.forEach(function (a) {
      var t = document.getElementById(a.getAttribute('href').slice(1));
      if (t) targets.push(t);
    });
    var setActive = function (id) {
      spyLinks.forEach(function (a) {
        if (a.getAttribute('href') === '#' + id) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    };
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );
    targets.forEach(function (t) { spy.observe(t); });
  }
})();
