import type { ServerResponse } from "node:http";
import type { CustomRequest } from "../types";
import config from "../config";
import { getMainEndpoint, getNumOfParams } from "../helper/request";

const BASEENDPOINT = config.baseEndpoint;
const METHODS = ["GET", "POST", "PUT", "DELETE"];

const filterMethUrl = (
  req: CustomRequest,
  res: ServerResponse,
  next: () => void,
) => {
  const url = req.url;
  const method = req.method;
  const mainEndpoint = getMainEndpoint(url!);
  const numOfParams = getNumOfParams(mainEndpoint);

  if (!method || !METHODS.includes(method)) {
    res.statusCode = 405;
    res.setHeader("Allow", "GET, POST, PUT, DELETE");
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({ error: "Method Not Allowed" }));
  }

  if (
    !url ||
    !(url.startsWith(`${BASEENDPOINT}/`) || url === BASEENDPOINT) ||
    url.match(/\/(\/)+/g) ||
    (method === "POST" && numOfParams > 0) ||
    (method !== "POST" && numOfParams > 1)
  ) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({ error: "Bad Request" }));
  }

  next();
};

export default filterMethUrl;
