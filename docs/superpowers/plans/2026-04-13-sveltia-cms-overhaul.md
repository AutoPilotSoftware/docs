# Sveltia CMS + Starlight GitBook-like Overhaul — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure autopilot-docs into nested folder hierarchy, enable full Sveltia CMS editing (create/delete/rich text), add custom editor components for callouts, enhance CSS styling — all while keeping GitHub Pages deployment.

**Architecture:** Content moves from flat `src/content/docs/*.md` into section subfolders (`getting-started/`, `exchanges/`, `kyc/`, `legal/`). Sidebar switches from hardcoded slugs to `autogenerate`. Sveltia CMS config gains per-section collections with `create: true`. Custom editor components registered via JS produce Starlight-native `:::` aside syntax. Media uploads go to `public/media/`.

**Tech Stack:** Astro 5.6, Starlight 0.37, Sveltia CMS (browser-only), GitHub Actions, GitHub Pages

**Working directory:** `~/Desktop/autopilot-docs`

---

## File Map

**Create:**
- `public/media/.gitkeep` — media upload directory
- `src/content/docs/getting-started/` — section folder (+ en/, ua/)
- `src/content/docs/exchanges/` — section folder (+ en/, ua/)
- `src/content/docs/kyc/` — section folder (+ en/, ua/)
- `src/content/docs/legal/` — section folder (+ en/, ua/)

**Modify:**
- `astro.config.mjs` — sidebar: manual slugs → autogenerate
- `public/admin/config.yml` — full rewrite: per-section collections, create/delete, richtext
- `public/admin/index.html` — add custom editor components (callout/aside)
- `src/styles/custom.css` — enhanced GitBook-like styling
- `src/content/docs/index.mdx` — update LinkCard hrefs
- `src/content/docs/en/index.mdx` — update LinkCard hrefs
- `src/content/docs/ua/index.mdx` — update LinkCard hrefs
- All moved `.md` files — add `sidebar` frontmatter (order + label)
- `sellers-guide.md`, `nvs-faq.md` (all locales) — fix image relative paths after move

**Move (git mv):**
- Root locale: 11 `.md` files from `src/content/docs/` → section subfolders
- `en/` locale: 9 `.md` files from `src/content/docs/en/` → section subfolders
- `ua/` locale: 9 `.md` files from `src/content/docs/ua/` → section subfolders

---

### Task 1: Create section folders and media directory

**Files:**
- Create: `public/media/.gitkeep`
- Create: `src/content/docs/getting-started/` (empty dir, files moved in Task 2)
- Create: `src/content/docs/exchanges/`
- Create: `src/content/docs/kyc/`
- Create: `src/content/docs/legal/`
- Create: same subfolders under `en/` and `ua/`

- [ ] **Step 1: Create all directories**

```bash
cd ~/Desktop/autopilot-docs

# Media directory
mkdir -p public/media
touch public/media/.gitkeep

# Root locale (ru) section folders
mkdir -p src/content/docs/getting-started
mkdir -p src/content/docs/exchanges
mkdir -p src/content/docs/kyc
mkdir -p src/content/docs/legal

# English locale
mkdir -p src/content/docs/en/getting-started
mkdir -p src/content/docs/en/exchanges
mkdir -p src/content/docs/en/kyc

# Ukrainian locale
mkdir -p src/content/docs/ua/getting-started
mkdir -p src/content/docs/ua/exchanges
mkdir -p src/content/docs/ua/kyc
```

Note: `en/` and `ua/` don't need `legal/` — `privacy-policy` and `sellers-guide` only exist in root locale.

- [ ] **Step 2: Commit**

```bash
cd ~/Desktop/autopilot-docs
git add public/media/.gitkeep
git commit -m "chore: create section folders and media directory for CMS overhaul"
```

---

### Task 2: Move root-locale (ru) articles into section folders

