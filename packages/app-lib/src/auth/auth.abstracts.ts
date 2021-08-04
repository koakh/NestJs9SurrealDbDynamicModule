import { CurrentUserPayload } from './interfaces';
import { AuthUser as User } from './types';

export abstract class AppServiceAbstract {
  abstract getHello(): string;
}

export abstract class UserServiceAbstract {
  abstract findOneByField(key: string, value: string, currentUser?: CurrentUserPayload): Promise<User>
}
