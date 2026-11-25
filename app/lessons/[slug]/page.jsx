
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  RotateCcw,
  Target,
} from "lucide-react";

import Card from "@/components/ui/Card";
import Loading from "@/components/shared/Loading";

import { LESSONS } from "@/data/lessons";
import { useProgress } from "@/hooks/useProgress";

// --------------------------------------------------
// Exam Question Bank
// --------------------------------------------------

const EXAM_QUESTIONS = [
  {
    id: "unit1-exam-01",
    category: "programming",
    prompt: "What is the process of writing instructions that a computer can understand?",
    options: [
      { id: "a", text: "Design" },
      { id: "b", text: "Programming" },
      { id: "c", text: "Artificial Intelligence" },
      { id: "d", text: "Data Analysis" },
    ],
    correctOptionId: "b",
    explanation:
      "Programming is the process of writing commands and instructions that tell a computer how to perform specific tasks.",
  },
  {
    id: "unit1-exam-02",
    category: "programming",
    prompt: "Why does a computer need programming instructions?",
    options: [
      { id: "a", text: "To perform specific tasks" },
      { id: "b", text: "To increase its physical size" },
      { id: "c", text: "To change its hardware" },
      { id: "d", text: "To stop processing information" },
    ],
    correctOptionId: "a",
    explanation:
      "A computer follows instructions to process information and perform the tasks required by the user.",
  },
  {
    id: "unit1-exam-03",
    category: "data",
    prompt: "Which data type is used to store whole numbers such as 10, -4, and 66?",
    options: [
      { id: "a", text: "String" },
      { id: "b", text: "Boolean" },
      { id: "c", text: "Integer" },
      { id: "d", text: "Character" },
    ],
    correctOptionId: "c",
    explanation:
      "Integer represents whole numbers without decimal fractions.",
  },
  {
    id: "unit1-exam-04",
    category: "data",
    prompt: "Which data type is suitable for storing the value 56.5?",
    options: [
      { id: "a", text: "Integer" },
      { id: "b", text: "Real / Decimal" },
      { id: "c", text: "Boolean" },
      { id: "d", text: "Character" },
    ],
    correctOptionId: "b",
    explanation:
      "Real or Decimal data types represent numbers that contain decimal fractions.",
  },
  {
    id: "unit1-exam-05",
    category: "data",
    prompt: "Which data type is used to store words and sentences such as 'Programming'?",
    options: [
      { id: "a", text: "Integer" },
      { id: "b", text: "String" },
      { id: "c", text: "Boolean" },
      { id: "d", text: "Character" },
    ],
    correctOptionId: "b",
    explanation:
      "String is used to store text, including words, sentences, and sequences of characters.",
  },
  {
    id: "unit1-exam-06",
    category: "data",
    prompt: "Which data type represents logical values?",
    options: [
      { id: "a", text: "String" },
      { id: "b", text: "Integer" },
      { id: "c", text: "Boolean" },
      { id: "d", text: "Real" },
    ],
    correctOptionId: "c",
    explanation:
      "Boolean represents logical values, commonly True and False.",
  },
  {
    id: "unit1-exam-07",
    category: "data",
    prompt: "Which data type stores a single character such as 'A' or '7'?",
    options: [
      { id: "a", text: "Character" },
      { id: "b", text: "String" },
      { id: "c", text: "Integer" },
      { id: "d", text: "Dictionary" },
    ],
    correctOptionId: "a",
    explanation:
      "Character represents one individual character, such as a letter, digit, or symbol.",
  },
  {
    id: "unit1-exam-08",
    category: "data",
    prompt: "Which of the following is an example of a Boolean value?",
    options: [
      { id: "a", text: "Ahmed" },
      { id: "b", text: "25.5" },
      { id: "c", text: "True" },
      { id: "d", text: "'A'" },
    ],
    correctOptionId: "c",
    explanation:
      "True and False are the two common Boolean values.",
  },
  {
    id: "unit1-exam-09",
    category: "data",
    prompt: "Which data structure stores information as key-value pairs?",
    options: [
      { id: "a", text: "Array" },
      { id: "b", text: "Dictionary" },
      { id: "c", text: "Integer" },
      { id: "d", text: "Character" },
    ],
    correctOptionId: "b",
    explanation:
      "A Dictionary stores data using key-value pairs, allowing values to be accessed through their keys.",
  },
  {
    id: "unit1-exam-10",
    category: "data",
    prompt: "What is the main purpose of an Array?",
    options: [
      { id: "a", text: "To store multiple values in an organized collection" },
      { id: "b", text: "To store only logical values" },
      { id: "c", text: "To represent a single character" },
      { id: "d", text: "To execute computer instructions" },
    ],
    correctOptionId: "a",
    explanation:
      "An Array is a data structure used to organize multiple values in a collection.",
  },
  {
    id: "unit1-exam-11",
    category: "data",
    prompt: "What is a constant in programming?",
    options: [
      { id: "a", text: "A value that changes continuously" },
      {
        id: "b",
        text: "A memory location whose value does not change during execution",
      },
      { id: "c", text: "A type of computer hardware" },
      { id: "d", text: "A command used to delete data" },
    ],
    correctOptionId: "b",
    explanation:
      "A constant stores a value that remains unchanged during program execution.",
  },
  {
    id: "unit1-exam-12",
    category: "data",
    prompt: "What is a variable in programming?",
    options: [
      {
        id: "a",
        text: "A named storage location whose value can change",
      },
      { id: "b", text: "A value that can never change" },
      { id: "c", text: "A computer screen" },
      { id: "d", text: "A programming language only" },
    ],
    correctOptionId: "a",
    explanation:
      "A variable is a named storage location used to hold a value that may change while a program runs.",
  },
  {
    id: "unit1-exam-13",
    category: "data",
    prompt: "What is the purpose of the Size property in data?",
    options: [
      { id: "a", text: "To improve the computer's screen resolution" },
      { id: "b", text: "To organize computer memory usage" },
      { id: "c", text: "To change the programming language" },
      { id: "d", text: "To create new hardware" },
    ],
    correctOptionId: "b",
    explanation:
      "Size describes the amount of memory required to store a data value.",
  },
  {
    id: "unit1-exam-14",
    category: "data",
    prompt: "Which of the following is a String value?",
    options: [
      { id: "a", text: "100" },
      { id: "b", text: "False" },
      { id: "c", text: '"Hello World"' },
      { id: "d", text: "45.7" },
    ],
    correctOptionId: "c",
    explanation:
      "Text enclosed in quotation marks is commonly represented as a String.",
  },
  {
    id: "unit1-exam-15",
    category: "data",
    prompt: "Which statement about data types is correct?",
    options: [
      { id: "a", text: "All data must be stored as text" },
      {
        id: "b",
        text: "Data types help classify and organize information",
      },
      { id: "c", text: "Data types are used only in computer games" },
      { id: "d", text: "Data types have no effect on memory" },
    ],
    correctOptionId: "b",
    explanation:
      "Data types classify information and help a computer determine how values should be stored and processed.",
  },
];

