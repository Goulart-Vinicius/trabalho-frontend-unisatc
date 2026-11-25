import type { FC } from "react";
import { useJobsContext } from "../hooks/useJobsContext";

export const SearchBar: FC = () => {
  const { searchQuery, setSearchQuery } = useJobsContext();

  return (
    <div className="relative w-full">
      <label htmlFor="job-search" className="sr-only">
        Buscar vagas por cargo
      </label>
      <div className="relative">
        <input
          id="job-search"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar por cargo (ex: design, engineer, manager...)"
          className="w-full px-4 py-2.5 pr-10 text-sm text-[#0e1013] bg-white border border-[#e2e5e9] rounded-md hover:border-[#ccd2d9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0047ff] transition-colors"
        />
        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5f6774] pointer-events-none"
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 12C9.76142 12 12 9.76142 12 7C12 4.23858 9.76142 2 7 2C4.23858 2 2 4.23858 2 7C2 9.76142 4.23858 12 7 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 14L10.5 10.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};
