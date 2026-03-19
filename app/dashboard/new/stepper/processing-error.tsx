"use client";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  RefreshCw,
  ArrowLeft,
  FileWarning,
  HelpCircle,
  Copy,
  ChevronDown,
  XCircleIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { redirect, useRouter } from "next/navigation";
import type { ORPCError } from "@orpc/client";
import { useFormContext } from "react-hook-form";
import { useStepper } from ".";

export default function ProcessingError({
  errorStep,
  error,
  errorType,
}: {
  errorStep: number;
  error: InstanceType<typeof ORPCError>;
  errorType: string;
}) {
  const [showDetails, setShowDetails] = useState(false);
  const methods = useFormContext();
  const router = useRouter();
  const { reset } = useStepper();

  const fileInfo = methods.getValues("file") as File;

  const handleRetry = () => {
    reset();
  };

  const handleNewUpload = () => {
    reset();
  };

  const copyErrorCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(
      `${error.code} | Step: ${errorStep} | File: ${fileInfo?.name || "N/A"}`,
    );
  };
  return (
    <>
      <div className="max-w-xl mx-auto mt-8">
        {/* Error orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="text-center mb-10"
        >
          <div className="relative mx-auto mb-6 size-24">
            <motion.div
              className="absolute inset-0 rounded-full bg-destructive/10"
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute inset-3 rounded-full bg-destructive/15"
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4,
              }}
            />
            <div className="absolute inset-5 rounded-full bg-destructive flex items-center justify-center shadow-lg shadow-destructive/30">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <XCircleIcon className="size-7 text-destructive-foreground" />
              </motion.div>
            </div>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-xl font-bold text-foreground"
          >
            {error.name}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-sm text-muted-foreground mt-2 max-w-md mx-auto leading-relaxed"
          >
            {error.message}
          </motion.p>
        </motion.div>

        {/* Steps with failure indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-destructive/20 bg-card/60 backdrop-blur-sm mb-6 overflow-hidden">
            <div className="h-1 bg-destructive/60" />
            <CardContent className="p-6">
              {/* Failed step display */}
              <div className="flex items-center gap-3 mb-5 pb-5 border-b border-border/50">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                  <AlertTriangle className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    Falhou na etapa {errorStep} de 4
                  </p>
                  {fileInfo && (
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">
                      {fileInfo.name}
                    </p>
                  )}
                </div>
                <span className="text-[10px] font-mono text-destructive bg-destructive/10 px-2 py-1 rounded-md">
                  {error.code}
                </span>
              </div>

              <button
                onClick={() => setShowDetails(!showDetails)}
                type="button"
                className="flex items-center gap-2 mt-4 text-xs text-muted-foreground hover:text-foreground transition-colors w-full"
              >
                <ChevronDown
                  className={cn(
                    "size-3.5 transition-transform duration-200",
                    showDetails && "rotate-180",
                  )}
                />
                Detalhes técnicos
              </button>

              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-3 bg-background/80 rounded-md p-3 font-mono text-[11px] text-muted-foreground space-y-1 border border-border/50"
                >
                  <p>
                    <span className="text-foreground/70">Código:</span>{" "}
                    {error.code}
                  </p>
                  <p>
                    <span className="text-foreground/70">Etapa:</span>{" "}
                    {errorStep}/4
                  </p>
                  <p>
                    <span className="text-foreground/70">Arquivo:</span>{" "}
                    {fileInfo?.name || "N/A"}
                  </p>
                  <p>
                    <span className="text-foreground/70">Tamanho:</span>{" "}
                    {fileInfo
                      ? fileInfo.size < 1024 * 1024
                        ? `${(fileInfo.size / 1024).toFixed(1)} KB`
                        : `${(fileInfo.size / (1024 * 1024)).toFixed(1)} MB`
                      : "N/A"}
                  </p>
                  <p>
                    <span className="text-foreground/70">Timestamp:</span>{" "}
                    {new Date().toISOString()}
                  </p>
                  <button
                    onClick={copyErrorCode}
                    type="button"
                    className="mt-2 flex items-center gap-1.5 text-primary hover:underline"
                  >
                    <Copy className="size-3" />
                    Copiar informações de erro
                  </button>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Button
            onClick={handleRetry}
            className="flex-1 gap-2 text-white bg-linear-to-r from-orange-500/70 to-yellow-400/70 border-0 shadow-md hover:brightness-110 transition-all"
          >
            <RefreshCw className="size-4" />
            Tentar novamente
          </Button>
          <Button
            onClick={handleNewUpload}
            variant="outline"
            className="flex-1 gap-2"
          >
            <ArrowLeft className="size-4" />
            Enviar outro arquivo
          </Button>
        </motion.div>

        {/* Support link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-xs text-muted-foreground mt-6"
        >
          Precisa de ajuda?{" "}
          <button className="text-primary hover:underline font-medium">
            Falar com o suporte
          </button>
        </motion.p>
      </div>
    </>
  );
}
