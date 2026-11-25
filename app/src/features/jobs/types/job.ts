export interface IJob {
  id: number;
  company: string;
  role: string;
  area: string;
  description: string;
  publishedAt: string;
  salary: string;
  type: string;
  workplaceType: string;
}

export type IJobType = IJob["type"];
export type IJobArea = IJob["area"];

export interface IFilterOption<T extends string> {
  id: T;
  label: string;
}

import type { ReactNode } from "react";
import type { IDerivedOption } from "../utils/deriveOptions";

export interface IJobsContext {
  jobs: IJob[];
  filteredJobs: IJob[];
  loading: boolean;
  error: string | null;
  selectedTypes: string[];
  selectedAreas: string[];
  searchQuery: string;
  typeOptions: IDerivedOption[];
  areaOptions: IDerivedOption[];
  hasActiveFilters: boolean;
  toggleType: (type: string) => void;
  toggleArea: (area: string) => void;
  setSearchQuery: (query: string) => void;
  addJob: (newJob: Omit<IJob, "id">) => Promise<void>;
  clearFilters: () => void;
  handleApply: (job: IJob) => void;
}

export interface IJobsProviderProps {
  children: ReactNode;
}
