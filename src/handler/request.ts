import type { RequestListener } from "node:http";
import type { CustomRequest } from "../types";
import { runMiddlewares } from "../util/middleware";
import filterMethUrl from "../middleware/filter";
import bodyParser from "../middleware/bodyParser";
import getHandler from "./get";
import postHandler from "./post";
import deleteHandler from "./delete";

const requestHandler: RequestListener = (req, res) => {
  const customReq = req as CustomRequest;
  const middlewares = [filterMethUrl, bodyParser];

  runMiddlewares(middlewares, customReq, res, () => {
    switch (customReq.method) {
      case "GET":
        return getHandler(customReq, res);
      case "POST":
        return postHandler(customReq, res);
      case "DELETE":
        return deleteHandler(customReq, res);
    }
  });
};

export default requestHandler;
