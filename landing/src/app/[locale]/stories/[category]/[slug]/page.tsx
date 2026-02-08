import type React from "react";

import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { stories } from "@/content/stories";
import { locales, type Locale } from "@/lib/i18n";

interface StoryPageParams {
  locale: string;
  category: string;
  slug: string;
}

function findStory(category: string, slug: string, locale: Locale) {
  const story = stories.find(
    (s) => s.meta.categorySlug === category && s.meta.slug === slug,
  );
  if (!story) return undefined;
  const localeEntry = story.locales[locale];
  if (!localeEntry) return undefined;
  return { story, localeEntry };
}

export function generateStaticParams(): StoryPageParams[] {
  const params: StoryPageParams[] = [];
  for (const story of stories) {
    for (const locale of locales) {
      if (story.locales[locale]) {
        params.push({
          locale,
          category: story.meta.categorySlug,
          slug: story.meta.slug,
        });
      }
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<StoryPageParams>;
}): Promise<Metadata> {
  const { locale, category, slug } = await params;
  const found = findStory(category, slug, locale as Locale);
  if (!found) return {};

  const { localeEntry } = found;
  return {
    title: `${localeEntry.meta.title} — Sunstone Tales`,
    description: localeEntry.meta.description,
  };
}

export default async function StoryPage({
  params,
}: {
  params: Promise<StoryPageParams>;
}): Promise<React.JSX.Element> {
  const { locale, category, slug } = await params;
  const found = findStory(category, slug, locale as Locale);
  if (!found) notFound();

  const { localeEntry } = found;
  const mod = await localeEntry.load();
  const Story = mod.default;

  return (
    <main className="bg-background pt-16 pb-16 md:pt-24 md:pb-24">
      <div className="container-padding-x mx-auto max-w-7xl">
        <article className="mx-auto max-w-4xl">
          <header className="mb-10 flex flex-col gap-3">
            <h1 className="heading-lg text-foreground">
              {localeEntry.meta.title}
            </h1>
            <p className="text-muted-foreground text-lg/8 text-pretty">
              {localeEntry.meta.description}
            </p>
          </header>

          <div className="story-content">
            <Story />
          </div>

          {localeEntry.meta.jsonLd ? (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(localeEntry.meta.jsonLd),
              }}
            />
          ) : null}
        </article>
      </div>
    </main>
  );
}
