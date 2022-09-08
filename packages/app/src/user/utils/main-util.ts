import * as bcrypt from 'bcrypt';
import { UserRoles } from '@koakh/nestjs-surrealdb';

const bcryptSaltRounds: number = 10;

export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, bcryptSaltRounds);
};

export const hasRole = (userRoles: string[], rolePredicate: string): boolean => {
  return userRoles.some((role: string) => role === rolePredicate);
}

export const isAdmin = (userRoles: string[]): boolean => {
  return userRoles.some((role: string) => role === UserRoles.ROLE_ADMIN);
}
