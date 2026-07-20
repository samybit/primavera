"use client";

import React, { useState } from "react";
import { FolderTree, Layers, Copy, Check, Cpu, ArrowRight } from "lucide-react";

const MVC_STEPS = [
  {
    step: "01",
    title: "HTTP Request",
    actor: "Client / Consumer",
    accent: "#6DB33F",
    badge: "GET /api/v1/products/42",
    description: "Client sends HTTP request to the Spring Boot application server.",
    code: `GET /api/v1/products/42 HTTP/1.1
Host: api.primavera.dev
Accept: application/json`,
  },
  {
    step: "02",
    title: "DispatcherServlet",
    actor: "Front Controller",
    accent: "#D4AF37",
    badge: "Central Interceptor",
    description: "Central Front Controller servlet receives the raw HTTP request and initiates dispatching.",
    code: `public class DispatcherServlet extends FrameworkServlet {
  protected void doDispatch(HttpServletRequest req, ...) { ... }
}`,
  },
  {
    step: "03",
    title: "HandlerMapping",
    actor: "Route Registry",
    accent: "#E76F51",
    badge: "Finds @RestController",
    description: "Matches URL pattern & HTTP method against registered @RequestMapping handler methods.",
    code: `RequestMappingHandlerMapping -> ProductController#getProduct(42)`,
  },
  {
    step: "04",
    title: "Controller Execution",
    actor: "Handler & Service Layer",
    accent: "#6DB33F",
    badge: "@GetMapping Execution",
    description: "Invokes controller method, validates request DTOs, and queries @Service / @Repository layers.",
    code: `@GetMapping("/products/{id}")
public ResponseEntity<ProductDTO> getProduct(@PathVariable Long id) {
    return ResponseEntity.ok(productService.findById(id));
}`,
  },
  {
    step: "05",
    title: "HttpMessageConverter",
    actor: "Jackson Serializer",
    accent: "#D4AF37",
    badge: "Java Record -> JSON",
    description: "Jackson converts returned ProductDTO domain model into raw JSON bytes.",
    code: `MappingJackson2HttpMessageConverter -> Serializes DTO to JSON`,
  },
  {
    step: "06",
    title: "HTTP 200 Response",
    actor: "Servlet Response",
    accent: "#6DB33F",
    badge: "application/json",
    description: "DispatcherServlet flushes response stream back to client with HTTP 200 OK headers.",
    code: `HTTP/1.1 200 OK
Content-Type: application/json

{"id": 42, "name": "Spring Boot Guide", "price": 49.99}`,
  },
];

interface FolderItemNode {
  id?: string;
  parents: string[];
  rawLine: string;
}

const FOLDER_TREE_NODES: FolderItemNode[] = [
  { id: "root", parents: [], rawLine: "[organizationProject]/                              # The root project folder" },
  { id: "mvn", parents: ["root"], rawLine: "├── .mvn/                           # Hidden folder storing Maven Wrapper configurations" },
  { id: "wrapper", parents: ["root", "mvn"], rawLine: "│   └── wrapper/" },
  { parents: ["root", "mvn", "wrapper"], rawLine: "│       ├── maven-wrapper.jar       # Tiny binary that downloads/boots the Maven version" },
  { parents: ["root", "mvn", "wrapper"], rawLine: "│       └── maven-wrapper.properties# Properties file configuring the exact target Maven version" },
  { id: "src", parents: ["root"], rawLine: "├── src/                            # Source code root" },
  { id: "main", parents: ["root", "src"], rawLine: "│   ├── main/                       # Production-ready code and assets" },
  { id: "java", parents: ["root", "src", "main"], rawLine: "│   │   ├── java/                   # Root directory for all Java source code packages" },
  { id: "topLevel", parents: ["root", "src", "main", "java"], rawLine: "│   │   │   └── [topLevelDomain]/" },
  { id: "orgProj", parents: ["root", "src", "main", "java", "topLevel"], rawLine: "│   │   │       └── [organizationProject]/" },
  { id: "module", parents: ["root", "src", "main", "java", "topLevel", "orgProj"], rawLine: "│   │   │           └── [moduleName]/       # Main application package matching Group + Artifact" },
  { parents: ["root", "src", "main", "java", "topLevel", "orgProj", "module"], rawLine: "│   │   │               └── Application.java # Main entry point class with main method" },
  { id: "resources", parents: ["root", "src", "main"], rawLine: "│   │   └── resources/              # Non-code assets used by your application" },
  { parents: ["root", "src", "main", "resources"], rawLine: "│   │       ├── application.properties # Main configuration file (ports, DB URLs, log levels)" },
  { id: "static", parents: ["root", "src", "main", "resources"], rawLine: "│   │       ├── static/             # Folder for static web frontend assets (HTML, CSS, JS)" },
  { id: "templates", parents: ["root", "src", "main", "resources"], rawLine: "│   │       └── templates/          # Folder for server-side UI engine templates (Thymeleaf)" },
  { id: "test", parents: ["root", "src"], rawLine: "│   └── test/                       # Test code root (isolated from production build)" },
  { id: "testJava", parents: ["root", "src", "test"], rawLine: "│       └── java/                   # Root directory for unit tests and integration tests" },
  { parents: ["root"], rawLine: "├── mvnw                            # Executable Linux/macOS shell script for Maven Wrapper" },
  { parents: ["root"], rawLine: "├── mvnw.cmd                        # Executable Windows batch script for Maven Wrapper" },
  { parents: ["root"], rawLine: "├── pom.xml                         # Core configuration file managing versions & dependencies" },
  { id: "target", parents: ["root"], rawLine: "└── target/                         # Autogenerated build output containing compiled .class & JARs" },
];

