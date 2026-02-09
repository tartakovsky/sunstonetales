# Fix mobile annotations, blue comments, delete from comment view

**Date:** 2026-02-09 12:17
**Scope:** story-reader.tsx, comment-popover.tsx, annotation-tooltip.tsx, types.ts

## Summary
Three fixes: (1) mobile annotations now use touchend + selectionchange for reliability, (2) comment-only annotations default to blue highlight, (3) delete button added to comment popover.

## Decisions Made

### Mobile: touchend + selectionchange
- **Chose:** Listen to both `touchend` on the text container and `selectionchange` on document, both debounced 350ms
- **Why:** `selectionchange` alone was unreliable on iOS Safari. `touchend` catches the long-press completion, `selectionchange` catches handle adjustments. Both funnel into the same debounced `checkSelection` that shows the tooltip without any preventDefault.

### Blue comment highlights
- **Chose:** Added "blue" as a color. Comment-only annotations (created via comment button without picking a color first) now default to blue instead of yellow.
- **Why:** User wants comments visually distinct from plain highlights.

### Delete button in comment popover
- **Chose:** Added `onDelete` prop to CommentPopover, shown as a red "Delete" button on the left side of the button row. Only appears when viewing an existing annotation's comment.
- **Why:** User needs a way to delete an annotation from the comment view, not just from the annotation tooltip.

## Key Files
- `landing/src/components/story/story-reader.tsx` — mobile effect, blue default, handleDeleteFromComment, blue CSS
- `landing/src/components/story/annotations/comment-popover.tsx` — onDelete prop + button
- `landing/src/components/story/annotations/types.ts` — added "blue" to color union
- `landing/src/components/story/annotations/annotation-tooltip.tsx` — widened onColorPick type
