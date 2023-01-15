export type BaseEntity = {
  id: string;
  createdAt: number;
};

export type SiteInfo = {
  name?: string;
  domain?: string;
  title?: string;
  path?: string;
};
