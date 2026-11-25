export interface IPublishJobForm {
  company: string;
  role: string;
  salary: string;
  workplaceType: string;
  type: string;
  area: string;
  description: string;
}

export type IPublishJobType = IPublishJobForm["type"];
export type IPublishJobArea = IPublishJobForm["area"];
export type IPublishJobWorkplaceType = IPublishJobForm["workplaceType"];