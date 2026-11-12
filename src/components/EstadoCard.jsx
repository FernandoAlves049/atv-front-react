const regiaoClasses = {
  Norte: "region-norte",
  Nordeste: "region-nordeste",
  "Centro-Oeste": "region-centro",
  Sudeste: "region-sudeste",
  Sul: "region-sul",
};

function EstadoCard({ estado, indice, aoSelecionar }) {
  return (
    <button className="state-card" onClick={aoSelecionar}>
      <span className="card-topline">
        <span className="state-number">
          {String(indice + 1).padStart(2, "0")}
        </span>
        <span className="card-arrow" aria-hidden="true">
          ↗
        </span>
      </span>
      <span className="state-main">
        <span className="state-abbr">{estado.sigla}</span>
        <span className="state-name">{estado.nome}</span>
      </span>
      <span className="card-bottom">
        <span
          className={`region-tag ${regiaoClasses[estado.regiao?.nome] ?? ""}`}
        >
          <i />
          {estado.regiao?.nome ?? "Região"}
        </span>
        <span className="card-code">IBGE {estado.id}</span>
      </span>
    </button>
  );
}

export default EstadoCard;
