import type React from "react";

import Link from "next/link";

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
  available.sort((a, b) => {
    const da = a.locales[locale]?.meta.date ?? "";
    const db = b.locales[locale]?.meta.date ?? "";
    return da < db ? 1 : -1;
  });

  return (
    <main className="bg-background section-padding-y">
      <div className="container-padding-x mx-auto max-w-7xl">
        <div className="mx-auto flex max-w-4xl flex-col gap-10">
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

          <section className="flex flex-col gap-4" aria-label="Stories">
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
                  className="rounded-xl border bg-card p-5 transition-colors hover:bg-accent"
                >
                  <div className="flex flex-col gap-2">
                    <div className="text-muted-foreground text-sm">
                      {catLabel} · {localeMeta.date}
                    </div>
                    <div className="text-foreground text-xl font-semibold">
                      {localeMeta.title}
                    </div>
                    <div className="text-muted-foreground">
                      {localeMeta.description}
                    </div>
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
