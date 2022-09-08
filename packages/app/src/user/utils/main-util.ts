import * as bcrypt from 'bcrypt';

const bcryptSaltRounds: number = 10;

export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, bcryptSaltRounds);
};
