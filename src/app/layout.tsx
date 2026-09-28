import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Great_Vibes, Jost } from "next/font/google";
import { CANONICAL_URL } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const script = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
});

const sans = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

const title = "Bliss Away | Facials & Waxing in Hamden, CT";
const description =
  "Bliss Away is a luxurious facial and waxing studio in Hamden, Connecticut. Look good. Feel amazing.";

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_URL),
  title,
  description,
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    type: "website",
    url: CANONICAL_URL,
    siteName: "Bliss Away",
    title,
    description,
    locale: "en_US",
  },
  icons: {
    icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/favicon.svg`,
  },
};

export const viewport: Viewport = {
  themeColor: "#c4a15a",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${script.variable} ${sans.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
