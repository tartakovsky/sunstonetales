import type { StoryEntry } from "./types";
import { story as liskaAndHerName } from "./liska-and-her-name";

export const stories: StoryEntry[] = [liskaAndHerName];

export const categoryLabels: Record<string, Record<string, string>> = {
  liska_adventures: { en: "Liska's Adventures", ru: "Приключения Лиски" },
  liska_struggles: { en: "Liska's Big Feelings", ru: "Большие чувства Лиски" },
};
