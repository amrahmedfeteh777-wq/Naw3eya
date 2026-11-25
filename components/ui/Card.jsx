import { cn } from "@/lib/utils";

export default function Card({
  children,
  as: Component = "div",
  padding = "md",
  className = "",
}) {
  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <Component
      className={cn(
        "rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] text-[#0F172A] shadow-xs",
        paddingClasses[padding] || paddingClasses.md,
        className
      )}
    >
      {children}
    </Component>
  );
}