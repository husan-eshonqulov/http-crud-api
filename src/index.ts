import http from "node:http";
import config from "./config";
import requestHandler from "./handler/request";

const server = http.createServer(requestHandler);

server.listen(config.port, () => {
  console.log(`server listening on port ${config.port}`);
});
