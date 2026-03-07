"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface AppSidebarSkeletonProps {
  collapsed?: boolean;
}

export function AppSidebarSkeleton({ collapsed = false }: AppSidebarSkeletonProps) {
  return (
    <Sidebar collapsible="icon" className="border-r border-border/40">
      <SidebarHeader className={cn("p-4", collapsed && "p-3")}>
        <div className={cn("flex items-center", collapsed ? "justify-center" : "justify-between")}>
          <Skeleton className={cn("h-8 w-8 rounded-lg", !collapsed && "w-20")} />
        </div>
      </SidebarHeader>

      <SidebarContent className={cn("px-2", collapsed && "px-1")}>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Main menu items skeleton */}
              {Array.from({ length: 3 }).map((_, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton disabled className="pointer-events-none">
                    <div className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5",
                      collapsed && "justify-center px-1 py-3 gap-0"
                    )}>
                      <Skeleton className="size-4 shrink-0" />
                      {!collapsed && <Skeleton className="h-4 w-24" />}
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className={cn("p-2", collapsed && "p-1")}>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Bottom menu items skeleton */}
              {Array.from({ length: 1 }).map((_, index) => (
                <SidebarMenuItem key={index} className="items-center">
                  <SidebarMenuButton disabled className="pointer-events-none">
                    <div className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5",
                      collapsed && "justify-center px-1 py-3 gap-0"
                    )}>
                      <Skeleton className="size-4 shrink-0" />
                      {!collapsed && <Skeleton className="h-4 w-20" />}
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User profile skeleton */}
        <div className={cn(
          "mt-2 flex items-center gap-3 rounded-xl border border-border/40 bg-accent/30 p-3",
          collapsed && "justify-center p-2"
        )}>
          <Skeleton className="size-8 shrink-0 rounded-full" />
          {!collapsed && (
            <div className="flex-1 space-y-1">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-3 w-24" />
            </div>
          )}
          {!collapsed && <Skeleton className="size-3.5 rounded" />}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}