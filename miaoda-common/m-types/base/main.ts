export type MiaodaBasicConfig = {
  mode: string;
  id: string;
  version: string;
  logo: string;
  name: string;
  shortDesc: string;
  description: string;
  development: {
    entryLink: string;
  };
  menus: string;
  init: {
    dev: string;
    build: string;
  };
  start: {
    dev: string;
    build: string;
  };
  keywords?: string[];
  include: string[];
};
