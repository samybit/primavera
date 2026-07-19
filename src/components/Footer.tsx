import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer id="architecture" className="w-full border-t border-[#D4AF37]/20 bg-[#14120B] py-12 px-6 sm:px-12 max-w-[1400px] mt-12 text-xs text-[#A69E8F]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Brand */}
        <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-bold tracking-wider text-[#F4F1EA] uppercase">Primavera</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#1C1A12] border border-[#D4AF37]/30 text-[#D4AF37] font-serif-italic">
              Renaissance Edition
            </span>
          </div>
          <p className="text-[11px] text-[#6E675B] mt-1 max-w-sm">
            Curated knowledge platform for Spring Framework Ecosystem & Modern Java Architecture.
          </p>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-xs">
          <Link href="/" className="hover:text-[#D4AF37] transition-colors">Spring Ecosystem</Link>
          <Link href="/java" className="hover:text-[#E76F51] transition-colors">Java 21+ Hub</Link>
          <Link href="#architecture" className="hover:text-[#6DB33F] transition-colors">Architecture</Link>
          <a href="https://spring.io" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors">Spring.io ↗</a>
        </div>

        {/* Copyright */}
        <div className="text-[11px] text-[#6E675B] text-center md:text-right">
          <p>© {new Date().getFullYear()} Primavera Platform. Built with Next.js 16 & Tailwind v4.</p>
        </div>

      </div>
    </footer>
  );
}
