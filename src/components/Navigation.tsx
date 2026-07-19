"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Mail, ExternalLink, ChevronDown, Search } from "lucide-react";

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

interface SearchTopic {
  title: string;
  category: "Spring" | "Java" | "Architecture";
  sectionId: string;
  url: string;
  description: string;
}

const KNOWLEDGE_TOPICS: SearchTopic[] = [
  {
    title: "Spring Boot 3.3 & Core Framework",
    category: "Spring",
    sectionId: "core",
    url: "/#core",
    description: "Auto-configuration, GraalVM native images, AOT compilation, and Actuator telemetry.",
  },
  {
    title: "Spring Security 6.3 & OAuth2",
    category: "Spring",
    sectionId: "security",
    url: "/#security",
    description: "Authorization filters, Passkeys, OAuth2 Resource Server, and JWT validation.",
  },
  {
    title: "Spring Cloud Native & Gateway",
    category: "Spring",
    sectionId: "cloud",
    url: "/#cloud",
    description: "Resilience4j circuit breakers, Gateway routing, OpenFeign, and Micrometer tracing.",
  },
  {
    title: "Spring Data JPA & R2DBC",
    category: "Spring",
    sectionId: "data",
    url: "/#data",
    description: "Hibernate 6, non-blocking R2DBC reactive storage, and Redis caching.",
  },
  {
    title: "Reactive WebFlux & Project Reactor",
    category: "Spring",
    sectionId: "reactive",
    url: "/#reactive",
    description: "Non-blocking event-loop architecture on Netty with Mono and Flux publishers.",
  },
  {
    title: "Spring AI & LLM Integrations",
    category: "Spring",
    sectionId: "spring-ai",
    url: "/#spring-ai",
    description: "Vector database embeddings, RAG workflows, Ollama, OpenAI, and Function calling.",
  },
  {
    title: "Virtual Threads (Project Loom)",
    category: "Java",
    sectionId: "virtual-threads",
    url: "/java#virtual-threads",
    description: "Million-thread lightweight JVM concurrency without callback hell.",
  },
  {
    title: "Pattern Matching & Record Patterns",
    category: "Java",
    sectionId: "pattern-matching",
    url: "/java#pattern-matching",
    description: "Deconstructing records in switch expressions with guards.",
  },
  {
    title: "Sealed Classes & Exhaustive Switches",
    category: "Java",
    sectionId: "sealed-classes",
    url: "/java#sealed-classes",
    description: "Domain modeling with restricted subclass permits.",
  },
  {
    title: "Generational ZGC & Low-Latency JVM",
    category: "Java",
    sectionId: "jvm",
    url: "/java#jvm",
    description: "Sub-millisecond pause time garbage collection for terabyte heaps.",
  },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const pathname = usePathname();
  const router = useRouter();

  const contactRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contactRef.current && !contactRef.current.contains(event.target as Node)) {
        setContactOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchExpanded(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setContactOpen(false);
        setSearchExpanded(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchExpanded(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (searchExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchExpanded]);

  const filteredTopics = searchQuery.trim() === ""
    ? KNOWLEDGE_TOPICS.slice(0, 5)
    : KNOWLEDGE_TOPICS.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleSelectTopic = (topic: SearchTopic) => {
    setSearchExpanded(false);
    setSearchQuery("");

    if (pathname === "/" && topic.sectionId && topic.url.startsWith("/#")) {
      const element = document.getElementById(topic.sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    router.push(topic.url);
  };

  return (
    <header className="absolute top-0 left-0 w-full z-40 bg-transparent text-white py-6 px-6 sm:px-12 pointer-events-auto">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between relative">
        
        {/* Left: Brand Title changed to "Primavera" */}
        <Link href="/" className="group flex items-center gap-2 shrink-0">
          <span className="text-xs font-semibold tracking-widest uppercase text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Primavera
          </span>
        </Link>

        {/* Right: Text-Only Links with Morphing Search & Clean Contact Dangle */}
        <div className="hidden md:flex items-center gap-6 text-xs font-medium tracking-wide relative">
          
          <Link
            href="/java"
            className={`transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] whitespace-nowrap ${
              pathname === "/java" ? "text-white font-bold underline underline-offset-4" : "text-white/80 hover:text-white"
            }`}
          >
            Java 21+
          </Link>
          
          <a
            href="https://spring.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] whitespace-nowrap"
          >
            Spring.io
          </a>

          {/* Morphing Expanding Search Input Container */}
          <div ref={searchRef} className="relative flex items-center">
            {!searchExpanded ? (
              <button
                onClick={() => setSearchExpanded(true)}
                className="text-white/80 hover:text-white transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>
            ) : (
              <div className="relative flex items-center w-64 sm:w-80 lg:w-96 transition-all duration-300 ease-out animate-dangle">
                <div className="w-full flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1C1A12] border border-[#D4AF37]/50 shadow-[0_10px_30px_rgba(0,0,0,0.9),0_0_20px_rgba(212,175,55,0.2)]">
                  <Search className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Spring & Java topics..."
                    className="bg-transparent border-none outline-none text-xs text-[#F4F1EA] placeholder-[#A69E8F]/60 w-full"
                  />
                  <button
                    onClick={() => {
                      setSearchExpanded(false);
                      setSearchQuery("");
                    }}
                    className="text-[#A69E8F] hover:text-white p-0.5 rounded-full hover:bg-white/10 shrink-0 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Search Results Dangle Card */}
                <div className="absolute right-0 top-11 w-full bg-[#1C1A12] border border-[#D4AF37]/40 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.95)] z-50 animate-dangle font-sans max-h-96 overflow-y-auto">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#D4AF37]/20 text-[10px] text-[#A69E8F] font-mono">
                    <span>{searchQuery ? `RESULTS FOR "${searchQuery.toUpperCase()}"` : "QUICK SUGGESTIONS"}</span>
                    <span>{filteredTopics.length} TOPICS</span>
                  </div>

                  {filteredTopics.length === 0 ? (
                    <div className="py-6 text-center text-xs text-[#A69E8F]">
                      No matching topics found for &quot;{searchQuery}&quot;
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {filteredTopics.map((topic, i) => (
                        <button
                          key={i}
                          onClick={() => handleSelectTopic(topic)}
                          className="w-full text-left p-2.5 rounded-xl bg-[#14120B] border border-[#D4AF37]/15 hover:border-[#D4AF37]/60 hover:bg-[#252218] transition-all group flex flex-col gap-1 cursor-pointer"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#F4F1EA] group-hover:text-[#D4AF37] transition-colors">
                              {topic.title}
                            </span>
                            <span className={`text-[9px] px-2 py-0.5 rounded font-mono border ${
                              topic.category === "Spring"
                                ? "bg-[#6DB33F]/15 text-[#6DB33F] border-[#6DB33F]/30"
                                : "bg-[#E76F51]/15 text-[#E76F51] border-[#E76F51]/30"
                            }`}>
                              {topic.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#A69E8F] line-clamp-1">
                            {topic.description}
                          </p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Contact Trigger Button */}
          <div ref={contactRef} className="relative">
            <button
              onClick={() => setContactOpen(!contactOpen)}
              aria-expanded={contactOpen}
              className={`text-white font-semibold hover:underline underline-offset-4 transition-all drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                contactOpen ? "text-[#D4AF37] underline" : ""
              }`}
            >
              <span>Contact</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${contactOpen ? "rotate-180 text-[#D4AF37]" : ""}`} />
            </button>

            {/* Dangled Contact Card - Clean Headerless Layout */}
            {contactOpen && (
              <div className="absolute right-0 top-10 w-72 bg-[#1C1A12] border border-[#D4AF37]/40 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.15)] z-50 animate-dangle font-sans">
                {/* Dangle Card Top Triangle Pin */}
                <div className="absolute -top-2 right-5 w-4 h-4 bg-[#1C1A12] border-l border-t border-[#D4AF37]/40 rotate-45" />

                {/* Contact Links */}
                <div className="space-y-2.5 pt-1">
                  {/* Email */}
                  <a
                    href="mailto:samyb.samir@gmail.com"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#14120B] border border-[#D4AF37]/20 hover:border-[#D4AF37] text-xs text-[#F4F1EA] hover:text-[#D4AF37] transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-[#D4AF37]" />
                      <span className="font-mono text-[11px]">samyb.samir@gmail.com</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/samy-barsoum/"
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
                    href="https://github.com/samybit"
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

                {/* Subtext changed to "SaaS Developer" */}
                <div className="mt-3 pt-2 text-[10px] text-[#A69E8F] font-serif-italic text-center border-t border-[#D4AF37]/10">
                  SaaS Developer
                </div>
              </div>
            )}
          </div>

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
