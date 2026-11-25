import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

export default function MainLayout({ children, className = "" }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC] text-[#0F172A]">
      <Header />
      <main
        className={cn(
          "mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8",
          className
        )}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}