import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Diabetes Calculator",
  description: "Berechnen von Brot- und Kohlenhydrateinheiten für Diabetiker.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/diacalc.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
