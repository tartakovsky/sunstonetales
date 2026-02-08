import type React from "react";

import Image from "next/image";
import Link from "next/link";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tagline } from "@/components/pro-blocks/landing-page/tagline";
import { stories, categoryLabels } from "@/content/stories";
import type { Locale } from "@/lib/i18n";

interface StoryGridProps {
  locale: Locale;
}

export function StoryGrid({ locale }: StoryGridProps): React.JSX.Element {
  const prefix = locale === "ru" ? "/ru" : "";
  const available = stories.filter((s) => s.locales[locale] !== undefined);

  return (
    <section id="stories" className="bg-background section-padding-y">
      <div className="container-padding-x mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4">
          <Tagline>{locale === "ru" ? "Истории" : "The stories"}</Tagline>
          <h2 className="heading-lg text-foreground">
            {locale === "ru" ? "Из Солнечного города" : "From Sunstone City"}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {available.map((story) => {
            const localeMeta = story.locales[locale]?.meta;
            if (!localeMeta) return null;
            const catLabel =
              categoryLabels[story.meta.categorySlug]?.[locale] ??
              story.meta.categorySlug;

            return (
              <Link
                key={story.meta.slug}
                href={`${prefix}/stories/${story.meta.categorySlug}/${story.meta.slug}`}
                className="group flex flex-col gap-4 rounded-xl border bg-card p-4 text-card-foreground transition-colors hover:bg-accent"
              >
                <div className="relative overflow-hidden rounded-lg border">
                  <AspectRatio ratio={8 / 10}>
                    {typeof localeMeta.coverImage === "string" &&
                    localeMeta.coverImage.length > 0 ? (
                      <Image
                        src={localeMeta.coverImage}
                        alt={localeMeta.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted">
                        <span className="text-4xl">📖</span>
                      </div>
                    )}
                  </AspectRatio>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="text-xs font-medium text-muted-foreground">
                    {catLabel}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {localeMeta.title}
                  </h3>
                  <p className="text-sm leading-6 text-muted-foreground line-clamp-3">
                    {localeMeta.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
