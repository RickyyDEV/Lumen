"use client";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  Brain,
  CheckCircle2,
  FileSearch,
  Loader2,
  Sparkles,
  Upload,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useSubStepper } from ".";

interface ProcessingStep {
  icon: LucideIcon;
  label: string;
  desc: string;
  duration: number; // ms
}

const funFacts = [
  "💡 A IA analisa padrões semânticos para identificar as informações mais relevantes.",
  "📊 Em média, nossos resumos capturam 94% dos pontos-chave do documento.",
  "⚡ Um resumo que levaria 30 minutos pode ser feito em segundos.",
  "🧠 Utilizamos modelos de linguagem de última geração para máxima precisão.",
];

const steps: ProcessingStep[] = [
  {
    icon: Upload,
    label: "Enviando documento",
    desc: "Fazendo upload do arquivo para o servidor...",
    duration: 1500,
  },
  {
    icon: FileSearch,
    label: "Analisando conteúdo",
    desc: "Extraindo texto e identificando estrutura...",
    duration: 2000,
  },
  {
    icon: Brain,
    label: "Processando com IA",
    desc: "Gerando resumo inteligente do conteúdo...",
    duration: 3000,
  },
  {
    icon: Sparkles,
    label: "Finalizando",
    desc: "Formatando resultado e extraindo insights...",
    duration: 1500,
  },
];

export default function ProcessingStepper() {
  const { step: currentStep } = useSubStepper();
  const [factIndex, setFactIndex] = useState(0);
  const methods = useFormContext();
  useEffect(() => {
    const interval = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % funFacts.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);
  const overallProgress = (currentStep / (steps.length + 1)) * 100;
  return (
    <div className="max-w-xl mx-auto mt-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-10"
      >
        <div className="relative mx-auto mb-8 size-28">
          <motion.div
            className="absolute inset-0 rounded-full bg-linear-to-br from-orange-500/20 to-yellow-500/20"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-3 rounded-full bg-linear-to-br from-orange-500/30 to-yellow-500/30"
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
          />
          <div className="absolute inset-6 rounded-full bg-linear-to-br from-orange-500 to-yellow-500 flex items-center justify-center shadow-lg shadow-lumen-accent/30">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Brain className="size-8 text-white" />
            </motion.div>
          </div>
        </div>

        <h2 className="text-xl font-bold text-foreground">
          Gerando seu resumo...
        </h2>
        {methods.getValues("file") && (
          <p className="text-sm text-muted-foreground mt-1">
            {methods.getValues("file").name}
          </p>
        )}
      </motion.div>

      {/* Progress bar */}
      <Card className="border-border/40 bg-card/60 backdrop-blur-sm mb-6 overflow-hidden">
        <div
          className="h-1 bg-linear-to-r from-lumen-accent to-lumen-glow transition-all duration-700 ease-out"
          style={{ width: `${overallProgress}%` }}
        />
        <CardContent className="p-6 space-y-4">
          {steps.map((step, i) => {
            const status =
              i < currentStep
                ? "done"
                : i === currentStep
                  ? "active"
                  : "pending";
            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4"
              >
                <div
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                    status === "done"
                      ? "bg-emerald-500/10 text-emerald-600"
                      : status === "active"
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground",
                  )}
                >
                  {status === "active" ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : status === "done" ? (
                    <CheckCircle2 className="size-4" />
                  ) : (
                    <step.icon className="size-4" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      "text-sm font-medium transition-colors",
                      status === "done"
                        ? "text-foreground"
                        : status === "active"
                          ? "text-foreground"
                          : "text-muted-foreground",
                    )}
                  >
                    {step.label}
                  </p>
                  {status === "active" && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-xs text-muted-foreground mt-0.5"
                    >
                      {step.desc}
                    </motion.p>
                  )}
                </div>
                {status === "done" && (
                  <span className="text-[10px] text-emerald-600 font-medium">
                    Concluído
                  </span>
                )}
              </motion.div>
            );
          })}
        </CardContent>
      </Card>

      <AnimatePresence mode="wait">
        <motion.div
          key={factIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <p className="text-xs text-muted-foreground px-8">
            {funFacts[factIndex]}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
