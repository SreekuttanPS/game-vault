import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Game Vault",
  description: "Arcade Games online | Browser Games",
  icons: {
    icon: "/images/icon.svg",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-br from-black via-zinc-900 to-purple-900 text-white flex items-center justify-center px-6">
      <div className="max-w-5xl w-full text-center space-y-10">
        {/* Logo / Title */}
        <div className="space-y-4">
          <h1
            className="flex items-center justify-center gap-3 md:gap-4
               text-5xl md:text-7xl font-extrabold tracking-tight"
          >
            <Image
              src="/images/logo.svg"
              alt="GameVault"
              width={420}
              height={120}
              priority
            />

            {/* <span className="text-purple-400">Game</span>
            <span className="text-green-400">Vault</span> */}
          </h1>

          <p className="text-zinc-300 text-lg md:text-xl">
            A retro arcade reborn for the web.
          </p>
        </div>

        {/* Hero Card */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            🎯 Featured Game
          </h2>

          <p className="text-zinc-300 mb-6">
            Relive the classic Nokia era with a modern twist. Smooth controls,
            clean visuals, and pure nostalgia.
          </p>

          {/* Game Preview Box */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Image
              src="/images/snakeXenzia.webp"
              width={100}
              height={100}
              alt="Snake Xenzia Preview"
              className="rounded-xl shadow-lg"
            />
            <div className="text-left space-y-2">
              <h3 className="text-xl font-semibold text-green-400">
                Snake Xenzia: Rewind
              </h3>
              <p className="text-sm text-zinc-400">
                Arcade • Single Player • High Score Mode
              </p>
            </div>

            <Link
              href="/games/snake"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                         bg-linear-to-br from-green-400 to-emerald-500
                         text-black font-semibold hover:scale-105
                         transition-transform shadow-lg"
            >
              ▶ Play Now
            </Link>
          </div>
        </div>

        {/* Footer vibe */}
        <div className="text-sm text-zinc-400">Built with ❤️ using Next.js</div>
      </div>
    </main>
  );
}
