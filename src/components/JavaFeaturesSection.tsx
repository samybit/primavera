import React from "react";
import { Cpu, ExternalLink, Terminal } from "lucide-react";

interface JavaFeature {
  id: string;
  roman: string;
  title: string;
  version: string;
  summary: string;
  code: string;
}

const JAVA_FEATURES: JavaFeature[] = [
  {
    id: "virtual-threads",
    roman: "VII",
    title: "Virtual Threads (Project Loom)",
    version: "Java 21 LTS",
    summary: "High-throughput, lightweight threads managed by the JVM instead of OS threads. Million-thread concurrency with traditional synchronous thread-per-request code.",
    code: `try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    IntStream.range(0, 10_000).forEach(i -> {
        executor.submit(() -> {
            Thread.sleep(Duration.ofSeconds(1));
            return i;
        });
    });
}`,
  },
  {
    id: "jvm",
    roman: "VIII",
    title: "Generational ZGC (Low-Latency)",
    version: "Java 21 LTS",
    summary: "Scalable zero-pause garbage collector capable of handling terabyte heaps with sub-millisecond maximum pause times.",
    code: `# Enable Generational ZGC in Java 21+
java -XX:+UseZGC -XX:+ZGenerational -jar primavera-app.jar`,
  },
  {
    id: "pattern-matching",
    roman: "IX",
    title: "Pattern Matching & Record Patterns",
    version: "Java 21 LTS",
    summary: "Deconstruct records directly in switch expressions with guards, enabling safe functional programming and algebraic type handling.",
    code: `static String formatValue(Object obj) {
    return switch (obj) {
        case Point(int x, int y) -> "Point at (%d, %d)".formatted(x, y);
        case String s when s.length() > 5 -> "Long string: " + s;
        case Integer i -> "Number: " + i;
        default -> "Unknown";
    };
}`,
  },
  {
    id: "sealed-classes",
    roman: "X",
    title: "Sealed Classes & Exhaustive Switches",
    version: "Java 17 / 21",
    summary: "Restrict subclassing to known permits, guaranteeing compile-time safety and eliminating the need for fallback default cases in switch statements.",
    code: `public sealed interface PaymentMethod permits CreditCard, Crypto, BankTransfer {}

public record CreditCard(String cardNumber) implements PaymentMethod {}
public record Crypto(String walletAddress) implements PaymentMethod {}
public record BankTransfer(String iban) implements PaymentMethod {}`,
  },
];

export function JavaFeaturesSection() {
  return (
    <section id="virtual-threads" className="w-full py-16 px-6 sm:px-12 max-w-[1400px] border-t border-[#D4AF37]/15">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#E76F51] uppercase tracking-widest">
            <Cpu className="w-4 h-4 text-[#E76F51]" />
            <span>VOLUME II — LANGUAGE INNOVATION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#F4F1EA] mt-1">
            Modern <span className="java-gradient-text">Java 21+ Platform</span>
          </h2>
        </div>
        <a
          href="https://dev.java/learn/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#E76F51] hover:text-[#FFF] transition-colors mt-4 md:mt-0"
        >
          <span>Official Java 21+ Documentation</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {JAVA_FEATURES.map((feat) => (
          <div
            key={feat.id}
            id={feat.id}
            className="renaissance-card rounded-2xl p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-[#E76F51] font-bold">SECTION {feat.roman}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#E76F51]/15 text-[#E76F51] font-mono border border-[#E76F51]/30">
                  {feat.version}
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#F4F1EA] mb-2">{feat.title}</h3>
              <p className="text-xs text-[#A69E8F] leading-relaxed font-sans">{feat.summary}</p>
            </div>

            <div className="mt-5 rounded-xl bg-[#14120B] border border-[#D4AF37]/20 p-4 font-mono text-[11px]">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#D4AF37]/10 text-[10px] text-[#6E675B]">
                <span className="flex items-center gap-1">
                  <Terminal className="w-3 h-3 text-[#E76F51]" />
                  Code Specification
                </span>
                <span>Java 21 LTS</span>
              </div>
              <pre className="text-[#F4F1EA] overflow-x-auto">
                <code>{feat.code}</code>
              </pre>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
