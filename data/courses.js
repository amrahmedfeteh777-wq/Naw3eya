export const COURSES = [
  {
    id: "course-audited-overview",
    slug: "programming-foundations-overview",
    title: "Programming Foundations Overview",
    description:
      "Verified introductory scope from the Naw3eya reference homepage introducing programming through data types and algorithm fundamentals.",
    level: "Foundational",
    learningObjectives: [
      "Identify data types and algorithm fundamentals as the two core topics highlighted in the Naw3eya homepage introduction.",
      "State the stated purpose of organizing Naw3eya's educational content for learners starting programming.",
    ],
    lessonIds: ["lesson-homepage-scope"],
  },
];

export function getCourseById(courseId) {
  return COURSES.find((course) => course.id === courseId) || null;
}

export function getCourseBySlug(slug) {
  return COURSES.find((course) => course.slug === slug) || null;
}