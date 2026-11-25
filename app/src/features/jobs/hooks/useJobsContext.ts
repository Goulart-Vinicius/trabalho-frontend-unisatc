import { useContext } from "react";
import { JobsContext } from "../context/JobsContext";
import { type IJobsContext } from "../types/job";

export const useJobsContext = (): IJobsContext => {
  const context = useContext(JobsContext);
  if (!context) {
    throw new Error("useJobsContext deve ser utilizado dentro de um JobsProvider");
  }
  return context;
};
