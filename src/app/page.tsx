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
      {/* Absolute Top Header Navigation */}
      <Navigation />

      {/* Fixed Left Roman Numeral Index Menu */}
      <SideIndexNav />

      {/* Main Content Area - Shifted Right to Leave Space for Fixed Left Index Menu */}
      <main className="w-full lg:pl-64 flex-1 flex flex-col relative z-20">
        <HeroSection />
        <EcosystemGrid />
        <JavaFeaturesSection />
        <Footer />
      </main>
    </div>
  );
}
