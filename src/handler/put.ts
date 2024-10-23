import type { ServerResponse } from "node:http";
import type { CustomRequest } from "../types";
import { getIdParam, getMainEndpoint } from "../helper/request";
import User from "../model/user";

const putHandler = (req: CustomRequest, res: ServerResponse) => {
  const mainEndpoint = getMainEndpoint(req.url!);
  const id = getIdParam(mainEndpoint);
  const user = User.readById(id);

  if (user) {
    const updUser = User.update(id, req.body);
    res.statusCode = 201;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify(updUser));
  }

  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json");
  return res.end(JSON.stringify({ error: "Not Found" }));
};

export default putHandler;
