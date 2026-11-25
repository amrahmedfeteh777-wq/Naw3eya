import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Loading({
  message = "Loading learning content...",
  className = "",
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex min-h-[180px] w-full flex-col items-center justify-center gap-3 rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-6 text-center text-[#64748B]",
        className
      )}
    >
      <Loader2 className="h-6 w-6 animate-spin text-[#2563EB]" aria-hidden="true" />
      <p className="text-sm font-medium text-[#0F172A]">{message}</p>
    </div>
  );
}