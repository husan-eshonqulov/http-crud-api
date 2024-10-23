import config from "../config";

export const getMainEndpoint = (endpoint: string) => {
  return endpoint === config.baseEndpoint
    ? "/"
    : endpoint.slice(config.baseEndpoint.length);
};
