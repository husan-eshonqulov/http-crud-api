import type { RequestListener } from "node:http";
import type { CustomRequest } from "../types";
import { runMiddlewares } from "../util/middleware";
import filterMethUrl from "../middleware/filter";
import bodyParser from "../middleware/bodyParser";
import getHandler from "./get";

const requestHandler: RequestListener = (req, res) => {
  const customReq = req as CustomRequest;
  const middlewares = [filterMethUrl, bodyParser];

  runMiddlewares(middlewares, customReq, res, () => {
    switch (customReq.method) {
      case "GET":
        return getHandler(customReq, res);
    }
  });
};

export default requestHandler;
