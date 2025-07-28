import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { accessTokenConfig, refreshTokenConfig } from '../../config/jwt.config';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies?.access_token;

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = jwt.verify(token, accessTokenConfig.secret);
      request.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}

export class VerifyRefresh implements CanActivate{
async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
       const response = context.switchToHttp().getResponse();
    const token = request.cookies?.refresh_token;

    if (!token) {
      response.status(401).json({
        status: false,
        message: "No token provided",
        tokenMissing:true
      });
      return false;
    }

    try {
      const payload = jwt.verify(token, refreshTokenConfig.secret);
      request.user = payload;
      return true;
    } catch (error) {
      response.status(500).json({
        status: false,
        message: "Invalid token",
        invalidToken:true
      });
      return false;
    }
  }
}
