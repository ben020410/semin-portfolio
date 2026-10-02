import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://semin-na.vercel.app"),

  openGraph: {
    type: "website",
    url: "https://semin-na.vercel.app",
    siteName: "Semin Na",
    title: "Semin Na — Robotics & Embodied AI",
    description:
      "서울대학교 항공우주공학과 나세민의 포트폴리오. 로봇 비전과 자율 로봇 프로젝트를 소개합니다.",
    images: [{
      url: "/images/home-preview-v1.jpg",
      width: 1200,
      height: 630,
      alt: "Semin Na 포트폴리오 메인 화면",
    }],
  },

  twitter: {
    card: "summary_large_image",
    title: "Semin Na — Robotics & Embodied AI",
    images: ["/images/home-preview-v1.jpg"],
  },
  title: { default: "Semin Na — Robotics & Embodied AI", template: "%s · Semin Na" },
  description: "Research in autonomous robotics, 3D vision and VLM-based navigation. Aerospace Engineering at Seoul National University.",
  robots: { index: false, follow: false },
  icons: {
    icon: "/favicon.svg?v=3",
    shortcut: "/favicon.svg?v=3",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased"><SiteShell>{children}</SiteShell></body>
    </html>
  );
}