**Files:**
- Move: `src/content/docs/faq.md` → `src/content/docs/getting-started/faq.md`
- Move: `src/content/docs/macos-launch.md` → `src/content/docs/getting-started/macos-launch.md`
- Move: `src/content/docs/bybit-autopilot.md` → `src/content/docs/exchanges/bybit-autopilot.md`
- Move: `src/content/docs/mexc-autopilot.md` → `src/content/docs/exchanges/mexc-autopilot.md`
- Move: `src/content/docs/bitget-autopilot.md` → `src/content/docs/exchanges/bitget-autopilot.md`
- Move: `src/content/docs/autopilot-kyc-subscription.md` → `src/content/docs/kyc/autopilot-kyc-subscription.md`
- Move: `src/content/docs/autopilot-kyc-tos.md` → `src/content/docs/kyc/autopilot-kyc-tos.md`
- Move: `src/content/docs/nvs-faq.md` → `src/content/docs/kyc/nvs-faq.md`
- Move: `src/content/docs/pilot-faq.md` → `src/content/docs/kyc/pilot-faq.md`
- Move: `src/content/docs/sellers-guide.md` → `src/content/docs/kyc/sellers-guide.md`
- Move: `src/content/docs/privacy-policy-autopilot-link-generator.md` → `src/content/docs/legal/privacy-policy-autopilot-link-generator.md`

- [ ] **Step 1: Move all root-locale files**

```bash
cd ~/Desktop/autopilot-docs

# Getting Started
git mv src/content/docs/faq.md src/content/docs/getting-started/faq.md
git mv src/content/docs/macos-launch.md src/content/docs/getting-started/macos-launch.md

# Exchanges
git mv src/content/docs/bybit-autopilot.md src/content/docs/exchanges/bybit-autopilot.md
git mv src/content/docs/mexc-autopilot.md src/content/docs/exchanges/mexc-autopilot.md
git mv src/content/docs/bitget-autopilot.md src/content/docs/exchanges/bitget-autopilot.md

# KYC
git mv src/content/docs/autopilot-kyc-subscription.md src/content/docs/kyc/autopilot-kyc-subscription.md
git mv src/content/docs/autopilot-kyc-tos.md src/content/docs/kyc/autopilot-kyc-tos.md
git mv src/content/docs/nvs-faq.md src/content/docs/kyc/nvs-faq.md
git mv src/content/docs/pilot-faq.md src/content/docs/kyc/pilot-faq.md
git mv src/content/docs/sellers-guide.md src/content/docs/kyc/sellers-guide.md

# Legal
git mv src/content/docs/privacy-policy-autopilot-link-generator.md src/content/docs/legal/privacy-policy-autopilot-link-generator.md
```

- [ ] **Step 2: Commit**

```bash
git commit -m "refactor: move root-locale articles into section folders"
```

---

### Task 3: Move en/ and ua/ locale articles into section folders

**Files:**
- Move: 9 files from `src/content/docs/en/` → section subfolders
- Move: 9 files from `src/content/docs/ua/` → section subfolders

- [ ] **Step 1: Move English locale files**

```bash
cd ~/Desktop/autopilot-docs

# EN — Getting Started
git mv src/content/docs/en/faq.md src/content/docs/en/getting-started/faq.md
git mv src/content/docs/en/macos-launch.md src/content/docs/en/getting-started/macos-launch.md

# EN — Exchanges
git mv src/content/docs/en/bybit-autopilot.md src/content/docs/en/exchanges/bybit-autopilot.md
git mv src/content/docs/en/mexc-autopilot.md src/content/docs/en/exchanges/mexc-autopilot.md
git mv src/content/docs/en/bitget-autopilot.md src/content/docs/en/exchanges/bitget-autopilot.md

# EN — KYC
git mv src/content/docs/en/autopilot-kyc-subscription.md src/content/docs/en/kyc/autopilot-kyc-subscription.md
git mv src/content/docs/en/autopilot-kyc-tos.md src/content/docs/en/kyc/autopilot-kyc-tos.md
git mv src/content/docs/en/nvs-faq.md src/content/docs/en/kyc/nvs-faq.md
git mv src/content/docs/en/pilot-faq.md src/content/docs/en/kyc/pilot-faq.md
```

- [ ] **Step 2: Move Ukrainian locale files**

```bash
cd ~/Desktop/autopilot-docs

# UA — Getting Started
git mv src/content/docs/ua/faq.md src/content/docs/ua/getting-started/faq.md
git mv src/content/docs/ua/macos-launch.md src/content/docs/ua/getting-started/macos-launch.md

# UA — Exchanges
git mv src/content/docs/ua/bybit-autopilot.md src/content/docs/ua/exchanges/bybit-autopilot.md
git mv src/content/docs/ua/mexc-autopilot.md src/content/docs/ua/exchanges/mexc-autopilot.md
git mv src/content/docs/ua/bitget-autopilot.md src/content/docs/ua/exchanges/bitget-autopilot.md

# UA — KYC
git mv src/content/docs/ua/autopilot-kyc-subscription.md src/content/docs/ua/kyc/autopilot-kyc-subscription.md
git mv src/content/docs/ua/autopilot-kyc-tos.md src/content/docs/ua/kyc/autopilot-kyc-tos.md
git mv src/content/docs/ua/nvs-faq.md src/content/docs/ua/kyc/nvs-faq.md
git mv src/content/docs/ua/pilot-faq.md src/content/docs/ua/kyc/pilot-faq.md
```

