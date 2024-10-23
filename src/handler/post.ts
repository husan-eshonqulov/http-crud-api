import type { ServerResponse } from "node:http";
import type { CustomRequest } from "../types";
import { getMainEndpoint } from "../helper/request";
import User from "../model/user";

const postHandler = (req: CustomRequest, res: ServerResponse) => {
  const mainEndpoint = getMainEndpoint(req.url!);
  const body = req.body;

  if (!(body.username && body.age && body.hobbies)) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({ error: "Bad Request" }));
  }

  if (mainEndpoint === "/") {
    const newUser = new User(body.username, body.age, body.hobbies);
    newUser.save();
    res.statusCode = 201;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify(newUser));
  }
};

export default postHandler;
