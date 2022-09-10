import { ApolloError } from 'apollo-server-express';

export class CustomApolloError extends ApolloError {
  constructor(message: string) {
    super(message, 'MY_ERROR_CODE');
    Object.defineProperty(this, 'name', { value: 'CustomApolloError' });
  }
}
