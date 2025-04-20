import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Image from "next/image";
import face from "../../public/face.jpg";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
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
      <body className={`${geistSans.variable}`}>
        {children}
        <Link href="/">
          <Image src={face} alt="My face" className="ava" />
        </Link>
      </body>
    </html>
  );
}
