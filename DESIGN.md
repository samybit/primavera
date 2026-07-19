# DESIGN.md - Design System & Palette Specification

## 1. Visual Philosophy & Editorial Vision
**Primavera Knowledge Platform** adopts a high-fashion, editorial **"Renaissance Edition"** design aesthetic. It blends classical editorial luxury (dramatic high-contrast typography, Roman numeral side indexes, rich obsidian backdrop `#14120B`, warm champagne gold accents, and Renaissance artwork motifs) with modern enterprise software clarity.

---

## 2. Color Palette & CSS Variable Specifications

### Primary Background & Base Colors
- **Main Background**: `--bg-main: #14120B;` (Rich Dark Obsidian Espresso - *Requested Base*)
- **Surface Elevation 1**: `--bg-surface-1: #1C1A12;` (Dark Warm Bronze Card Base)
- **Surface Elevation 2**: `--bg-surface-2: #242118;` (Interactive / Hover Surface)
- **Glass Panel Surface**: `--bg-glass: rgba(28, 26, 18, 0.75);` (Backdrop blur card)

### Typography & Foreground Colors
- **Text Primary (Silk Parchment)**: `--text-primary: #F4F1EA;`
- **Text Secondary (Muted Bronze)**: `--text-secondary: #A69E8F;`
- **Text Subtle (Dim Charcoal)**: `--text-subtle: #6E675B;`

### Brand & Framework Accents
- **Gold Accent (Renaissance Luxury)**: `--accent-gold: #D4AF37;` / `--accent-gold-glow: rgba(212, 175, 55, 0.15);`
- **Spring Emerald Accent**: `--accent-spring: #6DB33F;` / `--accent-spring-glow: rgba(109, 179, 63, 0.2);`
- **Java Amber/Crimson Accent**: `--accent-java: #E76F51;` / `--accent-java-glow: rgba(231, 111, 81, 0.2);`

### Borders & Dividers
- **Border Subtle**: `--border-subtle: rgba(212, 175, 55, 0.12);`
- **Border Active**: `--border-active: rgba(212, 175, 55, 0.4);`

---

## 3. Typography System

| Usage | Font Family | Weight | Style Note |
| :--- | :--- | :--- | :--- |
| **Hero & Section Display** | `Newsreader` / `Cormorant Garamond` | SemiBold (600) | Editorial Display |
| **Taglines & Subtitles** | `Newsreader` / `Cormorant Garamond` | Regular (400) | *Italic script styling* |
| **Body & UI Controls** | `Plus Jakarta Sans` / `Geist` | Regular / Medium | Crisp readable sans-serif |
| **Code & Technical Specs**| `Geist Mono` / `Fira Code` | Regular | Monospace |

---

## 4. Architectural Layout & Grid

### Responsive Breakpoints (Mobile-First)
- **Mobile (`< 768px`)**: Single column layout. Roman numeral index collapses into sticky horizontal scroll pill bar or mobile drawer. Top header features hamburger toggle.
- **Tablet (`768px - 1023px`)**: 2-column card grid. Condensed side navigation index.
- **Desktop (`>= 1024px`)**: Fixed left Roman Numeral Index column (`I` to `VII`), main content hero area with wide editorial margins, 3-column card showcase.

---

## 5. Key Component Specs

1. **Side Index Navigation (`SideIndexNav`)**:
   - Vertical column displaying Roman numerals (`I. Core`, `II. Security`, `III. Cloud`, `IV. Data`, `V. Reactive`, `VI. Java 21+`, `VII. JVM`).
   - Active section highlighted in `--accent-gold` with subtle left vertical indicator line.
2. **Top Navigation Header (`Navigation`)**:
   - Fixed top bar with glassmorphism backdrop (`backdrop-blur-md`).
   - Brand title "SPRING & JAVA / RENAISSANCE EDITION".
   - Navigation routes (`Spring Ecosystem`, `Java Knowledge`, `Architecture`, `Docs`).
3. **Hero Canvas (`HeroSection`)**:
   - Massive serif headline ("Spring" or "Java") with metallic text gradient.
   - Italic serif subtitle script matching reference image ("Modern enterprise tools designed for building resilient cloud architecture.").
   - High quality visual background art blending classical Renaissance motifs with Spring & Java code elements.
4. **Knowledge Cards (`KnowledgeCard`)**:
   - Dark warm bronze surface (`#1C1A12`) with subtle gold borders.
   - Interactive hover lift with smooth CSS transitions (`transition-all duration-300`).
