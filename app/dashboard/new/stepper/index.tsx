"use client";

import { motion, AnimatePresence } from "framer-motion";
import { createContext, useContext, useState } from "react";
import z from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Info, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import UploadStepper from "./upload";
import StepperSetting from "./setting";
import { toast } from "sonner";
import ProcessingStepper from "./processing";
import { client } from "@/app/(orpc)/orpc/client";
import { ORPCError } from "@orpc/client";
import ProcessingError from "./processing-error";
import ProcessingSuccess from "./processing-success";

type StepperContextProps = {
  step: number;
  nextStep: () => void;
  previousStep: () => void;
  reset: () => void;
};

const StepperContext = createContext<StepperContextProps | null>(null);

export const useStepper = () => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error("useStepper must be used within a StepperProvider.");
  }
  return context;
};

type SubStepperContextProps = {
  step: number;
};

const SubStepperContext = createContext<SubStepperContextProps | null>(null);

export const useSubStepper = () => {
  const context = useContext(SubStepperContext);
  if (!context) {
    throw new Error("useSubStepper must be used within a SubStepperProvider.");
  }
  return context;
};

const formSchema = z.object({
  file: z.file().refine((e) => e.type === "application/pdf"),
  length: z.enum(["curto", "medio", "detalhado"]),
  output: z.enum(["paragrafos", "topicos", "estruturado"]),
  focus: z.enum(["geral", "tecnico", "academico", "negocios"]),
  quotes: z.boolean(),
  keywords: z.boolean(),
  language: z.enum(["pt", "en", "es"]),
});

export default function StepperIndex() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      length: "medio",
      output: "paragrafos",
      focus: "geral",
      language: "pt",
      quotes: false,
      keywords: false,
    },
  });
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [subStep, setSubStep] = useState<0 | 1 | 2 | 3>(0);
  const [error, setError] = useState<InstanceType<typeof ORPCError> | null>(
    null,
  );
  const [success, setSuccess] = useState<string | null>(null);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const valid = await form.trigger();
    if (valid) {
      setStep(3);
      try {
        const pdf = await client.pdf.createPdf({
          ...values,
          name: "Resumo " + values.file.name,
        });
        await client.pdf.upload({
          pdfId: pdf.id,
          file: values.file,
        });
        setSubStep(2);
        const think = await client.pdf.think({
          pdfId: pdf.id,
          fileName: values.file.name,
        });
        setSubStep(3);
        setStep(4);
        setSuccess(pdf.id);
      } catch (e) {
        if (e instanceof ORPCError) {
          setError(e);
        }
        return;
      }
    } else {
      toast("Ocorreu um erro na validação, tente novamente mais tarde.", {
        richColors: true,
      });
    }
  }

  return (
    <>
      <UploadStepperCounter currentStep={step} />
      <StepperContext.Provider
        value={{
          step,
          previousStep: () => setStep(step === 3 ? 2 : 1),
          nextStep: () => setStep(step === 1 ? 2 : 3),
          reset: () => {
            setStep(1);
            setError(null);
            setSuccess(null);
            setSubStep(0);
            form.reset();
          },
        }}
      >
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              {step === 1 && <UploadStepper />}
              {step === 2 && <StepperSetting />}
              {step === 3 && error === null && (
                <SubStepperContext.Provider
                  value={{
                    step: subStep,
                  }}
                >
                  <ProcessingStepper />
                </SubStepperContext.Provider>
              )}
              {step === 3 && error !== null && success === null && (
                <ProcessingError
                  errorStep={subStep}
                  error={error}
                  errorType="processing"
                />
              )}
              {step === 4 && success != null && (
                <ProcessingSuccess pdfId={success} />
              )}
            </AnimatePresence>
          </form>
        </FormProvider>
      </StepperContext.Provider>
    </>
  );
}

export function UploadStepperCounter({ currentStep }: { currentStep: number }) {
  const steps = [
    { label: "Upload", icon: Upload },
    { label: "Configurar", icon: Info },
    { label: "Resultado", icon: CheckCircle2 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="flex items-center justify-center gap-1">
        {steps.map((step, i) => {
          const isActive = i + 1 === currentStep;
          const isDone = i + 1 < currentStep;
          return (
            <div key={step.label} className="flex items-center gap-1">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex size-8 items-center justify-center rounded-full border-2 transition-all duration-300",
                    isDone
                      ? "border-primary bg-primary text-primary "
                      : isActive
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-card text-primary",
                  )}
                >
                  {isDone ? (
                    <CheckCircle2 className="size-4 text-white" />
                  ) : (
                    <step.icon className="size-3.5" />
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs font-medium hidden sm:block",
                    isDone || isActive
                      ? "text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 w-8 sm:w-16 mx-2 rounded-full transition-colors",
                    isDone ? "bg-primary" : "bg-border",
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
