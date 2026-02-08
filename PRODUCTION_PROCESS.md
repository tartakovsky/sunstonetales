# Sunstone Tales — Production Process

This document describes the complete pipeline for developing, illustrating, and publishing stories on the Sunstone Tales website.

---

## Architecture Overview

The project is a monorepo with two distinct areas:

**Story development** — lives at the repo root under `liska_adventures/` (and eventually `liska_struggles/`). This is where writing, brainstorming, image generation, and iteration happen. The website never reads from these folders directly.

**Landing site** — lives under `landing/`. A Next.js 16 app deployed to Railway. This is the public website at `sunstonetales.com`. Stories are published here as MDX files.

**Asset storage** — Cloudflare R2 bucket `sunstonetales-media`. All images are served from R2, never bundled in the site. Each story gets its own folder in the bucket: `sunstonetales-media/{slug}/`.

---

## Story Content Structure

### Development folder (where you write)

```
liska_adventures/{working_name}/
  v1_prose_en.md              ← English text (or whichever version comes first)
  v1_prose_ru.md              ← Russian text
  image_prompts.md            ← generated image descriptions for illustration
  images/                     ← dumped images from generation
    cub_finds_warm_house.jpeg
    milk_bowl_doorway.jpeg
    ...
```

The working folder name (e.g., `1_liska_and_her_name`, `3_crystal_cave`) is a temporary dev name. The publish script generates a proper slug from the story title, renames the folder, and uses that slug everywhere.

### Published structure (on the website)

```
landing/src/content/stories/{slug}/
  en/
    story.mdx                 ← English MDX with R2 image URLs
    meta.ts                   ← all metadata, JSON-LD, OG data for English version
  ru/
    story.mdx                 ← Russian MDX with R2 image URLs
    meta.ts                   ← all metadata, JSON-LD, OG data for Russian version
```

### Why per-language folders

Almost everything differs between language versions:
- **Title** and **description** — translated
- **Date** — versions may be published at different times
- **Cover image** — may contain text, different illustration
- **Word count** — different per language
- **Authors / translator credits** — may differ
- **Illustrator** — could theoretically differ
- **JSON-LD** — contains all the localized text fields

Only the **slug** (folder name) is shared. Everything else is fully independent per language. This means each language version is self-contained — no shared/merged field splitting, no clever inheritance. If something happens to be the same in both languages, it's just written twice.

### Story metadata (meta.ts)

Each `meta.ts` is a complete description of that language version of the story. It holds everything the page needs to render structured data, Open Graph tags, and JSON-LD schemas.

```typescript
// Example: landing/src/content/stories/liska-and-her-name/en/meta.ts
export const meta = {
  slug: "liska-and-her-name",
  title: "Liska and Her Name",
  description: "Liska finds out her name means 'little fox'...",
  date: "2026-02-08",
  category: "adventure",
  categorySlug: "liska_adventures",
  coverImage: "https://r2-url/liska-and-her-name/cover.jpeg",
  wordCount: 1200,
  ageRange: "3-7",
  authors: ["Eugene Tartakovsky"],
  illustrator: "...",
  language: "en",
};

export const jsonLd = {
  "@type": "ShortStory",
  // ... whatever schemas this story needs
};
```

JSON-LD schemas vary per story. Some might have FAQ schema, others won't. Each story defines exactly what it needs — no forced shared shape.

### Story registry

A thin index file (`landing/src/content/stories/index.ts`) imports all story metas and exports them as a list. This powers the story grid on the homepage and the `/stories` index page. It does not contain story content — just references.

---

## URL Structure

### Routes

```
sunstonetales.com/                                          ← Homepage (English, default)
sunstonetales.com/stories                                   ← All stories index
sunstonetales.com/stories/liska_adventures/liska-and-her-name  ← English story
sunstonetales.com/ru/stories/liska_adventures/liska-and-her-name  ← Russian story
sunstonetales.com/about                                     ← About page
sunstonetales.com/ru/about                                  ← About page (Russian)
```

### Internationalization

English is the default language — no prefix. Russian gets `/ru` prefix. This is standard Next.js i18n with path-based routing.

A language toggle on each page switches between versions by adding or stripping the `/ru` prefix. The slug stays the same in both languages (always English).

### Slug usage

The slug is the single identifier used everywhere:
- **Dev folder** — `liska_adventures/{slug}/`
- **R2 bucket** — `sunstonetales-media/{slug}/`
- **Website URL** — `/stories/{categorySlug}/{slug}`
- **MDX folder** — `content/stories/{slug}/`

---

## Publishing Pipeline

### Phase 1: Writing

1. Write story text in `liska_adventures/{working_name}/`. First version is typically Russian, but can be either language.
2. Iterate, get feedback, refine prose.

### Phase 2: Image Prompts

1. Model reads the finished story text.
2. Generates ~16 image prompt descriptions in `image_prompts.md`.
3. Each prompt describes what should be depicted, keyed to a specific moment in the story.

### Phase 3: Image Generation

1. You generate images from the prompts (Midjourney, DALL-E, etc.).
2. Dump raw images into `{story_folder}/images/`.

### Phase 4: Publish Script

A script (`tools/publish_story.py`) handles the transition from development folder to published website page.

**Input:** Path to story folder + which language file to publish (asks if not specified).

**What it does:**

1. **Generate slug** — reads the story title, proposes a URL-friendly slug. You confirm or override. Renames the dev folder to match.

2. **Name images** — renames images to descriptive snake_case names. If image names are unclear or don't map obviously to the story, it discusses with you until the mapping is clear.

3. **Upload to R2** — uploads all images to `sunstonetales-media/{slug}/`. Each story gets its own bucket folder.

