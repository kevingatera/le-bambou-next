import "~/styles/globals.css";
import "~/styles/le-bambou-gorilla-lodge.webflow.css";
import "~/styles/normalize.css";

import { type Metadata } from "next";
import { Varela_Round } from "next/font/google";
import { TRPCReactProvider } from "~/trpc/react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import Head from "next/head";
import Script from "next/script";
import { FloatingWhatsAppButton } from "~/app/_components/FloatingWhatsAppButton";

const varelaRound = Varela_Round({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-varela-round",
});

export const metadata: Metadata = {
  title: "Le Bambou Gorilla Lodge | Luxury Eco-Lodge in Rwanda",
  description:
    "Experience luxury eco-lodging at Le Bambou Gorilla Lodge, nestled near Volcanoes National Park in Rwanda. Perfect for gorilla trekking and exploring Rwanda's natural beauty.",
  keywords:
    "Le Bambou Gorilla Lodge, Rwanda, eco-lodge, gorilla trekking, Volcanoes National Park, luxury accommodation",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lebambougorillalodge.com",
    siteName: "Le Bambou Gorilla Lodge",
    title: "Le Bambou Gorilla Lodge | #1 Eco-Lodge in Kinigi",
    description:
      "Experience luxury eco-lodging at Le Bambou Gorilla Lodge, nestled near Volcanoes National Park in Rwanda. Perfect for gorilla trekking and exploring Rwanda's natural beauty.",
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
    <html
      lang="en"
      className={`${varelaRound.variable} font-sans`}
      suppressHydrationWarning={true}
    >
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
              "description":
                "Experience the pinnacle of luxury at Rwanda's top-rated eco-lodge.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Kinigi",
                "addressRegion": "Northern Province",
                "addressCountry": "Rwanda",
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "-1.4833",
                "longitude": "29.6333",
              },
              "url": "https://lebambougorillalodge.com",
              "telephone": "+250 784753415",
              "priceRange": "$$$",
            }),
          }}
        />
      </Head>
      <body className="bg-[#d7dfde]">
        <TRPCReactProvider>
          {/* <InitDataDog /> */}
          {children}
          <FloatingWhatsAppButton phoneNumber="+250788307374" />
          <GoogleAnalytics gaId="G-7PEH6JNLXW" />
          <Script
            id="adroll-script"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                adroll_adv_id = "QLW5ACWQPVCZXJAM4NVTBB";
                adroll_pix_id = "TVBBIUNDJRC6TPLJNGKOJV";
                adroll_version = "2.0";
                (function(w, d, e, o, a) {
                  w.__adroll_loaded = true;
                  w.adroll = w.adroll || [];
                  w.adroll.f = [ 'setProperties', 'identify', 'track', 'identify_email' ];
                  var roundtripUrl = "https://s.adroll.com/j/" + adroll_adv_id + "/roundtrip.js";
                  for (a = 0; a < w.adroll.f.length; a++) {
                    w.adroll[w.adroll.f[a]] = w.adroll[w.adroll.f[a]] || (function(n) {
                      return function() { w.adroll.push([ n, arguments ]) }
                    })(w.adroll.f[a])
                  }
                  e = d.createElement('script');
                  o = d.getElementsByTagName('script')[0];
                  e.async = 1;
                  e.src = roundtripUrl;
                  o.parentNode.insertBefore(e, o);
                })(window, document);
                adroll.track("pageView");
              `,
            }}
          />
        </TRPCReactProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
