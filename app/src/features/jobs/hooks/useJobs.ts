import { useState, useEffect, useCallback } from "react";
import { type IJob } from "../types/job";

export const useJobs = () => {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/vagas.json");
        if (!response.ok) {
          throw new Error("Não foi possível carregar as vagas.");
        }
        const data = await response.json();
        if (isMounted && Array.isArray(data)) {
          setJobs(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Erro desconhecido");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchJobs();

    return () => {
      isMounted = false;
    };
  }, []);

  const addJob = useCallback(
    async (newJob: Omit<IJob, "id">) => {
      const response = await fetch("/api/vagas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJob),
      });

      if (!response.ok) {
        const body = await response.json();
        throw new Error(
          body.error || "Não foi possível salvar a vaga."
        );
      }

      const result = await response.json();
      setJobs((prev) => [...prev, result.job]);
    },
    []
  );

  return { jobs, loading, error, addJob };
};
