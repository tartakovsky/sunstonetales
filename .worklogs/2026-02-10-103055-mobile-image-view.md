# Fix mobile image view: container fills width, image fits inside

**Date:** 2026-02-10 10:30
**Scope:** story-reader.tsx (portrait CSS)

## Summary
Image container (view) fills width between paddings with 4:5 aspect ratio. Image fits inside via default object-fit contain. Container starts flush with nav bar, no border-radius on top. Removed the mobile img override that forced cover/100%.
