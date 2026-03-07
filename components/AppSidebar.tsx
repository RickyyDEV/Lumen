"use client";
import {
  Home,
  FileText,
  Upload,
  Settings,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import LumenLogo from "./Logo";
import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import { authClient } from "@/app/(auth)/client";
import { AppSidebarSkeleton } from "./AppSidebarSkeleton";

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Meus Resumos", url: "/dashboard/summaries", icon: FileText },
  { title: "Novo Resumo", url: "/dashboard/upload", icon: Upload },
];

const bottomItems = [
  { title: "Configurações", url: "/dashboard/settings", icon: Settings },
];

export function AppSidebar() {
  const user = authClient.useSession();
  const router = useRouter()
  const { state, toggleSidebar, isMobile } = useSidebar();
  const collapsed = state === "collapsed";
  const pathName = usePathname();
  const isActive = (path: string) => pathName === path;
  if (user.isPending || user.isRefetching || user.data === null) {
    return <AppSidebarSkeleton collapsed={collapsed} />;
  }
  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-border/40 transition-all duration-300 ease-in-out"
    >
      <SidebarHeader className={cn("p-4", collapsed && "p-3")}>
        <div
          className={cn(
            "flex items-center",
            collapsed ? "justify-center" : "justify-between",
          )}
        >
          <LumenLogo size="sm" variant={collapsed ? "icon" : "full"} />
          {isMobile && !collapsed && (
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-md hover:bg-accent/60 transition-colors"
            >
              <ChevronLeft className="size-4 rotate-180" />
            </button>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className={cn("px-2", collapsed && "px-1")}>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={collapsed ? item.title : undefined}
                  >
                    <Link
                      href={item.url}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                        "text-muted-foreground hover:text-foreground hover:bg-accent/60",
                        collapsed && "justify-center px-1 py-3 gap-0",
                      )}
                    >
                      <item.icon
                        className={cn(
                          "size-4 shrink-0",
                          collapsed && "mx-auto",
                        )}
                      />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
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
              {bottomItems.map((item) => (
                <SidebarMenuItem key={item.title} className="items-center">
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={collapsed ? item.title : undefined}
                  >
                    <Link
                      href={item.url}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-all",
                        collapsed && "justify-center px-1 py-3 gap-0",
                      )}
                    >
                      <item.icon
                        className={cn(
                          "size-4 shrink-0",
                          collapsed && "mx-auto",
                        )}
                      />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User profile */}
        <div
          className={cn(
            "mt-2 flex items-center gap-3 rounded-xl border border-border/40 bg-accent/30 p-3 transition-all duration-200",
            collapsed && "justify-center p-2",
          )}
        >
          <Avatar className="size-8 shrink-0">
            <AvatarImage src={user?.data?.user?.image!} />
            <AvatarFallback className="bg-linear-to-br from-yellow-500 to-yellow-400 text-white text-xs font-bold">
              JD
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {user?.data?.user?.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.data?.user?.email}
              </p>
            </div>
          )}
          {!collapsed && (
            <button
              className="rounded-lg p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
              onClick={async () => {
                await authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push("/signin");
                    },
                  },
                });
              }}
            >
              <LogOut className="size-3.5" />
            </button>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
