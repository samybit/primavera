"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Mail, ExternalLink, ChevronDown, Search, ArrowUpRight } from "lucide-react";

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
  { title: "Spring Boot 3.3 & Core Framework", category: "Spring", sectionId: "core", url: "/#core", description: "Auto-configuration, GraalVM native images, AOT compilation, and Actuator telemetry." },
  { title: "Spring Security 6.3 & OAuth2", category: "Spring", sectionId: "security", url: "/#security", description: "Authorization filters, Passkeys, OAuth2 Resource Server, and JWT validation." },
  { title: "Spring Cloud Native & Gateway", category: "Spring", sectionId: "cloud", url: "/#cloud", description: "Resilience4j circuit breakers, Gateway routing, OpenFeign, and Micrometer tracing." },
  { title: "Spring Data JPA & R2DBC", category: "Spring", sectionId: "data", url: "/#data", description: "Hibernate 6, non-blocking R2DBC reactive storage, and Redis caching." },
  { title: "Reactive WebFlux & Project Reactor", category: "Spring", sectionId: "reactive", url: "/#reactive", description: "Non-blocking event-loop architecture on Netty with Mono and Flux publishers." },
  { title: "Spring AI & LLM Integrations", category: "Spring", sectionId: "spring-ai", url: "/#spring-ai", description: "Vector database embeddings, RAG workflows, Ollama, OpenAI, and Function calling." },
  { title: "Virtual Threads (Project Loom)", category: "Java", sectionId: "virtual-threads", url: "/#virtual-threads", description: "Million-thread lightweight JVM concurrency without callback hell." },
  { title: "Pattern Matching & Record Patterns", category: "Java", sectionId: "pattern-matching", url: "/#virtual-threads", description: "Deconstructing records in switch expressions with guards." },
  { title: "Sealed Classes & Exhaustive Switches", category: "Java", sectionId: "sealed-classes", url: "/#virtual-threads", description: "Domain modeling with restricted subclass permits." },
  { title: "Generational ZGC & Low-Latency JVM", category: "Java", sectionId: "jvm", url: "/#virtual-threads", description: "Sub-millisecond pause time garbage collection for terabyte heaps." },
];

