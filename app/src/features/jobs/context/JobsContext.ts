import { createContext } from "react";
import { type IJobsContext } from "../types/job";

export const JobsContext = createContext<IJobsContext | undefined>(undefined);
