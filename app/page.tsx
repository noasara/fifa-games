import Image from "next/image";
import Link from "next/link";
import WordleGame from "@/components/WordleGame";
import Score from "@/components/Score";
import Hint from "@/components/Hint";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center p-6">
      <h1 className="mb-1 p-6 text-center font-mono text-3xl font-bold tracking-wide uppercase">
        Wordle - Ligue 1
      </h1>

      <p className="mb-8 text-center font-mono">
        Retrouvez le nom d’un joueur du championnat français
      </p>

      <div className="flex w-full flex-grow flex-col items-center justify-center gap-8 md:flex-row md:items-start md:gap-16">
        <div className="mt-6 flex flex-col items-center">
          <Score />
          <Ligue1Image />

          <div className="mt-14 flex w-full justify-center">
            <Hint />
          </div>
        </div>

        <div className="w-full max-w-xl">
          <WordleGame />
        </div>
      </div>
    </main>
  );
}

export function Ligue1Image() {
  return (
    <div className="mt-13 flex w-full shrink-0 justify-center md:w-auto">
      <Link
        href="https://www.ligue1.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/ligue1.webp"
          width={250}
          height={250}
          alt="Logo de Ligue 1"
          title="Visiter le site officiel de la Ligue 1"
          className="rounded-xl shadow-lg"
        />
      </Link>
    </div>
  );
}
