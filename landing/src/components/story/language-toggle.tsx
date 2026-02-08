"use client";

import type React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function LanguageToggle(): React.JSX.Element {
  const pathname = usePathname();
  const isRu = pathname.startsWith("/ru");

  // Build the alternate-locale path
  const altPath = isRu
    ? pathname.replace(/^\/ru/, "") || "/"
    : `/ru${pathname}`;

  return (
    <Link
      href={altPath}
      className="ml-2 flex h-9 items-center rounded-md px-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:h-10 md:px-3 md:text-base"
    >
      {isRu ? "EN" : "RU"}
    </Link>
  );
}
