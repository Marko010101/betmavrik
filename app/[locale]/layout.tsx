import { routing } from "@/i18n/routing";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
// @ts-expect-error - rtl-detect lacks TypeScript types
import { getLangDir } from "rtl-detect";
import "@/app/globals.css";
import Header from "../components/Header";
import { Metadata } from "next";
import { ThemeProvider } from "../components/darkMode/themeProvider";

export const metadata: Metadata = {
  title: {
    default: "Welcome to BetMavrik",
    template: "%s | BetMavrik",
  },
  description: "The premier platform of Gaming!",
  metadataBase: new URL("https://www.betmavrik.com/"),
  openGraph: {
    title: "BetMavrik",
    description: "The premier platform of Gaming!",
    url: "https://www.betmavrik.com/",
    siteName: "BetMavrik",
    type: "website",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const direction = getLangDir(locale);

  return (
    <html suppressHydrationWarning>
      <body lang={locale} dir={direction}>
        <NextIntlClientProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Header />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
