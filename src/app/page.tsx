import React from "react";
import { Navigation } from "@/components/Navigation";
import { SideIndexNav } from "@/components/SideIndexNav";
import { HeroSection } from "@/components/HeroSection";
import { EcosystemGrid } from "@/components/EcosystemGrid";
import { JavaFeaturesSection } from "@/components/JavaFeaturesSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#14120B] text-[#F4F1EA] relative selection:bg-white/30 selection:text-white">
      {/* Header */}
      <Navigation />

      {/* Hero Section & Side Navigation */}
      <div className="relative w-full">
        <SideIndexNav />
        <HeroSection />
      </div>

      {/* Detailed Ecosystem Cards & Features */}
      <main className="w-full bg-[#14120B] relative z-20">
        <EcosystemGrid />
        <JavaFeaturesSection />
      </main>

      <Footer />
    </div>
  );
}
