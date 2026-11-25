import { Hero } from "../components/Hero";
import { Vagas } from "../components/Vagas";
import { News } from "../components/News";
import { Depoimentos } from "../components/Depoimentos";

export const HomePage = () => {
  return (
    <main className="home-page">
      <Hero
        titulo="As melhores vagas em startups de tecnologia"
        subtitulo="Encontre oportunidades reais em empresas curadas. Sem cadastro, sem barreiras."
      >
        <div className="hero-acoes-botoes">
          <a href="#vagas" className="btn-explorar">
            Explorar vagas abertas →
          </a>
        </div>
      </Hero>

      <Vagas />

      <News />

      <Depoimentos />
    </main>
  );
};
