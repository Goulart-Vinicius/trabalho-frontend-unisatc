import { useState, useEffect } from "react";
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

  return { jobs, loading, error };
};
