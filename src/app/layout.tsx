import type { Metadata } from "next";
import Script from "next/script";
import {
  Bricolage_Grotesque,
  Inter_Tight,
  Instrument_Serif,
  Roboto_Mono,
  Caveat,
  Anton,
  Fraunces,
  Fredoka,
} from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
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

const caveat = Caveat({
  variable: "--font-hand",
  weight: ["400", "600"],
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const fredoka = Fredoka({
  variable: "--font-round",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const title = "Harshita Jain — Product Designer";
const description =
  "AI-native product & UI/UX designer. I take ideas from research and Figma all the way to working prototypes, using AI tools.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s — Harshita Jain",
  },
  description,
  applicationName: "Harshita Jain — Portfolio",
  authors: [{ name: "Harshita Jain" }],
  creator: "Harshita Jain",
  keywords: [
    "Harshita Jain",
    "product designer",
    "UI/UX designer",
    "AI-native designer",
    "design engineer",
    "portfolio",
    "Figma",
    "Udaipur",
    "India",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Harshita Jain",
    title,
    description,
    url: siteUrl,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${interTight.variable} ${robotoMono.variable} ${instrumentSerif.variable} ${caveat.variable} ${anton.variable} ${fraunces.variable} ${fredoka.variable} h-full antialiased`}
    >
      <head>
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
      </head>
      <body className="min-h-full bg-cream text-ink">
        <Loader />
        <PageTransition />
        <Hud />
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
