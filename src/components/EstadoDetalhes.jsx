import { useState } from "react";

function EstadoDetalhes({
  estado,
  municipios,
  carregando,
  erro,
  aoVoltar,
  aoTentarNovamente,
}) {
  const [buscaMunicipio, setBuscaMunicipio] = useState("");
  const municipiosFiltrados = municipios.filter((municipio) =>
    municipio.nome
      .toLocaleLowerCase("pt-BR")
      .includes(buscaMunicipio.trim().toLocaleLowerCase("pt-BR")),
  );

  return (
    <main className="detail-page">
      <button className="back-button" onClick={aoVoltar}>
        <span aria-hidden="true">←</span> Voltar para estados
      </button>
      <section className="detail-hero">
        <div className="detail-title">
          <span className="section-kicker">
            UNIDADE FEDERATIVA · {estado.regiao?.nome}
          </span>
          <h1>
            {estado.nome}
            <span>.</span>
          </h1>
          <p>Conheça os municípios que compõem este estado brasileiro.</p>
        </div>
        <div className="detail-sigil" aria-label={`Sigla ${estado.sigla}`}>
          <span>{estado.sigla}</span>
          <small>BRASIL</small>
        </div>
      </section>

      <section className="detail-facts" aria-label="Informações do estado">
        <div>
          <span>REGIÃO</span>
          <strong>{estado.regiao?.nome ?? "—"}</strong>
        </div>
        <div>
          <span>SIGLA</span>
          <strong>{estado.sigla}</strong>
        </div>
        <div>
          <span>CÓDIGO IBGE</span>
          <strong>{estado.id}</strong>
        </div>
        <div>
          <span>MUNICÍPIOS</span>
          <strong>{carregando ? "…" : municipios.length}</strong>
        </div>
      </section>

      <section
        className="municipality-section"
        aria-labelledby="municipios-title"
      >
        <div className="section-heading municipality-heading">
          <div>
            <span className="section-kicker">DIVISÃO MUNICIPAL</span>
            <h2 id="municipios-title">Municípios</h2>
            <p>Dados atualizados diretamente pela API do IBGE.</p>
          </div>
          <span className="municipality-total">
            {carregando
              ? "..."
              : `${municipiosFiltrados.length} ${municipiosFiltrados.length === 1 ? "resultado" : "resultados"}`}
          </span>
        </div>
        <label className="search-box municipality-search">
          <span className="search-icon" aria-hidden="true">
            ⌕
          </span>
          <span className="sr-only">Pesquisar municípios</span>
          <input
            type="search"
            value={buscaMunicipio}
            onChange={(evento) => setBuscaMunicipio(evento.target.value)}
            placeholder="Pesquisar município..."
          />
          <span className="search-shortcut">BUSCA</span>
        </label>

        {erro ? (
          <div className="notice error-notice" role="alert">
            <span>{erro}</span>
            <button className="text-button" onClick={aoTentarNovamente}>
              Tentar novamente
            </button>
          </div>
        ) : null}
        {carregando ? (
          <div className="loading-panel" role="status">
            <span className="spinner" />
            Carregando municípios...
          </div>
        ) : municipiosFiltrados.length > 0 ? (
          <div className="municipality-grid">
            {/* Cada município é apresentado com map(), usando os dados recebidos da API. */}
            {municipiosFiltrados.map((municipio) => (
              <div className="municipality-card" key={municipio.id}>
                <span className="municipality-pin" aria-hidden="true">
                  ·
                </span>
                <span>{municipio.nome}</span>
                <small>{municipio.id}</small>
              </div>
            ))}
          </div>
        ) : (
          !erro && (
            <div className="empty-state">
              <span>⌕</span>
              <strong>Nenhum município encontrado</strong>
              <p>Confira a escrita ou tente outro termo.</p>
            </div>
          )
        )}
      </section>
    </main>
  );
}

export default EstadoDetalhes;
