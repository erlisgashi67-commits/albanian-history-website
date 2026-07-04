import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

// Cinzel: monumental, ancient feel for headers
const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

// Inter: modern readability for body text
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Kronika e Shqiptarëve | A Chronicle of Albanian History",
  description:
    "An interactive journey through Albanian history — from the Pelasgians and Illyrians to Skanderbeg, the National Awakening, and modern Kosovo & Albania.",
  keywords: [
    "Albanian history",
    "Pelasgians",
    "Illyrians",
    "Dardanians",
    "Skanderbeg",
    "League of Lezha",
    "League of Prizren",
    "Kosovo independence",
    "Shqipëria",
    "Arbëria",
  ],
  authors: [{ name: "Kronika e Shqiptarëve" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Kronika e Shqiptarëve | A Chronicle of Albanian History",
    description:
      "An interactive journey through Albanian history — from the Pelasgians to modern Kosovo.",
    siteName: "Kronika e Shqiptarëve",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${cinzel.variable} ${inter.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
