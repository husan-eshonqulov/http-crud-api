import type { ServerResponse } from "node:http";
import type { CustomRequest } from "../types";

const BASEURL = "/api/users";
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

  if (!url || !(url.startsWith(`${BASEURL}/`) || url === BASEURL)) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({ error: "Not Found" }));
  }

  next();
};

export default filterMethUrl;