- [ ] **Step 3: Commit**

```bash
git commit -m "refactor: move en/ and ua/ locale articles into section folders"
```

---

### Task 4: Add sidebar frontmatter to all articles

Every article needs `sidebar` frontmatter so Starlight's `autogenerate` orders them correctly. Add `sidebar.order` and `sidebar.label` to each file's YAML frontmatter.

**Files:** All `.md` files in section folders (root, en, ua locales)

- [ ] **Step 1: Add sidebar frontmatter to root-locale (ru) files**

For each file, insert `sidebar` block after the existing frontmatter fields. The order numbers determine sidebar display order within each section.

**getting-started/faq.md** — add after `description:` line:
```yaml
sidebar:
  order: 1
  label: "FAQ"
```

**getting-started/macos-launch.md** — add after `description:` line:
```yaml
sidebar:
  order: 2
  label: "Запуск на macOS"
```

**exchanges/bybit-autopilot.md** — add after `description:` line:
```yaml
sidebar:
  order: 1
  label: "Bybit AutoPilot"
```

**exchanges/mexc-autopilot.md** — add after `description:` line:
```yaml
sidebar:
  order: 2
  label: "MEXC AutoPilot"
```

**exchanges/bitget-autopilot.md** — add after `description:` line:
```yaml
sidebar:
  order: 3
  label: "Bitget AutoPilot"
```

**kyc/autopilot-kyc-subscription.md** — add after `description:` line:
```yaml
sidebar:
  order: 1
  label: "Подписка KYC"
```

**kyc/nvs-faq.md** — add after `description:` line:
```yaml
sidebar:
  order: 2
  label: "NVS Загрузка"
```

**kyc/pilot-faq.md** — add after `description:` line:
```yaml
sidebar:
  order: 3
  label: "Гайд Пилота"
```

**kyc/sellers-guide.md** — add after `description:` line:
```yaml
sidebar:
  order: 4
  label: "Seller Guide"
```

**kyc/autopilot-kyc-tos.md** — add after `description:` line:
```yaml
sidebar:
  order: 5
  label: "Условия использования"
```

**legal/privacy-policy-autopilot-link-generator.md** — add after `description:` line:
```yaml
sidebar:
  order: 1
  label: "Privacy Policy"
```

- [ ] **Step 2: Add sidebar frontmatter to en/ locale files**

Same pattern — add `sidebar` block to each file. Use English labels:

| File | order | label |
|---|---|---|
| en/getting-started/faq.md | 1 | "FAQ" |
| en/getting-started/macos-launch.md | 2 | "Launch on macOS" |
| en/exchanges/bybit-autopilot.md | 1 | "Bybit AutoPilot" |
| en/exchanges/mexc-autopilot.md | 2 | "MEXC AutoPilot" |
| en/exchanges/bitget-autopilot.md | 3 | "Bitget AutoPilot" |
| en/kyc/autopilot-kyc-subscription.md | 1 | "KYC Subscription" |
| en/kyc/nvs-faq.md | 2 | "NVS Upload" |
| en/kyc/pilot-faq.md | 3 | "Pilot Guide" |
| en/kyc/autopilot-kyc-tos.md | 5 | "Terms of Service" |

- [ ] **Step 3: Add sidebar frontmatter to ua/ locale files**

Same pattern with Ukrainian labels:

| File | order | label |
|---|---|---|
| ua/getting-started/faq.md | 1 | "FAQ" |
| ua/getting-started/macos-launch.md | 2 | "Запуск на macOS" |
| ua/exchanges/bybit-autopilot.md | 1 | "Bybit AutoPilot" |
| ua/exchanges/mexc-autopilot.md | 2 | "MEXC AutoPilot" |
| ua/exchanges/bitget-autopilot.md | 3 | "Bitget AutoPilot" |
| ua/kyc/autopilot-kyc-subscription.md | 1 | "Підписка KYC" |
| ua/kyc/nvs-faq.md | 2 | "NVS Завантаження" |
| ua/kyc/pilot-faq.md | 3 | "Гайд Пілота" |
| ua/kyc/autopilot-kyc-tos.md | 5 | "Умови використання" |

