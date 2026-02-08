import type { StoryEntry } from "../types";
import { meta as enMeta } from "./en/meta";
import { meta as ruMeta } from "./ru/meta";

export const story: StoryEntry = {
  meta: {
    slug: "liska-and-her-name",
    category: "adventure",
    categorySlug: "liska_adventures",
  },
  locales: {
    en: { meta: enMeta, load: () => import("./en/story.mdx") },
    ru: { meta: ruMeta, load: () => import("./ru/story.mdx") },
  },
};
