import { useState, useEffect } from "react";
import { Link } from "react-router";
import { buscarVaga } from "../services/vagasService";

export const VagaPage = () => {
  const [vaga, setVaga] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);
  const [naoEncontrada, setNaoEncontrada] = useState(false);

  useEffect(() => {
    const id = window.location.pathname.split("/").pop();

    const carregarVaga = async () => {
      try {
        setCarregando(true);
        setErro(false);
        setNaoEncontrada(false);
        const data = await buscarVaga(parseInt(id));
        setVaga(data);
      } catch (err) {
        setCarregando(false);
        if (err.message === "Vaga não encontrada.") {
          setNaoEncontrada(true);
        } else {
          setErro(true);
        }
      } finally {
        setCarregando(false);
      }
    };

    carregarVaga();
  }, []);

  if (carregando) {
    return (
      <div className="vaga-carregando">
        <p>Carregando detalhes da vaga...</p>
      </div>
    );
  }

  if (erro || naoEncontrada || !vaga) {
    return (
      <div className="vaga-nao-encontrada">
        <div className="vazio-icone">?</div>
        <h1>Vaga não encontrada</h1>
        <p>A vaga que você está procurando não existe ou foi removida.</p>
        <Link to="/">← Voltar para as vagas</Link>
      </div>
    );
  }

  return (
    <div className="vaga-detalhe">
      <div className="vaga-header">
        <div className="vaga-avatar">{vaga.empresa.charAt(0)}</div>
        <div className="vaga-info">
          <h1 className="vaga-cargo">{vaga.cargo}</h1>
          <div className="vaga-meta">
            <span className="vaga-empresa">{vaga.empresa}</span>
            <span className="vaga-separador">•</span>
            <span className="vaga-modelo">{vaga.modelo}</span>
            <span className="vaga-separador">•</span>
            <span className="vaga-publicada">{vaga.publicada}</span>
          </div>
          <div className="vaga-salario">{vaga.salario}</div>
        </div>
      </div>

      <div className="vaga-conteudo">
        <h2>Sobre a vaga</h2>
        <p>{vaga.descricao}</p>

        <h2>Detalhes</h2>
        <div className="vaga-detalhes-badges">
          <span className="badge tipo">{vaga.tipo}</span>
          <span className="badge area">{vaga.area}</span>
          <span className="badge modelo">{vaga.modelo}</span>
        </div>
      </div>

      <div className="vaga-acoes">
        <Link to="/" className="btn-voltar">← Voltar para as vagas</Link>
      </div>
    </div>
  );
};
