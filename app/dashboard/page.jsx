
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Compass,
  FileCheck2,
  HelpCircle,
  RotateCcw,
  XCircle,
} from "lucide-react";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import Loading from "@/components/shared/Loading";
import EmptyState from "@/components/shared/EmptyState";

import { COURSES } from "@/data/courses";
import { LESSONS, getAllParagraphs } from "@/data/lessons";
import { QUESTIONS } from "@/data/questions";
import { useProgress } from "@/hooks/useProgress";
import { ROUTES } from "@/lib/constants";
import { calculatePercentage } from "@/lib/utils";

// --------------------------------------------------
// Additional Exam Question IDs
// --------------------------------------------------

const EXAM_QUESTION_IDS = [
  "unit1-exam-01",
  "unit1-exam-02",
  "unit1-exam-03",
  "unit1-exam-04",
  "unit1-exam-05",
  "unit1-exam-06",
  "unit1-exam-07",
  "unit1-exam-08",
  "unit1-exam-09",
  "unit1-exam-10",
  "unit1-exam-11",
  "unit1-exam-12",
  "unit1-exam-13",
  "unit1-exam-14",
  "unit1-exam-15",
];

// --------------------------------------------------
// Dashboard Page
// --------------------------------------------------

export default function DashboardPage() {
  const {
    progress,
    isReady,
    lastVisitedLessonId,
    completedLessonsCount,
    passedParagraphChecksCount,
    totalAnsweredQuestions,
    correctAnswersCount,
    incorrectAnswersCount,
    resetProgress,
  } = useProgress();

  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  // --------------------------------------------------
  // Data Lists
  // --------------------------------------------------

  const coursesList = useMemo(
    () => (Array.isArray(COURSES) ? COURSES : []),
    []
  );

  const lessonsList = useMemo(
    () => (Array.isArray(LESSONS) ? LESSONS : []),
    []
  );

  const questionsList = useMemo(
    () => (Array.isArray(QUESTIONS) ? QUESTIONS : []),
    []
  );

  const allParagraphs = useMemo(() => getAllParagraphs(), []);

  // --------------------------------------------------
  // Loading State
  // --------------------------------------------------

  if (!isReady) {
    return (
      <Loading message="Loading your saved learning progress..." />
    );
  }

  // --------------------------------------------------
  // Valid IDs
  // --------------------------------------------------

  const validLessonIds = new Set(
    lessonsList.map((lesson) => lesson.id)
  );

  const validParagraphIds = new Set(
    allParagraphs.map((paragraph) => paragraph.id)
  );

  // Combine lesson questions and exam questions.
  // Set prevents duplicate question IDs.
  const validQuestionIds = new Set([
    ...questionsList.map((question) => question.id),
    ...EXAM_QUESTION_IDS,
  ]);

  const totalAvailableQuestions = validQuestionIds.size;

  // --------------------------------------------------
  // Lesson Progress
  // --------------------------------------------------

  const actualCompletedLessonsCount =
    (progress.completedLessons || []).filter((id) =>
      validLessonIds.has(id)
    ).length;

  const remainingLessonsCount = Math.max(
    0,
    lessonsList.length - actualCompletedLessonsCount
  );

  // --------------------------------------------------
  // Paragraph Progress
  // --------------------------------------------------

  const actualCompletedParagraphsCount = (
    progress.passedParagraphChecks || []
  ).filter((id) => validParagraphIds.has(id)).length;

  // --------------------------------------------------
  // Question Progress
  // --------------------------------------------------

  const validAnsweredEntries = Object.entries(
    progress.answeredQuestions || {}
  ).filter(([questionId]) =>
    validQuestionIds.has(questionId)
  );

  const actualAnsweredCount = validAnsweredEntries.length;

  const actualCorrectCount = validAnsweredEntries.filter(
    ([, entry]) => Boolean(entry?.isCorrect)
  ).length;

  const actualIncorrectCount = Math.max(
    0,
    actualAnsweredCount - actualCorrectCount
  );

  const remainingQuestionsCount = Math.max(
    0,
    totalAvailableQuestions - actualAnsweredCount
  );

  const questionCompletionPercentage = calculatePercentage(
    actualAnsweredCount,
    totalAvailableQuestions
  );

  // --------------------------------------------------
  // Course Progress
  // --------------------------------------------------

  const completedCoursesCount = coursesList.filter((course) => {
    if ((progress.completedCourses || []).includes(course.id)) {
      return true;
    }

    const courseLessonIds = Array.isArray(course.lessonIds)
      ? course.lessonIds.filter((id) => validLessonIds.has(id))
      : lessonsList
          .filter((lesson) => lesson.courseId === course.id)
          .map((lesson) => lesson.id);

    return (
      courseLessonIds.length > 0 &&
      courseLessonIds.every((id) =>
        (progress.completedLessons || []).includes(id)
      )
    );
  }).length;

  const overallCourseProgress = calculatePercentage(
    completedCoursesCount,
    coursesList.length
  );

  // --------------------------------------------------
  // Last Visited Lesson
  // --------------------------------------------------

  const lastVisitedLesson = lastVisitedLessonId
    ? lessonsList.find(
        (lesson) => lesson.id === lastVisitedLessonId
      ) || null
    : null;

  // --------------------------------------------------
  // General Progress Status
  // --------------------------------------------------

  const hasAnyRecordedProgress =
    actualCompletedParagraphsCount > 0 ||
    actualAnsweredCount > 0 ||
    actualCompletedLessonsCount > 0 ||
    completedCoursesCount > 0 ||
    Boolean(lastVisitedLesson);

  // --------------------------------------------------
  // Reset Progress
  // --------------------------------------------------

  const handleConfirmReset = () => {
    resetProgress();
    setConfirmResetOpen(false);
  };

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <div className="space-y-8">

      {/* Dashboard Header */}

      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
            Student Progress Dashboard
          </h1>

          <p className="mt-1 text-sm leading-relaxed text-[#64748B]">
            Real-time summary of your completed work and quiz activity
            stored locally in your browser.
          </p>
        </div>

        {hasAnyRecordedProgress && (
          <div className="shrink-0">
            {!confirmResetOpen ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => setConfirmResetOpen(true)}
                className="gap-2"
              >
                <RotateCcw
                  className="h-4 w-4 text-[#F59E0B]"
                  aria-hidden="true"
                />
                <span>Reset Progress</span>
              </Button>
            ) : (
              <div
                role="alertdialog"
                aria-label="Confirm progress reset"
                className="flex flex-wrap items-center gap-2 rounded-xl border border-[#F59E0B] bg-[#FFFBEB] p-3"
              >
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#92400E]">
                  <AlertTriangle
                    className="h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />
                  <span>Clear all saved progress?</span>
                </span>

                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleConfirmReset}
                >
                  Confirm Reset
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setConfirmResetOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Empty State */}

      {!hasAnyRecordedProgress ? (
        <EmptyState
          title="No Learning Progress Recorded Yet"
          description="You have not completed any paragraphs, answered any questions, or finished a lesson yet. Start a lesson to track your actual progress here."
          actionHref={ROUTES.lessons}
          actionLabel="Start First Lesson"
        />
      ) : (
        <>
          {/* Overall Course Progress & Last Viewed Lesson */}

          <div className="grid gap-5 lg:grid-cols-3">

            <Card
              padding="md"
              className="space-y-4 lg:col-span-2"
            >
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-lg font-bold text-[#0F172A]">
                  Overall Course Progress
                </h2>

                <span className="text-xs font-semibold text-[#64748B]">
                  {completedCoursesCount} of {coursesList.length} Courses
                  Completed
                </span>
              </div>

              <ProgressBar
                value={completedCoursesCount}
                max={coursesList.length}
                label="Overall Course Completion"
                accentColor={
                  overallCourseProgress === 100
                    ? "#14B8A6"
                    : "#2563EB"
                }
              />

              <p className="text-xs leading-relaxed text-[#64748B]">
                Calculated strictly from verified course and lesson
                completion records ({overallCourseProgress}%).
              </p>
            </Card>

            {/* Last Viewed Lesson */}

            <Card
              padding="md"
              className="flex flex-col justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[#2563EB]">
                  <Compass
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                  <span>Last Viewed Lesson</span>
                </div>

                {lastVisitedLesson ? (
                  <>
                    <h2 className="text-base font-bold text-[#0F172A]">
                      {lastVisitedLesson.title}
                    </h2>

                    <p className="text-xs leading-relaxed text-[#64748B]">
                      {lastVisitedLesson.summary}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-[#64748B]">
                    No lesson has been recorded as visited yet.
                  </p>
                )}
              </div>

              <div>
                <Link
                  href={
                    lastVisitedLesson
                      ? `${ROUTES.lessons}/${lastVisitedLesson.slug}`
                      : ROUTES.lessons
                  }
                  className="inline-flex min-h-[42px] w-full items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
                >
                  <span>
                    {lastVisitedLesson
                      ? "Continue Lesson"
                      : "Browse Lessons"}
                  </span>

                  <ArrowRight
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </Card>
          </div>

          {/* Detailed Progress Metrics */}

          <section
            aria-label="Detailed progress metrics"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >

            {/* Completed Courses */}

            <Card padding="sm" className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#64748B]">
                <span>Completed Courses</span>
                <Award
                  className="h-4 w-4 text-[#2563EB]"
                  aria-hidden="true"
                />
              </div>

              <p className="text-2xl font-bold tabular-nums text-[#0F172A]">
                {completedCoursesCount} / {coursesList.length}
              </p>
            </Card>

            {/* Completed Lessons */}

            <Card padding="sm" className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#64748B]">
                <span>Completed Lessons</span>
                <BookOpen
                  className="h-4 w-4 text-[#2563EB]"
                  aria-hidden="true"
                />
              </div>

              <p className="text-2xl font-bold tabular-nums text-[#0F172A]">
                {actualCompletedLessonsCount} / {lessonsList.length}
              </p>
            </Card>

            {/* Remaining Lessons */}

            <Card padding="sm" className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#64748B]">
                <span>Remaining Lessons</span>
                <BookOpen
                  className="h-4 w-4 text-[#F59E0B]"
                  aria-hidden="true"
                />
              </div>

              <p className="text-2xl font-bold tabular-nums text-[#0F172A]">
                {remainingLessonsCount}
              </p>
            </Card>

            {/* Completed Paragraphs */}

            <Card padding="sm" className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#64748B]">
                <span>Completed Paragraphs</span>
                <FileCheck2
                  className="h-4 w-4 text-[#14B8A6]"
                  aria-hidden="true"
                />
              </div>

              <p className="text-2xl font-bold tabular-nums text-[#0F172A]">
                {actualCompletedParagraphsCount} / {allParagraphs.length}
              </p>

              <p className="text-[11px] text-[#64748B]">
                Counted only after passing check
              </p>
            </Card>

            {/* Answered Questions */}

            <Card padding="sm" className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#64748B]">
                <span>Answered Questions</span>
                <HelpCircle
                  className="h-4 w-4 text-[#2563EB]"
                  aria-hidden="true"
                />
              </div>

              <p className="text-2xl font-bold tabular-nums text-[#0F172A]">
                {actualAnsweredCount} / {totalAvailableQuestions}
              </p>

              <p className="text-[11px] text-[#64748B]">
                {remainingQuestionsCount} questions remaining
              </p>

              <ProgressBar
                value={actualAnsweredCount}
                max={totalAvailableQuestions}
                label={`Question Completion (${questionCompletionPercentage}%)`}
                accentColor="#2563EB"
              />
            </Card>

            {/* Correct Answers */}

            <Card padding="sm" className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#64748B]">
                <span>Correct Answers</span>
                <CheckCircle2
                  className="h-4 w-4 text-[#14B8A6]"
                  aria-hidden="true"
                />
              </div>

              <p className="text-2xl font-bold tabular-nums text-[#0F766E]">
                {actualCorrectCount}
              </p>
            </Card>

            {/* Incorrect Answers */}

            <Card padding="sm" className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#64748B]">
                <span>Incorrect Answers</span>
                <XCircle
                  className="h-4 w-4 text-[#F59E0B]"
                  aria-hidden="true"
                />
              </div>

              <p className="text-2xl font-bold tabular-nums text-[#B45309]">
                {actualIncorrectCount}
              </p>
            </Card>

            {/* Hook Sync Status */}

            <Card padding="sm" className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#64748B]">
                <span>Hook Sync Status</span>
                <CheckCircle2
                  className="h-4 w-4 text-[#14B8A6]"
                  aria-hidden="true"
                />
              </div>

              <p className="text-xs font-semibold leading-6 text-[#0F172A]">
                Lessons: {completedLessonsCount} • Checks:{" "}
                {passedParagraphChecksCount} • Answered:{" "}
                {totalAnsweredQuestions} (✓ {correctAnswersCount} / ✕{" "}
                {incorrectAnswersCount})
              </p>
            </Card>
          </section>

          {/* Course Completion Breakdown */}

          <section
            aria-labelledby="course-breakdown-heading"
            className="space-y-4"
          >
            <h2
              id="course-breakdown-heading"
              className="text-xl font-bold text-[#0F172A]"
            >
              Course Completion Breakdown
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              {coursesList.map((course) => {
                const courseLessonIds = Array.isArray(course.lessonIds)
                  ? course.lessonIds.filter((id) =>
                      validLessonIds.has(id)
                    )
                  : lessonsList
                      .filter(
                        (lesson) => lesson.courseId === course.id
                      )
                      .map((lesson) => lesson.id);

                const doneInCourse = courseLessonIds.filter((id) =>
                  (progress.completedLessons || []).includes(id)
                ).length;

                const pct = calculatePercentage(
                  doneInCourse,
                  courseLessonIds.length
                );

                return (
                  <Card
                    key={course.id}
                    padding="md"
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-base font-bold text-[#0F172A]">
                        {course.title}
                      </h3>

                      <span className="text-xs font-semibold text-[#64748B]">
                        {doneInCourse}/{courseLessonIds.length} Lessons
                      </span>
                    </div>

                    <ProgressBar
                      value={doneInCourse}
                      max={courseLessonIds.length}
                      label={`${course.title} Progress (${pct}%)`}
                      accentColor={
                        pct === 100 ? "#14B8A6" : "#2563EB"
                      }
                    />
                  </Card>
                );
              })}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
