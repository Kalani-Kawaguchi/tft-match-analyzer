import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TFT Match Analyzer",
  description:
    "A Teamfight Tactics webapp to help players understand their performance, identify patterns and weaknesses in the player style",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-neutral-100">{children}</body>
    </html>
  );
}
