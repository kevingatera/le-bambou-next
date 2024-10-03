import "~/styles/globals.css";

// import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Varela_Round } from 'next/font/google';

import { TRPCReactProvider } from "~/trpc/react";
import { NavigationBar } from "./_components/NavigationBar";
import { Footer } from "./_components/Footer";

export const metadata: Metadata = {
  title: "Le Bambou Gorilla Lodge",
  description: "Le Bambou Gorilla Lodge",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

import "~/styles/le-bambou-gorilla-lodge.webflow.css"
import "~/styles/normalize.css";
import { Analytics } from "@vercel/analytics/react";

const varelaRound = Varela_Round({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-varela-round',
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${varelaRound.variable} font-sans`} suppressHydrationWarning={true}>
      <body className="bg-[#d7dfde]">
        <TRPCReactProvider>
          <NavigationBar />
          {children}
          <Footer />
          <Analytics />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
