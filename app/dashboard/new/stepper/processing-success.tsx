"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Sparkles,
  FileText,
  ArrowRight,
  Plus,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
import { useStepper } from ".";
import { useFormContext } from "react-hook-form";

function ConfettiParticle({
  delay,
  x,
  color,
}: {
  delay: number;
  x: number;
  color: string;
}) {
  return (
    <motion.div
      className="absolute top-0 w-2 h-2 rounded-full"
      style={{ left: `${x}%`, backgroundColor: color }}
      initial={{ y: -20, opacity: 1, scale: 1, rotate: 0 }}
      animate={{
        y: [0, 300, 500],
        opacity: [1, 1, 0],
        scale: [1, 0.8, 0.4],
        rotate: [0, 180, 360],
        x: [0, (Math.random() - 0.5) * 120],
      }}
      transition={{
        duration: 2.5,
        delay,
        ease: "easeOut",
      }}
    />
  );
}

function FloatingRing({
  size,
  delay,
  duration,
}: {
  size: number;
  delay: number;
  duration: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full border-2 border-primary/10"
      style={{ width: size, height: size }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: [0, 1.2, 1], opacity: [0, 0.4, 0] }}
      transition={{ duration, delay, repeat: Infinity, repeatDelay: 1.5 }}
    />
  );
}

const confettiColors = [
  "hsl(var(--lumen-accent))",
  "hsl(var(--lumen-glow))",
  "hsl(38, 95%, 70%)",
  "hsl(24, 100%, 65%)",
  "hsl(45, 90%, 60%)",
  "hsl(15, 85%, 55%)",
];

export default function ProcessingSuccess({ pdfId }: { pdfId: string }) {
  const method = useFormContext();
  const fileInfo = method.getValues("file") as File;
  const { reset } = useStepper();

  const handleViewSummary = () => {
    redirect("/dashboard/summaries/" + pdfId);
  };

  const handleNewSummary = () => {
    reset();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative h-0 overflow-visible pointer-events-none">
        <div className="absolute left-1/2 -translate-x-1/2 -top-4 w-80 h-125">
          {Array.from({ length: 24 }).map((_, i) => (
            <ConfettiParticle
              key={i}
              delay={i * 0.06}
              x={10 + Math.random() * 80}
              color={confettiColors[i % confettiColors.length]}
            />
          ))}
        </div>
      </div>

      <motion.div
        className="relative mx-auto mb-10 size-36 flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.2,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <FloatingRing size={160} delay={0.5} duration={2} />
          <FloatingRing size={200} delay={1} duration={2.5} />
          <FloatingRing size={240} delay={1.5} duration={3} />
        </div>

        <motion.div
          className="absolute inset-0 rounded-full bg-linear-to-br from-orange-500/15 to-yellow-500/15"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-4 rounded-full bg-linear-to-br from-orange-500/25 to-yellow-500/25"
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
        />

        <motion.div
          className="relative size-20 rounded-full bg-linear-to-br from-orange-500 to-yellow-500 flex items-center justify-center shadow-xl"
          initial={{ rotate: -90 }}
          animate={{ rotate: 0 }}
          transition={{ type: "spring", stiffness: 120, delay: 0.4 }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7, type: "spring", stiffness: 300 }}
          >
            <CheckCircle2 className="size-10 text-white" strokeWidth={2.5} />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Resumo criado com sucesso!
        </h1>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Seu documento foi analisado e o resumo está pronto para visualização.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-border/40 bg-card/60 backdrop-blur-sm mb-6 overflow-hidden">
          <div className="h-1 bg-linear-to-r from-orange-500 to-yellow-500" />
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-5">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-orange-500/10 to-yellow-500/10 border border-orange-500/20">
                <FileText className="size-5 text-orange-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  {fileInfo?.name || "Relatorio_Financeiro_Q4_2024.pdf"}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    variant="outline"
                    className="text-[10px] bg-primary/5 border-primary/20 text-primary"
                  >
                    Concluído
                  </Badge>
                  <span className="text-[11px] text-muted-foreground">
                    Processado agora
                  </span>
                </div>
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
              >
                <Sparkles className="size-5 text-primary" />
              </motion.div>
            </div>
          </CardContent>
        </Card>

        <motion.div
          className="flex flex-col sm:flex-row gap-3"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <Button
            className="flex-1 rounded-xl bg-linear-to-r from-orange-500 to-yellow-500 text-white border-0 shadow-lg gap-2 hover:brightness-110 transition-all h-12 text-sm font-semibold"
            onClick={handleViewSummary}
          >
            <Sparkles className="size-4" />
            Ver resumo completo
            <ArrowRight className="size-4" />
          </Button>
          <Button
            variant="outline"
            type="button"
            className="rounded-xl gap-2 h-12 text-sm border-border/60"
            onClick={handleNewSummary}
          >
            <Plus className="size-4" />
            Novo resumo
          </Button>
        </motion.div>

        <motion.p
          className="text-center text-[11px] text-muted-foreground mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          💡 Dica: Você pode acessar todos os seus resumos na aba "Meus Resumos"
          do menu lateral.
        </motion.p>
      </motion.div>
    </div>
  );
}
