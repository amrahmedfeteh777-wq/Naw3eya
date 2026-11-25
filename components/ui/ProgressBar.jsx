"use client";

import { calculatePercentage, cn } from "@/lib/utils";

export default function ProgressBar({
  value = 0,
  max = 100,
  label = "Progress",
  showPercentage = true,
  accentColor = "#2563EB",
  className = "",
}) {
  const safeMax =
    typeof max === "number" && Number.isFinite(max) && max > 0 ? max : 100;
  const percentage = calculatePercentage(value, safeMax);

  return (
    <div className={cn("w-full space-y-1.5", className)}>
      <div className="flex items-center justify-between gap-2 text-xs font-medium text-[#64748B]">
        <span>{label}</span>
        {showPercentage && (
          <span className="font-semibold tabular-nums text-[#0F172A]">
            {percentage}%
          </span>
        )}
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentage}
        className="h-2.5 w-full overflow-hidden rounded-full bg-[#E2E8F0]"
      >
        <div
          style={{
            width: `${percentage}%`,
            backgroundColor: accentColor,
          }}
          className="h-full rounded-full transition-[width] duration-200 ease-out"
        />
      </div>
    </div>
  );
}