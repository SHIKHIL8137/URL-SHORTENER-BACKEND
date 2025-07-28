import { appConfig } from './app.config';
import { SignOptions } from 'jsonwebtoken';

export const accessTokenConfig: {
  secret: string;
  signOptions: SignOptions;
} = {
  secret: appConfig.accessToken,
  signOptions: { expiresIn: '15m' },
};

export const refreshTokenConfig: {
  secret: string;
  signOptions: SignOptions;
} = {
  secret: appConfig.refreshToken,
  signOptions: { expiresIn: '1h' },
};
