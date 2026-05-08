import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { VisitTracker } from "@/components/VisitTracker";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="site-restaurant dark flex min-h-screen flex-col bg-background text-foreground">
      <VisitTracker />
      <SiteHeader />
      <main className="flex-1 pt-[72px] md:pt-20">{children}</main>
      <SiteFooter />
    </div>
  );
}
