import { DashboardLayout } from "./client-mock";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <DashboardLayout>{children}</DashboardLayout>
    </section>
  );
}
