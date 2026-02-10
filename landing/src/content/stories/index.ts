import type { StoryEntry } from "./types";
import { story as whyLiskaIsNamedLiska } from "./why-liska-is-named-liska";
import { story as liskaAndGoodMemories } from "./liska-and-good-memories";
import { story as liskaSavesForKebab } from "./liska-saves-for-kebab";
import { story as liskaAndTheToothyAdventure } from "./liska-and-the-toothy-adventure";
import { story as liskaAndTheOuchyTail } from "./liska-and-the-ouchy-tail";
import { story as liskaAndTheGameOfShadows } from "./liska-and-the-game-of-shadows";
import { story as liskaAndTheGrumpyVoices } from "./liska-and-the-treasure-braid";
import { story as liskaAndTheWishingCave } from "./liska-and-the-wishing-cave";

export const stories: StoryEntry[] = [
  liskaAndTheWishingCave,
  whyLiskaIsNamedLiska,
  liskaAndTheGameOfShadows,
  liskaAndGoodMemories,
  liskaAndTheToothyAdventure,
  liskaSavesForKebab,
  liskaAndTheOuchyTail,
  liskaAndTheGrumpyVoices,
];

export const categoryLabels: Record<string, Record<string, string>> = {
  liska_adventures: { en: "Liska's Adventures", ru: "Приключения Лиски" },
  "liska-big-emotions": { en: "Liska's Big Feelings", ru: "Большие чувства Лиски" },
};
