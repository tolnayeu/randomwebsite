export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="dashboard-coss isolate relative flex min-h-dvh flex-col bg-muted/35 font-sans antialiased text-foreground"
      data-app="dashboard"
    >
      {children}
    </div>
  );
}
