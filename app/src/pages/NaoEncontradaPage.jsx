import { Link } from "react-router";

export const NaoEncontradaPage = () => {
  return (
    <section className="nao-encontrada">
      <div className="nao-encontrada-conteudo">
        <div className="erro-icone">404</div>
        <h1>Página não encontrada</h1>
        <p>A página que você está procurando não existe ou foi movida para outro endereço.</p>
        <Link to="/" className="btn-voltar-home">← Voltar para a página inicial</Link>
      </div>
    </section>
  );
};
