/**
 * Live catalog
 * ------------
 * Merges the seed list in books.js with titles saved from the Admin panel.
 * Persistence is this browser’s localStorage (no server required).
 * Use Admin → Export JSON if you want a backup or to paste into books.js.
 */
(function (global) {
  var STORAGE_KEY = "lernbuecher.catalog.v1";
  var LANG_BY_CATEGORY = {
    de: "Deutsch",
    ru: "Русский / Deutsch",
    sq: "Shqip / Deutsch"
  };

  function cloneSeed() {
    var seed = global.BOOKS_SEED || global.BOOKS || [];
    try {
      return JSON.parse(JSON.stringify(seed));
    } catch (err) {
      return (seed || []).slice();
    }
  }

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          global.BOOKS = parsed;
          return parsed;
        }
      }
    } catch (err) {
      /* fall back to seed */
    }
    var seed = cloneSeed();
    global.BOOKS = seed;
    return seed;
  }

  function save(list) {
    var next = Array.isArray(list) ? list : [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    global.BOOKS = next;
    return next;
  }

  function reset() {
    localStorage.removeItem(STORAGE_KEY);
    return load();
  }

  function slugify(title) {
    var base = String(title || "book")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return base || "book-" + Date.now();
  }

  function uniqueId(title, existingId) {
    if (existingId) return existingId;
    var id = slugify(title);
    var books = global.BOOKS || [];
    var n = 2;
    var candidate = id;
    while (books.some(function (book) { return book.id === candidate; })) {
      candidate = id + "-" + n;
      n += 1;
    }
    return candidate;
  }

  function safeUrl(value) {
    var url = String(value || "").trim();
    if (!url) return "";
    if (/^https?:\/\//i.test(url) || url.charAt(0) === "/" || url.indexOf("./") === 0 || url.indexOf("../") === 0) {
      return url;
    }
    return "";
  }

  global.BOOKS_SEED = global.BOOKS_SEED || (global.BOOKS || []).slice();
  global.Catalog = {
    STORAGE_KEY: STORAGE_KEY,
    LANG_BY_CATEGORY: LANG_BY_CATEGORY,
    load: load,
    save: save,
    reset: reset,
    slugify: slugify,
    uniqueId: uniqueId,
    safeUrl: safeUrl
  };
  load();
})(window);
