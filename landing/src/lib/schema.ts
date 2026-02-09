import { pgTable, uuid, text, integer, timestamp, index } from "drizzle-orm/pg-core";

export const annotations = pgTable(
  "annotations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    storySlug: text("story_slug").notNull(),
    locale: text("locale").notNull(),
    spreadIdx: integer("spread_idx").notNull(),
    startOffset: integer("start_offset").notNull(),
    endOffset: integer("end_offset").notNull(),
    color: text("color").notNull(),
    comment: text("comment"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [index("idx_annotations_story_locale").on(table.storySlug, table.locale)],
);
