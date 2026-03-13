"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  X,
  Sparkles,
  CheckCircle2,
  Loader2,
  Eye,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useState, useRef, useCallback } from "react";
import type { LucideIcon } from "lucide-react";
import { client } from "@/app/(orpc)/orpc/client";
type UploadState = "idle" | "uploading" | "processing" | "done";

function StepItem({
  icon: Icon,
  label,
  status,
}: {
  icon: LucideIcon;
  label: string;
  status: "pending" | "active" | "done";
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "flex size-8 items-center justify-center rounded-full transition-colors",
          status === "done"
            ? "bg-emerald-500/10 text-emerald-600"
            : status === "active"
              ? "bg-lumen-accent/10 text-lumen-accent"
              : "bg-accent text-muted-foreground",
        )}
      >
        {status === "active" ? (
          <Loader2 className="size-4 animate-spin" />
        ) : status === "done" ? (
          <CheckCircle2 className="size-4" />
        ) : (
          <Icon className="size-4" />
        )}
      </div>
      <span
        className={cn(
          "text-sm",
          status === "done"
            ? "text-foreground font-medium"
            : status === "active"
              ? "text-foreground"
              : "text-muted-foreground",
        )}
      >
        {label}
      </span>
    </div>
  );
}

const DashboardUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const simulateUpload = useCallback(async (f: File) => {
    setFile(f);
    setUploadState("uploading");
    setProgress(0);
    const test = await client.user.test();
    console.log(test);
    // fromBuffer(Buffer.from(await f.arrayBuffer()));
    // console.log(f.name);
    // const interval = setInterval(() => {
    //   setProgress((prev) => {
    //     if (prev >= 100) {
    //       clearInterval(interval);
    //       setUploadState("processing");
    //       setTimeout(() => {
    //         setUploadState("done");
    //       }, 2000);
    //       return 100;
    //     }
    //     return prev + Math.random() * 15 + 5;
    //   });
    // }, 200);
  }, []);

  const handleFile = (f: File) => {
    if (f.type !== "application/pdf") return;
    simulateUpload(f);
  };

  const reset = () => {
    setFile(null);
    setUploadState("idle");
    setProgress(0);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-foreground">Novo Resumo</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Envie um PDF e nossa IA criará um resumo inteligente para você.
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {uploadState === "idle" ? (
            <motion.div
              key="dropzone"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card
                className={cn(
                  "border-2 border-dashed transition-all duration-300 cursor-pointer",
                  isDragging
                    ? "border-lumen-accent bg-lumen-accent/5 shadow-lg shadow-lumen-accent/10"
                    : "border-border/60 bg-card/40 hover:border-lumen-accent/40 hover:bg-accent/20",
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
                    className="mb-6 flex size-20 items-center justify-center rounded-3xl bg-linear-to-br from-orange-500/10 to-yellow-400/10 border border-lumen-accent/20"
                    animate={{ y: isDragging ? -8 : 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Upload
                      className={cn(
                        "size-8 transition-colors",
                        isDragging ? "text-primary" : "text-muted-foreground",
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
                    variant="outline"
                    size="sm"
                    className="rounded-xl border-lumen-accent/30 text-lumen-accent hover:bg-lumen-accent/10"
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
              key="progress"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <Card className="border-border/40 bg-card/60 backdrop-blur-sm overflow-hidden">
                <div
                  className="h-1 bg-gradient-to-r from-lumen-accent to-lumen-glow"
                  style={{
                    width:
                      uploadState === "done"
                        ? "100%"
                        : `${Math.min(progress, 100)}%`,
                    transition: "width 0.3s",
                  }}
                />
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-lumen-accent/10 to-lumen-glow/5 border border-lumen-accent/20">
                      <FileText className="size-5 text-lumen-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {file?.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {file ? formatSize(file.size) : ""}
                      </p>
                    </div>
                    {uploadState === "done" && (
                      <button
                        onClick={reset}
                        className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                      >
                        <X className="size-4" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <StepItem
                      icon={Upload}
                      label="Upload do arquivo"
                      status={uploadState === "uploading" ? "active" : "done"}
                    />
                    <StepItem
                      icon={Sparkles}
                      label="Processando com IA"
                      status={
                        uploadState === "processing"
                          ? "active"
                          : uploadState === "done"
                            ? "done"
                            : "pending"
                      }
                    />
                    <StepItem
                      icon={CheckCircle2}
                      label="Resumo concluído"
                      status={uploadState === "done" ? "done" : "pending"}
                    />
                  </div>

                  {uploadState === "uploading" && (
                    <div className="mt-6">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                        <span>Enviando...</span>
                        <span>{Math.min(Math.round(progress), 100)}%</span>
                      </div>
                      <Progress
                        value={Math.min(progress, 100)}
                        className="h-2 bg-accent"
                      />
                    </div>
                  )}

                  {uploadState === "done" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 flex gap-3"
                    >
                      <Button className="flex-1 rounded-xl bg-gradient-to-r from-lumen-accent to-lumen-glow text-white border-0 shadow-md gap-2 hover:brightness-110">
                        <Eye className="size-4" /> Ver resumo
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-xl"
                        onClick={reset}
                      >
                        Novo upload
                      </Button>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

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
              title: "Sem limite de páginas",
              desc: "Envie documentos de qualquer tamanho.",
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
};

export default DashboardUpload;
