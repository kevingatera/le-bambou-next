import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { NavigationBar } from "./_components/NavigationBar";

export const metadata: Metadata = {
  title: "Le Bambou Gorilla Lodge",
  description: "Le Bambou Gorilla Lodge",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

import "~/styles/le-bambou-gorilla-lodge.webflow.css"
import "~/styles/normalize.css";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`} suppressHydrationWarning={true}>
      <body>
        <NavigationBar />
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
