"use client";

import React, { useState, useEffect } from "react";

interface IndexItem {
  roman: string;
  label: string;
  sectionId: string;
}

const INDEX_ITEMS: IndexItem[] = [
  { roman: "I", label: "Core", sectionId: "core" },
  { roman: "II", label: "Security", sectionId: "security" },
  { roman: "III", label: "Cloud", sectionId: "cloud" },
  { roman: "IV", label: "Data", sectionId: "data" },
  { roman: "V", label: "Reactive", sectionId: "reactive" },
  { roman: "VI", label: "Spring AI", sectionId: "spring-ai" },
  { roman: "VII", label: "Virtual Threads", sectionId: "virtual-threads" },
  { roman: "VIII", label: "JVM", sectionId: "jvm" },
  { roman: "IX", label: "Architecture", sectionId: "java-features" },
  { roman: "X", label: "Developer", sectionId: "architecture" },
];

export function SideIndexNav() {
  const [activeId, setActiveId] = useState("core");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      for (const item of INDEX_ITEMS) {
        const element = document.getElementById(item.sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveId(item.sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setActiveId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Desktop Fixed Left Index - Follows user smoothly on scroll */}
      <aside className="hidden lg:flex flex-col fixed left-6 sm:left-10 top-32 z-30 w-44 pointer-events-auto select-none">
        <div className="flex flex-col space-y-2 font-sans">
          {INDEX_ITEMS.map((item) => {
            const isActive = activeId === item.sectionId;
            return (
              <button
                key={item.sectionId}
                onClick={() => handleScrollTo(item.sectionId)}
                className={`w-full flex items-center justify-between py-0.5 text-left text-xs tracking-wide transition-all ${
                  isActive
                    ? "text-white font-bold scale-[1.03]"
                    : "text-white/60 hover:text-white font-medium"
                }`}
              >
                <span className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">{item.label}</span>
                <span className="font-serif italic text-xs tracking-normal opacity-90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                  {item.roman}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Mobile Sticky Horizontal Index Bar */}
      <div className="lg:hidden sticky top-0 z-30 w-full bg-[#14120B]/95 border-b border-white/10 py-2.5 px-4 backdrop-blur-md overflow-x-auto no-scrollbar flex items-center gap-2">
        {INDEX_ITEMS.map((item) => {
          const isActive = activeId === item.sectionId;
          return (
            <button
              key={item.sectionId}
              onClick={() => handleScrollTo(item.sectionId)}
              className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 transition-all ${
                isActive
                  ? "bg-white text-black font-semibold"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <span>{item.label}</span>
              <span className="ml-1.5 font-serif italic text-[11px] opacity-75">{item.roman}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
