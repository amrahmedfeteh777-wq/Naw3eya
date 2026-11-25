export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

export function isPositiveNumber(value) {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

export function calculatePercentage(completed, total) {
  if (!isPositiveNumber(total)) {
    return 0;
  }
  const safeCompleted =
    typeof completed === "number" && Number.isFinite(completed)
      ? Math.max(0, completed)
      : 0;
  const rawPercentage = Math.round((safeCompleted / total) * 100);
  return Math.max(0, Math.min(100, rawPercentage));
}

export function formatDurationMinutes(minutes) {
  if (!isPositiveNumber(minutes)) {
    return "0 min";
  }
  const rounded = Math.round(minutes);
  return rounded === 1 ? "1 min" : `${rounded} mins`;
}