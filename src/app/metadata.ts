import { type Metadata } from "next";

export const sharedMetadata: Partial<Metadata> = {
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
  twitter: {
    card: "summary_large_image",
    site: "@LeBambouLodge",
    creator: "@LeBambouLodge",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Le Bambou Gorilla Lodge",
    images: [
      {
        url: "/images/DSC_3675.jpg",
        width: 3008,
        height: 2000,
        alt: "Le Bambou Gorilla Lodge",
      },
    ],
  },
};