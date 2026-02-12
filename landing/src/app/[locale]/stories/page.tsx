import type React from "react";

import Image from "next/image";
import Link from "next/link";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { stories, categoryLabels } from "@/content/stories";
import type { Locale } from "@/lib/i18n";

export default async function StoriesIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<React.JSX.Element> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const prefix = locale === "ru" ? "/ru" : "";

  const available = stories.filter((s) => s.locales[locale] !== undefined);

  return (
    <main className="bg-background section-padding-y">
      <div className="container-padding-x mx-auto max-w-7xl">
        <div className="mx-auto flex flex-col gap-10">
          <header className="flex flex-col gap-4">
            <h1 className="heading-lg text-foreground">
              {locale === "ru" ? "Истории" : "Stories"}
            </h1>
            <p className="text-muted-foreground text-lg/8 text-pretty">
              {locale === "ru"
                ? "Сказки на ночь из Солнечного города."
                : "Bedtime stories from Sunstone City."}
            </p>
          </header>

          <section className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3" aria-label="Stories">
            {available.map((s) => {
              const localeMeta = s.locales[locale]?.meta;
              if (!localeMeta) return null;
              const catLabel =
                categoryLabels[s.meta.categorySlug]?.[locale] ??
                s.meta.categorySlug;

              return (
                <Link
                  key={s.meta.slug}
                  href={`${prefix}/stories/${s.meta.categorySlug}/${s.meta.slug}`}
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
                      {catLabel} · {localeMeta.date}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {localeMeta.title}
                    </h3>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {localeMeta.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </section>
        </div>
      </div>
    </main>
  );
}
