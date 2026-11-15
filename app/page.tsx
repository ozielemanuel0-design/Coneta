
"use client";

import { FormEvent, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    async function checkSession() {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        setMessage(error.message);
      }

      setSession(data.session);
      setLoading(false);
    }

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: "https://coneta-3axr.vercel.app",
      },
    });

    if (error) {
      setMessage("Erro: " + error.message);
    } else {
      setMessage("Link enviado! Verifica o teu e-mail.");
    }

    setSending(false);
  }

  async function signOut() {
    await supabase.auth.signOut();
    setSession(null);
    setMessage("Terminaste a sessão.");
  }

  if (loading) {
    return (
      <main className="page">
        <section className="hero">
          <h2>A preparar o Conecta...</h2>
        </section>
      </main>
    );
  }

  if (session) {
    return (
      <main className="page">
        <nav className="nav">
          <a className="brand" href="#">
            <span className="brandMark">C</span> conecta
          </a>
          <button onClick={signOut}>Sair</button>
        </nav>

        <section className="hero">
          <div className="eyebrow">BEM-VINDO AO CONECTA</div>

          <h1>
            As tuas pessoas.
            <br />
            <em>As tuas ideias.</em>
          </h1>

          <div className="authCard">
            <h2>Olá, {session.user.email}!</h2>
            <p>
              A tua sessão foi iniciada com sucesso.
              Bem-vindo à comunidade Conecta.
            </p>
            <p>Estamos a preparar novas funcionalidades para ti.</p>
          </div>
        </section>

        <footer>
          <span>© 2026 Conecta</span>
          <span>Feito para aproximar.</span>
        </footer>
      </main>
    );
  }

  return (
    <main className="page">
      <nav className="nav">
        <a className="brand" href="#">
          <span className="brandMark">C</span> conecta
        </a>
        <span className="navNote">Aproximar pessoas</span>
      </nav>

      <section className="hero">
        <div className="eyebrow">
          <span /> UMA NOVA FORMA DE ESTAR LIGADO
        </div>

        <h1>
          As tuas pessoas.
          <br />
          <em>As tuas ideias.</em>
          <br />
          O teu Conecta.
        </h1>

        <p className="intro">
          Um espaço para partilhar momentos, conversar e construir comunidades.
          Começamos em Angola. Ligamos o mundo.
        </p>

        <div className="authCard">
          <h2>Entra na comunidade</h2>
          <p>
            Coloca o teu e-mail para receberes um link de acesso.
          </p>

          <form onSubmit={signUp}>
            <label htmlFor="email">O teu endereço de e-mail</label>

            <input
              id="email"
              type="email"
              placeholder="nome@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit" disabled={sending}>
              {sending ? "A enviar..." : "Receber link de acesso"}
            </button>
          </form>

          {message && (
            <p className="message" role="status">
              {message}
            </p>
          )}

          <small>
            Ao continuar, estás a utilizar a versão inicial do Conecta.
          </small>
        </div>
      </section>

      <footer>
        <span>© 2026 Conecta</span>
        <span>Feito para aproximar.</span>
      </footer>
    </main>
  );
}



