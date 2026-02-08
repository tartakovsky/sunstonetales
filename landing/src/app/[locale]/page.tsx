import type React from "react";

import { HeroSection } from "@/components/landing/hero-section";
import { RecognitionSection } from "@/components/landing/recognition-section";
import { StoryGrid } from "@/components/landing/story-grid";
import { landingContent } from "@/content/landing/content";
import type { Locale } from "@/lib/i18n";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<React.JSX.Element> {
  const { locale } = await params;

  return (
    <main>
      <HeroSection content={landingContent.hero} />
      <RecognitionSection content={landingContent.recognition} />
      <StoryGrid locale={locale as Locale} />
    </main>
  );
}
