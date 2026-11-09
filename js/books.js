/**
 * Book catalog
 * -----------
 * Edit this file to add, remove, or update titles.
 * Each record is rendered automatically on the homepage and category pages.
 *
 * Fields
 *  id          Unique slug (used in search and element ids)
 *  title       Display title (also used for SEO headings)
 *  level       CEFR level: A1 | A2 | B1 | B2 | C1 | C2
 *  category    de | ru | sq  (maps to the three native-language hubs)
 *  language    Interface language of the book materials
 *  description Short 2–3 line blurb shown on cards
 *  tags        Extra search keywords
 *  downloadUrl Replace "#" with your hosted PDF path, e.g. "/files/a1-start.pdf"
 *  cover       Gradient stops + optional kicker printed on the generated cover
 */
window.BOOKS = [
  {
    id: "alltag-a1",
    title: "Alltag auf Deutsch: Start A1",
    level: "A1",
    category: "de",
    language: "Deutsch",
    description:
      "First conversations, numbers, introductions, and classroom German with compact dialogues and answer keys.",
    tags: ["beginner", "dialogue", "vocabulary", "goethe"],
    downloadUrl: "#download-alltag-a1",
    cover: { from: "#0e7c7b", to: "#073b4c", kicker: "Band 1" }
  },
  {
    id: "grammatik-klar-a2",
    title: "Grammatik klar A2",
    level: "A2",
    category: "de",
    language: "Deutsch",
    description:
      "Core A2 structures explained in plain language: separable verbs, dative, modal verbs, and word order drills.",
    tags: ["grammar", "exercises", "a2"],
    downloadUrl: "#download-grammatik-klar-a2",
    cover: { from: "#1d4e89", to: "#0b3a4a", kicker: "Übungsbuch" }
  },
  {
    id: "stadt-gesprache-b1",
    title: "Stadtgespräche B1",
    level: "B1",
    category: "de",
    language: "Deutsch",
    description:
      "Authentic city scenarios — housing, work, travel, and appointments — with listening scripts and useful chunks.",
    tags: ["speaking", "b1", "city", "telc"],
    downloadUrl: "#download-stadt-gesprache-b1",
    cover: { from: "#b45309", to: "#7c2d12", kicker: "Kommunikation" }
  },
  {
    id: "lesen-verstehen-b2",
    title: "Lesen & Verstehen B2",
    level: "B2",
    category: "de",
    language: "Deutsch",
    description:
      "Newspaper-style texts, opinion pieces, and exam-style reading tasks with strategy notes for B2 learners.",
    tags: ["reading", "exam", "b2"],
    downloadUrl: "#download-lesen-verstehen-b2",
    cover: { from: "#1e3a8a", to: "#312e81", kicker: "Lesetraining" }
  },
  {
    id: "akademisch-c1",
    title: "Akademisches Deutsch C1",
    level: "C1",
    category: "de",
    language: "Deutsch",
    description:
      "Seminar language, argumentation, and formal writing patterns for university and professional contexts.",
    tags: ["academic", "writing", "c1"],
    downloadUrl: "#download-akademisch-c1",
    cover: { from: "#4c1d95", to: "#1e1b4b", kicker: "Hochschule" }
  },
  {
    id: "stil-register-c2",
    title: "Stil & Register C2",
    level: "C2",
    category: "de",
    language: "Deutsch",
    description:
      "Nuance, idiom, and register control for near-native reading and writing. Includes annotated literary excerpts.",
    tags: ["advanced", "style", "c2"],
    downloadUrl: "#download-stil-register-c2",
    cover: { from: "#111827", to: "#0f172a", kicker: "Meisterschaft" }
  },
  {
    id: "nemetskiy-start-a1",
    title: "Немецкий с нуля A1",
    level: "A1",
    category: "ru",
    language: "Русский / Deutsch",
    description:
      "Алфавит, произношение и первые фразы с пояснениями на русском. Идеально для самостоятельного старта.",
    tags: ["начинающие", "русский", "a1", "beginner"],
    downloadUrl: "#download-nemetskiy-start-a1",
    cover: { from: "#0f766e", to: "#134e4a", kicker: "Старт" }
  },
  {
    id: "grammatika-ru-a2",
    title: "Грамматика немецкого A2",
    level: "A2",
    category: "ru",
    language: "Русский / Deutsch",
    description:
      "Падежи, артикли и порядок слов с таблицами на русском и тренировочными упражнениями с ключами.",
    tags: ["грамматика", "a2", "russian"],
    downloadUrl: "#download-grammatika-ru-a2",
    cover: { from: "#9f1239", to: "#4c0519", kicker: "Таблицы" }
  },
  {
    id: "razgovornik-b1",
    title: "Разговорник B1: работа и быт",
    level: "B1",
    category: "ru",
    language: "Русский / Deutsch",
    description:
      "Готовые конструкции для собеседований, аренды жилья и визитов к врачу — с транскрипцией и переводом.",
    tags: ["разговорник", "b1", "work"],
    downloadUrl: "#download-razgovornik-b1",
    cover: { from: "#0369a1", to: "#0c4a6e", kicker: "Диалоги" }
  },
  {
    id: "ekzamen-b2-ru",
    title: "Подготовка к экзамену B2",
    level: "B2",
    category: "ru",
    language: "Русский / Deutsch",
    description:
      "Стратегии Goethe / telc B2: письмо, устная часть и типичные ловушки, объяснённые по-русски.",
    tags: ["экзамен", "goethe", "telc", "b2"],
    downloadUrl: "#download-ekzamen-b2-ru",
    cover: { from: "#1e40af", to: "#172554", kicker: "Экзамен" }
  },
  {
    id: "fillimi-a1",
    title: "Gjermanisht nga fillimi A1",
    level: "A1",
    category: "sq",
    language: "Shqip / Deutsch",
    description:
      "Shqiptimi, përshëndetjet dhe fjalori i përditshëm me shpjegime në shqip dhe ushtrime të shkurtra.",
    tags: ["fillestar", "a1", "albanian"],
    downloadUrl: "#download-fillimi-a1",
    cover: { from: "#b45309", to: "#78350f", kicker: "Fillimi" }
  },
  {
    id: "gramatika-sq-a2",
    title: "Gramatika gjermane A2",
    level: "A2",
    category: "sq",
    language: "Shqip / Deutsch",
    description:
      "Rasa, foljet e ndara dhe fjali të thjeshta me tabela dygjuhëshe shqip–gjermanisht.",
    tags: ["gramatikë", "a2", "shqip"],
    downloadUrl: "#download-gramatika-sq-a2",
    cover: { from: "#047857", to: "#064e3b", kicker: "Ushtrime" }
  },
  {
    id: "jete-perditshme-b1",
    title: "Jeta e përditshme B1",
    level: "B1",
    category: "sq",
    language: "Shqip / Deutsch",
    description:
      "Dialogë për punën, shkollën dhe zyrat administrative në Gjermani, Austri dhe Zvicër.",
    tags: ["bisedë", "b1", "integration"],
    downloadUrl: "#download-jete-perditshme-b1",
    cover: { from: "#be123c", to: "#881337", kicker: "Integrim" }
  },
  {
    id: "provimi-b2-sq",
    title: "Përgatitje për provimin B2",
    level: "B2",
    category: "sq",
    language: "Shqip / Deutsch",
    description:
      "Modele shkrimi, tema gojore dhe këshilla praktike për Goethe-Zertifikat dhe telc B2.",
    tags: ["provim", "b2", "goethe"],
    downloadUrl: "#download-provimi-b2-sq",
    cover: { from: "#4338ca", to: "#1e1b4b", kicker: "Provimi" }
  },
  {
    id: "aussprache-a1",
    title: "Aussprache-Studio A1–A2",
    level: "A1",
    category: "de",
    language: "Deutsch",
    description:
      "Minimal pairs, umlauts, and sentence stress. Printable worksheets plus a simple self-check grid.",
    tags: ["pronunciation", "phonetics", "a1", "a2"],
    downloadUrl: "#download-aussprache-a1",
    cover: { from: "#0f766e", to: "#042f2e", kicker: "Phonetik" }
  }
];

window.CATEGORIES = {
  de: {
    id: "de",
    name: "Deutsche Bücher",
    href: "deutsche-buecher.html",
    blurb: "Original German course books, grammar, and exam practice — A1 to C2.",
    kicker: "Für Deutschlernende",
    localeNote: "German"
  },
  ru: {
    id: "ru",
    name: "Немецкие книги",
    href: "nemetskie-knigi.html",
    blurb: "Немецкие учебники с пояснениями на русском — от A1 до B2 и выше.",
    kicker: "Для русскоязычных",
    localeNote: "Russian"
  },
  sq: {
    id: "sq",
    name: "Libra Gjermanisht",
    href: "libra-gjermanisht.html",
    blurb: "Tekste gjermane me shpjegime në shqip për nxënës dhe migrantë.",
    kicker: "Për shqipfolës",
    localeNote: "Albanian"
  }
};
