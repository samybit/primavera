import React from "react";
import { Server, Shield, Cloud, Database, Cpu, Bot, CheckCircle2, ChevronRight } from "lucide-react";

interface SpringModule {
  id: string;
  roman: string;
  title: string;
  accent: string;
  icon: React.ElementType;
  description: string;
  highlights: string[];
  codeSnippet: string;
  badge: string;
}

const MODULES: SpringModule[] = [
  {
    id: "core",
    roman: "I",
    title: "Spring Boot 3.3 & Core Framework",
    accent: "#6DB33F",
    icon: Server,
    description: "The backbone of modern enterprise Java applications, offering opinionated auto-configuration, GraalVM native image generation, Ahead-Of-Time (AOT) processing, and comprehensive Actuator telemetry.",
    highlights: ["GraalVM Native Compilation", "Virtual Thread Execution", "Structured Logging & Metrics", "Custom Starters & Auto-config"],
    badge: "Framework Core",
    codeSnippet: `@SpringBootApplication
public class PrimaveraApplication {
    public static void main(String[] args) {
        SpringApplication.run(PrimaveraApplication.class, args);
    }
}`,
  },
  {
    id: "security",
    roman: "II",
    title: "Spring Security 6.3",
    accent: "#D4AF37",
    icon: Shield,
    description: "Enterprise-grade authorization and authentication framework. Provides seamless integration for OAuth2 Resource Servers, OIDC, Passkeys, JWT validation, and Method Security annotations.",
    highlights: ["OAuth2 / OpenID Connect", "Passkey & WebAuthn Support", "Reactive Security WebFilter", "CSRF & CORS Controls"],
    badge: "Identity & Access",
    codeSnippet: `@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/public/**").permitAll()
            .anyRequest().authenticated())
        .oauth2ResourceServer(oauth -> oauth.jwt(Customizer.withDefaults()))
        .build();
}`,
  },
  {
    id: "cloud",
    roman: "III",
    title: "Spring Cloud Native",
    accent: "#6DB33F",
    icon: Cloud,
    description: "Architectural tooling for microservice patterns: API Gateway routing, Resilience4j circuit breakers, distributed tracing with Micrometer, and declarative REST clients with OpenFeign.",
    highlights: ["Spring Cloud Gateway", "Resilience4j Circuit Breakers", "Distributed Tracing (Zipkin/OTel)", "Eureka & Consul Discovery"],
    badge: "Microservices",
    codeSnippet: `@Bean
public RouteLocator customRoutes(RouteLocatorBuilder builder) {
    return builder.routes()
        .route("payment_route", r -> r.path("/payments/**")
            .filters(f -> f.circuitBreakers(c -> c.setName("payCB")))
            .uri("lb://PAYMENT-SERVICE"))
        .build();
}`,
  },
  {
    id: "data",
    roman: "IV",
    title: "Spring Data JPA & R2DBC",
    accent: "#D4AF37",
    icon: Database,
    description: "Unified repository abstractions for both synchronous relational databases via Hibernate 6 and asynchronous non-blocking storage via R2DBC and Spring Data Redis.",
    highlights: ["Derived Query Methods", "R2DBC Reactive Storage", "Redis & Mongo Aggregations", "Auditing & Entity Callbacks"],
    badge: "Persistence Layer",
    codeSnippet: `@Repository
public interface OrderRepository extends JpaRepository<Order, UUID> {
    @Query("SELECT o FROM Order o WHERE o.status = :status")
    List<Order> findActiveOrders(@Param("status") OrderStatus status);
}`,
  },
  {
    id: "reactive",
    roman: "V",
    title: "Reactive WebFlux & Netty",
    accent: "#6DB33F",
    icon: Cpu,
    description: "Non-blocking event-loop architecture powered by Project Reactor. Enables extreme throughput and concurrency handling with Mono and Flux reactive publishers on top of Netty.",
    highlights: ["Publisher (Mono & Flux)", "Backpressure Management", "Server-Sent Events (SSE)", "Non-blocking HTTP Client"],
    badge: "High Throughput",
    codeSnippet: `@GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
public Flux<TelemetryEvent> getLiveStream() {
    return telemetryService.getEventStream()
        .delayElements(Duration.ofMillis(100));
}`,
  },
  {
    id: "spring-ai",
    roman: "IX",
    title: "Spring AI Ecosystem",
    accent: "#E76F51",
    icon: Bot,
    description: "Portable AI abstractions for integrating Large Language Models (LLMs), Vector Databases (PgVector, Pinecone), RAG workflows, and Function Calling with Java safety.",
    highlights: ["Multi-Model Portability", "Vector Store Embeddings", "Retrieval-Augmented Generation", "Tool & Function Calling"],
    badge: "Generative AI",
    codeSnippet: `@RestController
public class AIController {
    private final ChatClient chatClient;
    
    public AIController(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }
    
    @GetMapping("/ai/prompt")
    public String ask(@RequestParam String query) {
        return chatClient.prompt().user(query).call().content();
    }
}`,
  },
];

export function EcosystemGrid() {
  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#D4AF37]/20">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase tracking-widest">
            <span>Volume I</span>
            <span>—</span>
            <span>Framework Modules</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F4F1EA] mt-1">
            Spring Framework <span className="spring-gradient-text">Ecosystem</span>
          </h2>
        </div>
        <p className="text-sm font-serif-italic text-[#A69E8F] mt-2 md:mt-0 max-w-md">
          Curated deep dives into the essential blocks powering modern production systems.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MODULES.map((mod) => {
          const Icon = mod.icon;
          return (
            <article
              key={mod.id}
              id={mod.id}
              className="renaissance-card rounded-2xl p-6 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#14120B] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-[#D4AF37] block">SECTION {mod.roman}</span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-[#14120B] border border-[#D4AF37]/20 text-[#A69E8F] font-mono">
                        {mod.badge}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-bold text-[#F4F1EA] group-hover:text-[#D4AF37] transition-colors">
                  {mod.title}
                </h3>
                <p className="text-xs text-[#A69E8F] mt-2 leading-relaxed font-sans">
                  {mod.description}
                </p>

                {/* Highlights List */}
                <ul className="mt-4 space-y-1.5 border-t border-[#D4AF37]/10 pt-3">
                  {mod.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-[#F4F1EA]/80 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#6DB33F] shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Code Snippet Preview */}
              <div className="mt-5 rounded-xl bg-[#14120B] border border-[#D4AF37]/20 p-3 font-mono text-[11px] text-[#A69E8F] overflow-x-auto">
                <div className="flex items-center justify-between pb-1 mb-2 border-b border-[#D4AF37]/10 text-[10px] text-[#6E675B]">
                  <span>Java Snippet</span>
                  <span>Spring 6+</span>
                </div>
                <pre className="text-[#F4F1EA] leading-tight">
                  <code>{mod.codeSnippet}</code>
                </pre>
              </div>

              {/* Footer Link */}
              <div className="mt-4 pt-3 border-t border-[#D4AF37]/10 flex items-center justify-between text-xs font-semibold text-[#D4AF37] group-hover:text-[#FFF] transition-colors cursor-pointer">
                <span>Explore Architecture Specs</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          );
        })}
      </div>

    </section>
  );
}
