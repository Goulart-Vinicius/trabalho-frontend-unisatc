import { useCallback, useMemo, useState, type FC } from "react";
import {
  type IJob,
  type IJobType,
  type IJobArea,
  type IJobsProviderProps,
} from "../types/job";
import { useJobs } from "../hooks/useJobs";
import { JobsContext } from "./JobsContext";
import { deriveOptions } from "../utils/deriveOptions";

// fora do componente: referência estável, não precisa entrar nas deps
const handleApply = (job: IJob) => {
  alert(`Candidatura aberta para ${job.role} na ${job.company}!`);
};

const toggleInList = <T,>(list: T[], item: T): T[] =>
  list.includes(item) ? list.filter((v) => v !== item) : [...list, item];

export const JobsProvider: FC<IJobsProviderProps> = ({ children }) => {
  const { jobs, loading, error, addJob } = useJobs();

  const [selectedTypes, setSelectedTypes] = useState<IJobType[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<IJobArea[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const areaOptions = useMemo(() => deriveOptions(jobs, (j) => j.area), [jobs]);
  const typeOptions = useMemo(() => deriveOptions(jobs, (j) => j.type), [jobs]);

  const toggleType = useCallback(
    (type: IJobType) => setSelectedTypes((prev) => toggleInList(prev, type)),
    [],
  );

  const toggleArea = useCallback(
    (area: IJobArea) => setSelectedAreas((prev) => toggleInList(prev, area)),
    [],
  );

  const clearFilters = useCallback(() => {
    setSelectedTypes([]);
    setSelectedAreas([]);
    setSearchQuery("");
  }, []);

  const filteredJobs = useMemo(() => {
    const types = new Set(selectedTypes);
    const areas = new Set(selectedAreas);
    const searchLower = searchQuery.trim().toLowerCase();

    return jobs.filter(
      (job) =>
        (types.size === 0 || types.has(job.type)) &&
        (areas.size === 0 || areas.has(job.area)) &&
        (searchLower === "" || job.role.toLowerCase().includes(searchLower)),
    );
  }, [jobs, selectedTypes, selectedAreas, searchQuery]);

  const hasActiveFilters =
    selectedTypes.length > 0 ||
    selectedAreas.length > 0 ||
    searchQuery.trim().length > 0;

  const value = useMemo(
    () => ({
      jobs,
      filteredJobs,
      loading,
      error,
      selectedTypes,
      selectedAreas,
      searchQuery,
      addJob,
      areaOptions,
      typeOptions,
      hasActiveFilters,
      toggleType,
      toggleArea,
      setSearchQuery,
      clearFilters,
      handleApply,
    }),
    [
      jobs,
      filteredJobs,
      loading,
      error,
      selectedTypes,
      selectedAreas,
      searchQuery,
      addJob,
      areaOptions,
      typeOptions,
      hasActiveFilters,
      toggleType,
      toggleArea,
      clearFilters,
    ],
  );

  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
};