// --------------------------------------------------
// Helpers
// --------------------------------------------------

function findLessonByKeywords(keywords, fallbackIndex) {
  const match = LESSONS.find((lesson) => {
    const text = `${lesson.title || ""} ${lesson.summary || ""} ${
      lesson.slug || ""
    }`.toLowerCase();

    return keywords.some((keyword) =>
      text.includes(keyword.toLowerCase())
    );
  });

  return match || LESSONS[fallbackIndex] || LESSONS[0] || null;
}

// --------------------------------------------------
// Exam Page
// --------------------------------------------------

export default function ExamPage() {
  const { progress, isReady, submitQuestionAnswer } = useProgress();

  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [validationError, setValidationError] = useState("");

  const programmingLesson = useMemo(
    () =>
      findLessonByKeywords(
        ["programming", "artificial intelligence", "البرمجة"],
        0
      ),
    []
  );

  const dataLesson = useMemo(
    () =>
      findLessonByKeywords(
        ["data type", "data types", "أنواع البيانات"],
        1
      ),
    []
  );

  const answeredCount = Object.keys(answers).length;

  const savedAnswerCount = EXAM_QUESTIONS.filter(
    (question) => progress.answeredQuestions?.[question.id]
  ).length;

  const correctCount = result?.correctCount ?? 0;

  const percentage = result
    ? Math.round((correctCount / EXAM_QUESTIONS.length) * 100)
    : 0;

  // --------------------------------------------------
  // Select Answer
  // --------------------------------------------------

  const handleSelectAnswer = (questionId, optionId) => {
    if (result) return;

    setAnswers((previous) => ({
      ...previous,
      [questionId]: optionId,
    }));

    if (validationError) {
      setValidationError("");
    }
  };

  // --------------------------------------------------
  // Submit Exam
  // --------------------------------------------------

  const handleSubmit = () => {
    if (result) return;

    const unanswered = EXAM_QUESTIONS.filter(
      (question) => !answers[question.id]
    );

    if (unanswered.length > 0) {
      setValidationError(
        `Please answer all questions. You still have ${unanswered.length} unanswered question(s).`
      );

      return;
    }

    let correct = 0;

    EXAM_QUESTIONS.forEach((question) => {
      const selectedOptionId = answers[question.id];

      const isCorrect =
        selectedOptionId === question.correctOptionId;

      if (isCorrect) {
        correct++;
      }

      const lesson =
        question.category === "programming"
          ? programmingLesson
          : dataLesson;

      submitQuestionAnswer({
        questionId: question.id,
        selectedOptionId,
        isCorrect,
        paragraphId: null,
        lessonId: lesson?.id || null,
      });
    });

    setResult({
      correctCount: correct,
      total: EXAM_QUESTIONS.length,
      passed: correct / EXAM_QUESTIONS.length >= 0.7,
    });

    setValidationError("");
  };

  // --------------------------------------------------
  // Retry Exam
  // --------------------------------------------------

  const handleRetry = () => {
    setAnswers({});
    setResult(null);
    setValidationError("");
  };

  if (!isReady) {
    return <Loading message="Loading assessment..." />;
  }

  return (
    <div className="space-y-7">
      {/* Header */}

      <Card padding="lg" className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700">
            <BookOpen className="h-4 w-4" />
            Unit 1 Assessment
          </span>

          <span className="text-sm font-semibold text-slate-500">
            {EXAM_QUESTIONS.length} Questions
          </span>
        </div>

        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Programming and Data Types Exam
          </h1>

          <p className="mt-3 max-w-3xl leading-8 text-slate-600">
            Test your understanding of programming fundamentals,
            data types, constants, variables, and data structures.
            Select one answer for each question, then submit your exam
            to see your final result.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Total Questions</p>
            <p className="mt-1 text-2xl font-extrabold text-slate-900">
              {EXAM_QUESTIONS.length}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Answered</p>
            <p className="mt-1 text-2xl font-extrabold text-blue-700">
              {answeredCount}/{EXAM_QUESTIONS.length}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Pass Mark</p>
            <p className="mt-1 text-2xl font-extrabold text-emerald-700">
              70%
            </p>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-semibold text-slate-700">
              Exam Completion
            </span>

            <span className="font-bold text-blue-700">
              {Math.round(
                (answeredCount / EXAM_QUESTIONS.length) * 100
              )}%
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{
                width: `${
                  (answeredCount / EXAM_QUESTIONS.length) * 100
                }%`,
              }}
            />
          </div>
        </div>
      </Card>

      {/* Saved Progress Information */}

      {savedAnswerCount > 0 && (
        <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />

          <div>
            <p className="font-bold text-blue-900">
              Previous answers found
            </p>

            <p className="mt-1 text-sm leading-6 text-blue-800">
              Your previous answers for {savedAnswerCount} question(s)
              are already saved in your learning progress. Your new
              answers will update the saved records after submitting
              this attempt.
            </p>
          </div>
        </div>
      )}

      {/* Questions */}

      <div className="space-y-5">
        {EXAM_QUESTIONS.map((question, index) => {
          const selectedId = answers[question.id];

          const isCorrect =
            result &&
            selectedId === question.correctOptionId;

          const isWrong =
            result &&
            selectedId !== question.correctOptionId;

          return (
            <Card
              key={question.id}
              padding="lg"
              className="space-y-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                  Question {index + 1}
                </span>

                <span className="text-xs font-semibold text-slate-400">
                  {question.category === "programming"
                    ? "Programming"
                    : "Data Types"}
                </span>
              </div>

              <h2 className="text-lg font-bold leading-8 text-slate-900">
                {question.prompt}
              </h2>

              <div className="space-y-3">
                {question.options.map((option) => {
                  const selected = selectedId === option.id;

                  const correctOption =
                    result &&
                    option.id === question.correctOptionId;

                  let optionStyle =
                    "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50";

                  if (selected && !result) {
                    optionStyle =
                      "border-blue-500 bg-blue-50 ring-1 ring-blue-500";
                  }

                  if (correctOption) {
                    optionStyle =
                      "border-emerald-500 bg-emerald-50";
                  } else if (selected && isWrong) {
                    optionStyle =
                      "border-amber-500 bg-amber-50";
                  }

                  return (
                    <label
                      key={option.id}
                      className={`flex min-h-14 items-center gap-3 rounded-xl border p-4 transition ${
                        optionStyle
                      } ${
                        result
                          ? "cursor-default"
                          : "cursor-pointer"
                      }`}
                    >
                      <input
                        type="radio"
                        name={question.id}
                        value={option.id}
                        checked={selected}
                        disabled={Boolean(result)}
                        onChange={() =>
                          handleSelectAnswer(
                            question.id,
                            option.id
                          )
                        }
                        className="h-4 w-4 accent-blue-600"
                      />

                      <span className="flex-1 text-sm font-medium leading-6 text-slate-800">
                        {option.text}
                      </span>

                      {correctOption && (
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                      )}
                    </label>
                  );
                })}
              </div>

              {result && (
                <div
                  className={`rounded-xl border p-4 ${
                    isCorrect
                      ? "border-emerald-200 bg-emerald-50"
                      : "border-amber-200 bg-amber-50"
                  }`}
                >
                  <p
                    className={`font-bold ${
                      isCorrect
                        ? "text-emerald-800"
                        : "text-amber-800"
                    }`}
                  >
                    {isCorrect
                      ? "Correct Answer"
                      : "Incorrect Answer"}
                  </p>

                  <p className="mt-2 text-sm leading-7 text-slate-700">
                    {question.explanation}
                  </p>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Validation Error */}

      {validationError && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"
        >
          <AlertCircle className="h-5 w-5 shrink-0" />

          <div>
            <p className="font-bold">Incomplete Assessment</p>
            <p className="mt-1">{validationError}</p>
          </div>
        </div>
      )}

      {/* Submit / Result */}

      <Card padding="lg" className="space-y-6">
        {!result ? (
          <>
            <div className="flex items-center gap-3">
              <ClipboardCheck className="h-7 w-7 text-blue-600" />

              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Submit Your Assessment
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Answer all 15 questions before submitting.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Submit Exam
              <ArrowRight className="h-4 w-4" />
            </button>
          </>
        ) : (
          <>
            <div className="text-center">
              <div
                className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${
                  result.passed
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {result.passed ? (
                  <Award className="h-9 w-9" />
                ) : (
                  <Target className="h-9 w-9" />
                )}
              </div>

              <h2 className="mt-4 text-2xl font-extrabold text-slate-900">
                {result.passed
                  ? "Congratulations! You Passed"
                  : "Keep Practicing"}
              </h2>

              <p className="mt-2 text-sm leading-7 text-slate-600">
                {result.passed
                  ? "You have successfully passed this assessment."
                  : "Review your incorrect answers and try again to improve your score."}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-6 text-center">
              <p className="text-sm font-semibold text-slate-500">
                Your Final Score
              </p>

              <p className="mt-2 text-4xl font-extrabold text-blue-700">
                {correctCount}/{EXAM_QUESTIONS.length}
              </p>

              <p className="mt-2 text-lg font-bold text-slate-800">
                {percentage}%
              </p>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-full rounded-full transition-all ${
                    result.passed
                      ? "bg-emerald-500"
                      : "bg-amber-500"
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleRetry}
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                <RotateCcw className="h-4 w-4" />
                Try Again
              </button>

              <Link
                href="/dashboard"
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                View Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </>
        )}
      </Card>

      {/* Bottom Navigation */}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5">
        <Link
          href="/lessons"
          className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Lessons
        </Link>

        <Link
          href="/dashboard"
          className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold text-blue-700 hover:text-blue-800"
        >
          Learning Dashboard
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
