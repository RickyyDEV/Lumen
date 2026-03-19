"use client";

import { useFormContext, useController } from "react-hook-form";
import { useStepper } from ".";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useCallback, useRef, useState, useTransition } from "react";
import {
  AlertCircleIcon,
  ArrowRight,
  CheckCircle2,
  FileText,
  Upload,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { client } from "@/app/(orpc)/orpc/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
export default function UploadStepper() {
  const methods = useFormContext();
  const { step, nextStep } = useStepper();
  const {
    field: { value: file, onChange },
  } = useController({
    name: "file",
    control: methods.control,
  });
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isHandling, startHandle] = useTransition();
  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };
  const handleFile = useCallback(
    (f: File) => {
      if (f.type === "application/pdf") {
        onChange(f);
      }
    },
    [onChange],
  );

  const removeFile = () => {
    onChange(undefined);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleContinue = async () => {
    startHandle(async () => {
      const check = await methods.trigger("file");

      if (check) {
        let { pageCount } = await client.pdf.checkPdfPages({
          file: methods.getValues("file"),
        });
        if (pageCount >= 20) {
          toast.error("Nós apenas reduzimos pdfs de até 19 páginas.", {
            richColors: true,
          });
        } else {
          nextStep();
        }
      } else {
        toast.error("Erro ao tentar validar o arquivo.", {
          richColors: true,
        });
      }
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-foreground">Enviar documento</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Selecione o PDF que deseja resumir com inteligência artificial.
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {!file ? (
            <motion.div
              key="dropzone"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card
                className={cn(
                  "border-2 border-dashed transition-all duration-300 cursor-pointer group",
                  isDragging
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                    : "border-border/60 bg-card/40 hover:border-primary/40 hover:bg-accent/20",
                )}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={onDrop}
                onClick={() => inputRef.current?.click()}
              >
                <CardContent className="flex flex-col items-center justify-center py-20 text-center">
                  <input
                    ref={inputRef}
                    type="file"
                    accept=".pdf,application/pdf"
                    className="hidden"
                    onChange={(e) =>
                      e.target.files?.[0] && handleFile(e.target.files[0])
                    }
                  />
                  <motion.div
                    className="mb-6 flex size-20 items-center justify-center rounded-3xl bg-linear-to-br from-primary/10 to-accent border border-primary/20 group-hover:from-primary/15 group-hover:to-accent/80 transition-colors"
                    animate={{ y: isDragging ? -8 : 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Upload
                      className={cn(
                        "size-8 transition-colors",
                        isDragging
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-primary",
                      )}
                    />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {isDragging
                      ? "Solte o arquivo aqui"
                      : "Arraste seu PDF aqui"}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    ou clique para selecionar do seu computador
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="rounded-xl border-primary/30 text-primary hover:bg-primary/10"
                  >
                    Selecionar arquivo
                  </Button>
                  <p className="mt-4 text-xs text-muted-foreground">
                    PDF · Máximo 50MB
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="file-selected"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <Card className="border-border/40 bg-card/60 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-primary/10 to-accent border border-primary/20">
                      <FileText className="size-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {file.name}
                        </p>
                        <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {formatSize(file.size)} · PDF
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="flex size-9 shrink-0 items-center justify-center rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                    >
                      <X className="size-4" />
                    </button>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-xl flex-1"
                      onClick={removeFile}
                    >
                      Trocar arquivo
                    </Button>
                    <Button
                      type="button"
                      className={cn(
                        "rounded-xl flex-1 bg-linear-to-r from-orange-500/70 to-yellow-400/70 text-white border-0 shadow-md gap-2 hover:brightness-110 transition-all",
                        isHandling &&
                          "cursor-not-allowed opacity-70 hover:brightness-100",
                      )}
                      onClick={handleContinue}
                    >
                      {isHandling ? (
                        "Carregando"
                      ) : (
                        <>
                          Continuar <ArrowRight className="size-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid gap-3 sm:grid-cols-3"
        >
          {[
            {
              emoji: "📄",
              title: "Texto selecionável",
              desc: "PDFs com texto nativo geram resumos mais precisos.",
            },
            {
              emoji: "📏",
              title: "19 páginas ou menos",
              desc: "Para garantir a melhor qualidade na geração dos resumos.",
            },
            {
              emoji: "🔒",
              title: "100% seguro",
              desc: "Seus arquivos são criptografados e privados.",
            },
          ].map((tip) => (
            <Card key={tip.title} className="border-border/40 bg-card/40">
              <CardContent className="p-4 text-center">
                <span className="text-2xl mb-2 block">{tip.emoji}</span>
                <p className="text-xs font-medium text-foreground">
                  {tip.title}
                </p>
                <p className="text-[11px] text-muted-foreground mt-1">
                  {tip.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </>
  );
}
