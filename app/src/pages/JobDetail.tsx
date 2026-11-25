import { useEffect, useState, type FC } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { Button } from "../shared/ui/Button";
import type { IJob } from "../features/jobs/types/job";

export const JobDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<IJob | null>(null);
  const [allJobs, setAllJobs] = useState<IJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/vagas.json");

        if (!response.ok) {
          throw new Error("Não foi possível carregar as vagas.");
        }

        const jobs: IJob[] = await response.json();
        setAllJobs(jobs);
        const foundJob = jobs.find((j) => String(j.id) === id);

        if (!foundJob) {
          setNotFound(true);
        } else {
          setJob(foundJob);
        }
      } catch {
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  // Navegação entre vagas
  const currentIndex = allJobs.findIndex((j) => String(j.id) === id);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < allJobs.length - 1;

  const goToPrevious = () => {
    if (hasPrevious) {
      navigate(`/vagas/${allJobs[currentIndex - 1].id}`);
    }
  };

  const goToNext = () => {
    if (hasNext) {
      navigate(`/vagas/${allJobs[currentIndex + 1].id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border border-[#e2e5e9] rounded-lg p-12 text-center">
          <div
            aria-hidden="true"
            className="w-12 h-12 rounded-full border-4 border-[#e2e5e9] border-t-[#0047ff] animate-spin mx-auto mb-4"
          />
          <p className="text-base font-medium text-[#0e1013]">
            Carregando detalhes da vaga...
          </p>
        </div>
      </div>
    );
  }

  if (notFound || !job) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border border-[#e2e5e9] rounded-lg p-12 text-center">
          <div
            aria-hidden="true"
            className="w-16 h-16 rounded-full bg-[#f1f3f5] text-[#5f6774] flex items-center justify-center mx-auto mb-4 text-3xl font-bold"
          >
            ?
          </div>
          <h1 className="text-2xl font-bold text-[#0e1013] mb-2">
            Vaga não encontrada
          </h1>
          <p className="text-sm text-[#5f6774] mb-6">
            A vaga que você está procurando não existe ou foi removida.
          </p>
          <Link to="/">
            <Button variant="cobalt" size="md">
              ← Voltar para as vagas
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleApply = () => {
    alert(`Candidatura aberta para ${job.role} na ${job.company}!`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Link and Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#0047ff] hover:underline"
        >
          <span aria-hidden="true">←</span>
          Voltar para as vagas
        </Link>

        {/* Navigation between jobs */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={goToPrevious}
            disabled={!hasPrevious}
            aria-label="Vaga anterior"
            className="font-medium"
          >
            <span aria-hidden="true">←</span>
            Anterior
          </Button>
          <span className="text-xs text-[#5f6774] font-mono px-2">
            {currentIndex + 1} / {allJobs.length}
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={goToNext}
            disabled={!hasNext}
            aria-label="Próxima vaga"
            className="font-medium"
          >
            Próxima
            <span aria-hidden="true">→</span>
          </Button>
        </div>
      </div>

      {/* Job Header */}
      <div className="bg-white border border-[#e2e5e9] rounded-lg p-8 mb-6">
        <div className="flex items-start gap-6 mb-6">
          <div
            aria-hidden="true"
            className={`w-16 h-16 rounded flex items-center justify-center shrink-0 ${"bg-[#0e1013]"} text-white font-bold text-xl shadow-sm`}
          >
            {job.company.charAt(0)}
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold text-[#0e1013] mb-2">
              {job.role}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="font-semibold text-[#0e1013]">
                {job.company}
              </span>
              <span aria-hidden="true" className="text-[#5f6774]">
                •
              </span>
              <span className="text-[#5f6774]">{job.workplaceType}</span>
              <span aria-hidden="true" className="text-[#5f6774]">
                •
              </span>
              <span className="text-[#5f6774] font-mono">
                {job.publishedAt}
              </span>
            </div>
          </div>
        </div>

        {/* Salary and Apply */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-[#e2e5e9]">
          <div className="font-mono text-2xl font-bold text-[#0047ff]">
            {job.salary}
          </div>
          <Button variant="cobalt" size="lg" onClick={handleApply}>
            Candidatar-se a esta vaga
            <span aria-hidden="true">→</span>
          </Button>
        </div>
      </div>

      {/* Job Details */}
      <div className="bg-white border border-[#e2e5e9] rounded-lg p-8 space-y-8">
        {/* Description */}
        <section>
          <h2 className="text-xl font-bold text-[#0e1013] mb-4">
            Sobre a vaga
          </h2>
          <div className="text-[#5f6774] space-y-3">
            <p>{job.description}</p>
          </div>
        </section>

        {/* CTA */}
        <div className="pt-6 border-t border-[#e2e5e9]">
          <div className="bg-[#f8f9fa] rounded-lg p-6 text-center">
            <p className="text-sm text-[#5f6774] mb-4">
              Interessado nesta oportunidade?
            </p>
            <Button variant="cobalt" size="lg" onClick={handleApply}>
              Candidatar-se agora
              <span aria-hidden="true">→</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
