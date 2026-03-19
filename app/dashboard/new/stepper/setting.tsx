"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  FileText,
  Languages,
  ListChecks,
  MessageSquareQuote,
  Sparkles,
  Target,
  Wand2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useController, useFormContext } from "react-hook-form";
import { useStepper } from ".";
import { toast } from "sonner";
const formatSize = (bytes: number) => {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

type SummaryLength = "curto" | "medio" | "longo";
type SummaryFormat = "paragrafos" | "topicos" | "estruturado";
type SummaryFocus = "geral" | "tecnico" | "acedemico" | "negocios";

const lengthOptions: {
  value: SummaryLength;
  label: string;
  desc: string;
  icon: React.ElementType;
}[] = [
  {
    value: "curto",
    label: "Curto",
    desc: "Resumo objetivo, 1-2 parágrafos",
    icon: AlignLeft,
  },
  {
    value: "medio",
    label: "Médio",
    desc: "Resumo balanceado com pontos-chave",
    icon: AlignCenter,
  },
  {
    value: "longo",
    label: "Detalhado",
    desc: "Resumo abrangente e completo",
    icon: AlignJustify,
  },
];

const formatOptions: {
  value: SummaryFormat;
  label: string;
  desc: string;
  icon: React.ElementType;
}[] = [
  {
    value: "paragrafos",
    label: "Parágrafos",
    desc: "Texto corrido e fluido",
    icon: BookOpen,
  },
  {
    value: "topicos",
    label: "Tópicos",
    desc: "Lista de pontos principais",
    icon: ListChecks,
  },
  {
    value: "estruturado",
    label: "Estruturado",
    desc: "Seções com títulos e subtópicos",
    icon: MessageSquareQuote,
  },
];

const focusOptions: { value: SummaryFocus; label: string; emoji: string }[] = [
  { value: "geral", label: "Geral", emoji: "🌐" },
  { value: "tecnico", label: "Técnico", emoji: "⚙️" },
  { value: "acedemico", label: "Acadêmico", emoji: "🎓" },
  { value: "negocios", label: "Negócios", emoji: "💼" },
];

export default function StepperSetting() {
  const methods = useFormContext();
  const { previousStep } = useStepper();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-foreground">
          Configurar resumo
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Personalize como a IA deve resumir seu documento.
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-border/40 bg-card/60">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary/10 to-accent border border-primary/20">
                <FileText className="size-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {methods.getValues("file")?.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatSize(methods.getValues("file")?.size)}
                </p>
              </div>
              <Button
                variant="ghost"
                type="button"
                size="sm"
                onClick={() => {
                  methods.resetField("file");
                  previousStep();
                }}
                className="text-xs text-muted-foreground gap-1"
              >
                <ArrowLeft className="size-3" /> Trocar
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Length */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card className="border-border/40 bg-card/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Target className="size-4 text-primary" />
                Tamanho do resumo
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-3">
              {lengthOptions.map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => methods.setValue("length", opt.value)}
                  className={cn(
                    "flex flex-col items-start gap-2 rounded-xl border-2 p-4 text-left transition-all duration-200",
                    methods.watch("length") === opt.value
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border/40 bg-card/40 hover:border-border hover:bg-accent/30",
                  )}
                >
                  <div
                    className={cn(
                      "flex size-9 items-center justify-center rounded-lg transition-colors",
                      methods.watch("length") === opt.value
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    <opt.icon className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {opt.label}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {opt.desc}
                    </p>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Format */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-border/40 bg-card/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <BookOpen className="size-4 text-primary" />
                Formato de saída
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-3">
              {formatOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => methods.setValue("output", opt.value)}
                  className={cn(
                    "flex flex-col items-start gap-2 rounded-xl border-2 p-4 text-left transition-all duration-200",
                    methods.watch("output") === opt.value
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border/40 bg-card/40 hover:border-border hover:bg-accent/30",
                  )}
                >
                  <div
                    className={cn(
                      "flex size-9 items-center justify-center rounded-lg transition-colors",
                      methods.watch("output") === opt.value
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    <opt.icon className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {opt.label}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {opt.desc}
                    </p>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Focus area */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Card className="border-border/40 bg-card/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Wand2 className="size-4 text-primary" />
                Foco da análise
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {focusOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => methods.setValue("focus", opt.value)}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border-2 px-4 py-2.5 text-sm font-medium transition-all duration-200",
                      methods.watch("focus") === opt.value
                        ? "border-primary bg-primary/5 text-foreground shadow-sm"
                        : "border-border/40 bg-card/40 text-muted-foreground hover:border-border hover:text-foreground",
                    )}
                  >
                    <span>{opt.emoji}</span>
                    {opt.label}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Extras */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-border/40 bg-card/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Sparkles className="size-4 text-primary" />
                Extras
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ToggleOption
                label="Citações importantes"
                desc="Destacar trechos relevantes do documento original"
                checked={methods.watch("quotes")}
                onChange={(e) => methods.setValue("quotes", e)}
              />
              <ToggleOption
                label="Palavras-chave"
                desc="Extrair os termos mais relevantes do texto"
                checked={methods.watch("keywords")}
                onChange={(e) => methods.setValue("keywords", e)}
              />

              <div className="pt-3 border-t border-border/40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Languages className="size-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      Idioma do resumo
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    {[
                      { value: "pt", label: "🇧🇷 Português" },
                      { value: "en", label: "🇺🇸 English" },
                      { value: "es", label: "🇪🇸 Español" },
                    ].map((lang) => (
                      <button
                        key={lang.value}
                        type="button"
                        onClick={() => methods.setValue("language", lang.value)}
                        className={cn(
                          "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                          methods.watch("language") === lang.value
                            ? "bg-primary/10 text-primary border border-primary/30"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground border border-transparent",
                        )}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="flex gap-3 pb-8"
        >
          <Button
            variant="outline"
            className="rounded-xl"
            type="button"
            onClick={() => {
              methods.resetField("file");
              previousStep();
            }}
          >
            <ArrowLeft className="size-4 mr-2" /> Voltar
          </Button>
          <Button
            type="submit"
            className="flex-1 rounded-xl bg-linear-to-r from-orange-500 to-yellow-500 text-white border-0 shadow-md gap-2 hover:brightness-110 transition-all text-sm font-semibold"
          >
            <Sparkles className="size-4" /> Gerar resumo com IA
          </Button>
        </motion.div>
      </div>
    </>
  );
}

function ToggleOption({
  label,
  desc,
  checked,
  onChange,
}: {
  label: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      type="button"
      className="flex items-center gap-4 w-full text-left group"
    >
      <div
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200",
          checked
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-card group-hover:border-muted-foreground",
        )}
      >
        {checked && (
          <motion.svg
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="size-3"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M2 6L5 9L10 3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-[11px] text-muted-foreground">{desc}</p>
      </div>
    </button>
  );
}
