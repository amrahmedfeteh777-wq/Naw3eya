import Link from "next/link";
import Logo from "@/components/shared/Logo";
import { PLATFORM_DESCRIPTION, PLATFORM_NAME, ROUTES } from "@/lib/constants";

const FOOTER_LINKS = [
  { href: ROUTES.home, label: "Home" },
  { href: ROUTES.courses, label: "Courses" },
  { href: ROUTES.lessons, label: "Lessons" },
  { href: ROUTES.dashboard, label: "Dashboard" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#E2E8F0] bg-[#FFFFFF]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
          <div className="max-w-md space-y-2.5">
            <Logo />
            <p className="text-sm leading-relaxed text-[#64748B]">
              {PLATFORM_DESCRIPTION}
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-[#64748B]"
          >
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-[#2563EB] focus:outline-none focus-visible:underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-col justify-between gap-2 border-t border-[#E2E8F0] pt-5 text-xs text-[#64748B] sm:flex-row sm:items-center">
          <span>All rights reserved 2026 {PLATFORM_NAME}.</span>
          <span className="font-medium text-[#14B8A6]">
            Data Types &amp; Algorithm Fundamentals
          </span>
        </div>
      </div>
    </footer>
  );
}