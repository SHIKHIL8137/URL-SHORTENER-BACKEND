import * as dotenv from 'dotenv';
dotenv.config();

export const appConfig = {
  port: process.env.PORT || 4000,
  accessToken: process.env.ACCESS_SECRET || 'your_jwt_access_secret',
  mongoUri: process.env.MONGO_URI,
  refreshToken: process.env.REFRESH_SECRET || 'your_jwt_refresh_secret',
  frontEndUrl:process.env.FRONTEND_URL
};
