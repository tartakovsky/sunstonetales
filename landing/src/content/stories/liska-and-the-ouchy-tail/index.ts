import type { StoryEntry } from "../types";
import { meta as ruMeta } from "./ru/meta";

export const story: StoryEntry = {
  meta: {
    slug: "liska-and-the-ouchy-tail",
    category: "big-feelings",
    categorySlug: "liska-big-emotions",
  },
  locales: {
    ru: { meta: ruMeta, load: () => import("./ru/story.mdx") },
  },
};
