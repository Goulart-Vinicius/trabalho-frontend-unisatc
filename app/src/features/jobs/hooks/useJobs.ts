import { useState, useEffect, useCallback } from "react";
import { type IJob } from "../types/job";

const STORAGE_KEY = "openboard:published-jobs";

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
          // Mescla vagas da API com vagas publicadas salvas no localStorage
          const saved = JSON.parse(
            localStorage.getItem(STORAGE_KEY) || "[]"
          ) as IJob[];
          setJobs([...data, ...saved]);
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
    (newJob: Omit<IJob, "id">) => {
      const jobWithId: IJob = {
        ...newJob,
        id: Date.now(),
      };

      setJobs((prev) => {
        const updated = [...prev, jobWithId];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    },
    []
  );

  return { jobs, loading, error, addJob };
};
