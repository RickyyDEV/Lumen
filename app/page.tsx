"use client";


import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LumenLogo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { LogIn, Package, Sparkles, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

function LumenHeader() {
    const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(66vw,900px)]">
      <nav
        className={cn(
          "flex items-center justify-between px-5 py-2.5 rounded-2xl border transition-all duration-500",
          "backdrop-blur-xl bg-background/40 border-border/40 shadow-[0_4px_30px_rgba(0,0,0,0.06)]",
          scrolled && "bg-background/60 shadow-[0_8px_40px_rgba(0,0,0,0.1)] border-border/60"
        )}
      >
        <LumenLogo size="sm" />

        <div className="flex items-center gap-2">
          <Link href={"/signin"}>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground gap-1.5 rounded-xl text-xs font-medium"
          >
            <LogIn className="size-5!" />
            Entrar
          </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}


function MeshBackground() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 w-full h-full overflow-hidden pointer-events-none">
      <svg className="absolute w-full h-full" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="mesh1" cx="50%" cy="50%" r="80%" fx="60%" fy="40%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="mesh2" cx="50%" cy="50%" r="60%" fx="30%" fy="70%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <ellipse cx="900" cy="400" rx="600" ry="340" fill="url(#mesh1)">
          <animate attributeName="cx" values="900;1000;900" dur="12s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="400" cy="700" rx="400" ry="200" fill="url(#mesh2)">
          <animate attributeName="cy" values="700;600;700" dur="10s" repeatCount="indefinite" />
        </ellipse>
      </svg>
      {/* Partículas animadas */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full blur-[2px] animate-float"
            style={{
              background: `linear-gradient(135deg, var(--primary) 60%, var(--accent) 100%)`,
              opacity: 0.18,
              width: `${16 + (i % 4) * 8}px`,
              height: `${16 + (i % 4) * 8}px`,
              left: `${(i * 77) % 100}%`,
              top: `${(i * 53) % 100}%`,
              animationDelay: `${i * 0.7}s`,
            }}
          />
        ))}
      </div>
      {/* Overlay de noise (adicione /public/noise.png real para efeito máximo) */}
      <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)' }} />
    </div>
  );
}

function GlassDropzone({ onFile }: { onFile: (file: File) => void }) {
  const [dragActive, setDragActive] = useState(false);
  return (
    <motion.label
      htmlFor="file-upload"
      initial={{ scale: 0.98, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, delay: 0.2 }}
      className={
        `relative flex flex-col items-center justify-center w-full max-w-xl min-h-55 px-10 py-14 rounded-3xl cursor-pointer ` +
        `bg-card/70 border-2 border-dashed border-primary/40 shadow-2xl backdrop-blur-2xl ` +
        `transition-all duration-300 ` +
        (dragActive ? 'ring-4 ring-primary/40 scale-105' : '')
      }
      style={{ boxShadow: '0 8px 40px 0 oklch(0.45 0.18 260 / 0.10), 0 1.5px 0 0 oklch(1 0 0 / 0.10) inset' }}
      onDragOver={e => { e.preventDefault(); setDragActive(true); }}
      onDragLeave={e => { e.preventDefault(); setDragActive(false); }}
      onDrop={e => {
        e.preventDefault();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          onFile(e.dataTransfer.files[0]);
        }
      }}
    >
      <input
        id="file-upload"
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={e => {
          if (e.target.files && e.target.files[0]) onFile(e.target.files[0]);
        }}
      />
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col items-center gap-3"
      >
        <span className="w-20 h-20 rounded-full bg-linear-to-br from-[oklch(0.85_0.18_90)] to-[oklch(0.75_0.15_60)] shadow-inner flex items-center justify-center mb-2 animate-pulse-slow">
          <Package color="white" size={40} strokeWidth="1.5px"></Package>
        </span>
        <span className="text-xl font-semibold text-primary/90 tracking-tight">Arraste seu PDF aqui</span>
        <span className="text-base text-muted-foreground">ou clique para selecionar</span>
      </motion.div>
      {/* Scanning beam effect */}
      <AnimatePresence>
        {dragActive && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute inset-x-0 top-0 h-1/4 bg-linear-to-b from-primary/30 to-transparent animate-beam-glow" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.label>
  );
}


