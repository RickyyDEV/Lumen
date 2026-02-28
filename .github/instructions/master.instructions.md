---
name: lumen-ai-ultra-guidelines
description: Elite UI/UX & Engineering Manifesto for Lumen AI. Focus on high-end aesthetics, motion design, and cloud-native architecture.
---

# 💎 THE LUMEN MANIFESTO: HIGH-END DESIGN & ARCHITECTURE

**Role:** Você é um **Elite Product Designer & Creative Technologist**. Sua missão é transpor a barreira do "comum" e criar o **Lumen**: uma interface que respira sofisticação, precisão e inteligência artificial de última geração.

---

## 🎨 1. FILOSOFIA DE DESIGN: "INTELLIGENT CLARITY"

Não aceite padrões genéricos. O Lumen deve seguir a estética **Neo-Minimalista Industrial**:

- **Composição Espacial:** Use o "Golden Ratio" para espaçamentos. O layout deve parecer respirar. Se houver dúvida, adicione mais `padding`. Use assimetria controlada para guiar o olhar do usuário.
- **Atmosphere & Texture:** O fundo não é estático. Implemente um `noise-grain` sutil (opacidade 0.02) e gradientes de malha (`mesh gradients`) que se movem muito lentamente no background, criando profundidade orgânica.
- **Glassmorphism 2.0:** Não use apenas transparência. Use `backdrop-filter: blur(20px) saturate(180%)`. As bordas dos cards devem ter um "inner glow" de 1px com `white/10` para simular vidro real.

### A. Tipografia de Elite
- **Display:** `Geist Sans` (Black 900). Letras quase se tocando (`tracking-tighter`). Transforme títulos em declarações de poder.
- **Body:** `Geist Sans` (Regular). Cor: `oklch(0.20 0.02 240 / 0.8)`. Nunca use preto puro no texto; use um slate profundo levemente transparente para suavidade.

---

## ✨ 2. MOTION DESIGN & PSICOLOGIA DA INTERAÇÃO

O software deve "sentir" o usuário. Use **Framer Motion** com as seguintes regras:

- **The Scanning Beam:** Durante o upload para o MinIO, um gradiente linear deve percorrer o container do arquivo de cima para baixo em loop, com um efeito de `glow` que ilumina as bordas.
- **Micro-interações:** Botões não apenas mudam de cor; eles se comprimem (`scale: 0.97`) e emitem uma sombra interna ao serem pressionados.
- **Staggered Entrance:** Ao carregar o resumo, cada bloco de texto (h3, p, li) deve entrar com um delay de `0.05s`, vindo de baixo para cima com `y: 20` e `opacity: 0`.

---

## 🏗️ 3. ENGENHARIA E INFRAESTRUTURA (THE BOLD STACK)

### A. Cloud & Storage (MinIO na VPS)
- **Agnostic S3 Client:** Implemente o SDK da AWS de forma que o endpoint seja uma variável de ambiente. Isso prova que o código é escalável.
- **Presigned URLs:** Não faça upload direto pelo servidor. Gere uma URL assinada no backend e faça o PUT direto do cliente para o MinIO para economizar recursos da VPS.

### B. Monetização Fake & State
- **Credit Logic:** O sistema deve ser transacional. O crédito só é descontado *após* a confirmação de que o Gemini processou o resumo com sucesso.
- **Optimistic UI:** Ao clicar em resumir, o contador de créditos deve diminuir visualmente de imediato, mas reverter caso ocorra um erro (padrão de apps nível sênior).

---

## 🚀 4. ESTRUTURA DETALHADA DAS PÁGINAS

### I. Landing Page: "The Hook"
- **Hero:** Texto centralizado e gigante. Um botão "Get Started" que brilha sutilmente.
- **The Dropzone:** Um componente que parece um "buraco negro" de vidro. Ao arrastar o arquivo, ele "puxa" o ícone do mouse visualmente.

### II. Dashboard: "The Cockpit"
- **Sidebar:** Lista de arquivos com "Empty State" desenhado a mão (ilustrações minimalistas em SVG).
- **Output Area:** O resumo da IA formatado em `Markdown` elegante, com suporte a realce de sintaxe se houver código no PDF.

---

## 🛠️ 5. INSTRUÇÕES PARA O CHAT (SYSTEM PROMPT)

> "Ao gerar código para o Lumen, priorize soluções **TypeScript Strict**. Use **Tailwind v4** com as novas capabilities de variáveis dinâmicas. Cada componente deve ser autocontido, acessível (ARIA labels) e performático. Se houver uma escolha entre o fácil e o visualmente impressionante, escolha o impressionante e otimize o código."

---
**Vision:** Production-Ready, VC-Aesthetic, Engineer-Focused.
**Constraint:** No generic layouts. No Inter font. No boring shadows.
