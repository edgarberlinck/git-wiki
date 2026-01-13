import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Git Wiki - Repository Documentation",
  description: "A Wiki generator for GitHub repositories",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
