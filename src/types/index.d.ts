import { IncomingMessage, ServerResponse } from "node:http";

export type ConfigType = {
  port: number;
  baseEndpoint: string;
};

export type UserType = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
};

export interface CustomRequest extends IncomingMessage {
  body: Omit<UserType, "id">;
}

export type MiddlewareType = (
  req: CustomRequest,
  res: ServerResponse,
  next: () => void,
) => void;
