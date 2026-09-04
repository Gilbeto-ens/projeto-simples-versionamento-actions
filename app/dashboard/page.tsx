"use client";

import { useState } from "react";

type Clima = {
  cidade: string;
  pais: string;
  temperatura: number;
  umidade: number;
  vento: number;
  condicao: string;
};

export default function DashboardPage() {
  const [cidade, setCidade] = useState("");
  const [clima, setClima] = useState<Clima | null>(null);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function buscar(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setClima(null);
    setCarregando(true);

    const res = await fetch(`/api/clima?cidade=${encodeURIComponent(cidade)}`);
    const dados = await res.json();

    setCarregando(false);

    if (!res.ok) {
      setErro(dados.erro ?? "nao foi possivel consultar o clima");
      return;
    }

    setClima(dados);
  }

  return (
    <main className="card">
      <div className="topo">
        <h1>Clima</h1>
        <form action="/api/logout" method="post">
          <button className="sair" type="submit">
            Sair
          </button>
        </form>
      </div>
      <p className="muted">Digite o nome de uma cidade.</p>

      <form onSubmit={buscar}>
        <label htmlFor="cidade">Cidade</label>
        <input
          id="cidade"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          placeholder="Ex.: Sao Paulo"
          required
        />
        <button type="submit" disabled={carregando}>
          {carregando ? "Buscando..." : "Buscar"}
        </button>
      </form>

      {erro && (
        <p className="erro" style={{ marginTop: 16 }}>
          {erro}
        </p>
      )}

      {clima && (
        <section className="resultado">
          <strong>
            {clima.cidade}
            {clima.pais ? `, ${clima.pais}` : ""}
          </strong>
          <p className="temp">{clima.temperatura}&deg;C</p>
          <p className="muted" style={{ margin: 0 }}>
            {clima.condicao} &middot; umidade {clima.umidade}% &middot; vento{" "}
            {clima.vento} km/h
          </p>
        </section>
      )}
    </main>
  );
}
