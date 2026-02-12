import type React from "react";

import { StoryGrid } from "@/components/landing/story-grid";
import type { Locale } from "@/lib/i18n";

export default async function StoriesIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<React.JSX.Element> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;

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

          <StoryGrid locale={locale} />
        </div>
      </div>
    </main>
  );
}
