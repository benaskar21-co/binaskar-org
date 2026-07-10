"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Header } from "@/components/header";
import type { Locale } from "@/lib/i18n/config";

type SiteHeaderProps = {
  locale: Locale;
};

export function SiteHeader({ locale }: SiteHeaderProps) {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname]);

  const activeSection = hash.replace("#", "") || "home";

  return <Header locale={locale} activeSection={activeSection} />;
}
