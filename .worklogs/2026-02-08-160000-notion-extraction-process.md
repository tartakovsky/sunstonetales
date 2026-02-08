# Notion Story Extraction Process

**Date:** 2026-02-08 ~16:00
**Scope:** Process documentation — extracting stories from published Notion pages

## Summary
Figured out a reliable process to extract story text with image placement from published Notion pages using Chrome browser automation tools.

## Context & Problem
Story content (text + images) lives in Notion. Need to pull it into the repo without manual copy-paste. Notion pages are client-rendered SPAs, so WebFetch only gets a loading screen. Need browser-based extraction.

## What Works

### Text extraction
`get_page_text` on the Notion tab gives the full story text, but as a flat stream with no image placement info.

### Image placement mapping
Use `javascript_tool` to walk `.notion-page-content` children in DOM order:

```javascript
const pageContent = document.querySelector('.notion-page-content');
const allBlocks = pageContent.children;
const items = [];
for (const block of allBlocks) {
  const img = block.querySelector('img');
  if (img && img.width > 50) {
    const decoded = decodeURIComponent(img.src || '');
    const fname = decoded.split(':').pop()?.split('?')[0] || 'unknown';
    items.push('[IMG] ' + fname);
  } else {
    const txt = block.textContent?.trim();
    if (txt && txt.length > 3) {
      items.push(txt);
    }
  }
}
```

This returns the exact interleaving of text blocks and images in story order. Each image includes its original filename from the Notion attachment URL.

Note: output may be truncated for long stories. Use `.slice()` to get the second half if needed.

### Image count and filenames
```javascript
const imgs = document.querySelectorAll('img');
imgs.forEach(img => {
  if (img.width > 50 && img.src.includes('notion')) {
    // decode the URL to get original filename
    const decoded = decodeURIComponent(img.src);
    const fname = decoded.split(':').pop()?.split('?')[0];
  }
});
```

### What does NOT work for images
- **WebFetch** — Notion pages are client-rendered, returns empty loading screen
- **Extracting image URLs via JS** — blocked by extension (cookie/query string data filtering)
- **Canvas toDataURL** — blocked by CORS (tainted canvas from cross-origin Notion images)
- **curl with signed URLs** — can't get the URLs out of the browser due to the cookie filter

### Image download: manual step
User must right-click > Save Image As for each image in Chrome. Images go into `{story_folder}/notion/images/`.

## Process for Each Notion Story Page

1. User opens the Notion page in Chrome (or gives URL, I navigate to it)
2. `tabs_context_mcp` to get the tab ID
3. `get_page_text` for the raw text
4. `javascript_tool` with the DOM walker script above to get exact text + image interleaving
5. Determine which story folder it belongs to (adventure vs big-emotions, story number)
6. Create `{story_folder}/notion/` with `text_ru.md` (or `text_en.md`) containing the text with `![filename](images/filename.png)` markers at the right positions
7. Create `{story_folder}/notion/images/` directory
8. User saves images manually into that directory
9. Image filenames in the markdown use descriptive names (not the ChatGPT timestamps)

## Decisions Made

### Folder structure: notion/ subfolder
- **Chose:** `{story_folder}/notion/text_ru.md` + `notion/images/`
- **Why:** Keeps Notion-sourced content separate from any existing drafts or pipeline output in the story folder

### Image naming in markdown
- **Chose:** Descriptive names like `1_beach_sandcastle.png` in the markdown refs, with original Notion filenames noted
- **Why:** The ChatGPT timestamp filenames are meaningless. Descriptive names make the markdown readable. User can rename saved files to match, or we rename after.

## Key Files for Context
- `PRODUCTION_PROCESS.md` — overall pipeline architecture
- `liska_big_emotions/2_good_memories/notion/text_ru.md` — first extracted story (test case)
- This worklog — the extraction process

## Open Questions
- Should we build a small script that automates the "walk DOM, write markdown" step? Could be a bookmarklet or browser extension.
- Once images are saved, the publish script should handle renaming and R2 upload.
