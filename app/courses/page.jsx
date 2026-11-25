
"use client";

import Link from "next/link";

import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Target,
  GraduationCap,
  Sparkles,
  Play,
  Layers,
  Clock3,
  Trophy,
  BookMarked,
  ChevronRight,
  CirclePlay,
} from "lucide-react";

import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import EmptyState from "@/components/shared/EmptyState";
import Loading from "@/components/shared/Loading";

import { COURSES } from "@/data/courses";
import { LESSONS } from "@/data/lessons";
import { useProgress } from "@/hooks/useProgress";
import { ROUTES } from "@/lib/constants";

const COURSE_STYLES = [
  {
    icon: BookOpen,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
    accent: "bg-blue-600",
    soft: "bg-blue-50",
    number: "01",
  },
  {
    icon: Layers,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-700",
    accent: "bg-violet-600",
    soft: "bg-violet-50",
    number: "02",
  },
  {
    icon: GraduationCap,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-700",
    accent: "bg-emerald-600",
    soft: "bg-emerald-50",
    number: "03",
  },
  {
    icon: Target,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
    accent: "bg-amber-600",
    soft: "bg-amber-50",
    number: "04",
  },
];

function CourseStatus({ completedCount, totalLessons, isComplete }) {
  if (isComplete) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
        <CheckCircle2 className="h-3.5 w-3.5" />
        Completed
      </span>
    );
  }

  if (completedCount > 0) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
        <Clock3 className="h-3.5 w-3.5" />
        In Progress
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600">
      <BookOpen className="h-3.5 w-3.5" />
      Not Started
    </span>
  );
}

