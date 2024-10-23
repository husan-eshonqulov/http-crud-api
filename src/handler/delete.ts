import type { ServerResponse } from "node:http";
import type { CustomRequest } from "../types";
import { getIdParam, getMainEndpoint } from "../helper/request";
import User from "../model/user";

const deleteHandler = (req: CustomRequest, res: ServerResponse) => {
  const mainEndpoint = getMainEndpoint(req.url!);
  const id = getIdParam(mainEndpoint);

  const user = User.readById(id);

  if (user) {
    const rmUser = User.delete(user.id);
    res.statusCode = 204;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify(rmUser));
  }

  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json");
  return res.end(JSON.stringify({ error: "Not Found" }));
};

export default deleteHandler;
