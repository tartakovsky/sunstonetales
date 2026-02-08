"use client";

import type React from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
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

        <div className="flex items-center justify-end gap-1">
          <Link href={`${prefix}/stories`}>
            <Button
              variant="ghost"
              className="h-9 px-3 text-sm md:h-10 md:px-4 md:text-base"
            >
              {locale === "ru" ? "Истории" : "Stories"}
            </Button>
          </Link>
          <Link href={`${prefix}/about`}>
            <Button
              variant="ghost"
              className="h-9 px-3 text-sm md:h-10 md:px-4 md:text-base"
            >
              {locale === "ru" ? "О нас" : "About"}
            </Button>
          </Link>
          <LanguageToggle />
        </div>
      </div>
    </nav>
  );
}
