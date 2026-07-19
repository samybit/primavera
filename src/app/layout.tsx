import type { Metadata } from "next";
import { Newsreader, Plus_Jakarta_Sans, Geist_Mono, Tangerine } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const tangerine = Tangerine({
  variable: "--font-tangerine",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Primavera | Renaissance Knowledge Base for Spring & Java",
  description: "High-performance enterprise architecture hub covering Spring Ecosystem, Modern Java 21+, JVM Internal Mechanics, and Microservices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${newsreader.variable} ${geistMono.variable} ${tangerine.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#14120B] text-[#F4F1EA] selection:bg-[#D4AF37]/30 selection:text-[#FFF]">
        {children}
      </body>
    </html>
  );
}
