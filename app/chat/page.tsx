const mensagensExemplo = [
    {papel: "assistant", conteudo: "Olá! Como posso ajudar você hoje?"},
    {papel: "user", conteudo: "Oi!, eu gostaria de saber o clima em São Paulo!"},
    {papel: "assistant", conteudo: "Vou buscar as informações metereológicas para você.."}  
];

export default function ChatPage(){
    return(
        <main className="grid min-h-screen grid-cols-1 md:grid-cols-[280px_1fr]">
            <aside className="border-r border-zinc-800 bg-zinc-950 p-4">
                <button className="mb-4 w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black hover:bg-zinc-200">
                    + Nova conversa
                </button>    
                
                <nav className="space-y-2 text-sm">
                    <p className="rounded-lg bg-zinc-900 px-3 py-2 text-zinc-100">Conversa Atual</p>
                    <p className="rounded-lg px-3 py-2 text-zinc-400 hover:bg-zinc-900">Conversa Anterior</p>
                </nav>

                <div className="mt-8 space-y-1 text-xs text-zinc-500">
                    <p className="font-medium">Ferramentas</p>
                    <p>• Calculadora</p>
                    <p>• Clima</p>
                    <p>• Notícias</p>
                </div>
            </aside>

            <section className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto space-y-4 p-6">
                    {mensagensExemplo.map((msg, index) => (
                        <div
                            key={index}
                            className={`max-w-2xl rounded-2xl px-4 py-3 text-sm ${msg.papel === "user" ? "ml-auto bg-white text-black" : "bg-zinc-900 text-zinc-100"}`}
                        >
                            {msg.conteudo}
                        </div>
                    ))}
                </div>
                
                <div className="border-t border-zinc-800 p-4">
                    <form className="flex gap-3">
                        <input
                            placeholder="Digite sua mensagem..."
                            className="flex-1 rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm outline-none focus:border-zinc-500"
                        />
                        <button className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-zinc-200">
                            Enviar
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
}



                                 
                   
                    
                    





                







