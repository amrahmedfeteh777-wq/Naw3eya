export const LESSONS = [
  {
    id: "lesson-homepage-scope",
    slug: "naw3eya-homepage-introduction",
    courseId: "course-audited-overview",
    title: "Naw3eya Curriculum Introduction",
    summary:
      "English translation of the introductory programming statement extracted from the accessible homepage of Naw3eya.",
    durationMinutes: 3,
    sections: [
      {
        id: "sec-homepage-welcome",
        title: "Platform Introduction",
        paragraphs: [
          {
            id: "para-homepage-1",
            content:
              "Your journey to learning programming starts here. We have organized the educational content to help you understand data types and algorithm fundamentals with ease.",
            questionIds: ["q-para-homepage-1"],
          },
        ],
      },
    ],
  },
];

export function getLessonById(lessonId) {
  return LESSONS.find((lesson) => lesson.id === lessonId) || null;
}

export function getLessonBySlug(slug) {
  return LESSONS.find((lesson) => lesson.slug === slug) || null;
}

export function getAllParagraphs() {
  const result = [];
  for (const lesson of LESSONS) {
    for (const section of lesson.sections || []) {
      for (const paragraph of section.paragraphs || []) {
        result.push({
          ...paragraph,
          sectionId: section.id,
          sectionTitle: section.title,
          lessonId: lesson.id,
          lessonSlug: lesson.slug,
          courseId: lesson.courseId,
        });
      }
    }
  }
  return result;
}