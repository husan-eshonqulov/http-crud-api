import type { ServerResponse } from "node:http";
import type { CustomRequest } from "../types";
import { getIdParam, getMainEndpoint } from "../helper/request";
import User from "../model/user";
import { isValidId } from "../helper/uuid";

const putHandler = (req: CustomRequest, res: ServerResponse) => {
  const mainEndpoint = getMainEndpoint(req.url!);
  const id = getIdParam(mainEndpoint);

  if (isValidId(id)) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");

    return res.end(JSON.stringify({ error: "Bad Request" }));
  }

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
