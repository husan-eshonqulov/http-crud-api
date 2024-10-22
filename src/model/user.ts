import { v4 as uuid } from "uuid";
import { users } from "./data";

class User {
  private id: string;
  private username: string;
  private age: number;
  private hobbies: string[];

  constructor(username: string, age: number, hobbies: string[]) {
    this.id = uuid();
    this.username = username;
    this.age = age;
    this.hobbies = hobbies;
  }

  static fetchAll() {
    return users;
  }

  static findById(id: string) {
    return users.find((user) => user.id === id);
  }

  save() {
    const user = User.findById(this.id);

    if (user) {
      const idx = users.findIndex((u) => u.id === user.id);
      users[idx] = {
        id: this.id,
        username: this.username,
        age: this.age,
        hobbies: this.hobbies,
      };
    } else {
      users.push({
        id: this.id,
        username: this.username,
        age: this.age,
        hobbies: this.hobbies,
      });
    }
  }

  destroy() {
    const idx = users.findIndex((user) => user.id === this.id);
    users.splice(idx, 1);
  }
}

export default User;
