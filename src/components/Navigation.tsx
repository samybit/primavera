"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, Sparkles } from "lucide-react";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-[#14120B]/80 backdrop-blur-md border-b border-white/10 text-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 h-14 flex items-center justify-between">
        
        {/* Left: Brand title */}
        <Link href="/" className="flex items-center gap-2 group">
          <Sparkles className="w-4 h-4 text-white/80 group-hover:text-white" />
          <span className="text-xs font-semibold tracking-wider uppercase text-white font-sans">
            The Renaissance Edition
          </span>
        </Link>

        {/* Center: Search pill */}
        <div className="hidden md:flex items-center">
          <button
            aria-label="Search"
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white/80 transition-all"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search</span>
          </button>
        </div>

        {/* Right: Quick Links & Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/java"
            className={`text-xs font-medium transition-colors ${
              pathname === "/java" ? "text-white font-bold" : "text-white/80 hover:text-white"
            }`}
          >
            Java 21+
          </Link>
          <a
            href="https://spring.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-white/80 hover:text-white transition-colors"
          >
            Spring.io
          </a>
          <Link
            href="#core"
            className="px-4 py-1.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-white/90 transition-all shadow-md"
          >
            Start for free
          </Link>
        </div>

        {/* Mobile menu button */}
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
        <div className="md:hidden border-b border-white/10 bg-[#14120B] px-4 pt-2 pb-6 space-y-3">
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
            className="inline-block w-full text-center py-2 rounded-full bg-white text-black font-semibold text-xs mt-2"
          >
            Start for free
          </Link>
        </div>
      )}
    </header>
  );
}
