import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
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
