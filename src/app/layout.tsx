import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Inter_Tight,
  Instrument_Serif,
  Roboto_Mono,
} from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Hud from "@/components/Hud";
import Loader from "@/components/Loader";
import PageTransition from "@/components/PageTransition";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  weight: "400",
  style: ["normal", "italic"],
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
    "AI-native product & UI/UX designer — from research and Figma to live prototypes with the new AI toolchain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${interTight.variable} ${robotoMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-cream text-ink">
        <Loader />
        <PageTransition />
        <Hud />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
