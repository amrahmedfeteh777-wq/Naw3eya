import Link from "next/link";
import { Inbox, ArrowRight } from "lucide-react";
import Card from "@/components/ui/Card";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function EmptyState({
  title = "No items available yet",
  description = "There is no content to display for this section right now.",
  actionHref = ROUTES.home,
  actionLabel = "Back to Home",
  className = "",
}) {
  return (
    <Card className={cn("mx-auto max-w-xl text-center", className)}>
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#F8FAFC] text-[#F59E0B] ring-1 ring-[#E2E8F0]">
        <Inbox className="h-5 w-5" aria-hidden="true" />
      </div>
      <h2 className="mt-4 text-lg font-bold text-[#0F172A]">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
        {description}
      </p>
      {actionHref && actionLabel && (
        <div className="mt-5">
          <Link
            href={actionHref}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#2563EB] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
          >
            <span>{actionLabel}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      )}
    </Card>
  );
}