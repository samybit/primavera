import React from "react";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Cpu, Terminal, ArrowLeft, Zap, Shield, Check, Flame, Layers, Activity } from "lucide-react";

export const metadata = {
  title: "Java 21+ Knowledge Hub | Primavera",
  description: "Comprehensive guide to Modern Java 21 LTS features, JVM internal architecture, Virtual Threads, and performance tuning.",
};

export default function JavaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#14120B] text-[#F4F1EA] selection:bg-[#E76F51]/30">
      <Navigation />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-12 w-full">
        
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#D4AF37] hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Spring Ecosystem Hub</span>
        </Link>

        {/* Hero Banner */}
        <header className="mb-12 border-b border-[#D4AF37]/20 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1A12] border border-[#E76F51]/30 text-xs text-[#E76F51] mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span className="font-mono uppercase text-[10px] tracking-wider">MODERN JAVA PLATFORM • JDK 21 LTS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#F4F1EA]">
            Java 21+ <span className="java-gradient-text">Architecture & Mechanics</span>
          </h1>

          <p className="mt-4 text-lg font-serif-italic text-[#A69E8F] max-w-3xl leading-relaxed">
            From Project Loom’s million-thread virtual concurrency to Generational ZGC, explore the evolution of the Java Virtual Machine for ultra-low latency cloud computing.
          </p>
        </header>

        {/* 3 Pillars Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="renaissance-card p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-[#E76F51]/15 border border-[#E76F51]/30 flex items-center justify-center text-[#E76F51] mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#F4F1EA]">Project Loom</h3>
            <p className="text-xs text-[#A69E8F] mt-2 leading-relaxed">
              Virtual Threads decouple Java execution from operating system kernel threads, reducing footprint per thread from 1MB to ~few hundred bytes.
            </p>
          </div>

          <div className="renaissance-card p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-4">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#F4F1EA]">Project Amber</h3>
            <p className="text-xs text-[#A69E8F] mt-2 leading-relaxed">
              Modern language ergonomics featuring Records, Pattern Matching, Sealed Classes, Text Blocks, and String Templates.
            </p>
          </div>

          <div className="renaissance-card p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-[#6DB33F]/15 border border-[#6DB33F]/30 flex items-center justify-center text-[#6DB33F] mb-4">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#F4F1EA]">ZGC & Panama</h3>
            <p className="text-xs text-[#A69E8F] mt-2 leading-relaxed">
              Generational Z Garbage Collector with sub-millisecond pause times and Foreign Function & Memory API for native C interop.
            </p>
          </div>
        </div>

        {/* Deep Dive Section: Modern Syntax Evolution */}
        <section className="mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase tracking-wider mb-2">
            <Terminal className="w-4 h-4" />
            <span>Code Evolution</span>
          </div>
          <h2 className="text-2xl font-bold text-[#F4F1EA] mb-6">Java 8 vs Modern Java 21 Syntax</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Old Java 8 */}
            <div className="rounded-2xl bg-[#1C1A12] border border-[#D4AF37]/20 p-5 font-mono text-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#D4AF37]/15 text-[#6E675B]">
                <span className="text-red-400 font-bold">Legacy (Java 8)</span>
                <span>Verbose DTO & Switch</span>
              </div>
              <pre className="text-[#A69E8F] overflow-x-auto text-[11px] leading-relaxed">
                <code>{`// Verbose JavaBean DTO
public class User {
    private final String name;
    private final int age;
    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }
    public String getName() { return name; }
    public int getAge() { return age; }
    // + equals, hashCode, toString...
}

// Old Switch Statement
String result;
switch (type) {
    case A:
        result = "Alpha";
        break;
    default:
        result = "Other";
}`}</code>
              </pre>
            </div>

            {/* Modern Java 21 */}
            <div className="rounded-2xl bg-[#1C1A12] border border-[#E76F51]/40 p-5 font-mono text-xs shadow-[0_0_20px_rgba(231,111,81,0.1)]">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E76F51]/20 text-[#6E675B]">
                <span className="text-[#E76F51] font-bold">Modern (Java 21 LTS)</span>
                <span>Records & Pattern Matching</span>
              </div>
              <pre className="text-[#F4F1EA] overflow-x-auto text-[11px] leading-relaxed">
                <code>{`// Compact Immutable Record
public record User(String name, int age) {}

// Expression Switch with Pattern Matching
String result = switch (obj) {
    case User(var n, var a) when a >= 18 -> "Adult: " + n;
    case User(var n, _) -> "Minor: " + n;
    case String s -> "String payload: " + s;
    default -> "Unknown";
};`}</code>
              </pre>
            </div>

          </div>
        </section>

        {/* Structured Concurrency & Loom */}
        <section className="rounded-2xl bg-[#1C1A12] border border-[#D4AF37]/30 p-8">
          <h2 className="text-2xl font-bold text-[#F4F1EA]">Structured Concurrency & Scoped Values</h2>
          <p className="text-xs text-[#A69E8F] mt-2 font-serif-italic max-w-2xl">
            Treating multiple tasks running in different virtual threads as a single unit of work, simplifying error handling, cancellation, and observability.
          </p>

          <div className="mt-6 rounded-xl bg-[#14120B] border border-[#D4AF37]/20 p-5 font-mono text-xs">
            <div className="text-[10px] text-[#D4AF37] mb-2">// Java 21 StructuredTaskScope Example</div>
            <pre className="text-[#F4F1EA] overflow-x-auto text-[11px] leading-relaxed">
              <code>{`try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
    Subtask<User> userTask = scope.fork(() -> userService.fetchUser(userId));
    Subtask<Order> orderTask = scope.fork(() -> orderService.fetchOrder(orderId));

    scope.join();           // Wait for both subtasks
    scope.throwIfFailed();  // Propagate exceptions if any failed

    // Combine results safely
    return new UserDashboard(userTask.get(), orderTask.get());
}`}</code>
            </pre>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
