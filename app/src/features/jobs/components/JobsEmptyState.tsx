import type { FC } from "react";
import { Button } from "../../../shared/ui/Button";
import { useJobsContext } from "../hooks/useJobsContext";

export const JobsEmptyState: FC = () => {
  const { clearFilters } = useJobsContext();

  return (
    <div className="bg-white border border-[#e2e5e9] rounded-lg p-12 text-center">
      <div
        aria-hidden="true"
        className="w-10 h-10 rounded-full bg-[#f1f3f5] text-[#5f6774] flex items-center justify-center mx-auto mb-3 text-lg font-mono"
      >
        /
      </div>
      <h3 className="text-base font-semibold text-[#0e1013] mb-1">
        Nenhuma vaga encontrada
      </h3>
      <p className="text-sm text-[#5f6774] mb-4 max-w-sm mx-auto">
        Não há oportunidades abertas para a combinação de filtros selecionada.
      </p>
      <Button size="sm" variant="outline" onClick={clearFilters}>
        Limpar todos os filtros
      </Button>
    </div>
  );
};
