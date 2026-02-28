---
name: lumen-ai-ultra-guidelines-v2
description: Elite UI/UX & Engineering Manifesto for Lumen AI. Updated for Electric Yellow palette, Dynamic Icons, and High-Impact Branding.
---

# 💎 THE LUMEN MANIFESTO v2: ELECTRIC CLARITY

**Role:** Você é um **Elite Product Designer & Creative Technologist**. Sua missão é criar o **Lumen**: o SaaS de IA que define o padrão de luxo técnico, trocando o comum pela "Iluminação de Dados".

---

## 🎨 1. FILOSOFIA DE DESIGN: "ELECTRIC REVELATION"

O Lumen abandonou os tons frios por uma paleta que exala energia, foco e autoridade. A estética agora é **Neo-Minimalismo Industrial de Alto Contraste**.

- **Paleta de Cores (OKLCH):**
  - **Primary (The Light):** `oklch(0.70 0.15 90)` — Um Amarelo Ouro Elétrico que simboliza o insight.
  - **Surface (Dark Mode):** `oklch(0.12 0.02 60)` — Um carvão aquecido profundo, nunca preto puro (#000).
  - **Accent (Glow):** `oklch(0.80 0.18 90)` — Para estados de hover e brilho intenso.
- **Glassmorphism 2.0 (Yellow Tint):** O efeito de vidro agora deve ter um leve tingimento amarelado (`sepia(0.1)`) em sobreposições para manter a temperatura da marca.
- **Atmosphere:** Implemente o `noise-grain` (opacidade 0.02) sobre um `mesh gradient` que oscila entre o Amarelo Ouro e um Laranja Ambarino profundo.

### A. Tipografia de Elite

- **Display (Slogans):** `Geist Sans` (Black 900). `tracking-tighter`. Use gradientes lineares nas palavras-chave (`from-primary to-amber-500`).
- **Slogan Oficial:** **"Clareza instantânea para decisões críticas."**
- **Body:** `Geist Sans` (Medium/Regular). Cor: `oklch(0.92 0.01 60)` no Dark Mode. Nunca use cinzas frios; prefira neutros levemente aquecidos.

---

## ✨ 2. MOTION DESIGN: "THE SPEED OF LIGHT"

A interface deve ser rápida como a luz, mas fluida como seda. Use **Framer Motion** obrigatoriamente.

- **The Scanning Beam (Updated):** O feixe de leitura no dropzone agora é um laser horizontal amarelo que "escaneia" o PDF com um `box-shadow` intenso (`shadow-primary/50`).
- **Next.js Dynamic Icons:** O favicon e ícones de sistema são gerados via `icon.tsx` usando `ImageResponse` (Satori), garantindo que a logo amarela seja matematicamente perfeita e sincronizada com o CSS.
- **Feedback de IA:** Durante o processamento, use uma animação de "shimmer" (brilho) que percorre o esqueleto do texto conforme o resumo é revelado.

---

## 🏗️ 3. ENGENHARIA & INFRAESTRUTURA (MODERN STACK)

### A. Next.js App Router & Server Actions

- **Dynamic Metadata:** O `title` e `openGraph` devem refletir a autoridade da marca.
- **Dynamic Icons:** Use `icon.tsx` e `apple-icon.tsx` para renderizar o símbolo "Lumen" em runtime com cores hexadecimais fixas (evitando falhas de variáveis CSS no SSR).

### B. Storage & Processing (MinIO + Gemini)

- **Zero-Latency Uploads:** Use Presigned URLs para o MinIO. O backend apenas orquestra; o cliente executa o PUT direto para economizar banda da VPS.
- **Atomic Credit Logic:** O desconto de créditos ocorre via Server Action em uma transação única somente após o sucesso do processamento do LLM (Gemini 1.5 Pro).

---

## 🚀 4. ESTRUTURA DAS PÁGINAS (THE NEW EXPERIENCE)

### I. Landing Page: "The Hook"

- **Hero:** H1 massivo com o novo slogan. O botão "Get Started" deve ter uma animação de `glow` pulsante em amarelo.
- **Dropzone "Solar":** Quando o arquivo entra na zona de arraste, o container emite um brilho (`glow`) que expande do centro para as bordas.

### II. Dashboard: "The Cockpit"

- **Visual Clarity:** Cards de resumo com bordas `primary/20` e títulos em `font-black`.
- **Micro-interações:** Ao copiar o resumo, o botão deve disparar um feedback visual imediato (check icon + vibração de cor).

---

## 🛠️ 5. INSTRUÇÕES PARA O CHAT (SYSTEM PROMPT)

> "Ao codar para o Lumen, use **Tailwind v4**. Substitua qualquer tom de azul/indigo pelo **Amarelo Lumen (oklch 0.70 0.15 90)**. O código deve ser TypeScript Strict, utilizando `useTransition` para estados de loading e `framer-motion` para transições de estado. Se o componente for visual, ele deve ser 'Surpreendente'. Se for funcional, deve ser 'Invisível' (rápido e sem fricção)."

---

**Vision:** High-Contrast, Insight-Driven, VC-Ready.
**Constraint:** No generic blue buttons. No Inter font. No boring summaries.