- [ ] **Step 4: Commit**

```bash
cd ~/Desktop/autopilot-docs
git add -A src/content/docs/
git commit -m "feat: add sidebar frontmatter (order + label) to all articles"
```

---

### Task 5: Fix image relative paths after file moves

After moving files one level deeper, relative image paths break. Files that reference `../../assets/` now need `../../../assets/` (root locale gains one level; en/ua locale files that were already one deeper gain another).

**Files:**
- Modify: `src/content/docs/kyc/nvs-faq.md` — 4 image refs
- Modify: `src/content/docs/kyc/sellers-guide.md` — 11 image refs
- Modify: `src/content/docs/en/kyc/nvs-faq.md` — 4 image refs
- Modify: `src/content/docs/ua/kyc/nvs-faq.md` — 4 image refs

- [ ] **Step 1: Fix root-locale nvs-faq.md image paths**

In `src/content/docs/kyc/nvs-faq.md`, the images currently reference `../../assets/nvs/`. After move to `kyc/` subfolder, the path needs one more `../`:

Find and replace all occurrences:
- `../../assets/nvs/` → `../../../assets/nvs/`

- [ ] **Step 2: Fix root-locale sellers-guide.md image paths**

In `src/content/docs/kyc/sellers-guide.md`, images reference `../../assets/sellers/`. After move:

Find and replace all occurrences:
- `../../assets/sellers/` → `../../../assets/sellers/`

- [ ] **Step 3: Fix en/ locale nvs-faq.md image paths**

In `src/content/docs/en/kyc/nvs-faq.md`, images reference `../../../assets/nvs/`. After move into `kyc/` subfolder:

Find and replace all occurrences:
- `../../../assets/nvs/` → `../../../../assets/nvs/`

- [ ] **Step 4: Fix ua/ locale nvs-faq.md image paths**

In `src/content/docs/ua/kyc/nvs-faq.md`, same fix:

Find and replace all occurrences:
- `../../../assets/nvs/` → `../../../../assets/nvs/`

- [ ] **Step 5: Commit**

```bash
cd ~/Desktop/autopilot-docs
git add -A src/content/docs/
git commit -m "fix: update image relative paths after content restructuring"
```

---

### Task 6: Update index.mdx LinkCard hrefs (all 3 locales)

After moving articles into subfolders, the `href="./faq"` links in index.mdx files become `href="./getting-started/faq"` etc.

**Files:**
- Modify: `src/content/docs/index.mdx`
- Modify: `src/content/docs/en/index.mdx`
- Modify: `src/content/docs/ua/index.mdx`

- [ ] **Step 1: Update root-locale index.mdx**

In `src/content/docs/index.mdx`, replace all LinkCard href values:

| Old href | New href |
|---|---|
| `./faq` | `./getting-started/faq` |
| `./bybit-autopilot` | `./exchanges/bybit-autopilot` |
| `./mexc-autopilot` | `./exchanges/mexc-autopilot` |
| `./bitget-autopilot` | `./exchanges/bitget-autopilot` |
| `./autopilot-kyc-subscription` | `./kyc/autopilot-kyc-subscription` |
| `./nvs-faq` | `./kyc/nvs-faq` |
| `./pilot-faq` | `./kyc/pilot-faq` |
| `./autopilot-kyc-tos` | `./kyc/autopilot-kyc-tos` |
| `./sellers-guide` | `./kyc/sellers-guide` |

- [ ] **Step 2: Update en/index.mdx**

In `src/content/docs/en/index.mdx`, apply the exact same href replacements as Step 1. The link text is in English but the href paths are identical.

- [ ] **Step 3: Update ua/index.mdx**

In `src/content/docs/ua/index.mdx`, apply the exact same href replacements as Step 1. The link text is in Ukrainian but the href paths are identical.

- [ ] **Step 4: Commit**

```bash
cd ~/Desktop/autopilot-docs
git add src/content/docs/index.mdx src/content/docs/en/index.mdx src/content/docs/ua/index.mdx
git commit -m "fix: update LinkCard hrefs to match new folder structure"
```

