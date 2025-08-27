// app/page.tsx (Next.js 13+ com App Router)

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="relative flex items-center justify-center min-h-screen w-full text-center overflow-hidden">
      {/* Imagem de fundo */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/background.png" 
          alt="Background Soft Checklist"
          fill
          priority
          className="object-cover"
        />
        {/* Overlay para contraste */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Conteúdo central */}
      <div className="flex flex-col items-center justify-center px-6 max-w-sm w-full">
        <h1 className="text-3xl font-bold text-white drop-shadow-md mb-2">
          Bem-vindo ao <br/> <span className="text-blue-300">Soft Checklist</span>
        </h1>
        <p className="text-gray-200 mb-8 text-sm drop-shadow-md">
          Selecione o que deseja fazer
        </p>

        {/* Botões */}
        <div className="flex flex-col gap-4 w-full">
          <button
            onClick={() => router.push("/checklist")}
            className="w-full py-3 rounded-2xl bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition"
          >
            Ir para Checklist
          </button>

          <button
            onClick={() => router.push("/consulta")}
            className="w-full py-3 rounded-2xl bg-white/90 text-gray-800 font-semibold shadow-lg hover:bg-white transition"
          >
            Ver Relatórios
          </button>
        </div>
      </div>
    </main>
  );
}
