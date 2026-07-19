import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#14120B] text-[#F4F1EA] px-6 py-10 selection:bg-[#D4AF37]/30 selection:text-white">
      
      {/* Optimized Next.js Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/art-institute-404.jpg"
          alt="404 Artwork Background"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-center brightness-[0.65] contrast-[1.05]"
        />
        {/* Dark Vignettes & Gradients for High Readability */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#14120B] via-[#14120B]/80 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 to-transparent" />
      </div>

      {/* Top Header — Clean Logo */}
      <header className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="group">
          <span className="text-xs font-bold tracking-widest uppercase text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            Primavera
          </span>
        </Link>
      </header>

      {/* Main Content Card */}
      <main className="relative z-10 w-full max-w-2xl mx-auto text-center my-auto py-12 flex flex-col items-center">
        
        {/* Editorial Museum Archive Reference Tag (Replaced AI pill badge) */}
        <div className="flex items-center gap-3 text-[11px] font-mono tracking-[0.25em] text-[#D4AF37] uppercase mb-6 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
          <span className="w-8 h-[1px] bg-[#D4AF37]/60" />
          <span>CATALOGUE IV·O·IV — UNCHARTED LOCATION</span>
          <span className="w-8 h-[1px] bg-[#D4AF37]/60" />
        </div>

        {/* Large 404 Headline */}
        <h1 className="text-8xl sm:text-9xl font-bold tracking-tight text-white leading-none font-sans drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)] mb-4 select-none">
          404
        </h1>

        {/* Subtitle */}
        <h2 className="text-2xl sm:text-3xl font-serif italic text-white mb-5 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
          The manuscript you are seeking does not exist.
        </h2>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#F4F1EA]/80 max-w-md leading-relaxed font-sans mb-9 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          The requested URL path was not found on this server. It may have been moved, renamed, or lost in the archives.
        </p>

        {/* Action Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white text-[#14120B] text-xs font-bold hover:bg-[#F4F1EA] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(0,0,0,0.6)] group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#14120B] group-hover:-translate-x-1 transition-transform" />
          <span>Return to Primavera Home</span>
        </Link>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto text-center text-[11px] text-[#A69E8F] font-mono drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
        © {new Date().getFullYear()} Primavera Knowledge Platform · All Rights Reserved
      </footer>

    </div>
  );
}
