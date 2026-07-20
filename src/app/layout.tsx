import type { Metadata } from "next";
import { Lora, Plus_Jakarta_Sans, JetBrains_Mono, Tangerine } from "next/font/google";
import "./globals.css";

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const tangerine = Tangerine({
  variable: "--font-tangerine",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Primavera | Renaissance Knowledge Base for Spring & Java",
    description: "High-performance enterprise architecture hub covering Spring Ecosystem, Modern Java 21+, JVM Internal Mechanics, and Microservices.",
    openGraph: {
      title: "Primavera | Renaissance Knowledge Base for Spring & Java",
      description: "High-performance enterprise architecture hub covering Spring Ecosystem, Modern Java 21+, JVM Internal Mechanics, and Microservices.",
      siteName: "Primavera",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Primavera Renaissance Knowledge Base",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Primavera | Renaissance Knowledge Base for Spring & Java",
      description: "High-performance enterprise architecture hub covering Spring Ecosystem, Modern Java 21+, JVM Internal Mechanics, and Microservices.",
      images: ["/og-image.png"],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${lora.variable} ${jetbrainsMono.variable} ${tangerine.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#14120B] text-[#F4F1EA] selection:bg-[#D4AF37]/30 selection:text-[#FFF]">
        {children}
      </body>
    </html>
  );
}
