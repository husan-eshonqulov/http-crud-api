import type { ServerResponse } from "node:http";
import type { CustomRequest } from "../types";

const bodyParser = (
  req: CustomRequest,
  res: ServerResponse,
  next: () => void,
) => {
  const contentType = req.headers["content-type"];

  if (contentType !== "application/json") {
    return next();
  }

  let body = "";

  req.on("data", (chunk) => (body += chunk.toString()));

  req.on("end", () => {
    try {
      req.body = JSON.parse(body);
      return next();
    } catch (err) {
      res.statusCode = 400;
      res.end({ error: err });
    }
  });

  req.on("error", () => {
    res.statusCode = 500;
    res.end({ error: "Internal Server Error" });
  });
};

export default bodyParser;
