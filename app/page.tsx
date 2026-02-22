import Link from "next/link";

const features = [
  "Chat Inteligente",
  "Calculadora IA",
  "Clima em tempo real",
  "Noticias Resumidas",
];

export default function Home(){
  return(
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-10">
      <header className="mb-14 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">Agente IA</h1>
        <Link
          href="/chat"
          className="rounded-xl border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-900"
        >
          Entrar 
        </Link>
      </header>

      <section className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <p className="mb-3 text-sm text-zinc-400">Plataforma de produtividade com IA</p>
          <h2 className="mb-5 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Converse, calcule, consulte o clima e leia as notícias em um único lugar
          </h2>
          <p className="mb-7 max-w-xl text-zinc-400"> 
            Front-End em Next.js + TypeScript, arquitetura pronta para escalar, integração com API de IA e diversas ferramentas para uma experiência completa.
          </p>
          <Link
            href="/chat"
            className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-zinc-200"
          >
            Começar agora
          </Link>
        </div>

        <div className="grid gap-3">
          {features.map((item) => (
            <div key={item} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
              <p className="font-medium">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </main>





      
  );
}