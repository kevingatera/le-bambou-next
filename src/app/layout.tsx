import "~/styles/globals.css";
import "~/styles/le-bambou-gorilla-lodge.webflow.css";
import "~/styles/normalize.css";

import { type Metadata } from "next";
import { Varela_Round } from 'next/font/google';
import { TRPCReactProvider } from "~/trpc/react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from '@next/third-parties/google'
import Head from 'next/head';

const varelaRound = Varela_Round({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-varela-round',
});

export const metadata: Metadata = {
  title: "Le Bambou Gorilla Lodge | Luxury Eco-Lodge in Rwanda",
  description: "Experience luxury eco-lodging at Le Bambou Gorilla Lodge, nestled near Volcanoes National Park in Rwanda. Perfect for gorilla trekking and exploring Rwanda's natural beauty.",
  keywords: "Le Bambou Gorilla Lodge, Rwanda, eco-lodge, gorilla trekking, Volcanoes National Park, luxury accommodation",
  authors: [{ name: "Le Bambou Gorilla Lodge" }],
  creator: "Le Bambou Gorilla Lodge",
  publisher: "Le Bambou Gorilla Lodge",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", sizes: "180x180", url: "/apple-touch-icon.png" },
  ],
  viewport: "width=device-width, initial-scale=1.0",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lebambougorillalodge.com",
    siteName: "Le Bambou Gorilla Lodge",
    title: "Le Bambou Gorilla Lodge | #1 Eco-Lodge in Kinigi",
    description: "Experience luxury eco-lodging at Le Bambou Gorilla Lodge, nestled near Volcanoes National Park in Rwanda. Perfect for gorilla trekking and exploring Rwanda's natural beauty.",
    images: [
      {
        url: "https://lebambougorillalodge.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Le Bambou Gorilla Lodge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@LeBambouLodge",
    creator: "@LeBambouLodge",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${varelaRound.variable} font-sans`} suppressHydrationWarning={true}>
      <Head>
        <link rel="canonical" href="https://lebambougorillalodge.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              "name": "Le Bambou Gorilla Lodge",
              "image": "https://lebambougorillalodge.com/images/DSC_3675.jpg",
              "description": "Experience the pinnacle of luxury at Rwanda's top-rated eco-lodge.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Kinigi",
                "addressRegion": "Northern Province",
                "addressCountry": "Rwanda"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "-1.4833",
                "longitude": "29.6333"
              },
              "url": "https://lebambougorillalodge.com",
              "telephone": "+250 784753415",
              "priceRange": "$$$"
            }),
          }}
        />
      </Head>
      <body className="bg-[#d7dfde]">
        <TRPCReactProvider>
          {/* <InitDataDog /> */}
          {children}
          <GoogleAnalytics gaId="G-7PEH6JNLXW" />
        </TRPCReactProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