const SECTION_ITEMS = [
  { roman: "I",    label: "Core",           id: "core" },
  { roman: "II",   label: "Security",       id: "security" },
  { roman: "III",  label: "Cloud",          id: "cloud" },
  { roman: "IV",   label: "Data",           id: "data" },
  { roman: "V",    label: "Reactive",       id: "reactive" },
  { roman: "VI",   label: "Spring AI",      id: "spring-ai" },
  { roman: "VII",  label: "Virtual Threads",id: "virtual-threads" },
  { roman: "VIII", label: "JVM",            id: "jvm" },
  { roman: "IX",   label: "Architecture",   id: "java-features" },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const pathname = usePathname();
  const router = useRouter();

  const contactRef = useRef<HTMLDivElement>(null);
  const searchRef  = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);
  const drawerRef  = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (contactRef.current && !contactRef.current.contains(e.target as Node)) setContactOpen(false);
      if (searchRef.current  && !searchRef.current.contains(e.target as Node))  { setSearchExpanded(false); }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setContactOpen(false); setSearchExpanded(false); setMobileOpen(false); }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearchExpanded(true); }
    };
    document.addEventListener("click", handler);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("click", handler); document.removeEventListener("keydown", onKey); };
  }, []);

  useEffect(() => { if (searchExpanded && inputRef.current) inputRef.current.focus(); }, [searchExpanded]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const filteredTopics = searchQuery.trim() === ""
    ? KNOWLEDGE_TOPICS.slice(0, 5)
    : KNOWLEDGE_TOPICS.filter(t =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleSelectTopic = (topic: SearchTopic) => {
    setSearchExpanded(false);
    setSearchQuery("");
    if (topic.sectionId && topic.url.startsWith("/#")) {
      const el = document.getElementById(topic.sectionId);
      if (el) { el.scrollIntoView({ behavior: "smooth" }); return; }
    }
    router.push(topic.url);
  };

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 320);
  };

  return (
    <>
      {/* ─────────────────── TOP BAR ─────────────────── */}
      <header className="absolute top-0 left-0 w-full z-40 bg-transparent text-white pointer-events-auto">
        <div className="flex items-center justify-between py-5 px-5 sm:px-10 lg:px-12 max-w-[1600px] mx-auto">

          {/* Brand */}
          <Link href="/" className="text-xs font-semibold tracking-widest uppercase text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] shrink-0">
            Primavera
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium tracking-wide">
            <a href="https://dev.java/learn/" target="_blank" rel="noopener noreferrer"
               className="text-white/80 hover:text-white transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] whitespace-nowrap">
              Java Docs ↗
            </a>
            <a href="https://spring.io/quickstart" target="_blank" rel="noopener noreferrer"
               className="text-white/80 hover:text-white transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] whitespace-nowrap">
              Spring.io ↗
            </a>

            {/* Morphing Search */}
            <div ref={searchRef} className="relative flex items-center">
              <button onClick={() => setSearchExpanded(true)} aria-label="Open search"
                style={{ opacity: searchExpanded ? 0 : 1, pointerEvents: searchExpanded ? "none" : "auto",
                         position: searchExpanded ? "absolute" : "relative", transition: "opacity 0.2s ease" }}
                className="text-white/80 hover:text-white flex items-center gap-1.5 cursor-pointer whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                <Search className="w-3.5 h-3.5" /><span>Search</span>
              </button>
              <div style={{ maxWidth: searchExpanded ? "24rem" : "0px", opacity: searchExpanded ? 1 : 0,
                            pointerEvents: searchExpanded ? "auto" : "none", overflow: "hidden",
                            transition: "max-width 0.38s cubic-bezier(0.16,1,0.3,1), opacity 0.22s ease" }}
                   className="flex items-center">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1C1A12]/90 border border-[#D4AF37]/50 shadow-[0_6px_24px_rgba(0,0,0,0.8)] w-80">
                  <Search className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <input ref={inputRef} type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                         placeholder="Search Spring & Java topics..."
                         className="bg-transparent border-none outline-none text-xs text-[#F4F1EA] placeholder:text-[#A69E8F]/50 w-full min-w-0" />
                  <button onClick={() => { setSearchExpanded(false); setSearchQuery(""); }}
                          className="text-[#A69E8F] hover:text-white rounded-full hover:bg-white/10 shrink-0 cursor-pointer p-0.5">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              {searchExpanded && (
                <div className="absolute right-0 top-10 w-80 bg-[#1C1A12] border border-[#D4AF37]/40 rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.95)] z-50 animate-dangle font-sans overflow-hidden max-h-80">
                  <div className="p-4 overflow-y-auto h-full" style={{ scrollbarWidth: "thin", scrollbarColor: "#3D3822 transparent" }}>
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#D4AF37]/20 text-[10px] text-[#A69E8F] font-mono">
                      <span>{searchQuery ? `"${searchQuery.toUpperCase()}"` : "QUICK SUGGESTIONS"}</span>
                      <span>{filteredTopics.length} results</span>
                    </div>
                    {filteredTopics.length === 0 ? (
                      <div className="py-6 text-center text-xs text-[#A69E8F]">No topics found for &quot;{searchQuery}&quot;</div>
                    ) : (
                      <div className="space-y-2">
                        {filteredTopics.map((t, i) => (
                          <button key={i} onClick={() => handleSelectTopic(t)}
                                  className="w-full text-left p-2.5 rounded-xl bg-[#14120B] border border-[#D4AF37]/15 hover:border-[#D4AF37]/60 hover:bg-[#252218] transition-all group flex flex-col gap-1 cursor-pointer">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-[#F4F1EA] group-hover:text-[#D4AF37] transition-colors">{t.title}</span>
                              <span className={`text-[9px] px-2 py-0.5 rounded font-mono border shrink-0 ml-2 ${
                                t.category === "Spring" ? "bg-[#6DB33F]/15 text-[#6DB33F] border-[#6DB33F]/30" : "bg-[#E76F51]/15 text-[#E76F51] border-[#E76F51]/30"
                              }`}>{t.category}</span>
                            </div>
                            <p className="text-[11px] text-[#A69E8F] line-clamp-1">{t.description}</p>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Contact Dangle */}
            <div ref={contactRef} className="relative">
              <button onClick={() => setContactOpen(!contactOpen)} aria-expanded={contactOpen}
                      className={`text-white font-semibold hover:underline underline-offset-4 transition-all drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${contactOpen ? "text-[#D4AF37] underline" : ""}`}>
                <span>Contact</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${contactOpen ? "rotate-180 text-[#D4AF37]" : ""}`} />
              </button>
              {contactOpen && (
                <div className="absolute right-0 top-10 w-72 bg-[#1C1A12] border border-[#D4AF37]/40 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.15)] z-50 animate-dangle font-sans">
                  <div className="absolute -top-2 right-5 w-4 h-4 bg-[#1C1A12] border-l border-t border-[#D4AF37]/40 rotate-45" />
                  <div className="space-y-2.5 pt-1">
                    <a href="mailto:samyb.samir@gmail.com" className="flex items-center justify-between p-2.5 rounded-xl bg-[#14120B] border border-[#D4AF37]/20 hover:border-[#D4AF37] text-xs text-[#F4F1EA] hover:text-[#D4AF37] transition-all group">
                      <div className="flex items-center gap-2.5"><Mail className="w-4 h-4 text-[#D4AF37]" /><span className="font-mono text-[11px]">samyb.samir@gmail.com</span></div>
                      <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </a>
                    <a href="https://www.linkedin.com/in/samy-barsoum/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2.5 rounded-xl bg-[#14120B] border border-[#D4AF37]/20 hover:border-[#D4AF37] text-xs text-[#F4F1EA] hover:text-[#D4AF37] transition-all group">
                      <div className="flex items-center gap-2.5"><LinkedInIcon className="w-4 h-4 text-[#D4AF37]" /><span className="font-medium text-[11px]">LinkedIn Profile</span></div>
                      <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </a>
                    <a href="https://github.com/samybit" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2.5 rounded-xl bg-[#14120B] border border-[#D4AF37]/20 hover:border-[#D4AF37] text-xs text-[#F4F1EA] hover:text-[#D4AF37] transition-all group">
                      <div className="flex items-center gap-2.5"><GitHubIcon className="w-4 h-4 text-[#D4AF37]" /><span className="font-medium text-[11px]">GitHub Profile</span></div>
                      <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </div>
                  <div className="mt-3 pt-2 text-[10px] text-[#A69E8F] font-serif-italic text-center border-t border-[#D4AF37]/10">SaaS Developer</div>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu"
                  className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors z-50 relative">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* ─────────────────── MOBILE FULL-SCREEN DRAWER ─────────────────── */}
      {/* Backdrop */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Slide-in Panel */}
      <div
        ref={drawerRef}
        className={`md:hidden fixed top-0 right-0 h-full w-[80vw] max-w-sm bg-[#14120B] border-l border-[#D4AF37]/20 z-50 flex flex-col transition-transform duration-300 ease-out ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#D4AF37]/15">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#D4AF37]">Primavera</span>
          <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">

          {/* Section Index */}
          <div>
            <p className="text-[10px] font-mono text-[#A69E8F] uppercase tracking-widest mb-3">Contents</p>
            <div className="space-y-1">
              {SECTION_ITEMS.map(item => (
                <button key={item.id} onClick={() => scrollTo(item.id)}
                        className="w-full flex items-center justify-between py-2 px-3 rounded-xl text-left text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all group">
                  <span className="font-medium">{item.label}</span>
                  <span className="font-serif italic text-[11px] text-[#D4AF37]/60 group-hover:text-[#D4AF37] transition-colors">{item.roman}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[#D4AF37]/10" />

          {/* External Links */}
          <div>
            <p className="text-[10px] font-mono text-[#A69E8F] uppercase tracking-widest mb-3">Resources</p>
            <div className="space-y-2">
              <a href="https://spring.io/quickstart" target="_blank" rel="noopener noreferrer"
                 className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-[#1C1A12] border border-[#6DB33F]/20 text-sm text-[#6DB33F] hover:border-[#6DB33F]/50 transition-all">
                <span className="font-medium">Spring Quickstart</span>
                <ArrowUpRight className="w-4 h-4 opacity-60" />
              </a>
              <a href="https://dev.java/learn/" target="_blank" rel="noopener noreferrer"
                 className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-[#1C1A12] border border-[#E76F51]/20 text-sm text-[#E76F51] hover:border-[#E76F51]/50 transition-all">
                <span className="font-medium">Java Starter Docs</span>
                <ArrowUpRight className="w-4 h-4 opacity-60" />
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[#D4AF37]/10" />

          {/* Contact */}
          <div>
            <p className="text-[10px] font-mono text-[#A69E8F] uppercase tracking-widest mb-3">Contact</p>
            <div className="space-y-2">
              <a href="mailto:samyb.samir@gmail.com"
                 className="flex items-center gap-3 py-2.5 px-3 rounded-xl bg-[#1C1A12] border border-[#D4AF37]/20 text-sm text-[#F4F1EA] hover:border-[#D4AF37] transition-all">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="font-mono text-xs truncate">samyb.samir@gmail.com</span>
              </a>
              <a href="https://www.linkedin.com/in/samy-barsoum/" target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-3 py-2.5 px-3 rounded-xl bg-[#1C1A12] border border-[#D4AF37]/20 text-sm text-[#F4F1EA] hover:border-[#D4AF37] transition-all">
                <LinkedInIcon className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="text-sm font-medium">LinkedIn Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-40 ml-auto" />
              </a>
              <a href="https://github.com/samybit" target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-3 py-2.5 px-3 rounded-xl bg-[#1C1A12] border border-[#D4AF37]/20 text-sm text-[#F4F1EA] hover:border-[#D4AF37] transition-all">
                <GitHubIcon className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="text-sm font-medium">GitHub Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-40 ml-auto" />
              </a>
            </div>
          </div>

        </div>

        {/* Drawer Footer */}
        <div className="px-6 py-4 border-t border-[#D4AF37]/10">
          <p className="text-[10px] text-[#6E675B] font-serif italic text-center">SaaS Developer · Renaissance Edition</p>
        </div>
      </div>
    </>
  );
}
