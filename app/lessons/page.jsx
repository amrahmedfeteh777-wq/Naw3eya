
"use client";

import Link from "next/link";

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  PlayCircle,
  ExternalLink,
  Lightbulb,
  Code2,
  Database,
  GraduationCap,
  ClipboardCheck,
} from "lucide-react";

import Card from "@/components/ui/Card";

const SOURCE_URL = "https://na3aya-app-v1fl.vercel.app";

const LOCAL_ASSESSMENT_URL = "/lessons/naw3eya-homepage-introduction";

const LESSONS = [
  {
    id: "lesson-1",
    number: "1",
    title: "Programming and Artificial Intelligence",
    subtitle:
      "An introduction to modern languages and how to communicate with computers.",
    videoTitle: "Introduction Videos",
    videoUrl:
      "https://www.youtube.com/embed/MwQEaCsS6UM?si=hX5T0_Ht6X5hMA0o",
    sourceUrl: `${SOURCE_URL}/units/unit1/lesson1`,
  },
  {
    id: "lesson-2",
    number: "2",
    title: "Data Types and Their Properties",
    subtitle:
      "Learn how computers classify information to organize memory.",
    videoTitle: "Understanding Data Types",
    videoUrl:
      "https://www.youtube.com/embed/r0OuA1Q8jOo?si=LFZt8XtEQHoRfgMF",
    description:
      "A comprehensive explanation of data types and how they are used in programming.",
    sourceUrl: `${SOURCE_URL}/units/unit1/lesson2`,
  },
];

const DATA_TYPES = [
  {
    name: "Integer",
    english: "Integer",
    examples: "10, -4, +66",
    description: "Used to represent whole numbers.",
  },
  {
    name: "Real / Decimal",
    english: "Real / Decimal",
    examples: "56.5, -88.32, +51.22",
    description:
      "Used to represent numbers containing decimal fractions.",
  },
  {
    name: "Text Data",
    english: "String",
    examples: '"Ahmed", "Hello"',
    description: "Used to store words and sentences.",
  },
  {
    name: "Logical Data",
    english: "Boolean",
    examples: "True / False",
    description: "Used to represent logical values.",
  },
  {
    name: "Character Data",
    english: "Character",
    examples: "'A', 'B', '7'",
    description: "Used to represent a single character.",
  },
];

function SectionTitle({ icon: Icon, children, description }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Icon className="h-5 w-5" />
        </div>

        <h3 className="text-xl font-bold text-slate-900">
          {children}
        </h3>
      </div>

      {description && (
        <p className="mt-3 text-sm leading-7 text-slate-600">
          {description}
        </p>
      )}
    </div>
  );
}

function ResourceLink({
  href,
  children,
  icon: Icon = ExternalLink,
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-50"
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span>{children}</span>
      <ExternalLink className="h-3.5 w-3.5 opacity-60" />
    </a>
  );
}

