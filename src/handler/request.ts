import type { RequestListener } from "node:http";
import type { CustomRequest } from "../types";
import { runMiddlewares } from "../util/middleware";
import bodyParser from "../middleware/bodyParser";

const requestHandler: RequestListener = (req, res) => {
  const customReq = req as CustomRequest;
  const middlewares = [bodyParser];

  runMiddlewares(middlewares, customReq, res, () => {
    console.log(customReq.body);
    res.end();
  });
};

export default requestHandler;
