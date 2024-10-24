import type { ServerResponse } from "node:http";
import type { CustomRequest } from "../types";
import { getIdParam, getMainEndpoint } from "../helper/request";
import User from "../model/user";
import { isValidId } from "../helper/uuid";

const getHandler = (req: CustomRequest, res: ServerResponse) => {
  const mainEndpoint = getMainEndpoint(req.url!);

  if (mainEndpoint === "/") {
    const users = User.readAll();
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    return res.end(JSON.stringify(users));
  }

  const id = getIdParam(mainEndpoint);

  if (!isValidId(id)) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");

    return res.end(JSON.stringify({ error: "Bad Request" }));
  }

  const user = User.readById(id);

  if (user) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    return res.end(JSON.stringify(user));
  }

  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json");
  return res.end(JSON.stringify({ error: "Not Found" }));
};

export default getHandler;
