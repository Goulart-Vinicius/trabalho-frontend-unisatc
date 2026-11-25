import { Link } from "react-router";

export const VagaCard = ({ vaga, onCandidatar }) => {
  return (
    <article className="vaga-card">
      <div className="vaga-info">
        <div className="vaga-empresa">{vaga.empresa}</div>
        <span className="vaga-publicada">· {vaga.publicada}</span>
        <h3 className="vaga-cargo">{vaga.cargo}</h3>
        <p className="vaga-descricao">{vaga.descricao}</p>
        <div className="vaga-badges">
          <span className="badge salario">{vaga.salario}</span>
          <span className="badge modelo">{vaga.modelo}</span>
          <span className="badge tipo">{vaga.tipo}</span>
          <span className="badge area">{vaga.area}</span>
        </div>
      </div>
      <button
        className="btn-candidatar"
        onClick={() => onCandidatar(vaga)}
      >
        Candidatar-se →
      </button>
    </article>
  );
};
