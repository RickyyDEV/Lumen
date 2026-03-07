# 🌟 Lumen

**Lumen** é um aplicativo web, alimentado por IA, para sumarização de documentos, construído com Next.js, Tailwind CSS e Prisma.  
Projetado para clareza e velocidade, converte PDFs extensos em insights acionáveis com uma interface mínima e segurança de nível empresarial.

---

## 🚀 Funcionalidades

- **Autenticação via Google OAuth**: login seguro sem necessidade de senha.
- **Histórico de PDFs**: visualização e acesso rápido aos resumos gerados.
- **Visualização de PDF** (placeholder) integrada ao dashboard.
- **Painel de resumo inteligente** com opções de copiar e exportar o texto.
- **Barra lateral responsiva e colapsável** com animações suaves e estado skeleton durante o carregamento.
- **Página de login estilosa** com animações e versão simplificada alternativa.

---

## 🧱 Pilha Tecnológica

Este projeto utiliza um conjunto moderno de ferramentas para garantir produtividade, performance e qualidade de código:

- **Next.js (App Router)** – framework React focado em SSR/SSG e rotas simplificadas. O App Router permite misturar componentes de servidor e cliente com facilidade.
- **TypeScript** – linguagem superset de JavaScript que adiciona tipagem estática, evitando muitos erros em tempo de desenvolvimento e melhorando a autocompletação.
- **Tailwind CSS** – utilitários de CSS em escala, usados em conjunto com classes dinâmicas (via `cn` de `clsx`).
- **shadcn/ui** – conjunto de componentes acessíveis e estilizados com Tailwind; fornece base para botões, modais, sidebar, etc.
- **Framer Motion** – biblioteca para animações fluidas e declarativas em React, usada na página de login e transições do layout.
- **Lucide‑React** – ícones SVG leves, usados por toda a interface para consistência visual.
- **Better Auth (`authClient`)** – wrapper para autenticação com Google, gerencia sessão via cookies e hooks React.
- **Prisma** – ORM para PostgreSQL (ou outro banco), tipado automaticamente a partir do esquema; facilitou a configuração do histórico de PDFs.
- **React Hooks e Context** – padrões de estado local personalizáveis (ex.: `useSidebar` para sidebar colapsável).
- **Vite / Bun (em scripts)** – utilizado nos scripts de desenvolvimento para velocidade.

Essas tecnologias foram escolhidas para oferecer escalabilidade e uma experiência de desenvolvedor moderna.

---

## 🛠️ Como começar

1. Clone o repositório e instale dependências:
   ```bash
   git clone https://github.com/RickyyDEV/Lumen
   cd Lumen
   npm install         # ou yarn / bun
   ```
2. Copie as variáveis de ambiente e configure sua URL de autenticação:
   ```bash
   cp .env.example .env
   # preencha NEXT_PUBLIC_BETTER_AUTH_URL e outros
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

Para preparar o banco de dados e inspecionar dados use o Prisma:
```bash
npx prisma migrate dev --name init
npx prisma studio
```

---

## 📁 Estrutura do projeto

```
/app
  /dashboard        # páginas e componentes do dashboard
  /sign-in          # telas de login
  /(auth)           # cliente de autenticação, Prisma, rotas de API
/components        # componentes UI e utilitários
/hooks             # hooks React personalizados
/lib               # funções utilitárias
/prisma            # configuração e esquema do banco de dados
/public            # ativos estáticos
```

---

## 💡 Dicas e próximos passos

- Implementar envio e pré‑visualização reais de PDFs.
- Conectar APIs de modelo para gerar resumos automaticamente.
- Ampliar configurações, perfis de usuário e recursos de compartilhamento.
- Adicionar preferências para ativar/desativar animações.

---

Seja para documentação interna, pesquisa acadêmica ou conhecimento empresarial, este repositório oferece uma base sólida.  
Sinta-se à vontade para dar fork, modificar e inspirar ✨

---
