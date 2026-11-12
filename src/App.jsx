import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import EstadoCard from "./components/EstadoCard.jsx";
import EstadoDetalhes from "./components/EstadoDetalhes.jsx";
import "./App.css";

const API_IBGE = "https://servicodados.ibge.gov.br/api/v1/localidades";

function App() {
  const [estados, setEstados] = useState([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState(null);
  const [buscaEstado, setBuscaEstado] = useState("");
  const [municipios, setMunicipios] = useState([]);
  const [carregandoEstados, setCarregandoEstados] = useState(true);
  const [carregandoMunicipios, setCarregandoMunicipios] = useState(false);
  const [erro, setErro] = useState("");

  // useEffect consulta os dados oficiais quando a página é aberta.
  useEffect(() => {
    async function carregarEstados() {
      setCarregandoEstados(true);
      setErro("");
      try {
        const resposta = await fetch(`${API_IBGE}/estados`);
        if (!resposta.ok)
          throw new Error("Não foi possível consultar os estados.");
        const dados = await resposta.json();
        setEstados(dados.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR")));
      } catch {
        setErro(
          "Não conseguimos acessar a API do IBGE agora. Verifique sua conexão e tente novamente.",
        );
      } finally {
        setCarregandoEstados(false);
      }
    }

    carregarEstados();
  }, []);

  async function selecionarEstado(estado) {
    setEstadoSelecionado(estado);
    setMunicipios([]);
    setCarregandoMunicipios(true);
    setErro("");
    try {
      const resposta = await fetch(
        `${API_IBGE}/estados/${estado.sigla}/municipios`,
      );
      if (!resposta.ok)
        throw new Error("Não foi possível consultar os municípios.");
      const dados = await resposta.json();
      setMunicipios(
        dados.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR")),
      );
    } catch {
      setErro(
        `Não conseguimos carregar os municípios de ${estado.nome}. Tente novamente.`,
      );
    } finally {
      setCarregandoMunicipios(false);
    }
  }

  function voltarParaEstados() {
    setEstadoSelecionado(null);
    setMunicipios([]);
    setErro("");
  }

  const estadosFiltrados = estados.filter((estado) => {
    const termo = buscaEstado.trim().toLocaleLowerCase("pt-BR");
    return `${estado.nome} ${estado.sigla} ${estado.regiao?.nome ?? ""}`
      .toLocaleLowerCase("pt-BR")
      .includes(termo);
  });

  return (
    <div className="app-shell">
      <Header />

      {estadoSelecionado ? (
        <EstadoDetalhes
          estado={estadoSelecionado}
          municipios={municipios}
          carregando={carregandoMunicipios}
          erro={erro}
          aoVoltar={voltarParaEstados}
          aoTentarNovamente={() => selecionarEstado(estadoSelecionado)}
        />
      ) : (
        <main>
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero-copy">
              <span className="eyebrow">
                <span className="live-dot" /> DADOS OFICIAIS DO IBGE
              </span>
              <h1 id="hero-title">
                O Brasil começa
                <br />
                por cada <em>estado.</em>
              </h1>
              <p>
                Explore as unidades federativas e descubra os municípios que
                formam cada canto do país.
              </p>
              <a className="hero-link" href="#estados">
                Explorar estados <span aria-hidden="true">↓</span>
              </a>
            </div>
            <div className="hero-visual" aria-hidden="true">
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="map-stamp">
                <span>BR</span>
                <small>
                  26 ESTADOS
                  <br />+ DISTRITO FEDERAL
                </small>
              </div>
              <span className="map-label label-norte">NORTE</span>
              <span className="map-label label-nordeste">NORDESTE</span>
              <span className="map-label label-centro">CENTRO-OESTE</span>
              <span className="map-label label-sudeste">SUDESTE</span>
              <span className="map-label label-sul">SUL</span>
            </div>
            <div className="hero-index">
              <span>01</span>
              <span className="index-line" />
              <span>27 UNIDADES</span>
            </div>
          </section>

          <section
            className="explorer-section"
            id="estados"
            aria-labelledby="states-title"
          >
            <div className="section-heading">
              <div>
                <span className="section-kicker">EXPLORE O TERRITÓRIO</span>
                <h2 id="states-title">Escolha um estado</h2>
                <p>Uma visão rápida das unidades federativas brasileiras.</p>
              </div>
              <div className="state-count">
                <strong>
                  {carregandoEstados
                    ? "—"
                    : estados.length.toString().padStart(2, "0")}
                </strong>
                <span>
                  ESTADOS
                  <br />
                  CARREGADOS
                </span>
              </div>
            </div>

            <label className="search-box">
              <span className="search-icon" aria-hidden="true">
                ⌕
              </span>
              <span className="sr-only">Pesquisar estados</span>
              <input
                type="search"
                value={buscaEstado}
                onChange={(evento) => setBuscaEstado(evento.target.value)}
                placeholder="Busque por estado, sigla ou região..."
              />
              <span className="search-shortcut">
                {estados.length || "27"} UF
              </span>
            </label>

            {erro && !estadoSelecionado && (
              <div className="notice error-notice" role="alert">
                <span>{erro}</span>
                <button
                  className="text-button"
                  onClick={() => window.location.reload()}
                >
                  Tentar novamente
                </button>
              </div>
            )}

            {carregandoEstados ? (
              <div className="loading-panel" role="status">
                <span className="spinner" />
                Carregando estados do IBGE...
              </div>
            ) : (
              <>
                <div className="states-grid">
                  {/* map() transforma cada resultado da API em um card. Props levam os dados ao componente. */}
                  {estadosFiltrados.map((estado, indice) => (
                    <EstadoCard
                      key={estado.id}
                      estado={estado}
                      indice={indice}
                      aoSelecionar={() => selecionarEstado(estado)}
                    />
                  ))}
                </div>
                {estadosFiltrados.length === 0 && (
                  <div className="empty-state">
                    <span>⌕</span>
                    <strong>Nenhum estado encontrado</strong>
                    <p>Tente buscar por outro nome, sigla ou região.</p>
                  </div>
                )}
              </>
            )}
          </section>
        </main>
      )}

      <footer className="site-footer">
        <span>EXPLORADOR DO BRASIL</span>
        <span>Informações territoriais · Fonte: IBGE</span>
      </footer>
    </div>
  );
}

export default App;