---

### Task 7: Update astro.config.mjs sidebar to autogenerate

**Files:**
- Modify: `astro.config.mjs`

- [ ] **Step 1: Replace the sidebar array**

In `astro.config.mjs`, replace the entire `sidebar` property (lines 31-41):

Old:
```js
sidebar: [
    { label: 'FAQ', slug: 'faq' },
    { label: 'NVS Upload FAQ', slug: 'nvs-faq' },
    { label: 'Bybit AutoPilot', slug: 'bybit-autopilot' },
    { label: 'MEXC AutoPilot', slug: 'mexc-autopilot' },
    { label: 'Bitget AutoPilot', slug: 'bitget-autopilot' },
    { label: 'NVS Pilot Guide', slug: 'pilot-faq' },
    { label: 'KYC Subscription', slug: 'autopilot-kyc-subscription' },
    { label: 'Terms of Service', slug: 'autopilot-kyc-tos' },
    { label: 'Seller Guide', slug: 'sellers-guide' },
],
```

New:
```js
sidebar: [
    {
        label: 'Начало работы',
        translations: { en: 'Getting Started', uk: 'Початок роботи' },
        autogenerate: { directory: 'getting-started' },
    },
    {
        label: 'Биржи',
        translations: { en: 'Exchanges', uk: 'Біржі' },
        autogenerate: { directory: 'exchanges' },
    },
    {
        label: 'KYC Платформа',
        translations: { en: 'KYC Platform', uk: 'KYC Платформа' },
        autogenerate: { directory: 'kyc' },
    },
    {
        label: 'Юридическое',
        translations: { en: 'Legal', uk: 'Юридичне' },
        autogenerate: { directory: 'legal' },
    },
],
```

- [ ] **Step 2: Commit**

```bash
cd ~/Desktop/autopilot-docs
git add astro.config.mjs
git commit -m "feat: switch sidebar from manual slugs to autogenerate from folders"
```

---

### Task 8: Build test — verify content restructuring works

Before touching CMS config, verify the Astro build succeeds with the new folder structure.

- [ ] **Step 1: Run local dev server**

```bash
cd ~/Desktop/autopilot-docs
npm run dev
```

Expected: Dev server starts on `localhost:4321`. No build errors.

- [ ] **Step 2: Verify in browser**

Open `http://localhost:4321/docs/` and check:
- Sidebar shows 4 collapsible sections (Начало работы, Биржи, KYC Платформа, Юридическое)
- Each section expands to show its articles in correct order
- Click each article — content renders correctly
- Images in nvs-faq and sellers-guide load correctly
- LinkCards on landing page link to correct articles
- Switch locale to EN and UA — verify sidebar and articles work

- [ ] **Step 3: Run build**

```bash
cd ~/Desktop/autopilot-docs
npm run build
```

Expected: Build completes with no errors. Check `dist/` output has all pages.

- [ ] **Step 4: Fix any issues found, then commit fixes if needed**

---

### Task 9: Replace admin/config.yml with full CMS configuration

**Files:**
- Modify: `public/admin/config.yml` — full rewrite

- [ ] **Step 1: Write the new config.yml**

Replace the entire contents of `public/admin/config.yml` with:

