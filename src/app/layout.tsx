import type { Metadata } from "next";
import { Anton, Oswald, Roboto_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Hud from "@/components/Hud";
import Loader from "@/components/Loader";

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Harshita Jain® — Product Designer",
  description:
    "Product & UI/UX designer. I design products, then I build them myself — Figma to shipped, AI-native end to end.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${oswald.variable} ${robotoMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-cream text-ink">
        <Loader />
        <Hud />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
