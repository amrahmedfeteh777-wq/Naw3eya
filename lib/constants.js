export const PLATFORM_NAME = "Naw3eya";

export const PLATFORM_DESCRIPTION =
  "Structured programming learning focused on data types and algorithm fundamentals.";

export const PROGRESS_STORAGE_KEY = "naw3eya_learning_progress_v1";

export const PROGRESS_SCHEMA_VERSION = 1;

export const ROUTES = {
  home: "/",
  courses: "/courses",
  lessons: "/lessons",
  units: "/units",
  progress: "/progress",
  dashboard: "/dashboard",
  about: "/about",
};

export const PRIMARY_NAV_LINKS = [
  { href: ROUTES.home, label: "Home" },
  { href: ROUTES.courses, label: "Courses" },
  { href: ROUTES.lessons, label: "Lessons" },
  { href: ROUTES.dashboard, label: "Dashboard" },
];