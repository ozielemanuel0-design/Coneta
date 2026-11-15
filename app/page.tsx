"use client";

import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) {
      setMessage("A ligação ainda não está configurada. Falta preencher o ficheiro .env.local.");
      return;
    }
    setLoading(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: typeof window !== "undefined" ? window.location.origin : undefined },
    });
    setLoading(false);
    setMessage(error ? error.message : "Enviámos um link de acesso para o teu e-mail. Verifica a caixa de entrada.");
  }

  return (
    <main className="page">
      <nav className="nav">
        <a className="brand" href="#"><span className="brandMark">C</span> conecta</a>
        <span className="navNote">Aproximar pessoas</span>
      </nav>
      <section className="hero">
        <div className="eyebrow"><span /> UMA NOVA FORMA DE ESTAR LIGADO</div>
        <h1>As tuas pessoas.<br /><em>As tuas ideias.</em><br />O teu Conecta.</h1>
        <p className="intro">Um espaço para partilhar momentos, conversar e construir comunidades. Começamos em Angola. Ligamos o mundo.</p>
        <div className="authCard">
          <h2>Entra na comunidade</h2>
          <p>Estamos a preparar o Conecta. Deixa o teu e-mail para receberes um link de acesso de teste.</p>
          <form onSubmit={signUp}>
            <label htmlFor="email">O teu endereço de e-mail</label>
            <input id="email" type="email" placeholder="nome@exemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button type="submit" disabled={loading}>{loading ? "A enviar..." : "Receber link de acesso"}</button>
          </form>
          {message && <p className="message" role="status">{message}</p>}
          <small>Ao continuar, estás a testar uma versão inicial do Conecta.</small>
        </div>
      </section>
      <footer><span>© 2026 Conecta</span><span>Feito para aproximar.</span></footer>
    </main>
  );
}
