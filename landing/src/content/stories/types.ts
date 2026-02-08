import type React from "react";

import type { Locale } from "@/lib/i18n";

export interface StoryLocaleMeta {
  title: string;
  description: string;
  date: string;
  coverImage?: string;
  wordCount?: number;
  authors: string[];
  illustrator?: string;
  jsonLd?: Record<string, unknown>;
}

export interface StoryMeta {
  slug: string;
  category: "adventure" | "big-feelings";
  categorySlug: string;
}

export interface StoryLocaleEntry {
  meta: StoryLocaleMeta;
  load: () => Promise<{ default: React.ComponentType }>;
}

export interface StoryEntry {
  meta: StoryMeta;
  locales: Partial<Record<Locale, StoryLocaleEntry>>;
}
