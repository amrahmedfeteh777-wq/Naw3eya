export const QUESTIONS = [
  {
    id: "q-para-homepage-1",
    paragraphId: "para-homepage-1",
    lessonId: "lesson-homepage-scope",
    prompt:
      "According to the introductory paragraph on Naw3eya, what are the two main areas the educational content is organized to help learners understand?",
    options: [
      {
        id: "opt-1",
        text: "Network routing protocols and relational database tuning",
      },
      {
        id: "opt-2",
        text: "Data types and algorithm fundamentals",
      },
      {
        id: "opt-3",
        text: "Mobile app store publishing and UI icon design",
      },
    ],
    correctOptionId: "opt-2",
    explanation:
      "The introductory paragraph explicitly states that the educational content is organized to help you understand data types and algorithm fundamentals with ease.",
  },
];

export function getQuestionsByParagraphId(paragraphId) {
  return QUESTIONS.filter((q) => q.paragraphId === paragraphId);
}

export function getQuestionsByLessonId(lessonId) {
  return QUESTIONS.filter((q) => q.lessonId === lessonId);
}