export default function CoursesPage() {
  const {
    progress,
    isReady,
    getCourseProgressPercentage,
  } = useProgress();

  const coursesList = Array.isArray(COURSES) ? COURSES : [];
  const lessonsList = Array.isArray(LESSONS) ? LESSONS : [];

  if (!isReady) {
    return <Loading message="Loading courses..." />;
  }

  if (coursesList.length === 0) {
    return (
      <EmptyState
        title="No Courses Available"
        description="There are currently no courses configured in the curriculum."
        actionHref={ROUTES.home}
        actionLabel="Back to Home"
      />
    );
  }

  const completedLessons = Array.isArray(progress?.completedLessons)
    ? progress.completedLessons
    : [];

  const totalCourses = coursesList.length;

  const completedCourses = coursesList.filter((course) => {
    const ids = Array.isArray(course.lessonIds) ? course.lessonIds : [];

    const matched = lessonsList.filter(
      (lesson) =>
        lesson.courseId === course.id || ids.includes(lesson.id)
    );

    const effectiveIds =
      ids.length > 0 ? ids : matched.map((lesson) => lesson.id);

    return (
      effectiveIds.length > 0 &&
      effectiveIds.every((id) => completedLessons.includes(id))
    );
  }).length;

  const totalLessons = lessonsList.length;

  return (
    <main className="space-y-12 pb-8 sm:space-y-14">

      {/* HERO SECTION */}
      <section className="relative isolate overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-10 text-white shadow-xl sm:px-10 sm:py-14">

        <div className="pointer-events-none absolute -right-20 -top-32 -z-10 h-80 w-80 rounded-full bg-blue-600/30 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 left-1/3 -z-10 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.3fr_0.7fr]">

          <div className="max-w-2xl space-y-6">

            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-xs font-bold text-blue-300">
              <GraduationCap className="h-4 w-4" />
              Your Learning Curriculum
            </div>

            <div className="space-y-4">

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                Explore Your
                <span className="block text-blue-400">
                  Learning Journey.
                </span>
              </h1>

              <p className="max-w-xl text-sm leading-8 text-slate-300 sm:text-base">
                Browse structured programming courses, discover
                learning objectives, and build your knowledge
                through carefully organized lessons.
              </p>

            </div>

            <div className="flex flex-wrap gap-3">

              <a
                href="#course-list"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-blue-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:-translate-y-1 hover:bg-blue-400"
              >
                <Play className="h-4 w-4 fill-current" />
                Explore Courses
                <ArrowRight className="h-4 w-4" />
              </a>

              <Link
                href={ROUTES.dashboard}
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-1 hover:bg-white/10"
              >
                <Trophy className="h-4 w-4" />
                My Progress
              </Link>

            </div>

            <div className="flex flex-wrap gap-5 border-t border-white/10 pt-5 text-xs font-medium text-slate-400">

              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Organized Curriculum
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Learning Objectives
              </span>

            </div>
          </div>

          {/* HERO SUMMARY */}
          <div className="relative hidden lg:block">

            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-xl">

              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-400">
                    CURRICULUM OVERVIEW
                  </p>
                  <h2 className="mt-1 text-lg font-bold">
                    Your Courses
                  </h2>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/20 text-blue-300">
                  <BookMarked className="h-6 w-6" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">

                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <p className="text-xs text-slate-400">
                    Available Courses
                  </p>
                  <p className="mt-2 text-3xl font-extrabold text-white">
                    {totalCourses}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <p className="text-xs text-slate-400">
                    Total Lessons
                  </p>
                  <p className="mt-2 text-3xl font-extrabold text-white">
                    {totalLessons}
                  </p>
                </div>

              </div>

              <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">

                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">
                    Completed Courses
                  </span>

                  <Trophy className="h-5 w-5 text-emerald-400" />
                </div>

                <p className="mt-2 text-3xl font-extrabold text-emerald-300">
                  {completedCourses}
                  <span className="ml-2 text-sm font-medium text-emerald-200/70">
                    / {totalCourses}
                  </span>
                </p>

                <p className="mt-1 text-xs text-emerald-100/70">
                  Keep learning to complete your curriculum.
                </p>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* COURSE OVERVIEW */}
      <section className="grid gap-4 sm:grid-cols-3">

        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Layers className="h-6 w-6" />
          </div>

          <div>
            <p className="text-xs font-medium text-slate-500">
              Available Courses
            </p>
            <p className="mt-1 text-2xl font-extrabold text-slate-900">
              {totalCourses}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
            <BookOpen className="h-6 w-6" />
          </div>

          <div>
            <p className="text-xs font-medium text-slate-500">
              Total Lessons
            </p>
            <p className="mt-1 text-2xl font-extrabold text-slate-900">
              {totalLessons}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="h-6 w-6" />
          </div>

          <div>
            <p className="text-xs font-medium text-slate-500">
              Completed Courses
            </p>
            <p className="mt-1 text-2xl font-extrabold text-slate-900">
              {completedCourses}
            </p>
          </div>
        </div>

      </section>

      {/* COURSE LIST */}
      <section
        id="course-list"
        className="scroll-mt-24 space-y-7"
      >

        <div className="flex flex-wrap items-end justify-between gap-4">

          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600">
              <Sparkles className="h-4 w-4" />
              Discover & Learn
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Available Courses
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-7 text-slate-500">
              Choose a course, explore its learning objectives,
              and continue building your programming skills.
            </p>
          </div>

          <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600">
            {totalCourses} {totalCourses === 1 ? "Course" : "Courses"}
          </span>

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          {coursesList.map((course, index) => {

            const courseLessonIds = Array.isArray(course.lessonIds)
              ? course.lessonIds
              : [];

            const matchedLessons = lessonsList.filter(
              (lesson) =>
                lesson.courseId === course.id ||
                courseLessonIds.includes(lesson.id)
            );

            const effectiveLessonIds =
              courseLessonIds.length > 0
                ? courseLessonIds
                : matchedLessons.map((lesson) => lesson.id);

            const courseLessons = lessonsList.filter((lesson) =>
              effectiveLessonIds.includes(lesson.id)
            );

            const progressPct =
              getCourseProgressPercentage(effectiveLessonIds);

            const completedCount = effectiveLessonIds.filter((id) =>
              completedLessons.includes(id)
            ).length;

            const isCourseComplete =
              effectiveLessonIds.length > 0 &&
              completedCount === effectiveLessonIds.length;

            const objectives = Array.isArray(course.learningObjectives)
              ? course.learningObjectives
              : [];

            const firstLesson = courseLessons[0];

            const lessonsHref = `${ROUTES.lessons}?course=${encodeURIComponent(
              course.id
            )}`;

            const style = COURSE_STYLES[index % COURSE_STYLES.length];

            const Icon = style.icon;

            return (
              <Card
                key={course.id}
                as="article"
                padding="none"
                className="group flex flex-col justify-between overflow-hidden border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5"
              >

                {/* CARD TOP ACCENT */}
                <div className={`h-1.5 w-full ${style.accent}`} />

                <div className="flex flex-1 flex-col justify-between gap-6 p-6">

                  <div className="space-y-5">

                    {/* CARD HEADER */}
                    <div className="flex items-start justify-between gap-3">

                      <div className="flex items-center gap-3">

                        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${style.iconBg} ${style.iconColor} transition-transform duration-300 group-hover:scale-105`}>
                          <Icon className="h-7 w-7" />
                        </div>

                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            COURSE {String(index + 1).padStart(2, "0")}
                          </p>

                          <span className="mt-1 inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                            {course.level || "Foundational"}
                          </span>
                        </div>

                      </div>

                      <CourseStatus
                        completedCount={completedCount}
                        totalLessons={effectiveLessonIds.length}
                        isComplete={isCourseComplete}
                      />

                    </div>

                    {/* COURSE DETAILS */}
                    <div>
                      <h3 className="text-xl font-extrabold leading-snug text-slate-900 transition-colors group-hover:text-blue-700">
                        {course.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-slate-500">
                        {course.description}
                      </p>
                    </div>

                    {/* LESSON COUNT */}
                    <div className="flex flex-wrap items-center gap-4 border-y border-slate-100 py-3">

                      <span className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                        <BookOpen className="h-4 w-4 text-blue-600" />
                        {effectiveLessonIds.length}{" "}
                        {effectiveLessonIds.length === 1 ? "Lesson" : "Lessons"}
                      </span>

                      <span className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                        <Target className="h-4 w-4 text-emerald-600" />
                        {objectives.length} Learning Objectives
                      </span>

                    </div>

                    {/* LEARNING OBJECTIVES */}
                    {objectives.length > 0 && (
                      <div className={`rounded-2xl ${style.soft} p-4`}>

                        <div className="mb-3 flex items-center gap-2">
                          <Target className={`h-4 w-4 ${style.iconColor}`} />

                          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
                            What You Will Learn
                          </h4>
                        </div>

                        <ul className="space-y-2.5">
                          {objectives.map((objective, objectiveIndex) => (
                            <li
                              key={objectiveIndex}
                              className="flex items-start gap-2.5 text-sm leading-6 text-slate-600"
                            >
                              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
                              <span>{objective}</span>
                            </li>
                          ))}
                        </ul>

                      </div>
                    )}

                  </div>

                  {/* PROGRESS & ACTIONS */}
                  <div className="space-y-5 border-t border-slate-100 pt-5">

                    <div className="space-y-3">

                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs font-bold text-slate-700">
                          Your Course Progress
                        </span>

                        <span className={`text-sm font-extrabold tabular-nums ${
                          isCourseComplete
                            ? "text-emerald-600"
                            : "text-blue-600"
                        }`}>
                          {Math.round(progressPct)}%
                        </span>
                      </div>

                      <ProgressBar
                        value={progressPct}
                        max={100}
                        label={`${completedCount} of ${effectiveLessonIds.length} lessons completed`}
                        accentColor={
                          isCourseComplete ? "#14B8A6" : "#2563EB"
                        }
                      />

                    </div>

                    {effectiveLessonIds.length > 0 ? (
                      <div className="grid gap-3">

                        <Link
                          href={lessonsHref}
                          className="group/button inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg"
                        >
                          <BookOpen className="h-4 w-4" />
                          View Course Lessons
                          <ArrowRight className="h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                        </Link>

                        {firstLesson && (
                          <Link
                            href={`${ROUTES.lessons}/${encodeURIComponent(
                              firstLesson.slug || firstLesson.id
                            )}`}
                            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                          >
                            <CirclePlay className="h-4 w-4" />
                            Start First Lesson
                          </Link>
                        )}

                      </div>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="inline-flex min-h-[48px] w-full cursor-not-allowed items-center justify-center rounded-xl bg-slate-100 px-5 py-3 text-sm font-bold text-slate-400"
                      >
                        No Lessons Available
                      </button>
                    )}

                  </div>
                </div>

              </Card>
            );
          })}

        </div>

      </section>

      {/* BOTTOM CTA */}
      <section>
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 px-6 py-10 text-center text-white shadow-xl shadow-blue-900/15 sm:px-10 sm:py-12">

          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-indigo-300/20 blur-3xl" />

          <div className="relative mx-auto max-w-2xl space-y-5">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
              <GraduationCap className="h-7 w-7" />
            </div>

            <h2 className="text-2xl font-extrabold sm:text-3xl">
              Every Great Skill Starts With One Lesson.
            </h2>

            <p className="text-sm leading-8 text-blue-100">
              Choose your course, explore the learning materials,
              and take the next step toward mastering programming.
            </p>

            <div className="flex justify-center pt-1">

              <Link
                href={ROUTES.lessons}
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-white px-7 py-3 text-sm font-extrabold text-blue-700 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:bg-blue-50"
              >
                Start Learning
                <ArrowRight className="h-4 w-4" />
              </Link>

            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
