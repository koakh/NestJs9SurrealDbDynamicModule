import { Logger } from '@nestjs/common';
interface User {
  username: string;
  tokenVersion: number;
}

export class UserStore {
  store: User[];

  constructor() {
    this.store = new Array<User>();
  }

  addUser(username: string, tokenVersion: number): User {
    if (!username) {
      throw new Error('invalid username');
    }
    this.store.push({ username, tokenVersion });
    return this.getUser(username);
  }

  getUser(username: string): User {
    let user: User = this.store.find((e: User) => e.username === username);
    if (!user) {
      user = this.addUser(username, 0);
    }
    return user;
  }

  getTokenVersion(username: string): number {
    const user: User = this.getUser(username);
    return user.tokenVersion;
  }

  incrementTokenVersion(username: string): number {
    const user: User = this.getUser(username);
    return ++user.tokenVersion;
  }
}
