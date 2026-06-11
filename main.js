/* ============================================================
   DHULI KOWSHIK — Portfolio  |  main.js
   ============================================================ */

/* ── Apply theme before flash ─────────────────────────────────
   (already handled inline in <head>, this is the DOMContentLoaded
    portion that wires up all interactivity)
   ──────────────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", function () {

  /* ════════════════════════════════════════════════════════════
     THEME TOGGLE
     ════════════════════════════════════════════════════════════ */
  var themeBtn = document.getElementById("theme-toggle");

  function isDark() {
    return document.documentElement.getAttribute("data-theme") === "dark";
  }

  function renderThemeIcon() {
    if (!themeBtn) return;
    themeBtn.innerHTML = isDark()
      ? '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>'
      : '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
    themeBtn.setAttribute("aria-label", isDark() ? "Switch to light mode" : "Switch to dark mode");
  }

  renderThemeIcon();

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      renderThemeIcon();
    });
  }

  /* ════════════════════════════════════════════════════════════
     MOBILE MENU
     ════════════════════════════════════════════════════════════ */
  var menuBtn    = document.getElementById("menu-toggle");
  var mobileMenu = document.getElementById("mobile-menu");
  var overlay    = document.getElementById("overlay");

  function openMenu() {
    mobileMenu.classList.add("open");
    overlay.classList.add("active");
    menuBtn.classList.add("open");
    menuBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    mobileMenu.classList.remove("open");
    overlay.classList.remove("active");
    menuBtn.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      mobileMenu.classList.contains("open") ? closeMenu() : openMenu();
    });
  }

  if (overlay) overlay.addEventListener("click", closeMenu);

  document.querySelectorAll(".mob-link").forEach(function (a) {
    a.addEventListener("click", closeMenu);
  });

  /* Close on Escape */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  /* ════════════════════════════════════════════════════════════
     STICKY HEADER SHADOW
     ════════════════════════════════════════════════════════════ */
  var header = document.getElementById("site-header");
  window.addEventListener("scroll", function () {
    header.classList.toggle("scrolled", window.scrollY > 20);
  }, { passive: true });

  /* ════════════════════════════════════════════════════════════
     ACTIVE NAV LINK (Scroll Spy via IntersectionObserver)
     ════════════════════════════════════════════════════════════ */
  var sections   = document.querySelectorAll("section[id], div[id]");
  var navLinks   = document.querySelectorAll(".nav-link");

  var spyOptions = { rootMargin: "-40% 0px -55% 0px", threshold: 0 };

  var spyObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("data-section") === entry.target.id);
        });
      }
    });
  }, spyOptions);

  sections.forEach(function (s) { spyObserver.observe(s); });

  /* ════════════════════════════════════════════════════════════
     SCROLL REVEAL
     ════════════════════════════════════════════════════════════ */
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(".reveal").forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* ════════════════════════════════════════════════════════════
     TYPING ANIMATION
     ════════════════════════════════════════════════════════════ */
  var typed    = document.getElementById("typed-text");
  var phrases  = [
    "Frontend Developer",
    "CSE Student",
    "Problem Solver",
    "Accessibility Advocate",
    "AI & ML Explorer"
  ];
  var pIdx = 0, cIdx = 0, deleting = false, pauseTimer = null;

  function type() {
    if (!typed) return;
    var current = phrases[pIdx];

    if (!deleting) {
      typed.textContent = current.slice(0, ++cIdx);
      if (cIdx === current.length) {
        deleting = true;
        pauseTimer = setTimeout(type, 1800);
        return;
      }
    } else {
      typed.textContent = current.slice(0, --cIdx);
      if (cIdx === 0) {
        deleting = false;
        pIdx = (pIdx + 1) % phrases.length;
        setTimeout(type, 350);
        return;
      }
    }
    setTimeout(type, deleting ? 55 : 90);
  }
  setTimeout(type, 600);

  /* ════════════════════════════════════════════════════════════
     COUNTER ANIMATION (hero stats)
     ════════════════════════════════════════════════════════════ */
  function animateCounters() {
    document.querySelectorAll(".stat-n[data-target]").forEach(function (el) {
      var target  = parseInt(el.getAttribute("data-target"), 10);
      var start   = 0;
      var duration= 1200;
      var step    = target / (duration / 16);

      function tick() {
        start += step;
        if (start >= target) { el.textContent = target; return; }
        el.textContent = Math.floor(start);
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  /* Trigger counters when hero is visible */
  var heroSection = document.getElementById("home");
  if (heroSection) {
    var counterObserver = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        animateCounters();
        counterObserver.disconnect();
      }
    }, { threshold: 0.3 });
    counterObserver.observe(heroSection);
  }

  /* ════════════════════════════════════════════════════════════
     SMOOTH SCROLL for anchor links
     ════════════════════════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var target = document.querySelector(this.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      var offset = 64; /* header height */
      var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: "smooth" });
    });
  });

  /* ════════════════════════════════════════════════════════════
     CONTACT FORM
     ════════════════════════════════════════════════════════════ */
  var form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validateForm()) return;

    var btn      = form.querySelector(".btn-submit");
    var label    = btn.querySelector(".btn-label");
    var spinner  = btn.querySelector(".spinner");
    var sendIcon = btn.querySelector(".send-icon");

    btn.disabled  = true;
    label.textContent = "Sending...";
    spinner.hidden    = false;
    if (sendIcon) sendIcon.hidden = true;

    setTimeout(function () {
      form.style.display = "none";
      var msg = document.getElementById("success-msg");
      msg.classList.add("visible");
      msg.focus();
    }, 900);
  });

  function validateForm() {
    var rules = [
      { id: "f-name",    errId: "err-name",    min: 2,  label: "Full Name",     type: "text"  },
      { id: "f-email",   errId: "err-email",   min: 0,  label: "Email Address", type: "email" },
      { id: "f-subject", errId: "err-subject", min: 5,  label: "Subject",       type: "text"  },
      { id: "f-msg",     errId: "err-msg",     min: 10, label: "Message",       type: "text"  }
    ];

    var valid = true;

    rules.forEach(function (r) {
      var el  = document.getElementById(r.id);
      var err = document.getElementById(r.errId);
      if (!el || !err) return;

      var val = el.value.trim();
      var msg = "";

      if (!val) {
        msg = r.label + " is required.";
      } else if (r.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        msg = "Please enter a valid email address.";
      } else if (r.min && val.length < r.min) {
        msg = r.label + " must be at least " + r.min + " characters.";
      }

      err.textContent = msg;
      el.setAttribute("aria-invalid", msg ? "true" : "false");
      if (msg) valid = false;
    });

    if (!valid) {
      var first = form.querySelector("[aria-invalid='true']");
      if (first) first.focus();
    }
    return valid;
  }
});

/* ── Reset contact form ─────────────────────────────────────── */
function resetForm() {
  var form    = document.getElementById("contact-form");
  var success = document.getElementById("success-msg");
  if (!form || !success) return;

  form.reset();
  form.style.display = "";
  success.classList.remove("visible");

  form.querySelectorAll(".err").forEach(function (el) { el.textContent = ""; });
  form.querySelectorAll("input, textarea").forEach(function (el) { el.removeAttribute("aria-invalid"); });

  var btn = form.querySelector(".btn-submit");
  if (btn) {
    btn.disabled = false;
    btn.querySelector(".btn-label").textContent = "Send Message";
    btn.querySelector(".spinner").hidden = true;
    var icon = btn.querySelector(".send-icon");
    if (icon) icon.hidden = false;
  }

  document.getElementById("f-name").focus();
}
