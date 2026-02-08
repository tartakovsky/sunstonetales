export interface HeroBadgeContent {
  /** Short bold label, max 3 words. */
  label: string;
  /** Supporting text, max 4 words. */
  detail: string;
}

export interface HeroCta {
  /** Button label, max 4 words. */
  label: string;
  /** Destination URL. */
  href: string;
}

export interface HeroContent {
  /** Main eyebrow badge content. */
  badge: HeroBadgeContent;
  /** Eyebrow text, max 10 words. */
  eyebrow: string;
  /** Hero headline, max 10 words. */
  title: string;
  /** Supporting body copy. */
  body: string;
  /** Optional bullet list. */
  bullets: readonly string[];
  /** Primary CTA. */
  primaryCta: HeroCta;
  /** Secondary CTA. */
  secondaryCta: HeroCta;
  /** Optional hero image URL. */
  imageUrl?: string;
  /** Image alt text. */
  imageAlt: string;
}

export interface RecognitionContent {
  /** Eyebrow text, max 5 words. */
  eyebrow: string;
  /** Section title, max 10 words. */
  title: string;
  /** Supporting body copy. */
  body: string;
  /** Optional bullet list. */
  bullets: readonly string[];
  /** Optional image URL. */
  imageUrl?: string;
  /** Image alt text. */
  imageAlt: string;
}

export interface LandingContent {
  hero: HeroContent;
  recognition: RecognitionContent;
}
