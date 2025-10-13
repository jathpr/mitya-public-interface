import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Do it",
  description: "See you soon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className}`}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
