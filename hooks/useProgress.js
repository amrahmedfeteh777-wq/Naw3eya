"use client";

import { useCallback, useEffect, useState } from "react";
import { PROGRESS_STORAGE_KEY } from "@/lib/constants";
import {
  createEmptyProgressState,
  loadProgressFromStorage,
  resetProgressInStorage,
  saveProgressToStorage,
} from "@/lib/storage";
import { calculatePercentage } from "@/lib/utils";

function countUnique(ids) {
  return new Set(Array.isArray(ids) ? ids : []).size;
}

export function useProgress() {
  const [progress, setProgress] = useState(() => createEmptyProgressState());
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loaded = loadProgressFromStorage(PROGRESS_STORAGE_KEY);
    setProgress(loaded);
    setIsReady(true);
  }, []);

  const persistNext = useCallback((recipe) => {
    setProgress((prev) => {
      const candidate = typeof recipe === "function" ? recipe(prev) : recipe;
      return saveProgressToStorage(candidate, PROGRESS_STORAGE_KEY);
    });
  }, []);

  const setLastVisitedLesson = useCallback(
    (lessonId) => {
      if (typeof lessonId !== "string" || lessonId.trim().length === 0) return;
      persistNext((prev) => ({
        ...prev,
        lastVisitedLessonId: lessonId,
      }));
    },
    [persistNext]
  );

  const passParagraphCheck = useCallback(
    (paragraphId, lessonId = null) => {
      if (typeof paragraphId !== "string" || paragraphId.trim().length === 0) {
        return;
      }
      persistNext((prev) => {
        const passedSet = new Set(prev.passedParagraphChecks);
        if (passedSet.has(paragraphId)) {
          return lessonId ? { ...prev, lastVisitedLessonId: lessonId } : prev;
        }
        passedSet.add(paragraphId);
        return {
          ...prev,
          passedParagraphChecks: Array.from(passedSet),
          lastVisitedLessonId: lessonId || prev.lastVisitedLessonId,
        };
      });
    },
    [persistNext]
  );

  const submitQuestionAnswer = useCallback(
    ({ questionId, selectedOptionId, isCorrect, paragraphId = null, lessonId = null }) => {
      if (typeof questionId !== "string" || questionId.trim().length === 0) {
        return;
      }
      const passedNow = Boolean(isCorrect);

      persistNext((prev) => {
        const previousEntry = prev.answeredQuestions[questionId];
        const previousAttempts = previousEntry?.attempts || 0;
        const alreadyCorrect = Boolean(previousEntry?.isCorrect);

        const nextAnswered = {
          ...prev.answeredQuestions,
          [questionId]: {
            selectedOptionId:
              typeof selectedOptionId === "string" ? selectedOptionId : "",
            isCorrect: alreadyCorrect || passedNow,
            attempts: previousAttempts + 1,
            answeredAt: new Date().toISOString(),
          },
        };

        const passedChecksSet = new Set(prev.passedParagraphChecks);
        if (
          passedNow &&
          typeof paragraphId === "string" &&
          paragraphId.trim().length > 0
        ) {
          passedChecksSet.add(paragraphId);
        }

        return {
          ...prev,
          answeredQuestions: nextAnswered,
          passedParagraphChecks: Array.from(passedChecksSet),
          lastVisitedLessonId: lessonId || prev.lastVisitedLessonId,
        };
      });
    },
    [persistNext]
  );

  const markLessonCompleted = useCallback(
    (lessonId, requiredParagraphIds = []) => {
      if (typeof lessonId !== "string" || lessonId.trim().length === 0) return;
      persistNext((prev) => {
        const passedChecks = new Set(prev.passedParagraphChecks);
        const allChecksMet = requiredParagraphIds.every((pid) =>
          passedChecks.has(pid)
        );
        if (!allChecksMet) {
          return prev;
        }
        const completedSet = new Set(prev.completedLessons);
        completedSet.add(lessonId);
        return {
          ...prev,
          completedLessons: Array.from(completedSet),
          lastVisitedLessonId: lessonId,
        };
      });
    },
    [persistNext]
  );

  const markUnitCompleted = useCallback(
    (unitId, requiredLessonIds = []) => {
      if (typeof unitId !== "string" || unitId.trim().length === 0) return;
      persistNext((prev) => {
        const doneLessons = new Set(prev.completedLessons);
        const allLessonsMet = requiredLessonIds.every((lid) =>
          doneLessons.has(lid)
        );
        if (!allLessonsMet) {
          return prev;
        }
        const completedUnitsSet = new Set(prev.completedUnits);
        completedUnitsSet.add(unitId);
        return {
          ...prev,
          completedUnits: Array.from(completedUnitsSet),
        };
      });
    },
    [persistNext]
  );

  const markCourseCompleted = useCallback(
    (courseId, requiredUnitOrLessonIds = []) => {
      if (typeof courseId !== "string" || courseId.trim().length === 0) return;
      persistNext((prev) => {
        const doneUnits = new Set(prev.completedUnits);
        const doneLessons = new Set(prev.completedLessons);
        const allMet = requiredUnitOrLessonIds.every(
          (id) => doneUnits.has(id) || doneLessons.has(id)
        );
        if (!allMet) {
          return prev;
        }
        const completedCoursesSet = new Set(prev.completedCourses);
        completedCoursesSet.add(courseId);
        return {
          ...prev,
          completedCourses: Array.from(completedCoursesSet),
        };
      });
    },
    [persistNext]
  );

  const getLessonProgressPercentage = useCallback(
    (lessonId, totalParagraphsInLesson) => {
      if (!totalParagraphsInLesson || totalParagraphsInLesson <= 0) return 0;
      const isLessonDone = progress.completedLessons.includes(lessonId);
      if (isLessonDone) return 100;
      const passedCount = Math.min(
        totalParagraphsInLesson,
        countUnique(progress.passedParagraphChecks)
      );
      return calculatePercentage(passedCount, totalParagraphsInLesson);
    },
    [progress.completedLessons, progress.passedParagraphChecks]
  );

  const getUnitProgressPercentage = useCallback(
    (lessonIds = []) => {
      if (!Array.isArray(lessonIds) || lessonIds.length === 0) return 0;
      const completedSet = new Set(progress.completedLessons);
      const completedCount = lessonIds.filter((id) => completedSet.has(id)).length;
      return calculatePercentage(completedCount, lessonIds.length);
    },
    [progress.completedLessons]
  );

  const getCourseProgressPercentage = useCallback(
    (lessonIds = []) => {
      return getUnitProgressPercentage(lessonIds);
    },
    [getUnitProgressPercentage]
  );

  const resetProgress = useCallback(() => {
    const reset = resetProgressInStorage(PROGRESS_STORAGE_KEY);
    setProgress(reset);
  }, []);

  const answeredEntries = Object.values(progress.answeredQuestions);
  const totalAnsweredQuestions = answeredEntries.length;
  const correctAnswersCount = answeredEntries.filter((q) => q.isCorrect).length;
  const incorrectAnswersCount = answeredEntries.filter((q) => !q.isCorrect).length;

  return {
    progress,
    isReady,
    lastVisitedLessonId: progress.lastVisitedLessonId,
    completedLessonsCount: countUnique(progress.completedLessons),
    passedParagraphChecksCount: countUnique(progress.passedParagraphChecks),
    totalAnsweredQuestions,
    correctAnswersCount,
    incorrectAnswersCount,
    setLastVisitedLesson,
    passParagraphCheck,
    submitQuestionAnswer,
    markLessonCompleted,
    markUnitCompleted,
    markCourseCompleted,
    getLessonProgressPercentage,
    getUnitProgressPercentage,
    getCourseProgressPercentage,
    resetProgress,
  };
}