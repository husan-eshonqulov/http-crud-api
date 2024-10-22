import http from "node:http";
import config from "./config";

const server = http.createServer();

server.listen(config.port, () => {
  console.log(`server listening on port ${config.port}...`);
});
