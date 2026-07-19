import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden">
      
      {/* Full Screen High-Res Background Painting */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/renaissance_hero.jpg"
          alt="Renaissance Artwork"
          fill
          priority
          quality={100}
          className="object-cover object-center brightness-[0.92] contrast-[1.05]"
        />
        {/* Subtle bottom gradient to blend into main dark background */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#14120B] to-transparent z-10" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full flex-1 flex flex-col justify-between pt-16 sm:pt-24 pb-16 px-6 sm:px-12 pr-6 sm:pr-16 max-w-[1400px]">
        
        {/* Main Title - Single Big Word Across Top */}
        <div>
          <h1 className="text-7xl sm:text-9xl lg:text-[140px] xl:text-[160px] font-bold tracking-tight text-white leading-none drop-shadow-[0_8px_24px_rgba(0,0,0,0.7)] select-none">
            Spring
          </h1>
        </div>

        {/* Subheadline Paragraph below Title */}
        <div className="mt-auto pt-32 sm:pt-48 lg:pt-56 max-w-2xl">
          <p className="text-2xl sm:text-3xl lg:text-4xl font-serif-italic text-white font-normal leading-snug drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
            Modern enterprise tools designed for building resilient cloud architecture and getting that scale.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="#core"
              className="px-6 py-3 rounded-full bg-white text-[#14120B] text-xs font-bold hover:bg-white/90 transition-all flex items-center gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
            >
              <span>Explore Ecosystem</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/java"
              className="px-6 py-3 rounded-full bg-black/40 border border-white/30 backdrop-blur-md text-white text-xs font-semibold hover:bg-black/60 transition-all"
            >
              Java 21+ Knowledge Hub
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
