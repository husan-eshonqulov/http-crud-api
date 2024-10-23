import type { ServerResponse } from "node:http";
import type { CustomRequest } from "../types";
import config from "../config";

const BASEENDPOINT = config.baseEndpoint;
const METHODS = ["GET", "POST", "PUT", "DELETE"];

const filterMethUrl = (
  req: CustomRequest,
  res: ServerResponse,
  next: () => void,
) => {
  const url = req.url;
  const method = req.method;

  if (!method || !METHODS.includes(method)) {
    res.statusCode = 405;
    res.setHeader("Allow", "GET, POST, PUT, DELETE");
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({ error: "Method Not Allowed" }));
  }

  if (!url || !(url.startsWith(`${BASEENDPOINT}/`) || url === BASEENDPOINT)) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({ error: "Not Found" }));
  }

  next();
};

export default filterMethUrl;
