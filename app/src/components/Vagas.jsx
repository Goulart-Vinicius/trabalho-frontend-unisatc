import { useState, useEffect } from "react";
import { VagaCard } from "../components/VagaCard";
import { buscarVagas } from "../services/vagasService";
import { useJobs } from "../hooks/useJobs";

const STORAGE_KEY = "openboard:published-jobs";

export const Vagas = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { addJob } = useJobs();

  useEffect(() => {
    const carregarVagas = async () => {
      try {
        setLoading(true);
        const data = await buscarVagas();
        const saved = JSON.parse(
          localStorage.getItem(STORAGE_KEY) || "[]"
        );
        setJobs([...data, ...saved]);
      } catch (err) {
        setError(err.message || "Erro ao carregar vagas");
      } finally {
        setLoading(false);
      }
    };

    carregarVagas();
  }, []);

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleArea = (area) => {
    setSelectedAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedAreas([]);
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedTypes.length > 0 ||
    selectedAreas.length > 0 ||
    searchQuery.trim().length > 0;

  const filteredJobs = jobs.filter(
    (job) =>
      (selectedTypes.length === 0 || selectedTypes.includes(job.tipo)) &&
      (selectedAreas.length === 0 || selectedAreas.includes(job.area)) &&
      (searchQuery.trim() === "" ||
        job.cargo.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const areaOptions = [...new Set(jobs.map((j) => j.area))];
  const typeOptions = [...new Set(jobs.map((j) => j.tipo))];

  const counterLabel = `${filteredJobs.length} ${
    filteredJobs.length === 1 ? "vaga" : "vagas"
  } filtradas`;

  useEffect(() => {
    document.title = `${filteredJobs.length} vagas | OpenBoard`;
  }, [filteredJobs.length]);

  if (loading) {
    return (
      <div className="carregando">
        <p>Carregando vagas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="erro">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section id="vagas" className="vagas-section">
      <div className="vagas-header">
        <div>
          <span className="vagas-label">Index ao vivo</span>
          <h2 className="vagas-titulo">Oportunidades em aberto</h2>
        </div>
        <div className="vagas-controles">
          <div className="contador-filtros">
            <span className="contador-texto">{counterLabel}</span>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="btn-limpar"
              >
                Limpar filtros
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="busca-container">
        <label htmlFor="busca-vagas" className="sr-only">
          Buscar vagas por cargo
        </label>
        <input
          id="busca-vagas"
          type="text"
          placeholder="Buscar por cargo (ex: design, engineer, manager...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-busca"
        />
      </div>

      <div className="vagas-grid">
        <aside className="filtros-sidebar">
          <div className="filtros-header">
            <span className="filtros-titulo">Filtros</span>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="btn-limpar-filtros"
              >
                Limpar
              </button>
            )}
          </div>
          <div className="filtro-grupo">
            <label className="filtro-label">Área de atuação</label>
            <div className="filtro-opcoes" id="filtro-area">
              {areaOptions.map((area) => (
                <button
                  key={area}
                  className={`filtro-opcao ${
                    selectedAreas.includes(area) ? "selecionado" : ""
                  }`}
                  onClick={() => toggleArea(area)}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>
          <div className="divisor"></div>
          <div className="filtro-grupo">
            <label className="filtro-label">Regime de contratação</label>
            <div className="filtro-opcoes" id="filtro-tipo">
              {typeOptions.map((tipo) => (
                <button
                  key={tipo}
                  className={`filtro-opcao ${
                    selectedTypes.includes(tipo) ? "selecionado" : ""
                  }`}
                  onClick={() => toggleType(tipo)}
                >
                  {tipo}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="vagas-lista">
          {filteredJobs.length === 0 ? (
            <div className="vaga-vazia">
              <div className="vazio-icone">/</div>
              <h3>Nenhuma vaga encontrada</h3>
              <p>
                Não há oportunidades abertas para a combinação de filtros
                selecionada.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="btn-limpar-todos"
              >
                Limpar todos os filtros
              </button>
            </div>
          ) : (
            filteredJobs.map((vaga) => (
              <VagaCard key={vaga.id} vaga={vaga} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};
