import SnakeCanvas from "@/src/components/snake/SnakeCanvas";
import { Metadata } from "next";

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
      <div className="max-w-5xl w-full text-center space-y-10">
        <div className="space-y-4">
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
