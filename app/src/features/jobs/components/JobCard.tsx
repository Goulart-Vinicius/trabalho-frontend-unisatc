import type { FC } from "react";
import { Button } from "../../../shared/ui/Button";
import { Badge } from "../../../shared/ui/Badge";
import { type IJob } from "../types/job";

interface IJobCardProps {
  job: IJob;
  onApply: (job: IJob) => void;
}

export const JobCard: FC<IJobCardProps> = ({ job, onApply }) => {
  const titleId = `job-title-${job.id}`;
  const initials = job.company.slice(0, 2).toUpperCase();

  return (
    <article
      aria-labelledby={titleId}
      className="group flex flex-col md:flex-row md:items-center justify-between p-4 sm:p-5 hover:bg-[#f8f9fa] transition-colors motion-reduce:transition-none gap-4 [content-visibility:auto] [contain-intrinsic-size:96px]"
    >
      <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
        <div
          aria-hidden="true"
          className="w-11 h-11 rounded flex items-center justify-center shrink-0 bg-[#0e1013] text-white font-bold text-sm shadow-xs select-none"
        >
          {initials}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-semibold text-xs text-[#0e1013]">
              {job.company}
            </span>
            <span aria-hidden="true" className="text-xs text-[#5f6774]">
              ·
            </span>
            <span className="text-xs text-[#5f6774] font-mono">
              {job.publishedAt}
            </span>
          </div>

          <h3
            id={titleId}
            className="text-base sm:text-lg font-semibold text-[#0e1013] group-hover:text-[#0047ff] transition-colors line-clamp-2"
          >
            {job.role}
          </h3>

          <p className="mt-1 text-xs text-[#5f6774] line-clamp-2">
            {job.description}
          </p>

          <div className="flex flex-wrap items-center gap-2 mt-2">
            <Badge variant="highlight">
              <span className="sr-only">Faixa salarial: </span>
              {job.salary}
            </Badge>
            <Badge variant="muted">
              <span className="sr-only">Modelo: </span>
              {job.workplaceType}
            </Badge>
            <Badge variant="outline">
              <span className="sr-only">Tipo de contrato: </span>
              {job.type}
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-[#e2e5e9]/50 shrink-0">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onApply(job)}
          aria-label={`Candidatar-se à vaga ${job.role} na empresa ${job.company}`}
          className="w-full md:w-auto font-medium group-hover:border-[#0047ff] group-hover:text-[#0047ff]"
        >
          <span>Candidatar-se</span>
          <span aria-hidden="true">→</span>
        </Button>
      </div>
    </article>
  );
};
