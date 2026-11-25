import Link from "next/link";
import { Compass } from "lucide-react";
import { PLATFORM_NAME, ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Logo({ className = "", showSubtext = false }) {
  return (
    <Link
      href={ROUTES.home}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-lg text-[#0F172A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2",
        className
      )}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2563EB] text-white shadow-xs transition-colors group-hover:bg-[#1D4ED8]">
        <Compass className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-base font-bold tracking-tight text-[#0F172A]">
          {PLATFORM_NAME}
        </span>
        {showSubtext && (
          <span className="text-[11px] font-medium text-[#64748B]">
            Programming Fundamentals
          </span>
        )}
      </span>
    </Link>
  );
}