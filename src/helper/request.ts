import config from "../config";

export const getMainEndpoint = (endpoint: string) => {
  return endpoint === config.baseEndpoint
    ? "/"
    : endpoint.slice(config.baseEndpoint.length);
};

export const getNumOfParams = (mainEndpoint: string) => {
  const numOfSlashes = mainEndpoint.match(/\//g)!.length;
  return mainEndpoint.endsWith("/") ? numOfSlashes - 1 : numOfSlashes;
};

export const getIdParam = (mainEndpoint: string) => {
  const endIdx = mainEndpoint.indexOf("/", 1);
  return mainEndpoint.slice(1, endIdx !== -1 ? endIdx : mainEndpoint.length);
};