```yaml
backend:
  name: github
  repo: AutoPilotSoftware/docs
  branch: main

site_url: https://autopilotsoftware.github.io/docs
display_url: https://autopilotsoftware.github.io/docs

media_folder: public/media
public_folder: /docs/media

slug:
  encoding: unicode-normalized
  clean_accents: false
  sanitize_replacement: '-'

i18n:
  structure: multiple_folders
  locales: [ru, en, ua]
  default_locale: ru
  omit_default_locale_from_file_path: true

collections:
  - name: getting-started
    label: "Начало работы"
    label_singular: "Статья"
    folder: src/content/docs/getting-started
    create: true
    delete: true
    format: yaml-frontmatter
    extension: md
    i18n: true
    sortable_fields: [title]
    summary: "{{title}}"
    fields:
      - { label: Title, name: title, widget: string, i18n: true }
      - { label: Description, name: description, widget: string, i18n: true, required: false }
      - label: Sidebar
        name: sidebar
        widget: object
        required: false
        fields:
          - { label: Order, name: order, widget: number, required: false, value_type: int }
          - { label: Label, name: label, widget: string, required: false, i18n: true }
      - { label: Body, name: body, widget: richtext, i18n: true }

  - name: exchanges
    label: "Биржи"
    label_singular: "Гайд по бирже"
    folder: src/content/docs/exchanges
    create: true
    delete: true
    format: yaml-frontmatter
    extension: md
    i18n: true
    sortable_fields: [title]
    summary: "{{title}}"
    fields:
      - { label: Title, name: title, widget: string, i18n: true }
      - { label: Description, name: description, widget: string, i18n: true, required: false }
      - label: Sidebar
        name: sidebar
        widget: object
        required: false
        fields:
          - { label: Order, name: order, widget: number, required: false, value_type: int }
          - { label: Label, name: label, widget: string, required: false, i18n: true }
      - { label: Body, name: body, widget: richtext, i18n: true }

  - name: kyc
    label: "KYC Платформа"
    label_singular: "Статья KYC"
    folder: src/content/docs/kyc
    create: true
    delete: true
    format: yaml-frontmatter
    extension: md
    i18n: true
    sortable_fields: [title]
    summary: "{{title}}"
    fields:
      - { label: Title, name: title, widget: string, i18n: true }
      - { label: Description, name: description, widget: string, i18n: true, required: false }
      - label: Sidebar
        name: sidebar
        widget: object
        required: false
        fields:
          - { label: Order, name: order, widget: number, required: false, value_type: int }
          - { label: Label, name: label, widget: string, required: false, i18n: true }
      - { label: Body, name: body, widget: richtext, i18n: true }

  - name: legal
    label: "Юридическое"
    label_singular: "Документ"
    folder: src/content/docs/legal
    create: true
    delete: true
    format: yaml-frontmatter
    extension: md
    i18n: true
    fields:
      - { label: Title, name: title, widget: string, i18n: true }
      - { label: Description, name: description, widget: string, i18n: true, required: false }
      - label: Sidebar
        name: sidebar
        widget: object
        required: false
        fields:
          - { label: Order, name: order, widget: number, required: false, value_type: int }
          - { label: Label, name: label, widget: string, required: false, i18n: true }
      - { label: Body, name: body, widget: richtext, i18n: true }

  - name: landing
    label: "Главная страница"
    files:
      - name: index
        label: "Landing Page (RU)"
        file: src/content/docs/index.mdx
        format: yaml-frontmatter
        fields:
          - { label: Title, name: title, widget: string }
          - { label: Description, name: description, widget: string }
          - { label: Body, name: body, widget: richtext }
```

Note: The `sidebar` field is defined as a nested `object` widget so it correctly produces the YAML structure Starlight expects:
```yaml
sidebar:
  order: 1
  label: "FAQ"
```

- [ ] **Step 2: Commit**

```bash
cd ~/Desktop/autopilot-docs
git add public/admin/config.yml
git commit -m "feat: full Sveltia CMS config with per-section collections and create/delete"
```

---

### Task 10: Replace admin/index.html with custom editor components

**Files:**
- Modify: `public/admin/index.html`

- [ ] **Step 1: Write the new index.html**

Replace the entire contents of `public/admin/index.html` with:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <title>AutoPilot CMS</title>
    <script>
      window.CMS_MANUAL_INIT = true;
    </script>
</head>
<body>
    <script type="module">
      import CMS from 'https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js';

      // Starlight Aside / Callout block
      // Produces :::note / :::tip / :::caution / :::danger syntax
      CMS.registerEditorComponent({
        id: 'aside',
        label: 'Callout',
        icon: 'campaign',
        fields: [
          {
            name: 'type',
            label: 'Type',
            widget: 'select',
            options: ['note', 'tip', 'caution', 'danger'],
            default: 'note',
          },
          {
            name: 'title',
            label: 'Custom Title (optional)',
            widget: 'string',
            required: false,
          },
          {
            name: 'content',
            label: 'Content',
            widget: 'text',
          },
        ],
        pattern: /^:::(\w+)(?:\[(.+?)\])?\n([\s\S]+?)\n:::/m,
        fromBlock: (match) => ({
          type: match[1],
          title: match[2] || '',
          content: match[3] ? match[3].trim() : '',
        }),
        toBlock: (data) => {
          const header = data.title
            ? `:::${data.type}[${data.title}]`
            : `:::${data.type}`;
          return `${header}\n${data.content}\n:::`;
        },
        toPreview: (data) => {
          const colors = { note: '#3b82f6', tip: '#22c55e', caution: '#f59e0b', danger: '#ef4444' };
          const color = colors[data.type] || colors.note;
          return `<div style="border-left:4px solid ${color};padding:8px 12px;margin:8px 0;background:${color}11;border-radius:4px"><strong>${data.type.toUpperCase()}${data.title ? ': ' + data.title : ''}</strong><br/>${data.content}</div>`;
        },
      });

      CMS.init();
    </script>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
