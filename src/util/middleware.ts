import type { ServerResponse } from "node:http";
import type { CustomRequest, MiddlewareType } from "../types";

export const runMiddlewares = (
  middlewares: MiddlewareType[],
  req: CustomRequest,
  res: ServerResponse,
  done: () => void,
) => {
  const midLen = middlewares.length;
  let index = 0;

  const next = () => {
    if (index < midLen) {
      const middleware = middlewares[index++];
      middleware(req, res, next);
    } else {
      done();
    }
  };

  next();
};
