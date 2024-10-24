import type { ConfigType } from "../types";

const config: ConfigType = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  baseEndpoint: process.env.BASE_ENDPOINT || "api/users",
};

export default config;
