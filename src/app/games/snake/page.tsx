import SnakeCanvas from "@/src/components/snake/SnakeCanvas";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Snake Xenzia Reborn",
  description: "Snake Xenzia Games online",
  icons: {
    icon: "/images/icon.svg",
  },
};

export default function SnakeGame() {
  return (
    <main className="min-h-screen min-w-screen bg-linear-to-br from-black via-zinc-900 to-purple-900 text-white flex items-center justify-center px-6">
      <Link
        href="/"
        className="
          hidden absolute top-6 left-6
          md:inline-flex items-center gap-2
          px-4 py-2 rounded-xl
          bg-black/60 border border-green-400
          text-green-400 font-mono text-sm
          shadow-[0_0_12px_rgba(34,197,94,0.5)]
          hover:scale-105 transition-transform
        "
      >
        ← Home
      </Link>
      <div className="max-w-5xl w-full text-center space-y-10">
        <div className="space-y-4">
          <div className="md:hidden w-max mt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2
                px-4 py-2 rounded-xl
                bg-black/60 border border-green-400
                text-green-400 font-mono text-sm
                shadow-[0_0_12px_rgba(34,197,94,0.5)]
                hover:scale-105 transition-transform
              "
            >
              ←
            </Link>
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight">
            <span className="text-purple-400">Snake</span>
            <span className="text-green-400">Xenzia</span>
          </h1>

          <p className="text-zinc-300 text-lg md:text-xl">
            A Snake Xenzia game reborn from Nokia 1200
          </p>
        </div>
        <SnakeCanvas />
      </div>
    </main>
  );
}
