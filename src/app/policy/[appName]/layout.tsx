import {
  IBM_Plex_Sans_Arabic,
  Lexend,
  Source_Sans_3,
} from "next/font/google";

import "../../globals.css";

const bodyFont = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const arabicFont = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

const displayFont = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display-latin",
  display: "swap",
});

export default function AppPolicyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const fontClass = `${bodyFont.variable} ${arabicFont.variable} ${displayFont.variable}`;

  return (
    <html
      lang="ar"
      dir="rtl"
      data-scroll-behavior="smooth"
      className={`${fontClass} h-full antialiased`}
      style={
        {
          "--font-display":
            "var(--font-arabic), var(--font-display-latin), system-ui, sans-serif",
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
      </body>
    </html>
  );
}
