"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="absolute top-0 left-0 w-full z-40 bg-transparent text-white py-6 px-6 sm:px-12 pointer-events-auto">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        
        {/* Left: Plain Text Title */}
        <Link href="/" className="group flex items-center gap-2">
          <span className="text-xs font-semibold tracking-widest uppercase text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            The Renaissance Edition
          </span>
        </Link>

        {/* Right: Text-Only Links (No backgrounds, no pills, not sticky) */}
        <div className="hidden md:flex items-center gap-6 text-xs font-medium tracking-wide">
          <Link
            href="/java"
            className={`transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${
              pathname === "/java" ? "text-white font-bold underline underline-offset-4" : "text-white/80 hover:text-white"
            }`}
          >
            Java 21+
          </Link>
          
          <a
            href="https://spring.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          >
            Spring.io
          </a>

          <Link
            href="#core"
            className="text-white/80 hover:text-white transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          >
            Search
          </Link>

          <Link
            href="#core"
            className="text-white font-semibold hover:underline underline-offset-4 transition-all drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          >
            Start for free
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="p-1.5 rounded-md text-white hover:bg-white/10"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 border-b border-white/10 bg-[#14120B]/95 p-4 rounded-xl space-y-3 backdrop-blur-md">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-white py-1"
          >
            Spring Ecosystem
          </Link>
          <Link
            href="/java"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-white/80 py-1"
          >
            Java 21+ Knowledge
          </Link>
          <Link
            href="#core"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-white/80 py-1"
          >
            Start for free
          </Link>
        </div>
      )}
    </header>
  );
}
