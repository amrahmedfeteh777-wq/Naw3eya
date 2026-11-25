import { PROGRESS_SCHEMA_VERSION, PROGRESS_STORAGE_KEY } from "@/lib/constants";

export function createEmptyProgressState() {
  return {
    version: PROGRESS_SCHEMA_VERSION,
    completedLessons: [],
    completedUnits: [],
    completedCourses: [],
    passedParagraphChecks: [],
    answeredQuestions: {},
    lastVisitedLessonId: null,
    updatedAt: null,
  };
}

function uniqueStringArray(arr) {
  if (!Array.isArray(arr)) return [];
  const seen = new Set();
  for (const item of arr) {
    if (typeof item === "string" && item.trim().length > 0) {
      seen.add(item);
    }
  }
  return Array.from(seen);
}

function sanitizeAnsweredQuestions(rawQuestions) {
  if (!rawQuestions || typeof rawQuestions !== "object" || Array.isArray(rawQuestions)) {
    return {};
  }
  const clean = {};
  for (const [questionId, record] of Object.entries(rawQuestions)) {
    if (
      typeof questionId === "string" &&
      questionId.trim().length > 0 &&
      record &&
      typeof record === "object"
    ) {
      clean[questionId] = {
        selectedOptionId:
          typeof record.selectedOptionId === "string" ? record.selectedOptionId : "",
        isCorrect: Boolean(record.isCorrect),
        attempts:
          typeof record.attempts === "number" && Number.isFinite(record.attempts) && record.attempts > 0
            ? Math.floor(record.attempts)
            : 1,
        answeredAt:
          typeof record.answeredAt === "string" ? record.answeredAt : null,
      };
    }
  }
  return clean;
}

export function normalizeProgressState(rawData) {
  const base = createEmptyProgressState();
  if (!rawData || typeof rawData !== "object" || Array.isArray(rawData)) {
    return base;
  }

  return {
    version: PROGRESS_SCHEMA_VERSION,
    completedLessons: uniqueStringArray(rawData.completedLessons),
    completedUnits: uniqueStringArray(rawData.completedUnits),
    completedCourses: uniqueStringArray(rawData.completedCourses),
    passedParagraphChecks: uniqueStringArray(rawData.passedParagraphChecks),
    answeredQuestions: sanitizeAnsweredQuestions(rawData.answeredQuestions),
    lastVisitedLessonId:
      typeof rawData.lastVisitedLessonId === "string" &&
      rawData.lastVisitedLessonId.trim().length > 0
        ? rawData.lastVisitedLessonId
        : null,
    updatedAt: typeof rawData.updatedAt === "string" ? rawData.updatedAt : null,
  };
}

export function loadProgressFromStorage(key = PROGRESS_STORAGE_KEY) {
  if (typeof window === "undefined") {
    return createEmptyProgressState();
  }
  try {
    const serialized = window.localStorage.getItem(key);
    if (!serialized) {
      return createEmptyProgressState();
    }
    const parsed = JSON.parse(serialized);
    return normalizeProgressState(parsed);
  } catch {
    return createEmptyProgressState();
  }
}

export function saveProgressToStorage(state, key = PROGRESS_STORAGE_KEY) {
  if (typeof window === "undefined") {
    return createEmptyProgressState();
  }
  const normalized = normalizeProgressState({
    ...state,
    updatedAt: new Date().toISOString(),
  });
  try {
    window.localStorage.setItem(key, JSON.stringify(normalized));
  } catch {
    // Handle storage restrictions safely
  }
  return normalized;
}

export function updateProgressInStorage(updater, key = PROGRESS_STORAGE_KEY) {
  const current = loadProgressFromStorage(key);
  const next = typeof updater === "function" ? updater(current) : updater;
  return saveProgressToStorage(next, key);
}

export function resetProgressInStorage(key = PROGRESS_STORAGE_KEY) {
  const empty = createEmptyProgressState();
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(key, JSON.stringify(empty));
    } catch {
      // Handle storage restrictions safely
    }
  }
  return empty;
}