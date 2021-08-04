import { Injectable, NotFoundException } from '@nestjs/common';
import { CurrentUserPayload, AuthUser as User, UserServiceAbstract } from 'app-lib';
import { UserData } from './interfaces';
import { UserInMemory } from './user.data';
import { UserStore } from './user.store';

@Injectable()
export class UserService implements UserServiceAbstract {
  // init usersStore inMemory refreshToken versions
  private usersStore: UserStore = new UserStore();
  // init usersStore
  private usersData: UserInMemory = new UserInMemory();


  async findOneByField(key: string, value: string, currentUser?: CurrentUserPayload): Promise<User> {
    const findUser = this.usersData.find((e: UserData) => e[key] === value, currentUser);
    if (!findUser) {
      // throw new HttpException({ status: HttpStatus.NO_CONTENT, error: 'no content' }, HttpStatus.NO_CONTENT);
      throw new NotFoundException();
    }
    return findUser;
  }
}
