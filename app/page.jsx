
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  BarChart3,
  Layers,
  Sparkles,
  GraduationCap,
  Target,
  Play,
  Brain,
  Zap,
  ChevronRight,
} from "lucide-react";

import Card from "@/components/ui/Card";

import { COURSES } from "@/data/courses";

import {
  PLATFORM_NAME,
  PLATFORM_DESCRIPTION,
  ROUTES,
} from "@/lib/constants";

const LEARNING_STEPS = [
  {
    step: "01",
    title: "Read Focused Paragraphs",
    description:
      "Explore clear, structured explanations that make programming concepts easier to understand.",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-700",
    line: "bg-blue-500",
  },
  {
    step: "02",
    title: "Test Your Understanding",
    description:
      "Answer short comprehension questions after each paragraph and check what you have learned.",
    icon: ClipboardCheck,
    color: "bg-violet-100 text-violet-700",
    line: "bg-violet-500",
  },
  {
    step: "03",
    title: "Learn From Feedback",
    description:
      "Review explanations, correct mistakes, and retry questions until you understand each concept.",
    icon: CheckCircle2,
    color: "bg-emerald-100 text-emerald-700",
    line: "bg-emerald-500",
  },
];

const FEATURE_ITEMS = [
  {
    icon: Target,
    title: "Focused Learning",
    description: "Study one concept at a time.",
  },
  {
    icon: Brain,
    title: "Active Recall",
    description: "Practice after every paragraph.",
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    description: "Understand mistakes as you learn.",
  },
];

const PRIMARY_BUTTON =
  "inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/25 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300";

const SECONDARY_BUTTON =
  "inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-100";

