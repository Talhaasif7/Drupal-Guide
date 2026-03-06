import type { Metadata } from "next";
import { DM_Mono, DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "How to Build a Professional Travel Website with Drupal | Talha Dev",
  description:
    "A complete beginner's guide to setting up Drupal locally with DDEV and building a full-featured travel website — step by step.",
  openGraph: {
    title: "How to Build a Professional Travel Website with Drupal",
    description:
      "From zero to a fully functional, locally running travel site — step by step.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Travel landscape",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${dmMono.variable} ${playfair.variable}`}>
        {children}
      </body>
    </html>
  );
}
