"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Trash2,
  MoreHorizontal,
  CalendarDays,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { reactClient } from "@/app/(orpc)/orpc/client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { debounce, useQueryState } from "nuqs";
import { useEffect, useState } from "react";

function useDebounce(value: string, delay: number) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return debounced;
}

export default function DashBoardSummary() {
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
    limitUrlUpdates: debounce(500),
  });
  const debouncedSearch = useDebounce(search, 500);
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      reactClient.pdf.getPdfList.infiniteOptions({
        input: (pageParam: string | undefined) => ({
          limit: 6,
          cursor: pageParam,
          search: debouncedSearch,
        }),
        initialPageParam: undefined,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        context: { cache: true },
      }),
    );
  const items = data?.pages.flatMap((p) => p.items) ?? [];

  return (
    <AnimatePresence mode="sync">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
          <div className="space-y-1">
            <h1 className="text-2xl text-gray-900 font-mono">Resumos</h1>
            <p className="text-gray-500 text-sm">
              Abaixo você verá todos os seus resumos disponíveis.
            </p>
          </div>
          <input
            type="text"
            placeholder="Buscar resumos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-lg border border-border bg-card/60 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500/50 transition-all"
          />
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center min-h-125">
            <div className="flex flex-col items-center gap-4">
              <div className="relative size-16">
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-transparent border-t-yellow-500 border-r-orange-500"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.div
                  className="absolute inset-2 rounded-full border-2 border-transparent border-b-yellow-600"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-sm text-muted-foreground font-medium"
              >
                Carregando resumos...
              </motion.p>
            </div>
          </div>
        ) : items.length === 0 ? (
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
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Card className="border-border/40 bg-card/60 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="divide-y divide-border/40">
                  {items.map((s, i) => (
                    <motion.div
                      key={`${s.id}-${i}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="group/row flex items-center gap-4 px-6 py-4 hover:bg-accent/30 transition-colors"
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-orange-500/10 to-yellow-500/5 border border-yellow-500/20">
                        <FileText className="size-4 text-yellow-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {s.name}
                        </p>
                        <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{s.pages} páginas</span>
                          <span>·</span>
                          <CalendarDays className="size-3" />
                          <span>
                            {new Date(s.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Link
                        className="text-gray-500 font-mono text-sm underline cursor-pointer flex items-center"
                        href={"/dashboard/summaries/" + s.id}
                      >
                        Ver detalhes <ArrowRight className="ml-0.5" size={15} />
                      </Link>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant={"ghost"}
                            className="rounded-lg p-1.5
                              transition-all"
                          >
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
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
            {hasNextPage && !isFetchingNextPage && (
              <div className="mx-auto text-center mt-7">
                <Button
                  type="button"
                  onClick={() => fetchNextPage()}
                  className="text-md"
                  variant={"link"}
                >
                  Carregar mais
                </Button>
              </div>
            )}
            {hasNextPage && isFetchingNextPage && (
              <div className="flex items-center justify-center mt-7">
                <div className="flex items-center gap-2">
                  <motion.div
                    className="size-2 rounded-full bg-yellow-500"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: 0,
                    }}
                  />
                  <motion.div
                    className="size-2 rounded-full bg-orange-500"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: 0.2,
                    }}
                  />
                  <motion.div
                    className="size-2 rounded-full bg-yellow-600"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: 0.4,
                    }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}
