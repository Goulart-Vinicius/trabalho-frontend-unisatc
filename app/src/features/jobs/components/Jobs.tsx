import type { FC } from "react";
import { JobsProvider } from "../context/JobsProvider";
import { useJobsContext } from "../hooks/useJobsContext";
import { JobFiltersSidebar } from "./JobFiltersSidebar";
import { JobList } from "./JobList";
import { SearchBar } from "./SearchBar";

const JobsContent: FC = () => {
  const { filteredJobs, loading, hasActiveFilters, clearFilters } =
    useJobsContext();

  const counterLabel = loading
    ? "Carregando..."
    : `${filteredJobs.length} ${filteredJobs.length === 1 ? "vaga" : "vagas"} filtradas`;

  return (
    <section aria-labelledby="jobs-title" className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#e2e5e9] mb-8">
        <div>
          <span className="text-xs font-mono font-semibold text-[#0047ff] tracking-wide uppercase block mb-1">
            Index ao vivo
          </span>
          <h2
            id="jobs-title"
            className="text-2xl sm:text-3xl font-bold text-[#0e1013] tracking-tight"
          >
            Oportunidades em aberto
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-3">
            <span
              aria-live="polite"
              aria-atomic="true"
              className="text-xs font-mono text-[#5f6774] bg-[#e2e5e9]/50 px-2.5 py-1 rounded"
            >
              {counterLabel}
            </span>
            {hasActiveFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs font-medium text-[#0047ff] hover:underline cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0047ff] rounded-xs"
              >
                Limpar filtros
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <div className="py-4">
        <SearchBar />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        <JobFiltersSidebar />
        <div className="lg:col-span-3">
          <JobList />
        </div>
      </div>
    </section>
  );
};

export const Jobs: FC = () => {
  return (
    <JobsProvider>
      <JobsContent />
    </JobsProvider>
  );
};
