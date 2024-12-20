import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import CanvasBackground from "../_components/BackgroundEffect";

export const metadata: Metadata = {
  title: "Huy's Digital Garden",
  description:
    "Welcome to my digital garden - a personal website that grows alongside my journey as a developer.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <CanvasBackground />
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
