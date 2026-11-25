import Link from "next/link";
import { ArrowRight, Compass, Home } from "lucide-react";
import Card from "@/components/ui/Card";
import { ROUTES } from "@/lib/constants";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center py-8">
      <Card padding="lg" className="w-full max-w-xl text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
          <Compass className="h-6 w-6" aria-hidden="true" />
        </div>

        <p className="mt-4 text-xs font-bold uppercase tracking-wider text-[#2563EB]">
          Error 404
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
          Page Not Found
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#64748B] sm:text-base">
          The page you are looking for does not exist or may have moved. Use one
          of the links below to continue learning.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={ROUTES.home}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            <span>Back to Home</span>
          </Link>

          <Link
            href={ROUTES.courses}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[#CBD5E1] bg-[#FFFFFF] px-5 py-2.5 text-sm font-semibold text-[#0F172A] transition-colors hover:bg-[#F8FAFC] hover:border-[#2563EB] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
          >
            <span>Browse Courses</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Card>
    </div>
  );
}