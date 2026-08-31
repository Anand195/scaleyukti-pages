import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ScaleYukti — AI Automation Agency",
  description: "AI agents, document intelligence, and AI skills training for Indian businesses and institutions. Based in Ahmedabad, Gujarat.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
