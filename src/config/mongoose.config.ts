import { appConfig } from './app.config';
if (!appConfig.mongoUri) {
  throw new Error('MongoDB URI is undefined');
}

export const mongooseConfig = {
  uri: appConfig.mongoUri,
  options: {
    dbName: 'urlShortner',
  },
};
