/**
 * LernBücher UI
 * Shared header, footer, book cards, live search, and page bootstraps.
 * Works on every HTML page. Set window.PAGE_CONFIG before this script.
 */
(function () {
  const BOOKS = window.BOOKS || [];
  const CATEGORIES = window.CATEGORIES || {};
  const config = Object.assign(
    {
      root: "",
      page: "home",
      category: null,
      title: "LernBücher"
    },
    window.PAGE_CONFIG || {}
  );

  const LEVEL_CLASS = {
    A1: "badge-a1",
    A2: "badge-a2",
    B1: "badge-b1",
    B2: "badge-b2",
    C1: "badge-c1",
    C2: "badge-c2"
  };

  function asset(path) {
    return config.root + path;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function normalize(text) {
    return String(text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function searchBooks(query, list) {
    const q = normalize(query).trim();
    const source = list || BOOKS;
    if (!q) return source.slice();
    return source.filter((book) => {
      const hay = normalize(
        [book.title, book.level, book.description, book.language, (book.tags || []).join(" ")].join(" ")
      );
      return hay.includes(q);
    });
  }

  function coverMarkup(book) {
    const from = book.cover && book.cover.from ? book.cover.from : "#0e7c7b";
    const to = book.cover && book.cover.to ? book.cover.to : "#073b4c";
    const kicker = book.cover && book.cover.kicker ? book.cover.kicker : book.level;
    return `
      <div class="cover" style="background: linear-gradient(160deg, ${from} 0%, ${to} 100%);" aria-hidden="true">
        <div class="cover-spine"></div>
        <div class="absolute inset-0 p-4 flex flex-col justify-between text-white">
          <div class="flex items-start justify-between pl-2">
            <span class="text-[10px] tracking-[0.22em] uppercase text-white/70">${escapeHtml(kicker)}</span>
            <span class="text-[10px] font-semibold tracking-widest">${escapeHtml(book.level)}</span>
          </div>
          <div class="pl-2 pr-1">
            <p class="font-display text-[1.05rem] leading-snug font-semibold">${escapeHtml(book.title)}</p>
            <p class="mt-2 text-[11px] text-white/70">${escapeHtml(book.language)}</p>
          </div>
        </div>
      </div>
    `;
  }

  function bookCard(book, headingTag) {
    const tag = headingTag === "h1" ? "h1" : "h2";
    const cat = CATEGORIES[book.category];
    return `
      <article class="group bg-white rounded-2xl border border-slate-200/80 p-4 flex flex-col shadow-sm hover:shadow-lg transition-shadow" data-book-id="${escapeHtml(book.id)}">
        ${coverMarkup(book)}
        <div class="mt-4 flex items-center justify-between gap-2">
          <span class="text-xs text-slate-500">${escapeHtml(cat ? cat.name : "")}</span>
          <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${LEVEL_CLASS[book.level] || "badge-b1"}">${escapeHtml(book.level)}</span>
        </div>
        <${tag} class="mt-2 font-display text-xl leading-snug text-slate-900">${escapeHtml(book.title)}</${tag}>
        <p class="mt-2 text-sm text-slate-600 leading-relaxed flex-1">${escapeHtml(book.description)}</p>
        <a class="btn-download mt-4 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold" href="${escapeHtml(book.downloadUrl)}" download>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Download PDF
        </a>
      </article>
    `;
  }

  function renderBookGrid(target, books, emptyMessage, headingTag) {
    if (!target) return;
    if (!books.length) {
      target.innerHTML = `<p class="col-span-full text-center text-slate-500 py-12">${escapeHtml(emptyMessage || "No books match your search.")}</p>`;
      return;
    }
    target.innerHTML = books.map((book) => bookCard(book, headingTag)).join("");
  }

  function logoSvg() {
    return `
      <span class="inline-flex items-center gap-2.5">
        <span class="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-cyan-900 text-white shadow-md">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5V5.5Z" stroke="currentColor" stroke-width="1.8"/>
            <path d="M4 19h12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
        </span>
        <span class="leading-tight">
          <span class="block font-display text-[1.15rem] font-semibold tracking-tight text-slate-900">LernBücher</span>
          <span class="hidden sm:block text-[11px] tracking-wide text-slate-500">Free German resources</span>
        </span>
      </span>
    `;
  }

  function navLinks() {
    return Object.values(CATEGORIES)
      .map((cat) => {
        const active = config.page === cat.id;
        return `<a class="whitespace-nowrap text-sm font-medium ${active ? "text-teal-800" : "text-slate-600 hover:text-teal-800"}" href="${asset(cat.href)}">${escapeHtml(cat.name)}</a>`;
      })
      .join("");
  }

  function headerHtml() {
    return `
      <a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white px-3 py-2 rounded-md z-50">Skip to content</a>
      <header class="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex items-center gap-3 py-3 lg:gap-6">
            <a href="${asset("index.html")}" class="shrink-0" aria-label="LernBücher home">${logoSvg()}</a>

            <form id="site-search-form" class="relative flex-1 max-w-xl mx-auto" role="search">
              <label for="site-search" class="sr-only">Search books</label>
              <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/>
                  <path d="m20 20-3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </span>
              <input id="site-search" type="search" autocomplete="off" placeholder="Search titles, levels, topics…"
                class="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder:text-slate-400 focus:border-teal-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-teal-600/10" />
              <div id="search-panel" class="search-panel absolute left-0 right-0 top-[calc(100%+8px)] hidden overflow-hidden rounded-2xl border border-slate-200 bg-white" role="listbox"></div>
            </form>
          </div>
          <nav class="flex items-center justify-center gap-4 sm:gap-8 pb-3 overflow-x-auto text-sm" aria-label="Main">${navLinks()}</nav>
        </div>
      </header>
    `;
  }

  function footerHtml() {
    return `
      <footer class="mt-20 border-t border-slate-200 bg-white">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            ${logoSvg()}
            <p class="mt-4 text-sm text-slate-600 leading-relaxed">A calm, multilingual library of free German-learning PDFs for classrooms, self-study, and exam prep.</p>
          </div>
          <div>
            <h2 class="text-sm font-semibold tracking-wide text-slate-900 uppercase">Categories</h2>
            <ul class="mt-3 space-y-2 text-sm text-slate-600">
              ${Object.values(CATEGORIES).map((c) => `<li><a class="hover:text-teal-800" href="${asset(c.href)}">${escapeHtml(c.name)}</a></li>`).join("")}
            </ul>
          </div>
          <div>
            <h2 class="text-sm font-semibold tracking-wide text-slate-900 uppercase">Legal</h2>
            <ul class="mt-3 space-y-2 text-sm text-slate-600">
              <li><a class="hover:text-teal-800" href="${asset("privacy.html")}">Privacy Policy</a></li>
              <li><a class="hover:text-teal-800" href="${asset("dmca.html")}">DMCA / Copyright</a></li>
              <li><a class="hover:text-teal-800" href="${asset("terms.html")}">Terms &amp; Conditions</a></li>
              <li><a class="hover:text-teal-800" href="${asset("about.html")}">About Us</a></li>
            </ul>
          </div>
          <div>
            <h2 class="text-sm font-semibold tracking-wide text-slate-900 uppercase">Notice</h2>
            <p class="mt-3 text-sm text-slate-600 leading-relaxed">Sample catalog for demonstration. Replace download URLs with files you have the right to distribute. Report infringement via the DMCA page.</p>
          </div>
        </div>
        <div class="border-t border-slate-100">
          <p class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 text-xs text-slate-500">© ${new Date().getFullYear()} LernBücher. Educational resource hub template.</p>
        </div>
      </footer>
    `;
  }

  function bindSearch() {
    const input = document.getElementById("site-search");
    const panel = document.getElementById("search-panel");
    const form = document.getElementById("site-search-form");
    const grid = document.getElementById("book-grid");
    if (!input || !panel) return;

    const scoped = config.category ? BOOKS.filter((b) => b.category === config.category) : BOOKS;

    function paintPanel(query) {
      const matches = searchBooks(query, BOOKS).slice(0, 6);
      if (!query.trim()) {
        panel.classList.add("hidden");
        panel.innerHTML = "";
        return;
      }
      if (!matches.length) {
        panel.innerHTML = `<p class="px-4 py-3 text-sm text-slate-500">No titles found for “${escapeHtml(query)}”.</p>`;
        panel.classList.remove("hidden");
        return;
      }
      panel.innerHTML = matches
        .map((book) => {
          const cat = CATEGORIES[book.category];
          return `<a role="option" class="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 border-b border-slate-100 last:border-0" href="${asset(cat.href)}#${escapeHtml(book.id)}">
            <span class="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold text-white" style="background:${book.cover.from}">${escapeHtml(book.level)}</span>
            <span>
              <span class="block text-sm font-medium text-slate-900">${escapeHtml(book.title)}</span>
              <span class="block text-xs text-slate-500">${escapeHtml(cat.name)} · ${escapeHtml(book.language)}</span>
            </span>
          </a>`;
        })
        .join("");
      panel.classList.remove("hidden");
    }

    input.addEventListener("input", function () {
      paintPanel(input.value);
      if (grid) {
        renderBookGrid(grid, searchBooks(input.value, scoped), "No books match your search.", "h2");
      }
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const first = searchBooks(input.value, BOOKS)[0];
      if (first) {
        const cat = CATEGORIES[first.category];
        window.location.href = asset(cat.href) + "#" + first.id;
      }
    });

    document.addEventListener("click", function (event) {
      if (!form.contains(event.target)) {
        panel.classList.add("hidden");
      }
    });
  }

  function bindMobileNav() {}

  function bindHeroSearch() {
    const hero = document.getElementById("hero-search");
    const site = document.getElementById("site-search");
    const heroForm = document.getElementById("hero-search-form");
    if (hero && site) {
      hero.addEventListener("input", function () {
        site.value = hero.value;
        site.dispatchEvent(new Event("input"));
      });
    }
    if (heroForm) {
      heroForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const grid = document.getElementById("featured");
        if (grid) grid.scrollIntoView({ behavior: "smooth" });
      });
    }
  }

  function renderHome() {
    const catWrap = document.getElementById("category-cards");
    if (catWrap) {
      const accents = {
        de: { ring: "from-teal-700 to-cyan-900", chip: "German" },
        ru: { ring: "from-sky-800 to-slate-900", chip: "Русский" },
        sq: { ring: "from-rose-800 to-amber-900", chip: "Shqip" }
      };
      catWrap.innerHTML = Object.values(CATEGORIES)
        .map((cat) => {
          const count = BOOKS.filter((b) => b.category === cat.id).length;
          const accent = accents[cat.id];
          return `
            <a class="cat-card relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-6 block" href="${asset(cat.href)}">
              <div class="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${accent.ring} opacity-15"></div>
              <p class="text-xs font-semibold tracking-[0.2em] uppercase text-teal-800">${escapeHtml(cat.kicker)}</p>
              <h2 class="mt-3 font-display text-3xl text-slate-900">${escapeHtml(cat.name)}</h2>
              <p class="mt-3 text-sm text-slate-600 leading-relaxed">${escapeHtml(cat.blurb)}</p>
              <p class="mt-6 text-sm font-medium text-teal-800">${count} titles · Explore →</p>
            </a>
          `;
        })
        .join("");
    }

    renderBookGrid(document.getElementById("book-grid"), BOOKS, "Catalog is empty.", "h2");

    const stats = document.getElementById("stats");
    if (stats) {
      stats.innerHTML = [
        { n: BOOKS.length, l: "Curated titles" },
        { n: "A1–C2", l: "CEFR coverage" },
        { n: "3", l: "Language hubs" },
        { n: "0€", l: "Always free" }
      ]
        .map(
          (s) => `<div class="text-center">
            <p class="font-display text-3xl sm:text-4xl text-white">${s.n}</p>
            <p class="mt-1 text-sm text-teal-100">${s.l}</p>
          </div>`
        )
        .join("");
    }
  }

  function renderCategoryPage() {
    const list = BOOKS.filter((b) => b.category === config.category);
    renderBookGrid(document.getElementById("book-grid"), list, "No books in this category yet.", "h2");
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const node = document.querySelector('[data-book-id="' + hash + '"]');
      if (node) node.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  function boot() {
    const headerMount = document.getElementById("site-header");
    const footerMount = document.getElementById("site-footer");
    if (headerMount) headerMount.innerHTML = headerHtml();
    if (footerMount) footerMount.innerHTML = footerHtml();
    bindSearch();
    bindMobileNav();
    bindHeroSearch();
    if (config.page === "home") renderHome();
    if (config.category) renderCategoryPage();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
