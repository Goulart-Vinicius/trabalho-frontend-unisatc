import type { FC } from "react";
import { Badge } from "../ui/Badge";

interface IJobDetailCardProps {
  company: string;
  role: string;
  salary: string;
  workplaceType: string;
  type: string;
  area: string;
  description: string;
  publishedAt: string;
}

export const JobDetailCard: FC<IJobDetailCardProps> = ({
  company,
  role,
  salary,
  workplaceType,
  type,
  area,
  description,
  publishedAt,
}) => {
  const initials = company.slice(0, 1).toUpperCase();

  return (
    <article
      aria-labelledby={`job-detail-${role}`}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Job Header */}
      <div className="bg-white border border-[#e2e5e9] rounded-lg p-8 mb-6">
        <div className="flex items-start gap-6 mb-6">
          <div
            aria-hidden="true"
            className="w-16 h-16 rounded flex items-center justify-center shrink-0 bg-[#0e1013] text-white font-bold text-xl shadow-sm"
          >
            {initials}
          </div>

          <div className="flex-1 min-w-0">
            <h1 id={`job-detail-${role}`} className="text-3xl font-bold text-[#0e1013] mb-2">
              {role}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="font-semibold text-[#0e1013]">{company}</span>
              <span aria-hidden="true" className="text-[#5f6774]">•</span>
              <span className="text-[#5f6774]">{workplaceType}</span>
              <span aria-hidden="true" className="text-[#5f6774]">•</span>
              <span className="text-[#5f6774] font-mono">{publishedAt}</span>
            </div>
          </div>
        </div>

        {/* Salary */}
        <div className="pt-6 border-t border-[#e2e5e9]">
          <div className="font-mono text-2xl font-bold text-[#0047ff]">
            {salary}
          </div>
        </div>
      </div>

      {/* Job Details */}
      <div className="bg-white border border-[#e2e5e9] rounded-lg p-8 space-y-8">
        {/* Description */}
        <section>
          <h2 className="text-xl font-bold text-[#0e1013] mb-4">Sobre a vaga</h2>
          <div className="text-[#5f6774] space-y-3">
            <p>{description}</p>
          </div>
        </section>

        {/* Badges */}
        <section>
          <h2 className="text-xl font-bold text-[#0e1013] mb-4">Detalhes</h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="highlight">
              <span className="sr-only">Tipo de contrato: </span>
              {type}
            </Badge>
            <Badge variant="outline">
              <span className="sr-only">Área de atuação: </span>
              {area}
            </Badge>
            <Badge variant="muted">
              <span className="sr-only">Modalidade: </span>
              {workplaceType}
            </Badge>
          </div>
        </section>
      </div>
    </article>
  );
};