function VideoSection({ title, videoUrl }) {
  return (
    <section className="mt-8 space-y-4">
      <h3 className="flex items-center gap-2 text-xl font-bold text-slate-900">
        <PlayCircle className="h-6 w-6 text-red-600" />
        {title}
      </h3>

      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={videoUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </section>
  );
}

function LessonHeader({ number, title, subtitle }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="rounded-full bg-blue-50 px-4 py-2 text-xs font-bold text-blue-700">
          Unit 1 / Lesson {number}
        </span>

        <span className="flex items-center gap-2 text-sm text-slate-500">
          <BookOpen className="h-4 w-4" />
          Learning Content
        </span>
      </div>

      <div>
        <h2 className="text-2xl font-extrabold leading-relaxed text-slate-900 sm:text-3xl">
          {title}
        </h2>

        <p className="mt-2 text-base leading-8 text-slate-600">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

function LessonOne() {
  const lesson = LESSONS[0];

  return (
    <div id="lesson-1" className="scroll-mt-24">
      <Card padding="lg" className="space-y-8">
        <LessonHeader
          number={lesson.number}
          title={lesson.title}
          subtitle={lesson.subtitle}
        />

        <div className="h-px bg-slate-200" />

        <section>
          <SectionTitle icon={Code2}>
            What Is Programming?
          </SectionTitle>

          <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5 sm:p-6">
            <p className="text-base leading-9 text-slate-800">
              Programming is the process of writing{" "}
              <strong className="font-bold text-blue-700">
                commands and instructions
              </strong>{" "}
              that a computer understands in order to perform
              specific tasks. Without these instructions, a computer
              cannot perform any function.
            </p>
          </div>
        </section>

        <div className="h-px bg-slate-200" />

        <VideoSection
          videoUrl={lesson.videoUrl}
          title={lesson.videoTitle}
        />

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="mb-3 text-sm font-bold text-slate-800">
            Watch the lesson directly or on YouTube:
          </p>

          <ResourceLink href={lesson.videoUrl} icon={PlayCircle}>
            Watch on YouTube
          </ResourceLink>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm text-slate-500">
            Finished Lesson 1? Continue to the next lesson.
          </span>

          <a
            href="#lesson-2"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Next Lesson: Data Types
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="text-xs text-slate-400">
          <a
            href={lesson.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600"
          >
            View Original Lesson
          </a>
        </div>
      </Card>
    </div>
  );
}

function DataTypesSection() {
  return (
    <section className="space-y-5">
      <SectionTitle
        icon={Database}
        description="Simple data types are the basic building blocks of any program. Computers handle numbers and text as different types of information."
      >
        Simple Data Types
      </SectionTitle>

      <div className="grid gap-4 sm:grid-cols-2">
        {DATA_TYPES.map((item) => (
          <div
            key={item.english}
            className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="font-bold text-slate-900">
                {item.name}
              </h4>

              <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                {item.english}
              </span>
            </div>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              {item.description}
            </p>

            <div className="mt-4 rounded-lg bg-slate-50 p-3">
              <p className="text-xs font-semibold text-slate-500">
                Examples
              </p>

              <code
                dir="ltr"
                className="mt-2 block text-sm font-bold text-slate-800"
              >
                {item.examples}
              </code>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ConstantsSection() {
  return (
    <section className="space-y-5">
      <SectionTitle icon={Lightbulb}>
        Constants and Variables
      </SectionTitle>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
        <div className="mb-3 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-amber-600" />

          <h4 className="font-bold text-amber-900">
            Quick Fact
          </h4>
        </div>

        <p className="text-base leading-9 text-slate-800">
          A Constant is a memory location whose value does not
          change during program execution, such as the value of
          Pi (π) in mathematics.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <ResourceLink
          href="https://youtu.be/r0OuA1Q8jOo"
          icon={PlayCircle}
        >
          Data Types Explanation on YouTube
        </ResourceLink>

        <ResourceLink
          href="https://www.youtube.com/playlist?list=PLr0OuA1Q8jOo"
          icon={PlayCircle}
        >
          Educational Video Playlist
        </ResourceLink>
      </div>
    </section>
  );
}

function LessonTwo() {
  const lesson = LESSONS[1];

  return (
    <div id="lesson-2" className="scroll-mt-24">
      <Card padding="lg" className="space-y-8">
        <LessonHeader
          number={lesson.number}
          title={lesson.title}
          subtitle={lesson.subtitle}
        />

        <div className="h-px bg-slate-200" />

        <VideoSection
          videoUrl={lesson.videoUrl}
          title={lesson.videoTitle}
        />

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm leading-7 text-slate-700">
            {lesson.description}
          </p>
        </div>

        <div className="h-px bg-slate-200" />

        <DataTypesSection />

        <div className="h-px bg-slate-200" />

        <ConstantsSection />

        <div
          id="assessment"
          className="scroll-mt-24 rounded-2xl border border-blue-200 bg-blue-50 p-5"
        >
          <div className="flex items-center gap-3">
            <ClipboardCheck className="h-6 w-6 text-blue-700" />

            <div>
              <h3 className="font-bold text-slate-900">
                Test Your Knowledge
              </h3>

              <p className="mt-1 text-sm leading-7 text-slate-600">
                Test your understanding of the lesson by completing
                the assessment on our learning platform.
              </p>
            </div>
          </div>

          <Link
            href={LOCAL_ASSESSMENT_URL}
            className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Start the Assessment
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <a
            href="#lesson-1"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Lesson 1
          </a>

          <a
            href={lesson.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800"
          >
            View Original Lesson
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </Card>
    </div>
  );
}

export default function LessonsPage() {
  return (
    <div dir="ltr" className="space-y-8">
      <section className="overflow-hidden rounded-2xl bg-slate-900 p-6 text-white sm:p-8">
        <div className="flex items-center gap-3 text-blue-300">
          <GraduationCap className="h-6 w-6" />

          <span className="text-sm font-bold">
            Naw3eya Learning Platform
          </span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold leading-relaxed sm:text-4xl">
          Programming and Artificial Intelligence
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-8 text-slate-300">
          Unit 1: An introduction to programming, communication
          with computers, and understanding data types and
          their properties.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#lesson-1"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Start Lesson 1
            <ArrowRight className="h-4 w-4" />
          </a>

          <a
            href="#lesson-2"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
          >
            Lesson 2
            <ArrowRight className="h-4 w-4" />
          </a>

          <a
            href="#assessment"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-blue-400 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20"
          >
            <ClipboardCheck className="h-4 w-4" />
            Take the Assessment
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-extrabold text-slate-900">
          Unit 1 Content
        </h2>

        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
          2 Lessons
        </span>
      </div>

      <LessonOne />

      <LessonTwo />

      <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-400">
        All Rights Reserved © 2026 - Naw3eya Platform
      </footer>
    </div>
  );
}
