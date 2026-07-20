"use client";

import React, { useState, useEffect } from "react";

interface IndexItem {
  roman: string;
  label: string;
  sectionId: string;
}

const INDEX_ITEMS: IndexItem[] = [
  { roman: "I",    label: "Ecosystem",       sectionId: "core" },
  { roman: "II",   label: "Folder Structure",sectionId: "folder-structure" },
  { roman: "III",  label: "Spring MVC",      sectionId: "mvc" },
  { roman: "IV",   label: "Virtual Threads", sectionId: "virtual-threads" },
  { roman: "V",    label: "JVM Mechanics",   sectionId: "jvm" },
  { roman: "VI",   label: "Pattern Matching",sectionId: "pattern-matching" },
  { roman: "VII",  label: "Sealed Classes",  sectionId: "sealed-classes" },
];

export function SideIndexNav() {
  const [activeId, setActiveId] = useState("core");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (const item of INDEX_ITEMS) {
        const el = document.getElementById(item.sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
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
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Desktop only — mobile navigation is fully handled by the Navigation drawer
  return (
    <aside className="hidden lg:flex flex-col fixed left-6 xl:left-10 top-32 z-30 w-48 pointer-events-auto select-none">
      <div className="flex flex-col space-y-2 font-sans">
        {INDEX_ITEMS.map((item) => {
          const isActive = activeId === item.sectionId;
          return (
            <button
              key={item.sectionId}
              onClick={() => handleScrollTo(item.sectionId)}
              className={`w-full flex items-center justify-between py-0.5 text-left text-xs tracking-wide transition-all cursor-pointer ${
                isActive ? "text-white font-bold scale-[1.03]" : "text-white/60 hover:text-white font-medium"
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
  );
}
