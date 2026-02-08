import type { LandingContent } from "@/content/landing/types";

const R2_PUBLIC_BASE_URL: string | undefined =
  process.env["NEXT_PUBLIC_R2_PUBLIC_BASE_URL"];

export function r2Url(path: string): string {
  if (typeof R2_PUBLIC_BASE_URL === "string" && R2_PUBLIC_BASE_URL.length > 0) {
    return `${R2_PUBLIC_BASE_URL.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
  }
  return path;
}

export const landingContent: LandingContent = {
  hero: {
    badge: {
      label: "Ages 3-7",
      detail: "Read aloud together",
    },
    eyebrow: "Bedtime stories from Sunstone City",
    title: "Stories that grow with your child",
    body: "Sunstone Tales are bedtime stories where real feelings meet real adventures. Each story weaves developmental themes into narratives your child will actually want to hear again and again. No lectures, no morals taped to the ending. Just stories worth telling.",
    bullets: [
      "Adventure stories with a curious snow leopard cub named Liska",
      "Emotional stories that explore what your child is already going through",
      "Written with developmental psychology, invisible to the reader",
    ],
    primaryCta: {
      label: "Explore stories",
      href: "#stories",
    },
    secondaryCta: {
      label: "About us",
      href: "/about",
    },
    imageUrl: r2Url("hero.png"),
    imageAlt: "Illustration from Sunstone Tales",
  },

  recognition: {
    eyebrow: "Sounds familiar?",
    title: "Your child's feelings are bigger than the words they have",
    body: "They can't always tell you what's wrong. But they feel it. The frustration when something isn't fair. The fear of being left out. The confusion when the world doesn't work the way they expected. These stories meet children right there, in the middle of what they're feeling, and walk alongside them.",
    bullets: [
      "A child who doesn't want to share but doesn't know why",
      "A first time being scared and not wanting to admit it",
      "Wanting to be brave when everything feels too big",
      "Figuring out who you are when you're still very small",
    ],
    imageUrl: r2Url("recognition.png"),
    imageAlt: "Illustration of Liska from Sunstone Tales",
  },
};

export type { LandingContent };
