"use client";

import { motion } from "framer-motion";
import {
  FileText,
  TrendingUp,
  Clock,
  Zap,
  Upload,
  ArrowRight,
  MoreHorizontal,
  Eye,
  Trash2,
  Download,
  Plus,
  Layers,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { redirect } from "next/navigation";
import { authClient } from "../(auth)/client";

const stats = [
  {
    label: "Total de Resumos",
    value: "24",
    change: "+3 esta semana",
    icon: FileText,
    gradient: "from-yellow-500 to-yellow-400",
  },
  {
    label: "Páginas Processadas",
    value: "1.248",
    change: "+186 esta semana",
    icon: Layers,
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    label: "Tempo Economizado",
    value: "12h",
    change: "~30 min por PDF",
    icon: Clock,
    gradient: "from-emerald-500 to-teal-400",
  },
  {
    label: "Precisão Média",
    value: "94%",
    change: "+2% vs mês passado",
    icon: TrendingUp,
    gradient: "from-violet-500 to-purple-400",
  },
];

const recentSummaries = [
  {
    id: 1,
    name: "Relatório Financeiro Q4 2024.pdf",
    pages: 42,
    date: "Há 2 horas",
    status: "concluído" as const,
    progress: 100,
  },
  {
    id: 2,
    name: "Pesquisa de Mercado - Setor Tech.pdf",
    pages: 78,
    date: "Há 5 horas",
    status: "concluído" as const,
    progress: 100,
  },
  {
    id: 3,
    name: "Manual de Processos Internos.pdf",
    pages: 156,
    date: "Ontem",
    status: "processando" as const,
    progress: 67,
  },
];

const statusMap = {
  concluído: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  processando: "bg-lumen-accent/10 text-lumen-accent border-lumen-accent/20",
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 } as const,
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

const Dashboard = () => {
  const user = authClient.useSession();
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Olá, {user?.data?.user?.name} 👋
        </h1>
        <p className="mt-1 text-muted-foreground">
          Aqui está o resumo da sua atividade.
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            custom={i}
            initial="hidden"
            animate="show"
            variants={fadeUp}
          >
            <Card className="group relative overflow-hidden border-border/40 bg-card/60 backdrop-blur-sm hover:shadow-lg hover:shadow-foreground/3 transition-all duration-300">
              <div
                className={cn(
                  "absolute inset-x-0 top-0 h-0.5 bg-linear-to-r opacity-60 group-hover:opacity-100 transition-opacity",
                  stat.gradient,
                )}
              />
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-3xl font-bold text-foreground tracking-tight">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {stat.change}
                    </p>
                  </div>
                  <div
                    className={cn(
                      "rounded-xl bg-linear-to-br p-2.5 text-white shadow-lg",
                      stat.gradient,
                    )}
                  >
                    <stat.icon className="size-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <Card className="border-border/40 bg-card/60 backdrop-blur-sm">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-lg font-semibold">
                Resumos Recentes
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground hover:text-foreground gap-1"
                onClick={() => redirect("/dashboard/summaries")}
              >
                Ver todos <ArrowRight className="size-3" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/40">
                {recentSummaries.map((summary, i) => (
                  <motion.div
                    key={summary.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.06, duration: 0.4 }}
                    className="group/row flex items-center gap-4 px-6 py-4 hover:bg-accent/30 transition-colors"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-yellow-500/10 to-yello-400/5 border border-lumen-accent/20">
                      <FileText className="size-4 text-lumen-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {summary.name}
                      </p>
                      <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{summary.pages} páginas</span>
                        <span>·</span>
                        <span>{summary.date}</span>
                      </div>
                      {summary.status === "processando" && (
                        <div className="mt-2 flex items-center gap-2">
                          <Progress
                            value={summary.progress}
                            className="h-1.5 flex-1 bg-accent"
                          />
                          <span className="text-[10px] font-medium text-lumen-accent">
                            {summary.progress}%
                          </span>
                        </div>
                      )}
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        "shrink-0 text-[10px] font-medium capitalize px-2 py-0.5",
                        statusMap[summary.status],
                      )}
                    >
                      {summary.status === "processando" && (
                        <Zap className="mr-1 size-2.5" />
                      )}
                      {summary.status}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="rounded-lg p-1.5 text-muted-foreground opacity-0 group-hover/row:opacity-100 hover:bg-accent hover:text-foreground transition-all">
                          <MoreHorizontal className="size-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem className="gap-2 text-sm">
                          <Eye className="size-3.5" /> Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-sm">
                          <Download className="size-3.5" /> Baixar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-sm text-destructive focus:text-destructive">
                          <Trash2 className="size-3.5" /> Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
        >
          <Card
            className="group relative overflow-hidden border-border/40 bg-card/60 backdrop-blur-sm cursor-pointer"
            onClick={() => redirect("/dashboard/new")}
          >
            <div className="absolute inset-0 bg-linear-to-br from-yellow-500/5 to-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardContent className="relative p-6 flex flex-col items-center text-center">
              <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-linear-to-br from-yellow-500 to-yellow-400 text-white shadow-lg shadow-yellow-500/25">
                <Upload className="size-6" />
              </div>
              <h3 className="text-base font-semibold text-foreground">
                Novo Resumo
              </h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Envie um PDF e receba um resumo inteligente em segundos.
              </p>
              <Button className="mt-5 w-full rounded-xl bg-linear-to-r from-yellow-500 to-yellow-400 text-white border-0 shadow-md shadow-lumen-accent/20 hover:shadow-lg hover:shadow-lumen-accent/30 hover:brightness-110 transition-all duration-300 gap-2">
                <Plus className="size-4" /> Enviar PDF
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/40 bg-card/60 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">
                Uso do Plano
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">
                    Resumos este mês
                  </span>
                  <span className="font-medium text-foreground">24 / 50</span>
                </div>
                <Progress value={48} className="h-2 bg-accent" />
              </div>
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Armazenamento</span>
                  <span className="font-medium text-foreground">
                    1.2 GB / 5 GB
                  </span>
                </div>
                <Progress value={24} className="h-2 bg-accent" />
              </div>
              <div className="pt-2 border-t border-border/40">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-xs text-lumen-accent hover:text-lumen-glow gap-1"
                >
                  <Zap className="size-3" /> Fazer upgrade
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/40 bg-card/60 backdrop-blur-sm">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-lg bg-lumen-accent/10 p-2 text-lumen-accent">
                  <Sparkles className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Dica rápida
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    PDFs com texto selecionável geram resumos mais precisos do
                    que documentos escaneados.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default Dashboard;
