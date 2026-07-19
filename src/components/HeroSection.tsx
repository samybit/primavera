import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden">
      
      {/* Full Screen High-Res Background Painting - No Blur or Heavy Dark Tint */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/renaissance_hero.jpg"
          alt="Renaissance Artwork"
          fill
          priority
          quality={100}
          className="object-cover object-center brightness-[0.92] contrast-[1.05]"
        />
        {/* Very subtle gradient overlay at bottom for smooth card transition */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#14120B] to-transparent z-10" />
      </div>

      {/* Hero Content Container - Aligned after the left index menu space */}
      <div className="relative z-10 w-full flex-1 flex flex-col justify-between pt-8 pb-16 px-6 sm:px-12 lg:pl-64 lg:pr-16 max-w-[1600px]">
        
        {/* Main Title - One Big Word Across Top */}
        <div className="pt-2 sm:pt-6">
          <h1 className="text-7xl sm:text-9xl lg:text-[140px] xl:text-[160px] font-bold tracking-tight text-white leading-none drop-shadow-[0_8px_24px_rgba(0,0,0,0.7)] select-none">
            Spring
          </h1>
        </div>

        {/* Empty Spacing & Subheadline Paragraph below Title */}
        <div className="mt-auto pt-32 sm:pt-48 lg:pt-64 max-w-2xl">
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
