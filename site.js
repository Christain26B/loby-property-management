/* =========================================================
   Loby Property Management — shared chrome + interactions
   Injects the utility bar, header, and footer on every page,
   then wires up nav, scroll effects, reveals, counters, forms.
   ========================================================= */
(function () {
  "use strict";

  var page = (location.pathname.split("/").pop() || "index.html");
  if (page === "") page = "index.html";

  var MARK = '<span class="mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M5 21V8.5L12 4l7 4.5V21h-5v-6h-4v6H5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" fill="rgba(255,255,255,.18)"/></svg></span>';

  var NAV = [
    { href: "properties.html", label: "Communities", match: ["properties.html", "property.html"] },
    { href: "residents.html", label: "Residents", match: ["residents.html"] },
    { href: "owners.html", label: "Owners", match: ["owners.html"] },
    { href: "index.html#about", label: "About", match: [] },
    { href: "index.html#contact", label: "Contact", match: [] }
  ];

  function navItems() {
    return NAV.map(function (n) {
      var active = n.match.indexOf(page) !== -1 ? ' class="active"' : "";
      return '<li><a href="' + n.href + '"' + active + ">" + n.label + "</a></li>";
    }).join("");
  }

  var HEADER =
    '<div class="utility-bar"><div class="wrap">' +
      '<div class="ub-left"><svg viewBox="0 0 24 24" fill="none"><path d="M12 21s-7-4.4-7-10a7 7 0 0 1 14 0c0 5.6-7 10-7 10Z" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="11" r="2.2" stroke="currentColor" stroke-width="1.8"/></svg> Now leasing across 9 Los Angeles neighborhoods</div>' +
      '<div class="ub-right">' +
        '<a class="ghost-sm" href="residents.html#portal">Resident Login</a>' +
        '<span class="sep"></span>' +
        '<a class="ghost-sm" href="owners.html#proposal">Owner Login</a>' +
        '<span class="sep"></span>' +
        '<a href="tel:+12135550182"><svg viewBox="0 0 24 24" fill="none"><path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg> (213) 555-0182</a>' +
      "</div>" +
    "</div></div>" +
    '<header class="site-header"><div class="wrap nav">' +
      '<a class="brand" href="index.html" aria-label="Loby Property Management home">' + MARK + "<span>Loby<small>Property Management</small></span></a>" +
      '<nav aria-label="Primary"><ul class="nav-links">' + navItems() +
        '<li class="mobile-only"><a href="residents.html#portal">Resident Login</a></li>' +
        '<li class="mobile-only"><a href="owners.html#proposal">Owner Login</a></li>' +
      "</ul></nav>" +
      '<div class="nav-cta"><a class="btn btn-ghost" href="index.html#contact">Contact</a><a class="btn btn-primary" href="properties.html">Find your home</a></div>' +
      '<button class="nav-toggle" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
    "</div></header>";

  var FOOTER =
    '<footer class="site-footer"><div class="wrap">' +
      '<div class="footer-grid">' +
        '<div class="footer-about">' +
          '<a class="brand" href="index.html">' + MARK + "<span>Loby<small>Property Management</small></span></a>" +
          "<p>Full-service multifamily management across Los Angeles — 2,000 homes and counting, run with care for residents and owners alike.</p>" +
          '<div class="footer-social">' +
            '<a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.7"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg></a>' +
            '<a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" stroke-width="1.7"/><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 17v-7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg></a>' +
            '<a href="#" aria-label="X"><svg viewBox="0 0 24 24" fill="none"><path d="M4 4l16 16M20 4 4 20" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg></a>' +
          "</div>" +
        "</div>" +
        '<div class="footer-col"><h4>Explore</h4><ul><li><a href="properties.html">Find a home</a></li><li><a href="properties.html">Communities</a></li><li><a href="residents.html">Resident portal</a></li><li><a href="index.html#about">About us</a></li></ul></div>' +
        '<div class="footer-col"><h4>Owners</h4><ul><li><a href="owners.html">Management services</a></li><li><a href="owners.html#proposal">Request a proposal</a></li><li><a href="owners.html">Owner login</a></li><li><a href="index.html#contact">Contact us</a></li></ul></div>' +
        '<div class="footer-col"><h4>Contact</h4><ul><li><a href="tel:+12135550182">(213) 555-0182</a></li><li><a href="mailto:hello@lobypm.com">hello@lobypm.com</a></li><li>3550 Wilshire Blvd, #1400</li><li>Los Angeles, CA 90010</li></ul></div>' +
      "</div>" +
      '<div class="footer-assoc">Proud member · <b>Apartment Association of Greater Los Angeles</b> · <b>National Apartment Association</b> · <b>IREM</b></div>' +
      '<div class="footer-bottom">' +
        '<span>© <span id="year">2026</span> Loby Property Management, Inc. · CA DRE #02019845. All rights reserved.</span>' +
        '<span class="footer-legal"><a href="privacy.html">Privacy</a><a href="terms.html">Terms</a><a href="accessibility.html">Accessibility</a></span>' +
        '<span class="eho"><svg viewBox="0 0 24 24" fill="none"><path d="M3 11 12 4l9 7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 10v9h14v-9" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M10 19v-5h4v5" stroke="currentColor" stroke-width="1.6"/></svg> Equal Housing Opportunity</span>' +
      "</div>" +
    "</div></footer>";

  function injectChrome() {
    var h = document.getElementById("header-root");
    if (h) h.innerHTML = HEADER;
    var f = document.getElementById("footer-root");
    if (f) f.innerHTML = FOOTER;
  }

  function initNav() {
    var header = document.querySelector(".site-header");
    var toggle = document.querySelector(".nav-toggle");
    if (toggle && header) {
      toggle.addEventListener("click", function () {
        var open = header.classList.toggle("menu-open");
        toggle.classList.toggle("open", open);
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      header.querySelectorAll(".nav-links a").forEach(function (a) {
        a.addEventListener("click", function () {
          header.classList.remove("menu-open");
          toggle.classList.remove("open");
        });
      });
    }
    function onScroll() { if (header) header.classList.toggle("scrolled", window.scrollY > 8); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initReveal() {
    var reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && reveals.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
      reveals.forEach(function (el) { io.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add("in"); });
    }
  }

  function initCounters() {
    function animateCount(el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var suffix = el.getAttribute("data-suffix") || "";
      var decimals = (el.getAttribute("data-decimals") | 0);
      var dur = 1400, start = null;
      function frame(ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
        if (p < 1) requestAnimationFrame(frame);
        else el.textContent = target.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
      }
      requestAnimationFrame(frame);
    }
    var counters = document.querySelectorAll("[data-count]");
    if ("IntersectionObserver" in window && counters.length) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); } });
      }, { threshold: 0.5 });
      counters.forEach(function (el) { cio.observe(el); });
    } else {
      counters.forEach(function (el) { el.textContent = parseFloat(el.getAttribute("data-count")).toLocaleString("en-US") + (el.getAttribute("data-suffix") || ""); });
    }
  }

  function initFilters() {
    var chips = document.querySelectorAll(".chip[data-filter]");
    if (!chips.length) return;
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { c.classList.remove("active"); });
        chip.classList.add("active");
        var f = chip.getAttribute("data-filter");
        document.querySelectorAll(".prop-card[data-hood]").forEach(function (card) {
          var show = f === "all" || card.getAttribute("data-hood") === f;
          card.style.display = show ? "" : "none";
        });
      });
    });
  }

  function initForms() {
    document.querySelectorAll("form[data-demo]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var ok = form.querySelector(".form-ok");
        if (ok) { ok.classList.add("show"); ok.scrollIntoView({ behavior: "smooth", block: "center" }); }
        form.reset();
      });
    });
  }

  function init() {
    injectChrome();
    // Render data-driven content (grids / detail) BEFORE observers attach.
    if (window.LobyData && window.LobyData.render) window.LobyData.render();
    initNav();
    initReveal();
    initCounters();
    initFilters();
    initForms();
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
