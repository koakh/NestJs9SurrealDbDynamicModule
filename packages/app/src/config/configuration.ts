import { EnvironmentVariables } from "../interfaces";

export const configuration = (): EnvironmentVariables => ({
  accessTokenJwtSecret: process.env.ACCESS_TOKEN_JWT_SECRET || 'secretKeyAccessToken',
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '30m',
});