4. **Position images in text:**
   - If the markdown already has images placed (like the Russian version of "Liska and Her Name") → keeps existing placement, rewrites local paths (`images/filename.jpeg`) to R2 URLs (`https://r2-url/{slug}/filename.jpeg`).
   - If no images are placed yet → auto-places them based on story content, you review and edit the placement after.
   - If the mapping between available images and text positions is ambiguous → stops and discusses with you.

5. **Write MDX** — outputs the final story MDX to `landing/src/content/stories/{slug}/{locale}/story.mdx`.

6. **Write meta.ts** — generates the metadata file with title, description, date, cover image, JSON-LD stub at `landing/src/content/stories/{slug}/{locale}/meta.ts`.

7. **Cover image** — separate from story images, goes into the meta as `coverImage`. Can be one of the story images or a different one — you choose.

8. **Register in index** — updates `landing/src/content/stories/index.ts` to include the new story (or you do this manually).

### Phase 5: Review and Deploy

1. Run local dev server (`npm run dev` on port 3010), review the story page.
2. Check two-pane layout, image placement, metadata.
3. Commit and push → Railway auto-deploys.

---

## Story Page Renderer

### Two-pane layout component (`<StoryLayout>`)

The story page wraps MDX output in a `<StoryLayout>` component that converts flat markdown rendering into the picture-book layout.

**How it works:**
- Walks the rendered MDX children
- Groups content into **spreads**: each spread = one image + the text blocks that follow it (until the next image or `---` divider)
- Renders each spread as a two-pane CSS grid: image on the left, scrollable text on the right

**Responsive behavior:**
- **Desktop / wide screens** — two-pane: image left, text right
- **Mobile / narrow screens** — single column: image then text, stacked

This is the same logic as `tools/story_to_html.py` (the picture-book HTML generator), but implemented as a React component instead of a Python script.

**The MDX stays clean** — just markdown with images and `---` dividers. No special components needed in the story files. The layout is purely a rendering concern.

```markdown
![cub finds warm house](https://r2-url/liska-and-her-name/cub_finds_warm_house.jpeg)

The cub pressed its belly to the snow and shivered...

Everything was white. White ground, white sky...

---

![milk bowl doorway](https://r2-url/liska-and-her-name/milk_bowl_doorway.jpeg)

A creaking sound. Part of the stone thing swung open...
```

---

## Codebase Changes Needed

The current landing site was built with a simpler flat blog structure. The following changes are needed to support the full pipeline described above.

### 1. Rename content/blog → content/stories

Current: `landing/src/content/blog/posts.ts`, `content/blog/posts/{slug}.mdx`
Target: `landing/src/content/stories/index.ts`, `content/stories/{slug}/{locale}/story.mdx` + `meta.ts`

Update all imports across the codebase.

### 2. Restructure story content to per-slug folders with locale subfolders

Current: flat MDX files in `content/blog/posts/`
Target: `content/stories/{slug}/{locale}/story.mdx` + `meta.ts`

### 3. Build story registry (content/stories/index.ts)

Thin file that imports all story metas and exports a list for the grid/index pages. Replaces the current `blogPosts` array in `posts.ts`.

### 4. Add i18n routing

Add Next.js middleware for `/ru` prefix routing. The default (no prefix) is English. The `/ru` prefix serves Russian versions.

Language toggle component on story pages and other content pages.

### 5. Build StoryLayout component

React component that wraps MDX output and renders the two-pane picture-book layout. Groups children into spreads (image + following text). Responsive: two-pane on wide, single column on narrow.

### 6. Update story page template

`[slug]/page.tsx` needs to:
- Read locale from URL
- Load the correct `story.mdx` and `meta.ts` for that locale
- Render JSON-LD from meta
- Wrap MDX in `<StoryLayout>`

### 7. Build publish script (tools/publish_story.py)

The pipeline script described in Phase 4 above. Handles slug generation, image naming, R2 upload, image placement, MDX generation, meta generation.

### 8. Update landing page and story grid

Story grid currently reads from `blogPosts`. Needs to read from the new story registry and be locale-aware.

---

## R2 Bucket Structure

```
sunstonetales-media/
  liska-and-her-name/
    cub_finds_warm_house.jpeg
    milk_bowl_doorway.jpeg
    cover.jpeg
    ...
  crystal-cave/
    ...
  hero.png                    ← landing page hero image
  recognition.png             ← landing page recognition section image
```

Each story gets its own folder. Landing page assets live at the bucket root.

---

## Current State (as of 2026-02-08)

### Published
- "Liska and Her Name" — English only, flat MDX in old blog structure

### In Development
- "The Crystal Cave" — v2 prose exists in English and Russian, no images yet

### Brainstormed
- 7 adventure concepts in `liska_adventures/brainstorms/adventure_ideas.md`
- Beat-by-beat outline exists for Crystal Cave

### Infrastructure
- GitHub repo: `tartakovsky/sunstonetales`
- Railway project: `sunstonetales` (deployed, domain attached)
- R2 bucket: `sunstonetales-media` (public at `https://pub-4837c48b846e4269a5a9a6e24d78826d.r2.dev`)
- Domain: `sunstonetales.com` (configured via Cloudflare)

### What exists in the codebase but needs restructuring
- `content/blog/` → needs to become `content/stories/` with per-slug folders
- Story page renders flat MDX → needs `<StoryLayout>` for two-pane layout
- No i18n routing → needs `/ru` prefix support
- No publish script → needs `tools/publish_story.py`
- Story metadata is minimal (title, description, date) → needs full `meta.ts` with JSON-LD
