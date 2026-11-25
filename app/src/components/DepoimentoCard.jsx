export const DepoimentoCard = ({ texto, nome, cargo }) => {
  return (
    <div className="depoimento-card">
      <p className="depoimento-texto">"{texto}"</p>
      <div className="depoimento-autor">
        <strong>{nome}</strong>
        <span className="depoimento-cargo">{cargo}</span>
      </div>
    </div>
  );
};
