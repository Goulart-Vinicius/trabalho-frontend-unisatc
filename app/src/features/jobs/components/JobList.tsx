import type { FC } from "react";
import { JobCard } from "./JobCard";
import { JobsEmptyState } from "./JobsEmptyState";
import { useJobsContext } from "../hooks/useJobsContext";

export const JobList: FC = () => {
  const { filteredJobs, handleApply } = useJobsContext();

  return (
    <>
      <output className="sr-only">
        {`${filteredJobs.length} vagas encontradas`}
      </output>

      {filteredJobs.length === 0 ? (
        <JobsEmptyState />
      ) : (
        <div className="flex flex-col divide-y divide-[#e2e5e9] border border-[#e2e5e9] rounded-lg bg-white overflow-hidden">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} onApply={handleApply} />
          ))}
        </div>
      )}
    </>
  );
};
