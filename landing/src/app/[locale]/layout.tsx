import type React from "react";
import type { Metadata } from "next";

import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { locales, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  metadataBase: new URL("https://sunstonetales.com"),
  title: "Sunstone Tales",
  description:
    "Bedtime stories where real feelings meet real adventures. Developmentally grounded stories for ages 3-7, read aloud together.",
};

export function generateStaticParams(): { locale: string }[] {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}): Promise<React.JSX.Element> {
  const { locale } = await params;
  const lang = locales.includes(locale as Locale) ? locale : "en";

  return (
    <html lang={lang}>
      <body className="min-h-dvh bg-background">
        <Navbar locale={lang} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
