import { users } from "./data";

class User {
  private username: string;
  private age: number;
  private hobbies: string[];

  constructor(username: string, age: number, hobbies: string[]) {
    this.username = username;
    this.age = age;
    this.hobbies = hobbies;
  }

  static fetchAll() {
    return users;
  }
}

export default User;
