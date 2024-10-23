import { v4 as uuid } from "uuid";
import type { UserType } from "../types";
import { users } from "./data";

class User {
  static create(body: Omit<UserType, "id">) {
    const newUser = { id: uuid(), ...body };
    users.push(newUser);
    return newUser;
  }

  static readAll() {
    return users;
  }

  static readById(id: string) {
    return users.find((user) => user.id === id);
  }

  static update(id: string, body: Omit<UserType, "id">) {
    const idx = users.findIndex((user) => user.id === id);
    const user = users[idx];
    const updUser = { ...user, ...body };
    users[idx] = updUser;
    return updUser;
  }

  static delete(id: string) {
    const idx = users.findIndex((user) => user.id === id);
    const user = users[idx];
    users.splice(idx, 1);
    return user;
  }
}

export default User;
