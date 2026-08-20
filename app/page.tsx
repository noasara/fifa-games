import Image from "next/image";
import Link from "next/link";
import WordleGame from "@/components/WordleGame";
import Score from "@/components/Score";
import Hint from "@/components/Hint";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col items-center px-2 pt-2 sm:pt-6">
      <h1 className="mb-3 text-center font-mono text-xl sm:text-3xl font-bold tracking-wide uppercase 
        whitespace-nowrap">
        Wordle - Ligue 1
      </h1>

      <p className="mb-8 px-4 text-center font-mono text-sm sm:text-base max-w-3xl mx-auto leading-snug
      md:whitespace-nowrap">
        Retrouvez le nom d’un joueur du championnat français
        <span className="text-400"> (Saison 25-26)</span>
      </p>

      <div className="w-full flex flex-col md:flex-row justify-center items-center md:items-start gap-2 
        md:gap-12 lg:gap-16">
          {/* COLONNE GAUCHE */}
          <div className="contents md:flex md:flex-col md:gap-8 md:w-[280px] md:shrink-0 md:order-1 w-full 
          max-w-[500px]">

            <div className="order-1 w-full px-2 sm:px-0">
              <Score />
            </div>

            <div className="order-2 w-full flex justify-center mt-2 md:mt-0 scale-75 md:scale-100
            transform origin-top">
              <Hint />
            </div>

            <div className="order-4 w-full flex justify-center mt-8 mb-6 md:mt-0">
              <Ligue1Image />
            </div>
          </div>
          {/* COLONNE DROITE */}
          <div className="order-3 md:order-2 flex justify-center w-full max-w-[500px] md:shrink-0">
            <WordleGame />
          </div>
      </div>
    </main>
     
  );
}

export function Ligue1Image() {
  return (
    <div className="flex w-full shrink-0 justify-center">
      <Link
        href="https://www.ligue1.com"
        target="_blank"
        rel="noopener noreferrer">

        <Image
          src="/ligue1.webp"
          width={220}
          height={220}
          alt="Logo de Ligue 1"
          title="Visiter le site officiel de la Ligue 1"
          className="rounded-xl shadow-lg transition-transform hover:scale-105"/>
      </Link>
    </div>
  );
}
