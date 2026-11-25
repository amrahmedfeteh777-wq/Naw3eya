import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className = "",
  onClick,
  ariaLabel,
}) {
  const isDisabled = disabled || loading;

  const variantClasses = {
    primary:
      "bg-[#2563EB] text-white border border-[#2563EB] hover:bg-[#1D4ED8] focus-visible:ring-[#2563EB]",
    secondary:
      "bg-[#14B8A6] text-white border border-[#14B8A6] hover:bg-[#0D9488] focus-visible:ring-[#14B8A6]",
    outline:
      "bg-[#FFFFFF] text-[#0F172A] border border-[#CBD5E1] hover:bg-[#F8FAFC] hover:border-[#2563EB] focus-visible:ring-[#2563EB]",
  };

  const sizeClasses = {
    sm: "min-h-[38px] px-3 py-1.5 text-xs",
    md: "min-h-[44px] px-4 py-2 text-sm",
    lg: "min-h-[48px] px-6 py-3 text-base",
  };

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      aria-label={ariaLabel}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold shadow-2xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses[variant] || variantClasses.primary,
        sizeClasses[size] || sizeClasses.md,
        className
      )}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      <span>{children}</span>
    </button>
  );
}