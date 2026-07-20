import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[100svh] flex flex-col overflow-hidden">

      {/* Full Screen Background Painting */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/renaissance_hero.jpg"
          alt="Renaissance Artwork"
          fill
          priority
          quality={100}
          className="object-cover object-center brightness-[0.88] contrast-[1.05]"
        />
        {/* Bottom gradient to blend into content below */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#14120B] to-transparent z-10" />
        {/* Very subtle top vignette so navbar text stays readable */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/30 to-transparent z-10" />
      </div>

      {/* Content — flex column that distributes title to top and body to bottom */}
      <div className="relative z-10 flex flex-col justify-between h-full min-h-[100svh] px-5 sm:px-10 lg:px-12 pt-20 sm:pt-24 pb-10 sm:pb-14 max-w-[1400px] w-full">

        {/* Big Title — anchored near top */}
        <h1 className="text-[clamp(4rem,18vw,10rem)] font-bold tracking-tight text-white leading-none drop-shadow-[0_8px_24px_rgba(0,0,0,0.7)] select-none">
          Spring
        </h1>

        {/* Subtitle + CTAs — pushed to bottom */}
        <div className="mt-auto max-w-xl">
          <p className="text-lg sm:text-2xl lg:text-3xl font-serif italic text-white font-normal leading-snug drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
            <span className="font-tangerine text-3xl sm:text-4xl lg:text-5xl text-[#D4AF37] not-italic font-bold pr-0.5 select-none">
              M
            </span>
            y simple learning archive covering the Spring ecosystem and modern Java.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="#core"
              className="px-5 py-2.5 rounded-full bg-white text-[#14120B] text-xs font-bold hover:bg-white/90 transition-all flex items-center gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
            >
              <span>Explore Ecosystem</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <a
              href="https://dev.java/learn/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-black/40 border border-white/30 backdrop-blur-md text-white text-xs font-semibold hover:bg-black/60 transition-all flex items-center gap-2"
            >
              <span>Java Starter Docs</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
