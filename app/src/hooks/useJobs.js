import { useState, useCallback } from "react";

const STORAGE_KEY = "openboard:published-jobs";

export const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const addJob = useCallback(
    (newJob) => {
      const jobWithId = { ...newJob, id: Date.now() };
      setJobs((prev) => [...prev, jobWithId]);

      const saved = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );
      const updated = [...saved, jobWithId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    },
    []
  );

  return { jobs, loading, error, addJob, setJobs };
};
