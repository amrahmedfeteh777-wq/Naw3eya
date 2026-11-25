import { Plus_Jakarta_Sans } from "next/font/google";
import MainLayout from "@/components/layout/MainLayout";
import { PLATFORM_NAME, PLATFORM_DESCRIPTION } from "@/lib/constants";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-naw3eya-sans",
  display: "swap",
});

export const metadata = {
  title: {
    default: PLATFORM_NAME,
    template: `%s | ${PLATFORM_NAME}`,
  },
  description: PLATFORM_DESCRIPTION,
  applicationName: PLATFORM_NAME,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" className={jakartaSans.variable}>
      <body className="min-h-screen bg-[#F8FAFC] font-sans text-[#0F172A] antialiased">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}