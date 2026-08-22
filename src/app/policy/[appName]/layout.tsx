import { Readex_Pro, Sora } from "next/font/google";

import "../../globals.css";
import { Analytics } from "@/components/analytics";

// Identity v4 "Royal Violet" — same faces as the [locale] layout.
const bodyFont = Sora({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const arabicFont = Readex_Pro({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic",
  display: "swap",
});

export default function AppPolicyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const fontClass = `${bodyFont.variable} ${arabicFont.variable}`;

  return (
    <html
      lang="ar"
      dir="rtl"
      data-scroll-behavior="smooth"
      className={`${fontClass} h-full antialiased`}
      style={
        {
          "--font-display":
            "var(--font-arabic), var(--font-body), system-ui, sans-serif",
        } as React.CSSProperties
      }
    >
      <body
        className="min-h-full"
        style={{
          fontFamily: "var(--font-arabic), var(--font-body), system-ui, sans-serif",
        }}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
