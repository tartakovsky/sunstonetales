"use client";

import type React from "react";

import Link from "next/link";

import { LanguageToggle } from "@/components/story/language-toggle";

interface NavbarProps {
  locale: string;
}

export function Navbar({ locale }: NavbarProps): React.JSX.Element {
  const prefix = locale === "ru" ? "/ru" : "";

  return (
    <nav className="bg-background sticky top-0 isolate z-50 h-16 md:h-18">
      <div className="relative mx-auto flex h-full max-w-7xl items-center justify-between gap-3 px-6">
        <div className="flex items-center">
          <Link href={`${prefix}/`} className="text-xl font-bold text-foreground">
            Sunstone Tales
          </Link>
        </div>

        <div className="flex items-center justify-end">
          <LanguageToggle />
        </div>
      </div>
    </nav>
  );
}
