export type MiaodaDyanmicMenuItem = {
  id: string;
  icon?: any;
  name: string;
  disableFooter?: boolean;
  children?: MiaodaDyanmicMenuItem[];
};

export type MiaodaBasicConfig = {
  disabled?: boolean;
  cwd?: string; // by default, it's $MDGJX_EXT_PATH/$id unless you have a dedicated path
  id: string;
  version: string;
  logo: string;
  name: string;
  shortDesc: string;
  description: string;
  authors?: string[];
  homepage?: string[];
  development: {
    entryLink: string;
  };
  runtime: {
    // "web-static-embedded": for web app that can be embedded in the main page
    // "web-static-standalone": for web app that needs to be launched in a new server
    type: "web-static-embedded" | "web-static-standalone";
    standalone?: {
      ports: number[]; // for some web app, we do need this ports
    };
    embedded: {
      folder: string[]; 
    }
  };
  keywords?: string[];
  include: string[];
  menus: [];
};

export const REGISTER_CONFIG_OBJ: MiaodaBasicConfig[] = [];

export const fn_miaoda_registerConfig = (config: MiaodaBasicConfig) => {
  REGISTER_CONFIG_OBJ.push(config);
  return config;
};
