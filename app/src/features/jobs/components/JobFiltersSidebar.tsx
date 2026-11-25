import type { FC } from "react";
import { useJobsContext } from "../hooks/useJobsContext";
import { FilterGroup } from "../../../shared/ui/FilterGroup";

export const JobFiltersSidebar: FC = () => {
  const {
    selectedTypes,
    selectedAreas,
    areaOptions,
    typeOptions,
    hasActiveFilters,
    toggleType,
    toggleArea,
    clearFilters,
  } = useJobsContext();

  return (
    <aside
      aria-label="Filtros de vagas"
      className="lg:col-span-1 bg-white border border-[#e2e5e9] rounded-lg p-5 sticky top-20 flex flex-col gap-6"
    >
      <div className="flex items-center justify-between pb-3 border-b border-[#e2e5e9]">
        <span className="text-xs font-mono uppercase tracking-wider font-semibold text-[#0e1013]">
          Filtros
        </span>
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={clearFilters}
            className="text-xs text-[#0047ff] hover:underline cursor-pointer"
          >
            Limpar
          </button>
        ) : null}
      </div>

      <FilterGroup
        label="Área de atuação"
        options={areaOptions}
        selected={selectedAreas}
        onToggle={toggleArea}
        showCount
      />

      <div className="h-px bg-[#e2e5e9]" aria-hidden="true" />

      <FilterGroup
        label="Regime de contratação"
        options={typeOptions}
        selected={selectedTypes}
        onToggle={toggleType}
        variant="primary"
      />
    </aside>
  );
};
