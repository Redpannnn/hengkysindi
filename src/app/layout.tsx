import type { Metadata } from "next";
import { Playfair_Display, Great_Vibes } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  variable: "--font-greatvibes",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Wedding of Hengky & Sindi",
  description:
    "Undangan pernikahan Hengky & Sindi — Senin, 21 Desember 2026 di Desa Purwosari, Batang Hari Nuban, Lampung Timur. Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.",
  keywords: [
    "undangan pernikahan",
    "wedding invitation",
    "Hengky & Sindi",
    "undangan digital",
  ],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "The Wedding of Hengky & Sindi",
    description:
      "Undangan pernikahan Hengky & Sindi — Senin, 21 Desember 2026, Desa Purwosari, Batang Hari Nuban, Lampung Timur.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${greatVibes.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
