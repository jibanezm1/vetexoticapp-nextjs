import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiz - Aves Rapaces de Chile",
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Share+Tech&display=swap"
        rel="stylesheet"
      />
      <div style={{ fontFamily: "'Share Tech', sans-serif" }}>
        {children}
      </div>
    </>
  );
}
