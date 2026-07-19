"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Mail, ExternalLink, Sparkles, ChevronDown } from "lucide-react";

// Inline Brand Icons
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
    </svg>
  );
}

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const pathname = usePathname();
  const contactRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contactRef.current && !contactRef.current.contains(event.target as Node)) {
        setContactOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="absolute top-0 left-0 w-full z-40 bg-transparent text-white py-6 px-6 sm:px-12 pointer-events-auto">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between relative">
        
        {/* Left: Plain Text Title */}
        <Link href="/" className="group flex items-center gap-2">
          <span className="text-xs font-semibold tracking-widest uppercase text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            The Renaissance Edition
          </span>
        </Link>

        {/* Right: Text-Only Links & Contact Dangle Dropdown */}
        <div className="hidden md:flex items-center gap-6 text-xs font-medium tracking-wide relative" ref={contactRef}>
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

          {/* Contact Trigger Button */}
          <button
            onClick={() => setContactOpen(!contactOpen)}
            aria-expanded={contactOpen}
            className={`text-white font-semibold hover:underline underline-offset-4 transition-all drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] flex items-center gap-1.5 cursor-pointer ${
              contactOpen ? "text-[#D4AF37] underline" : ""
            }`}
          >
            <span>Contact</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${contactOpen ? "rotate-180 text-[#D4AF37]" : ""}`} />
          </button>

          {/* Dangled Contact Card */}
          {contactOpen && (
            <div className="absolute right-0 top-10 w-72 bg-[#1C1A12] border border-[#D4AF37]/40 rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.15)] z-50 animate-dangle font-sans">
              {/* Dangle Card Top Triangle Pin */}
              <div className="absolute -top-2 right-5 w-4 h-4 bg-[#1C1A12] border-l border-t border-[#D4AF37]/40 rotate-45" />

              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#D4AF37]/20">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F4F1EA]">Connect</span>
                </div>
                <span className="text-[10px] font-mono text-[#D4AF37]">Primavera</span>
              </div>

              {/* Contact Links */}
              <div className="space-y-2.5">
                {/* Email */}
                <a
                  href="mailto:developer@primavera.dev"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#14120B] border border-[#D4AF37]/20 hover:border-[#D4AF37] text-xs text-[#F4F1EA] hover:text-[#D4AF37] transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-[#D4AF37]" />
                    <span className="font-mono text-[11px]">developer@primavera.dev</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#14120B] border border-[#D4AF37]/20 hover:border-[#D4AF37] text-xs text-[#F4F1EA] hover:text-[#D4AF37] transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <LinkedInIcon className="w-4 h-4 text-[#D4AF37]" />
                    <span className="font-medium text-[11px]">LinkedIn Profile</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#14120B] border border-[#D4AF37]/20 hover:border-[#D4AF37] text-xs text-[#F4F1EA] hover:text-[#D4AF37] transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <GitHubIcon className="w-4 h-4 text-[#D4AF37]" />
                    <span className="font-medium text-[11px]">GitHub Profile</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>

              {/* Subtext */}
              <div className="mt-3 pt-2 text-[10px] text-[#A69E8F] font-serif-italic text-center border-t border-[#D4AF37]/10">
                Senior Developer & System Architect
              </div>
            </div>
          )}

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
          <button
            onClick={() => {
              setContactOpen(!contactOpen);
              setMobileMenuOpen(false);
            }}
            className="block text-sm font-semibold text-[#D4AF37] py-1"
          >
            Contact Details
          </button>
        </div>
      )}
    </header>
  );
}
