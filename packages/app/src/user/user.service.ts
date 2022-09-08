import { CurrentUserPayload, SurrealDbUser as User, UserServiceAbstract } from '@koakh/nestjs-surrealdb';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService implements UserServiceAbstract {
  async findOneByField(key: string, value: string, currentUser?: CurrentUserPayload): Promise<User> {
    return {
      id: '520c2eb5-e83b-4ef5-a343-85756bcce149',
      username: 'johndoe',
      password: '$2b$10$U9AVUdkRnFsrMjPg/XyTeOWmF.gu73gd1hJGR1s1OnKTshjJYdGpW',
      firstName: 'Katinka',
      lastName: 'Trett',
      email: 'ktrett1@livejournal.com',
      roles: ['ROLE_USER'],
      createdDate: 1597444307,
      createdBy: '520c2eb5-e83b-4ef5-a343-85756bcce149',
      metaData: {
        key: 'value'
      }
    }
  }
}