import { useState } from "react";
import { Link } from "react-router";
import { VagaCard } from "../components/VagaCard";
import { useJobs } from "../hooks/useJobs";

const CAMPOS = [
  { nome: "empresa", rotulo: "Empresa", tipo: "text", placeholder: "Ex: Vercel, Nubank, SATC Labs..." },
  { nome: "cargo", rotulo: "Cargo / Título da vaga", tipo: "text", placeholder: "Ex: Full-stack Engineer, Product Designer..." },
  { nome: "salario", rotulo: "Faixa salarial", tipo: "text", placeholder: "Ex: R$ 10k - 20k" },
  { nome: "modelo", rotulo: "Modalidade de trabalho", tipo: "select", opcoes: ["Remoto", "Presencial", "Híbrido"] },
  { nome: "tipo", rotulo: "Tipo de contratação", tipo: "select", opcoes: ["Efetivo", "Estágio", "Temporário"] },
  { nome: "area", rotulo: "Área", tipo: "select", opcoes: ["Engenharia", "Design", "Gestão"] },
  { nome: "descricao", rotulo: "Descrição da vaga", tipo: "textarea", placeholder: "Descreva as responsabilidades, requisitos, tecnologias, benefícios..." },
];

export const CadastroPage = () => {
  const [formulario, setFormulario] = useState({
    empresa: "",
    cargo: "",
    salario: "",
    modelo: "",
    tipo: "",
    area: "",
    descricao: "",
  });
  const [erros, setErros] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const { addJob } = useJobs();

  const validar = () => {
    const novosErros = {};
    CAMPOS.forEach((campo) => {
      if (!formulario[campo.nome]?.trim()) {
        novosErros[campo.nome] = `${campo.rotulo} é obrigatório`;
      }
    });
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleChange = (e) => {
    const { nome, value } = e.target;
    setFormulario((prev) => ({ ...prev, [nome]: value }));
    if (erros[nome]) {
      setErros((prev) => ({ ...prev, [nome]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validar()) return;

    const novaVaga = {
      empresa: formulario.empresa,
      cargo: formulario.cargo,
      salario: formulario.salario,
      modelo: formulario.modelo,
      tipo: formulario.tipo,
      area: formulario.area,
      publicada: "Agora",
      descricao: formulario.descricao,
    };
    addJob(novaVaga);
    setEnviado(true);
  };

  if (enviado) {
    return (
      <section className="cadastro-sucesso">
        <div className="sucesso-box">
          <span className="sucesso-icone">✓</span>
          <h2>Vaga publicada com sucesso</h2>
          <p>Sua vaga está disponível no índice. O valor de R$ 299 será cobrado.</p>
        </div>

        <VagaCard
          vaga={{
            id: Date.now(),
            empresa: formulario.empresa,
            cargo: formulario.cargo,
            salario: formulario.salario,
            modelo: formulario.modelo,
            tipo: formulario.tipo,
            area: formulario.area,
            publicada: "Agora",
            descricao: formulario.descricao,
          }}
          onCandidatar={() => {}}
        />

        <div className="sucesso-acao">
          <Link to="/" className="btn-voltar-home">← Voltar para a Home</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cadastro-page">
      <Link to="/" className="btn-voltar">← Voltar para as vagas</Link>

      <header className="cadastro-header">
        <h1>Publicar nova vaga</h1>
        <p>
          Preencha os dados abaixo. A vaga ficará disponível no índice aberto
          por 30 dias. Custo único de <strong>R$ 299</strong>.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="cadastro-form" noValidate>
        {CAMPOS.map((campo) => (
          <div key={campo.nome} className="campo">
            <label htmlFor={campo.nome} className="campo-label">
              {campo.rotulo}
            </label>
            {campo.tipo === "textarea" ? (
              <textarea
                id={campo.nome}
                name={campo.nome}
                placeholder={campo.placeholder}
                value={formulario[campo.nome]}
                onChange={handleChange}
                className={`campo-input ${erros[campo.nome] ? "campo-erro" : ""}`}
              />
            ) : campo.tipo === "select" ? (
              <select
                id={campo.nome}
                name={campo.nome}
                value={formulario[campo.nome]}
                onChange={handleChange}
                className={`campo-input ${erros[campo.nome] ? "campo-erro" : ""}`}
              >
                <option value="">Selecione...</option>
                {campo.opcoes.map((opcao) => (
                  <option key={opcao} value={opcao}>
                    {opcao}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={campo.nome}
                name={campo.nome}
                type={campo.tipo}
                placeholder={campo.placeholder}
                value={formulario[campo.nome]}
                onChange={handleChange}
                className={`campo-input ${erros[campo.nome] ? "campo-erro" : ""}`}
              />
            )}
            {erros[campo.nome] && (
              <span className="campo-erro-msg">{erros[campo.nome]}</span>
            )}
          </div>
        ))}

        <div className="cadastro-botoes">
          <button
            type="submit"
            className="btn-publicar"
            disabled={enviando}
          >
            {enviando ? "Publicando..." : "Publicar vaga por R$ 299"}
          </button>
        </div>
      </form>
    </section>
  );
};
