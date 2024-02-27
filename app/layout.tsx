import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BgMain from "@/components/bgmain";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clock",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-transparent text-foreground flex">
        <BgMain>{children}</BgMain>
      </body>
    </html>
  );
}