export default function Home() {
  const [summary, setSummary] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  function handleFile(file: File) {
    setUploading(true);
    setFileName(file.name);
    // Simulação de processamento
    setTimeout(() => {
      setSummary(
        'Resumo gerado: Este é um exemplo de como o Lumen transforma contratos complexos em insights claros e objetivos. Cláusulas críticas são destacadas automaticamente para sua análise.'
      );
      setUploading(false);
    }, 1800);
  }

  // Layout sem scroll: tudo visível na viewport
  return (
    <div className="relative min-h-screen h-screen flex flex-col bg-background font-body animate-fade-in bg-[url(/noise.png)] overflow-hidden">
      <MeshBackground />
      <LumenHeader />

      <div className="h-24" />
      <main className="flex-1 flex flex-col items-center justify-center w-full px-4">
                    <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">
            <Sparkles className="size-3.5 text-[hsl(var(--lumen-accent))]" />
            Resuma PDFs com inteligência artificial
          </span>
        </motion.div>
        </div>
        <section className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8 py-8 relative shrink-0 grow-0" style={{ maxHeight: '60vh' }}>
          <motion.h1
            initial={{ opacity: 0, y: 60, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.8, type: 'spring' }}
            className="text-4xl md:text-6xl font-black tracking-tighter text-primary font-display text-center mb-2 drop-shadow-[0_4px_32px_oklch(0.45_0.18_260/0.10)]"
            style={{ lineHeight: 1.1 }}
          >
            <span
              className="bg-linear-to-br from-primary via-yellow-550 to-yellow-500 bg-clip-text text-transparent animate-gradient-x drop-shadow-[0_2px_12px_oklch(0.80_0.18_90/0.18)]"
              style={{
                WebkitTextStroke: '1.5px oklch(0.98 0.01 60)',
                textShadow: '0 2px 16px oklch(0.80 0.18 90 / 0.18), 0 1px 0 oklch(1 0 0 / 0.10)'
              }}
            >
              De páginas a insights<br /> num clique
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7, type: 'spring' }}
            className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl mb-1 font-light"
            style={{ lineHeight: 1.3 }}
          >
            Envie qualquer PDF e receba um resumo inteligente em segundos. Tecnologia que ilumina, simplifica e economiza seu tempo.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.7, type: 'spring' }}
            className="w-full flex flex-col items-center"
          >
            <GlassDropzone onFile={handleFile} />
            {fileName && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-2 mt-2"
              >
                <span className="text-base text-muted-foreground">Arquivo: <span className="font-semibold text-primary">{fileName}</span></span>
                {uploading && <span className="text-primary animate-pulse">Processando...</span>}
              </motion.div>
            )}
            <AnimatePresence>
              {summary && !uploading && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ delay: 0.1, duration: 0.7, type: 'spring' }}
                  className="w-full max-w-2xl bg-card/80 rounded-3xl p-6 mt-6 shadow-2xl backdrop-blur-2xl border border-border/20 animate-fade-in"
                  style={{ fontSize: '1rem' }}
                >
                  <h3 className="text-xl font-black text-primary mb-2 tracking-tight">Resumo Gerado</h3>
                  <p className="text-base text-muted-foreground mb-2 leading-relaxed">{summary}</p>
                  <button
                    className="mt-2 py-2 px-6 rounded-xl bg-linear-to-r from-[oklch(0.85_0.18_90)] via-[oklch(0.75_0.15_60)] to-[oklch(0.98_0.01_60)] text-[oklch(0.20_0.05_60)] font-bold text-base shadow-xl border border-[oklch(0.80_0.18_90/0.18)] hover:scale-105 hover:shadow-2xl active:scale-97 active:shadow-inner transition-all"
                    style={{
                      filter: 'drop-shadow(0 2px 8px oklch(0.80 0.18 90 / 0.12))',
                      backgroundBlendMode: 'lighten'
                    }}
                    onClick={() => navigator.clipboard.writeText(summary)}
                  >
                    Copiar Resumo
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>
      </main>
      <footer className="w-full flex flex-col items-center gap-2 py-4 text-muted-foreground text-sm backdrop-blur-xl border-t border-border/20 animate-fade-in shrink-0 grow-0 bg-transparent">
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl gap-4 px-4">
          <div className="flex items-center gap-2 select-none">
            <LumenLogo variant="full" size="sm"/>
          </div>
          <nav className="flex gap-6 text-base">
            <a href="#sobre" className="hover:text-primary transition">Sobre</a>
            <a href="#diferenciais" className="hover:text-primary transition">Diferenciais</a>
            <a href="#cta" className="hover:text-primary transition">Comece agora</a>
            <a href="https://github.com/RickyyDEV" target="_blank" rel="noopener" className="hover:text-primary transition">GitHub</a>
          </nav>
          <div className="flex flex-col md:items-end text-xs text-muted-foreground/80">
            <span className="text-center mx-auto">Lumen © {new Date().getFullYear()}</span>
            <span>Desenvolvido por <a href="https://github.com/RickyyDEV" target="_blank" rel="noopener" className="text-primary font-semibold hover:underline">Ricardo Marinho</a></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
