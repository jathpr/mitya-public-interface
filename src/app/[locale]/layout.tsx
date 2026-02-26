import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import styles from "./layout.module.css";

import { HomeButton } from "@/components/HomeButton";
import { MainContentWrapper } from "@/components/MainContentWrapper";
import I18nClientDebug from "@/components/I18nClientDebug/I18nClientDebug";

import beMessages from "../../../messages/be.json";
import enMessages from "../../../messages/en.json";
import ruMessages from "../../../messages/ru.json";

type Messages = Record<string, unknown>;

const messagesMap: Record<string, Messages> = {
  be: beMessages as Messages,
  en: enMessages as Messages,
  ru: ruMessages as Messages,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const geistSans = Geist({
  subsets: ["latin"],
});

type Props = Readonly<{
  children: React.ReactNode;
  params: { locale: string } | Promise<{ locale: string }>;
}>;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  // No cookie persistence here: the URL is the single source of truth for locale.
  // We intentionally avoid writing `NEXT_LOCALE` cookies so locale selection
  // remains deterministic and always comes from the path segment.

  const messages = messagesMap[locale] || messagesMap[routing.defaultLocale];

  // Debugging: optionally log which messages were selected during server render
  if (process.env.I18N_DEBUG === "true") {
    // Provide a small, safe log without dumping full messages
    console.log(
      "[i18n] layout - locale:",
      locale,
      "messagesKeys:",
      Object.keys(messages || {})
    );
  }

  return (
    <html lang={locale}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${geistSans.className}`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {process.env.NEXT_PUBLIC_I18N_DEBUG === "true" && (
            // Client component that logs client-side locale and a sample translation
            // Helps detect hydration / client mismatch
            <I18nClientDebug />
          )}
          <div className={styles.locales}>
            <LocaleSwitcher />
          </div>

          <div className={styles.sidebar}>
            <Sidebar />
          </div>

          <HomeButton />
          <MainContentWrapper>{children}</MainContentWrapper>
          <SpeedInsights />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
