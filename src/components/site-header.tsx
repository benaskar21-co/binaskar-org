"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Header } from "@/components/header";
import type { Locale } from "@/lib/i18n/config";
import { sections } from "@/lib/sections";

type SiteHeaderProps = {
  locale: Locale;
};

export function SiteHeader({ locale }: SiteHeaderProps) {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>(sections.home);

  useEffect(() => {
    const updateHash = () => {
      const nextSection = window.location.hash.replace("#", "");
      if (nextSection) setActiveSection(nextSection);
    };

    updateHash();
    window.addEventListener("hashchange", updateHash);

    const sectionElements = Object.values(sections)
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: [0, 0.15, 0.45] }
    );

    sectionElements.forEach((element) => observer.observe(element));

    return () => {
      window.removeEventListener("hashchange", updateHash);
      observer.disconnect();
    };
  }, [pathname]);

  return <Header locale={locale} activeSection={activeSection} />;
}
