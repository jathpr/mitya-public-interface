import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import LocaleSwitcher from "@/components/LocaleSwitcher";

import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const geistSans = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Be",
  description: "Дзелай - будзе",
};

export default async function RootLayout({
  children,
  params,
}: // params,
Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // // Enable static rendering
  setRequestLocale(locale);

  return (
    <html lang="en">
      <body className={`${geistSans.className}`}>
        <NextIntlClientProvider>
          <LocaleSwitcher />
          {children}
          <SpeedInsights />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