export function EcosystemGrid() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);

  // Collapsible state for Ecosystem groups and Folder directories
  const [collapsedEcosystem, setCollapsedEcosystem] = useState<Record<string, boolean>>({});
  const [collapsedFolders, setCollapsedFolders] = useState<Record<string, boolean>>({});

  const toggleEcosystemGroup = (group: string) => {
    setCollapsedEcosystem((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  const toggleFolderNode = (id: string) => {
    setCollapsedFolders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = (sectionId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const ecosystemContent = `[ THE SPRING ECOSYSTEM ]
├── Spring Boot .........──> Pre-configures and runs applications instantly
│   ├── spring-boot ............... (Core lifecycle, runner setup, and banner logic)
│   ├── spring-boot-autoconfigure . (The "magic" engine that auto-wires beans)
│   ├── spring-boot-actuator ...... (Production-ready monitoring & health endpoints)
│   └── spring-boot-starters ...... (Pre-packaged dependency bundles like starter-web)
│
├── Spring Data .........──> Simplifies SQL/NoSQL database interactions
│   ├── spring-data-commons ....... (The core interfaces & repository abstractions)
│   ├── spring-data-jpa ........... (Relational database management via Hibernate)
│   ├── spring-data-mongodb ....... (NoSQL document storage support)
│   └── spring-data-redis ......... (Key-value memory cache support)
│
├── Spring Security ....──> Handles authentication, authorization, and safety
│   ├── spring-security-core ...... (Core authentication & access control logic)
│   ├── spring-security-web ....... (HTTP security filters and URL blocking rules)
│   ├── spring-security-config .... (The Java configuration fluent API engine)
│   └── spring-security-crypto .... (Password hashing, salts, and encryption tools)
│
├── Spring Cloud .......──> Manages microservices and distributed systems
│   ├── spring-cloud-config ....... (Centralized server for managing environment properties)
│   ├── spring-cloud-gateway ...... (API routing, security, and traffic throttling)
│   └── spring-cloud-stream ....... (Event-driven messaging abstracting Kafka/RabbitMQ)
│
├── Spring Batch .......──> Processes massive volumes of background data
│   ├── spring-batch-infrastructure (Low-level readers, writers, and retry mechanisms)
│   └── spring-batch-core ......... (Job execution lifecycle, steps, and restart logic)
│
├── Spring Integration .──> Connects distinct enterprise systems together
│   ├── spring-integration-core ... (The messaging pipelines, gateways, and channels)
│   └── spring-integration-file ... (Specific adapters to stream external files/data pools)
│
├── Spring Shell .......──> Builds terminal-based command-line tools
│   ├── spring-shell-core ......... (The terminal parsing engine and command UI)
│   └── spring-shell-standard ..... (Built-in CLI commands like help, clear, and exit)
│
└── Spring Framework ...──> The foundation engine managing the core mechanics
    ├── spring-aop ................ (Aspect-Oriented Programming for logging/transactions)
    ├── spring-web ................ (Web integration, REST clients, and HTTP filters)
    ├── spring-context ............ (The Application Context registry holding beans)
    └── spring-core ............... (The absolute bedrock IoC and DI container utils)`;

  const folderRawText = FOLDER_TREE_NODES.map((n) => n.rawLine).join("\n");
  const mvcTextContent = MVC_STEPS.map((s) => `STEP ${s.step}: ${s.title} (${s.actor})\nDescription: ${s.description}\nCode: ${s.code}`).join("\n\n");

  let currentEcosystemGroup: string | null = null;

  return (
    <div className="w-full py-16 px-5 sm:px-10 lg:px-12 max-w-[1400px]">
      
      {/* ─────────────────── PART 1: THE SPRING ECOSYSTEM ─────────────────── */}
      <section id="core" className="w-full scroll-mt-6 mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#D4AF37]/20 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase tracking-widest">
              <span>VOLUME I · PART I</span>
              <span>—</span>
              <span>FRAMEWORK HIERARCHY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4F1EA] mt-1 tracking-tight">
              The Spring <span className="spring-gradient-text">Ecosystem</span>
            </h2>
          </div>
          <p className="text-xs text-[#A69E8F] max-w-md font-sans leading-relaxed">
            The complete module topology powering enterprise Java applications from core IoC container to cloud gateway routing.
          </p>
        </div>

        <div className="w-full rounded-2xl bg-[#14120B] border border-[#D4AF37]/30 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden font-mono text-xs">
          <div className="px-5 py-3.5 bg-[#1C1A12] border-b border-[#D4AF37]/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#E76F51]/80" />
              <div className="w-3 h-3 rounded-full bg-[#D4AF37]/80" />
              <div className="w-3 h-3 rounded-full bg-[#6DB33F]/80" />
              <span className="ml-3 text-[11px] text-[#A69E8F] font-mono flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
                spring-ecosystem-hierarchy.ascii
              </span>
            </div>

            <button
              onClick={() => handleCopy("ecosystem", ecosystemContent)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#14120B] border border-[#D4AF37]/20 text-[11px] text-[#A69E8F] hover:text-white hover:border-[#D4AF37]/60 transition-all cursor-pointer"
            >
              {copiedSection === "ecosystem" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#6DB33F]" />
                  <span className="text-[#6DB33F]">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy ASCII</span>
                </>
              )}
            </button>
          </div>

          <div className="p-6 overflow-x-auto selection:bg-[#D4AF37]/30">
            <pre className="font-mono text-xs sm:text-sm" style={{ lineHeight: "1.7em" }}>
              {(() => {
                // ROW: every single line in the tree uses this same wrapper.
                // Identical style on every row means the browser gives them all
                // the exact same height — so │ pipes connect perfectly.
                const makeRow = (
                  key: number,
                  children: React.ReactNode,
                  onClick?: () => void
                ) => (
                  <span
                    key={key}
                    style={{ display: "block", lineHeight: "inherit" }}
                    onClick={onClick}
                    className={onClick ? "cursor-pointer hover:bg-white/[0.02] transition-colors rounded" : undefined}
                  >
                    {children}
                  </span>
                );

                return ecosystemContent.split("\n").map((line, i) => {
                  // Title header
                  if (line.startsWith("[ THE SPRING ECOSYSTEM ]")) {
                    return makeRow(i, <span className="text-[#D4AF37] font-bold">{line}</span>);
                  }

                  // Group Header — clickable
                  if (line.includes("├── Spring ") || line.includes("└── Spring ")) {
                    const parts = line.split("──>");
                    const matchName = parts[0].replace(/^.*?(Spring\s+\w+)/, "$1").trim();
                    currentEcosystemGroup = matchName;
                    return makeRow(
                      i,
                      <>
                        <span className="text-[#6DB33F] font-bold">{parts[0]}</span>
                        {parts[1] && <span className="text-[#D4AF37] italic">──&gt;{parts[1]}</span>}
                      </>,
                      () => toggleEcosystemGroup(matchName)
                    );
                  }

                  // Child Line with parenthetical comment
                  if (line.includes("(")) {
                    if (currentEcosystemGroup && collapsedEcosystem[currentEcosystemGroup]) {
                      return null;
                    }
                    const ci = line.indexOf("(");
                    return makeRow(
                      i,
                      <>
                        <span className="text-[#F4F1EA]">{line.substring(0, ci)}</span>
                        <span className="text-[#A69E8F]/70 italic">{line.substring(ci)}</span>
                      </>
                    );
                  }

                  // Separator │ lines and everything else
                  return makeRow(i, <span className="text-[#A69E8F]">{line || " "}</span>);
                });
              })()}
            </pre>
          </div>

          <div className="px-5 py-2.5 bg-[#17150F] border-t border-[#D4AF37]/15 flex items-center justify-between text-[11px] text-[#A69E8F] font-mono">
            <span>Spring Framework 6.x & Spring Boot 3.3.x</span>
            <span className="text-[#D4AF37]">Part I</span>
          </div>
        </div>
      </section>

      {/* ─────────────────── PART 2: FOLDER STRUCTURE ─────────────────── */}
      <section id="folder-structure" className="w-full scroll-mt-6 mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#D4AF37]/20 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase tracking-widest">
              <span>VOLUME I · PART II</span>
              <span>—</span>
              <span>DIRECTORY ANATOMY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4F1EA] mt-1 tracking-tight">
              Folder <span className="gold-gradient-text">Structure Blueprint</span>
            </h2>
          </div>
          <p className="text-xs text-[#A69E8F] max-w-md font-sans leading-relaxed">
            Standard production layout for Maven & Spring Boot applications isolating source packages, static assets, configs, and build targets.
          </p>
        </div>

        <div className="w-full rounded-2xl bg-[#14120B] border border-[#D4AF37]/30 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden font-mono text-xs">
          <div className="px-5 py-3.5 bg-[#1C1A12] border-b border-[#D4AF37]/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#E76F51]/80" />
              <div className="w-3 h-3 rounded-full bg-[#D4AF37]/80" />
              <div className="w-3 h-3 rounded-full bg-[#6DB33F]/80" />
              <span className="ml-3 text-[11px] text-[#A69E8F] font-mono flex items-center gap-1.5">
                <FolderTree className="w-3.5 h-3.5 text-[#D4AF37]" />
                spring-boot-project-structure.tree
              </span>
            </div>

            <button
              onClick={() => handleCopy("folder", folderRawText)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#14120B] border border-[#D4AF37]/20 text-[11px] text-[#A69E8F] hover:text-white hover:border-[#D4AF37]/60 transition-all cursor-pointer"
            >
              {copiedSection === "folder" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#6DB33F]" />
                  <span className="text-[#6DB33F]">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Tree</span>
                </>
              )}
            </button>
          </div>

          <div className="p-6 overflow-x-auto text-[#F4F1EA] leading-relaxed selection:bg-[#D4AF37]/30">
            <pre className="font-mono text-xs sm:text-sm text-[#F4F1EA]">
              <code>
                {FOLDER_TREE_NODES.map((node, i) => {
                  // Check if any ancestor folder is collapsed
                  const isHidden = node.parents.some((p) => collapsedFolders[p]);
                  if (isHidden) return null;

                  const line = node.rawLine;
                  const isDirectory = Boolean(node.id);
                  const isFolderCollapsed = node.id ? collapsedFolders[node.id] : false;

                  if (line.includes("#")) {
                    const hashIndex = line.indexOf("#");
                    const rawPath = line.substring(0, hashIndex);
                    const rawComment = line.substring(hashIndex).trim();

                    // Folders end with / in the path part → gold; files → white
                    const isFolder = rawPath.trimEnd().endsWith("/");
                    const pathColor = isFolder ? "text-[#D4AF37] font-semibold" : "text-[#F4F1EA]";

                    return (
                      <div
                        key={i}
                        onClick={isDirectory && node.id ? () => toggleFolderNode(node.id!) : undefined}
                        className={`py-1 border-b border-[#D4AF37]/5 last:border-b-0 ${
                          isDirectory ? "cursor-pointer hover:bg-white/[0.02] transition-colors rounded px-1 -mx-1" : ""
                        }`}
                      >
                        <div className="hidden md:flex md:items-baseline md:justify-between gap-6">
                          <span className={`${pathColor} whitespace-pre shrink-0`}>
                            {rawPath.trimEnd()}
                          </span>
                          <span className="text-[#A69E8F]/75 italic text-right whitespace-normal shrink text-[11px]">
                            {rawComment}
                          </span>
                        </div>

                        <div className="md:hidden space-y-0.5">
                          <div className={`${pathColor} whitespace-pre font-mono text-xs`}>
                            {rawPath.trimEnd()}
                          </div>
                          <div className="pl-4 text-[10px] text-[#A69E8F]/80 italic flex items-start gap-1 font-mono">
                            <span className="text-[#D4AF37] font-normal shrink-0">↳</span>
                            <span>{rawComment}</span>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  // No-comment lines are always folders (they end with /)
                  return (
                    <div
                      key={i}
                      onClick={isDirectory && node.id ? () => toggleFolderNode(node.id!) : undefined}
                      className={`py-1 text-[#D4AF37] font-semibold whitespace-pre ${
                        isDirectory ? "cursor-pointer hover:bg-white/[0.02] transition-colors rounded px-1 -mx-1" : ""
                      }`}
                    >
                      {line}
                    </div>
                  );
                })}
              </code>
            </pre>
          </div>

          <div className="px-5 py-2.5 bg-[#17150F] border-t border-[#D4AF37]/15 flex items-center justify-between text-[11px] text-[#A69E8F] font-mono">
            <span>Maven & Gradle Packaging Standards</span>
            <span className="text-[#D4AF37]">Part II</span>
          </div>
        </div>
      </section>

      {/* ─────────────────── PART 3: SPRING MVC MECHANICS ─────────────────── */}
      <section id="mvc" className="w-full scroll-mt-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#D4AF37]/20 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#E76F51] uppercase tracking-widest">
              <span>VOLUME I · PART III</span>
              <span>—</span>
              <span>REQUEST LIFECYCLE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4F1EA] mt-1 tracking-tight">
              Spring Web MVC <span className="java-gradient-text">Mechanics</span>
            </h2>
          </div>
          <p className="text-xs text-[#A69E8F] max-w-md font-sans leading-relaxed">
            Internal request dispatching via DispatcherServlet, HandlerMapping, and Jackson HttpMessageConverters.
          </p>
        </div>

        {/* Visual Architectural Sequence Canvas */}
        <div className="w-full rounded-2xl bg-[#14120B] border border-[#D4AF37]/30 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden font-sans text-xs mb-10">
          
          {/* Header Bar */}
          <div className="px-5 py-3.5 bg-[#1C1A12] border-b border-[#D4AF37]/20 flex items-center justify-between font-mono">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#E76F51]/80" />
              <div className="w-3 h-3 rounded-full bg-[#D4AF37]/80" />
              <div className="w-3 h-3 rounded-full bg-[#6DB33F]/80" />
              <span className="ml-3 text-[11px] text-[#A69E8F] flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#E76F51]" />
                spring-mvc-request-lifecycle.flow
              </span>
            </div>

            <button
              onClick={() => handleCopy("mvc", mvcTextContent)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#14120B] border border-[#D4AF37]/20 text-[11px] text-[#A69E8F] hover:text-white hover:border-[#D4AF37]/60 transition-all cursor-pointer"
            >
              {copiedSection === "mvc" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#6DB33F]" />
                  <span className="text-[#6DB33F]">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Flow Spec</span>
                </>
              )}
            </button>
          </div>

          {/* Interactive Steps Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {MVC_STEPS.map((s, idx) => (
                <div
                  key={s.step}
                  onClick={() => setActiveStep(idx)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between relative group ${
                    activeStep === idx
                      ? "bg-[#1C1A12] border-[#D4AF37] shadow-[0_4px_20px_rgba(212,175,55,0.15)]"
                      : "bg-[#14120B] border-[#D4AF37]/15 hover:border-[#D4AF37]/40 hover:bg-[#1C1A12]/50"
                  }`}
                >
                  {/* Step Top */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold" style={{ color: s.accent }}>
                        STEP {s.step}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded font-mono border border-[#D4AF37]/20 bg-[#14120B] text-[#A69E8F]">
                        {s.actor}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-[#F4F1EA] mb-1 group-hover:text-[#D4AF37] transition-colors">
                      {s.title}
                    </h4>
                    
                    <p className="text-[11px] text-[#A69E8F] leading-relaxed mb-3 font-sans">
                      {s.description}
                    </p>
                  </div>

                  {/* Code Badge */}
                  <div className="p-2.5 rounded-lg bg-[#14120B] border border-[#D4AF37]/10 font-mono text-[10px] text-[#F4F1EA]/90 overflow-x-auto">
                    <code>{s.badge}</code>
                  </div>

                  {/* Flow Arrow Indicator for desktop */}
                  {idx < MVC_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                      <div className="w-6 h-6 rounded-full bg-[#14120B] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Selected Step Code Specification Inspector */}
            <div className="mt-6 p-4 rounded-xl bg-[#1C1A12] border border-[#D4AF37]/25 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#D4AF37]/15 text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="text-[#D4AF37] font-bold">
                    INSPECTOR · STEP {MVC_STEPS[activeStep].step}
                  </span>
                  <span className="text-[#A69E8F]">—</span>
                  <span className="text-[#F4F1EA] font-semibold">
                    {MVC_STEPS[activeStep].title} ({MVC_STEPS[activeStep].actor})
                  </span>
                </div>
                <span className="text-[10px] text-[#6E675B]">Click any step above to inspect</span>
              </div>
              <pre className="text-[#F4F1EA] overflow-x-auto leading-relaxed text-[11px] sm:text-xs">
                <code>{MVC_STEPS[activeStep].code}</code>
              </pre>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="px-5 py-2.5 bg-[#17150F] border-t border-[#D4AF37]/15 flex items-center justify-between text-[11px] text-[#A69E8F] font-mono">
            <span>DispatcherServlet & Jackson HttpMessageConverters</span>
            <span className="text-[#E76F51]">Part III</span>
          </div>
        </div>

        {/* 3 Pillars Deep Dive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#1C1A12] border border-[#D4AF37]/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase">PILLAR I</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#14120B] border border-[#D4AF37]/30 text-[#D4AF37] font-mono">Model (M)</span>
              </div>
              <h3 className="text-lg font-bold text-[#F4F1EA] mb-2">Data & State Representation</h3>
              <p className="text-xs text-[#A69E8F] leading-relaxed mb-4">
                Holds application state, database entities (<code className="text-[#D4AF37] font-mono">@Entity</code>), and immutable Data Transfer Objects (<code className="text-[#D4AF37] font-mono">Java Records</code>).
              </p>
            </div>
            <div className="p-3 rounded-xl bg-[#14120B] border border-[#D4AF37]/15 font-mono text-[11px] text-[#F4F1EA]">
              <span className="text-[#E76F51]">public record</span> ProductDTO(<br />
              &nbsp;&nbsp;Long id, String name, BigDecimal price<br />
              ) {}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#1C1A12] border border-[#D4AF37]/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-[#6DB33F] tracking-widest uppercase">PILLAR II</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#14120B] border border-[#6DB33F]/30 text-[#6DB33F] font-mono">View (V)</span>
              </div>
              <h3 className="text-lg font-bold text-[#F4F1EA] mb-2">Presentation Serialization</h3>
              <p className="text-xs text-[#A69E8F] leading-relaxed mb-4">
                Renders Model for consumer. In REST APIs, Spring uses <code className="text-[#6DB33F] font-mono">Jackson2HttpMessageConverter</code> to convert objects to JSON.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-[#14120B] border border-[#6DB33F]/15 font-mono text-[11px] text-[#6DB33F]">
              &#123;<br />
              &nbsp;&nbsp;&quot;id&quot;: 42,<br />
              &nbsp;&nbsp;&quot;name&quot;: &quot;Spring Boot Guide&quot;<br />
              &#125;
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#1C1A12] border border-[#D4AF37]/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-[#E76F51] tracking-widest uppercase">PILLAR III</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#14120B] border border-[#E76F51]/30 text-[#E76F51] font-mono">Controller (C)</span>
              </div>
              <h3 className="text-lg font-bold text-[#F4F1EA] mb-2">Routing & Orchestration</h3>
              <p className="text-xs text-[#A69E8F] leading-relaxed mb-4">
                Intercepts HTTP requests via <code className="text-[#E76F51] font-mono">@RestController</code>, validates payloads with <code className="text-[#E76F51] font-mono">@Valid</code>, & delegates to Service layer.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-[#14120B] border border-[#E76F51]/15 font-mono text-[11px] text-[#F4F1EA]">
              <span className="text-[#E76F51]">@GetMapping</span>(<span className="text-[#6DB33F]">&quot;/products/&#123;id&#125;&quot;</span>)<br />
              <span className="text-[#D4AF37]">public</span> ProductDTO getProduct(...)
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
