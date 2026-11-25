import { DepoimentoCard } from "./DepoimentoCard";
import { depoimentos } from "../data/depoimentos";

export const Depoimentos = () => {
  return (
    <section className="depoimentos">
      <h2 className="depoimentos-titulo">O que dizem quem já passou por aqui</h2>
      <div className="depoimentos-lista">
        {depoimentos.map((depoimento) => (
          <DepoimentoCard key={depoimento.id} {...depoimento} />
        ))}
      </div>
    </section>
  );
};