cd ~/Desktop/autopilot-docs
git add public/admin/index.html
git commit -m "feat: add custom editor components (callout/aside) to Sveltia CMS"
```

---

### Task 11: Enhance custom.css for GitBook-like styling

**Files:**
- Modify: `src/styles/custom.css`

- [ ] **Step 1: Replace custom.css with enhanced styles**

Replace the entire contents of `src/styles/custom.css` with:

```css
/* ===== Images ===== */
.sl-markdown-content img {
  max-width: 520px;
  width: 100%;
  display: block;
  margin: 1.5rem auto;
  border-radius: 8px;
}

/* ===== Sidebar section headers ===== */
.sidebar-content .top-level > li > details > summary span,
.sidebar-content .top-level > li > a span {
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.7rem;
  letter-spacing: 0.05em;
}

/* ===== Aside / callout refinements ===== */
.starlight-aside {
  border-radius: 8px;
  border-left-width: 4px;
}

/* ===== Content spacing ===== */
.sl-markdown-content h2 {
  margin-top: 2.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--sl-color-gray-6);
}

/* ===== Tables ===== */
.sl-markdown-content table {
  border-radius: 8px;
  overflow: hidden;
}

.sl-markdown-content th {
  background: var(--sl-color-gray-6);
  font-weight: 600;
}
```

Note: Exact selectors for sidebar may need adjustment after checking Starlight's actual DOM. The dev server test (Task 12) will reveal if selectors need tweaking.

- [ ] **Step 2: Commit**

```bash
cd ~/Desktop/autopilot-docs
git add src/styles/custom.css
git commit -m "feat: enhanced GitBook-like CSS styling for sidebar, callouts, tables"
```

---

### Task 12: Full integration test — dev server + build

- [ ] **Step 1: Start dev server and verify everything**

```bash
cd ~/Desktop/autopilot-docs
npm run dev
```

Check in browser at `http://localhost:4321/docs/`:

1. **Sidebar**: 4 collapsible sections with correct labels, articles in correct order
2. **Articles**: All articles render correctly, mermaid diagrams work
3. **Images**: nvs-faq images load, sellers-guide images load
4. **Links**: Landing page LinkCards navigate to correct articles
5. **Locales**: Switch to EN, UA — sidebar labels translate, articles render
6. **CSS**: h2 has bottom border, tables have rounded corners, callouts look styled
7. **Admin**: Visit `/docs/admin/` — see 5 collections (Начало работы, Биржи, KYC, Юридическое, Главная)

- [ ] **Step 2: Check CSS selectors against actual DOM**

Open browser DevTools on the sidebar. Verify the CSS selectors in custom.css match the actual DOM structure. Starlight's sidebar DOM may use different class names. If selectors don't match, update custom.css with correct selectors.

- [ ] **Step 3: Run production build**

```bash
cd ~/Desktop/autopilot-docs
npm run build
```

Expected: Build completes with 0 errors.

- [ ] **Step 4: Preview production build**

```bash
cd ~/Desktop/autopilot-docs
npm run preview
```

Open `http://localhost:4321/docs/` — verify everything looks correct in production mode.

- [ ] **Step 5: Fix any issues found, commit fixes**

---

### Task 13: Final commit and push

- [ ] **Step 1: Verify git status is clean**

```bash
cd ~/Desktop/autopilot-docs
git status
```

All changes should be committed. If any uncommitted files remain, add and commit them.

- [ ] **Step 2: Push to origin**

```bash
cd ~/Desktop/autopilot-docs
git push
```

- [ ] **Step 3: Verify GitHub Actions build**

Check the GitHub Actions tab at `https://github.com/AutoPilotSoftware/docs/actions` — verify the build succeeds and the site deploys.

- [ ] **Step 4: Verify live site**

Open `https://autopilotsoftware.github.io/docs/` and verify:
- Sidebar has collapsible sections
- All articles accessible
- All images load
- Locale switching works
- `/docs/admin/` loads the CMS dashboard
