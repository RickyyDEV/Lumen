"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Eye,
  Download,
  Trash2,
  MoreHorizontal,
  Zap,
  Filter,
  SortAsc,
  Grid3X3,
  List,
  CalendarDays,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
import { useState } from "react";

const allSummaries = [
  {
    id: 1,
    name: "Relatório Financeiro Q4 2024.pdf",
    pages: 42,
    date: "06 Mar 2025",
    status: "concluído" as const,
    progress: 100,
    category: "Financeiro",
  },
  {
    id: 2,
    name: "Pesquisa de Mercado - Setor Tech.pdf",
    pages: 78,
    date: "06 Mar 2025",
    status: "concluído" as const,
    progress: 100,
    category: "Pesquisa",
  },
  {
    id: 3,
    name: "Manual de Processos Internos.pdf",
    pages: 156,
    date: "05 Mar 2025",
    status: "concluído" as const,
    progress: 100,
    category: "Operacional",
  },
  {
    id: 4,
    name: "Artigo Científico - IA Generativa.pdf",
    pages: 23,
    date: "05 Mar 2025",
    status: "processando" as const,
    progress: 67,
    category: "Acadêmico",
  },
  {
    id: 5,
    name: "Contrato de Prestação de Serviços.pdf",
    pages: 18,
    date: "04 Mar 2025",
    status: "concluído" as const,
    progress: 100,
    category: "Jurídico",
  },
  {
    id: 6,
    name: "Planejamento Estratégico 2025.pdf",
    pages: 64,
    date: "03 Mar 2025",
    status: "concluído" as const,
    progress: 100,
    category: "Estratégia",
  },
  {
    id: 7,
    name: "Análise de Concorrência.pdf",
    pages: 35,
    date: "02 Mar 2025",
    status: "concluído" as const,
    progress: 100,
    category: "Pesquisa",
  },
  {
    id: 8,
    name: "Proposta Comercial - Cliente X.pdf",
    pages: 12,
    date: "01 Mar 2025",
    status: "concluído" as const,
    progress: 100,
    category: "Comercial",
  },
];

const statusMap = {
  concluído: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  processando: "bg-lumen-accent/10 text-lumen-accent border-lumen-accent/20",
};

const categoryColors: Record<string, string> = {
  Financeiro: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  Pesquisa: "bg-violet-500/10 text-violet-600 border-violet-500/20",
  Operacional: "bg-teal-500/10 text-teal-600 border-teal-500/20",
  Acadêmico: "bg-pink-500/10 text-pink-600 border-pink-500/20",
  Jurídico: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  Estratégia: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
  Comercial: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
};

type ViewMode = "list" | "grid";
type FilterStatus = "all" | "concluído" | "processando";

const DashboardSummaries = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

  const filtered = allSummaries
    .filter((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((s) => filterStatus === "all" || s.status === filterStatus);

  return (
    <>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">Meus Resumos</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {filtered.length} resumos encontrados
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 text-xs border-border/50"
              >
                <Filter className="size-3.5" />
                {filterStatus === "all"
                  ? "Todos"
                  : filterStatus === "concluído"
                    ? "Concluídos"
                    : "Processando"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilterStatus("all")}>
                Todos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("concluído")}>
                Concluídos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("processando")}>
                Processando
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* View toggle */}
          <div className="flex items-center rounded-lg border border-border/50 p-0.5">
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "rounded-md p-1.5 transition-colors",
                viewMode === "list"
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <List className="size-3.5" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "rounded-md p-1.5 transition-colors",
                viewMode === "grid"
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Grid3X3 className="size-3.5" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <FileText className="size-12 text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground">Nenhum resumo encontrado.</p>
          </motion.div>
        ) : viewMode === "list" ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Card className="border-border/40 bg-card/60 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="divide-y divide-border/40">
                  {filtered.map((s, i) => (
                    <motion.div
                      key={s.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="group/row flex items-center gap-4 px-6 py-4 hover:bg-accent/30 transition-colors"
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-lumen-accent/10 to-lumen-glow/5 border border-lumen-accent/20">
                        <FileText className="size-4 text-lumen-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {s.name}
                        </p>
                        <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{s.pages} páginas</span>
                          <span>·</span>
                          <CalendarDays className="size-3" />
                          <span>{s.date}</span>
                        </div>
                        {s.status === "processando" && (
                          <div className="mt-2 flex items-center gap-2">
                            <Progress
                              value={s.progress}
                              className="h-1.5 flex-1 bg-accent"
                            />
                            <span className="text-[10px] font-medium text-lumen-accent">
                              {s.progress}%
                            </span>
                          </div>
                        )}
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          "shrink-0 text-[10px] px-2 py-0.5",
                          categoryColors[s.category] || "bg-accent",
                        )}
                      >
                        {s.category}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={cn(
                          "shrink-0 text-[10px] font-medium capitalize px-2 py-0.5",
                          statusMap[s.status],
                        )}
                      >
                        {s.status === "processando" && (
                          <Zap className="mr-1 size-2.5" />
                        )}
                        {s.status}
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
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="group relative overflow-hidden border-border/40 bg-card/60 backdrop-blur-sm hover:shadow-lg hover:shadow-foreground/[0.03] transition-all duration-300 cursor-pointer">
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-lumen-accent to-lumen-glow opacity-60 group-hover:opacity-100 transition-opacity" />
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-lumen-accent/10 to-lumen-glow/5 border border-lumen-accent/20">
                        <FileText className="size-4 text-lumen-accent" />
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="rounded-lg p-1.5 text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-accent hover:text-foreground transition-all">
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
                    </div>
                    <p className="text-sm font-medium text-foreground truncate mb-1">
                      {s.name}
                    </p>
                    <p className="text-xs text-muted-foreground mb-3">
                      {s.pages} páginas · {s.date}
                    </p>
                    {s.status === "processando" && (
                      <div className="flex items-center gap-2 mb-3">
                        <Progress
                          value={s.progress}
                          className="h-1.5 flex-1 bg-accent"
                        />
                        <span className="text-[10px] font-medium text-lumen-accent">
                          {s.progress}%
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-[10px] px-2 py-0.5",
                          categoryColors[s.category],
                        )}
                      >
                        {s.category}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-[10px] capitalize px-2 py-0.5",
                          statusMap[s.status],
                        )}
                      >
                        {s.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DashboardSummaries;
