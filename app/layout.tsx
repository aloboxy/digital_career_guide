import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"] });

const copernicus = localFont({
  src: [
    {
      path: "../public/fonts/Copernicus/CopernicusNewRegular.otf",
      weight: "400",
      style: "semibold",
    },
    {
      path: "../public/fonts/Copernicus/CopernicusNewSemibold.otf",
      weight: "600",
      style: "semibold",
    },
    {
      path: "../public/fonts/Copernicus/CopernicusNewbold.otf",
      weight: "900",
      style: "semibold",
    },
  ],
  variable: "--font-copernicus",
});

const tiempos = localFont({
  src: [
    {
      path: "../public/fonts/Tiempos/TiemposLight.otf",
      weight: "200",
      style: "light",
    },
    {
      path: "../public/fonts/Tiempos/TiemposRegular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-tiempos",
});

export const metadata: Metadata = {
  title: "digitalcareerguidely Lab",
  description: "A platform for researchers, students and educators",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.className} ${copernicus.variable} ${tiempos.variable} bg-[#0099cc]`}
        >
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/favicon/apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/favicon/apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/favicon/apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/favicon/apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/favicon/apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/favicon/apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/favicon/apple-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/favicon/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/favicon/android-icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/favicon/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/favicon/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta
            name="msapplication-TileImage"
            content="/favicon/ms-icon-144x144.png"
          />
          <meta name="theme-color" content="#ffffff" />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