export default function HomePage() {
  const coursesList = Array.isArray(COURSES) ? COURSES : [];

  return (
    <main className="space-y-16 pb-8 sm:space-y-20">

      {/* HERO SECTION */}
      <section
        aria-labelledby="hero-heading"
        className="relative isolate overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-12 text-white shadow-2xl shadow-slate-900/10 sm:px-10 sm:py-16 lg:px-14 lg:py-20"
      >
        {/* Background decoration */}
        <div className="pointer-events-none absolute -right-24 -top-32 -z-10 h-96 w-96 rounded-full bg-blue-600/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-1/4 -z-10 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />

        <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_0.7fr]">

          <div className="max-w-2xl space-y-7">

            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-xs font-bold text-blue-300">
              <Sparkles className="h-4 w-4" />
              {PLATFORM_NAME}
            </div>

            <div className="space-y-5">
              <h1
                id="hero-heading"
                className="text-4xl font-extrabold leading-[1.2] tracking-tight sm:text-5xl lg:text-6xl"
              >
                Build Your
                <span className="block text-blue-400">
                  Programming
                </span>
                Foundations.
              </h1>

              <p className="max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                {PLATFORM_DESCRIPTION}
              </p>

              <p className="max-w-xl text-sm leading-7 text-slate-400">
                Learn essential programming concepts through structured
                lessons, interactive questions, and meaningful feedback.
                Move forward one concept at a time.
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">

              <Link
                href={ROUTES.lessons}
                className="inline-flex min-h-[54px] items-center justify-center gap-3 rounded-xl bg-blue-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:-translate-y-1 hover:bg-blue-400 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
              >
                <Play className="h-4 w-4 fill-current" />
                Start Learning
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href={ROUTES.courses}
                className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-1 hover:border-white/30 hover:bg-white/10"
              >
                Explore Courses
                <ChevronRight className="h-4 w-4" />
              </Link>

            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-xs font-medium text-slate-400">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Structured Lessons
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Interactive Practice
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Progress Tracking
              </span>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative mx-auto hidden w-full max-w-sm lg:block">

            <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-xl">

              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs font-medium text-slate-400">
                    YOUR LEARNING SPACE
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-white">
                    Learning Overview
                  </h3>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/20 text-blue-300">
                  <GraduationCap className="h-6 w-6" />
                </div>
              </div>

              <div className="space-y-4 py-6">

                <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/20 text-blue-300">
                      <BookOpen className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-white">
                        Programming Basics
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        Build your foundation
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/20 text-violet-300">
                      <ClipboardCheck className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-white">
                        Knowledge Checks
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        Practice what you learn
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-emerald-400" />

                    <div>
                      <p className="text-sm font-bold text-white">
                        Learn at Your Pace
                      </p>
                      <p className="mt-1 text-xs text-emerald-200/70">
                        Understand. Practice. Improve.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              <div className="rounded-xl bg-blue-500 px-4 py-3 text-center text-sm font-bold text-white shadow-lg shadow-blue-500/20">
                Your Learning Journey Starts Here
              </div>

            </div>

            <div className="absolute -bottom-6 -left-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/90 p-4 shadow-xl backdrop-blur-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
                <Sparkles className="h-5 w-5" />
              </div>

              <div>
                <p className="text-xs font-bold text-white">
                  Keep Improving
                </p>
                <p className="mt-1 text-[10px] text-slate-400">
                  One step at a time
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PLATFORM FEATURES */}
      <section aria-label="Platform features">
        <div className="grid gap-4 sm:grid-cols-3">

          {FEATURE_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon className="h-6 w-6" />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}

        </div>
      </section>

      {/* COURSES */}
      <section
        aria-labelledby="courses-heading"
        className="space-y-7"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">

          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600">
              <Layers className="h-4 w-4" />
              Learning Curriculum
            </div>

            <h2
              id="courses-heading"
              className="text-3xl font-extrabold tracking-tight text-slate-900"
            >
              Explore Our Courses
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-7 text-slate-500">
              Discover structured learning materials designed to
              develop your programming knowledge step by step.
            </p>
          </div>

          <Link
            href={ROUTES.courses}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            View All Courses
            <ArrowRight className="h-4 w-4" />
          </Link>

        </div>

        {coursesList.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">

            {coursesList.map((course, index) => {
              const lessonCount = Array.isArray(course.lessonIds)
                ? course.lessonIds.length
                : 0;

              const objectives = Array.isArray(course.learningObjectives)
                ? course.learningObjectives
                : [];

              return (
                <Card
                  key={course.id}
                  padding="md"
                  className="group flex flex-col justify-between gap-6 overflow-hidden border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5"
                >
                  <div className="space-y-5">

                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                        <BookOpen className="h-6 w-6" />
                      </div>

                      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600">
                        {course.level || "Foundational"}
                      </span>
                    </div>

                    <div>
                      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-blue-600">
                        COURSE {String(index + 1).padStart(2, "0")}
                      </p>

                      <h3 className="text-xl font-extrabold text-slate-900">
                        {course.title}
                      </h3>

                      <p className="mt-2 text-sm leading-7 text-slate-500">
                        {course.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 border-y border-slate-100 py-3 text-xs font-semibold text-slate-500">
                      <BookOpen className="h-4 w-4 text-blue-600" />
                      {lessonCount} {lessonCount === 1 ? "Lesson" : "Lessons"}
                    </div>

                    {objectives.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          Learning Objectives
                        </h4>

                        <ul className="space-y-2.5">
                          {objectives.map((objective, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-sm leading-6 text-slate-600"
                            >
                              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-500" />
                              <span>{objective}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  </div>

                  <Link
                    href={ROUTES.lessons}
                    className="group/link inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-blue-600"
                  >
                    Open Lessons
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>

                </Card>
              );
            })}

          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
            <BookOpen className="mx-auto h-10 w-10 text-slate-400" />
            <h3 className="mt-4 font-bold text-slate-800">
              No Courses Available Yet
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              New learning materials will appear here soon.
            </p>
          </div>
        )}
      </section>

      {/* HOW LEARNING WORKS */}
      <section
        aria-labelledby="how-it-works-heading"
        className="space-y-8"
      >
        <div className="max-w-2xl">
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600">
            <Sparkles className="h-4 w-4" />
            Your Learning Method
          </div>

          <h2
            id="how-it-works-heading"
            className="text-3xl font-extrabold tracking-tight text-slate-900"
          >
            A Smarter Way to Learn
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            Learning is more effective when you actively engage with
            information. Our platform turns every lesson into a series
            of simple, meaningful steps.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">

          {LEARNING_STEPS.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.step}
                className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className={`absolute left-0 top-0 h-1 w-full ${item.line}`}
                />

                <div className="mb-6 flex items-center justify-between">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.color}`}>
                    <Icon className="h-7 w-7" />
                  </div>

                  <span className="text-3xl font-black tracking-tight text-slate-100">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {item.description}
                </p>

              </div>
            );
          })}

        </div>
      </section>

      {/* PROGRESS TRACKING */}
      <section aria-labelledby="progress-heading">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-10">

          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-50 blur-3xl" />

          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">

            <div className="max-w-2xl space-y-4">

              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                <BarChart3 className="h-4 w-4" />
                Learning Analytics
              </div>

              <h2
                id="progress-heading"
                className="text-3xl font-extrabold tracking-tight text-slate-900"
              >
                Your Progress,
                <span className="block text-blue-600">
                  Your Achievement.
                </span>
              </h2>

              <p className="text-sm leading-8 text-slate-500 sm:text-base">
                Keep track of your actual study activity. Review your
                answered questions, passed checks, completed lessons,
                and recently visited content through your personal
                dashboard.
              </p>

              <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold text-slate-600">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Saved Progress
                </span>

                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Answer History
                </span>

                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Lesson Tracking
                </span>
              </div>

            </div>

            <div className="relative w-full shrink-0 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:max-w-xs">

              <div className="mb-5 flex items-center justify-between">
                <span className="text-sm font-bold text-slate-800">
                  Your Dashboard
                </span>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <BarChart3 className="h-5 w-5" />
                </div>
              </div>

              <p className="text-sm leading-6 text-slate-500">
                All your learning activity in one organized place.
              </p>

              <Link
                href={ROUTES.dashboard}
                className="mt-5 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/15 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                View Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>

            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section aria-labelledby="final-cta-heading">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 px-6 py-12 text-center text-white shadow-xl shadow-blue-900/15 sm:px-10 sm:py-14">

          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-28 -right-16 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl" />

          <div className="relative mx-auto max-w-2xl space-y-5">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
              <GraduationCap className="h-7 w-7" />
            </div>

            <h2
              id="final-cta-heading"
              className="text-3xl font-extrabold tracking-tight sm:text-4xl"
            >
              Ready to Start Learning?
            </h2>

            <p className="text-sm leading-8 text-blue-100 sm:text-base">
              Take the first step toward understanding programming.
              Explore the lessons, practice your knowledge, and build
              your skills one step at a time.
            </p>

            <div className="flex justify-center pt-2">
              <Link
                href={ROUTES.lessons}
                className="inline-flex min-h-[54px] items-center justify-center gap-3 rounded-xl bg-white px-8 py-3.5 text-sm font-extrabold text-blue-700 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:bg-blue-50 hover:shadow-xl"
              >
                Start Your First Lesson
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
