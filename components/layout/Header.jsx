
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ArrowRight,
  GraduationCap,
  LayoutDashboard,
  BookOpen,
  Layers3,
  ChevronDown,
} from "lucide-react";

import Logo from "@/components/shared/Logo";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const HEADER_LINKS = [
  {
    href: ROUTES.home,
    label: "Home",
    icon: Layers3,
  },
  {
    href: ROUTES.courses,
    label: "Courses",
    icon: BookOpen,
  },
  {
    href: "/lessons",
    label: "Lessons",
    icon: GraduationCap,
  },
  {
    href: ROUTES.dashboard,
    label: "Dashboard",
    icon: LayoutDashboard,
  },
];

export default function Header({ navItems = HEADER_LINKS }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isCurrentRoute = (href) => {
    if (!href) return false;
    if (href === "/") return pathname === "/";

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 shadow-[0_4px_24px_rgba(15,23,42,0.035)] backdrop-blur-xl">
      <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">

        {/* Brand */}

        <div className="relative z-10 shrink-0">
          <Logo showSubtext />
        </div>

        {/* Desktop Navigation */}

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 rounded-2xl border border-slate-200/70 bg-slate-50/80 p-1.5 md:flex"
        >
          {navItems.map((item) => {
            const active = isCurrentRoute(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-bold transition-all duration-200",
                  active
                    ? "bg-white text-blue-700 shadow-sm ring-1 ring-slate-200/80"
                    : "text-slate-500 hover:bg-white/80 hover:text-slate-900"
                )}
              >
                {Icon && (
                  <Icon
                    className={cn(
                      "h-4 w-4 transition-colors",
                      active
                        ? "text-blue-600"
                        : "text-slate-400 group-hover:text-blue-600"
                    )}
                  />
                )}

                {item.label}

                {active && (
                  <span className="absolute -bottom-[7px] left-1/2 h-[3px] w-5 -translate-x-1/2 rounded-full bg-blue-600" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}

        <div className="hidden shrink-0 md:flex">
          <Link
            href="/lessons"
            className="group inline-flex min-h-[46px] items-center justify-center gap-2.5 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-[0_5px_14px_rgba(37,99,235,0.20)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_8px_20px_rgba(37,99,235,0.28)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <GraduationCap className="h-[19px] w-[19px]" />

            <span>Start Learning</span>

            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}

        <button
          type="button"
          onClick={() => setMenuOpen((previous) => !previous)}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation-drawer"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="relative z-[60] inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 md:hidden"
        >
          {menuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}

      {menuOpen && (
        <>
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 top-[78px] z-40 bg-slate-950/20 backdrop-blur-[2px] md:hidden"
          />

          <div
            id="mobile-navigation-drawer"
            className="absolute left-0 right-0 top-full z-50 border-t border-slate-100 bg-white px-4 pb-5 pt-5 shadow-[0_18px_35px_rgba(15,23,42,0.10)] md:hidden"
          >
            <div className="mb-3 px-3">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
                Explore Platform
              </p>
            </div>

            <nav
              aria-label="Mobile navigation"
              className="flex flex-col gap-1.5"
            >
              {navItems.map((item) => {
                const active = isCurrentRoute(item.href);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-[50px] items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-all",
                      active
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      {Icon && (
                        <Icon
                          className={cn(
                            "h-[18px] w-[18px]",
                            active ? "text-blue-600" : "text-slate-400"
                          )}
                        />
                      )}

                      {item.label}
                    </span>

                    {active && (
                      <span className="h-2 w-2 rounded-full bg-blue-600" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-4 border-t border-slate-100 pt-4">
              <Link
                href="/lessons"
                onClick={() => setMenuOpen(false)}
                className="group flex min-h-[50px] w-full items-center justify-center gap-2.5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700"
              >
                <GraduationCap className="h-5 w-5" />

                Start Learning

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <p className="mt-3 text-center text-xs text-slate-400">
                Continue your learning journey
              </p>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
