import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { accessTokenConfig, refreshTokenConfig } from '../../config/jwt.config';
import { messages } from 'src/utils/statusMessage';
import { statusCodes } from 'src/utils/statusCode';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies?.access_token;

    if (!token) {
      throw new UnauthorizedException(messages.UNAUTHORIZED);
    }

    try {
      const payload = jwt.verify(token, accessTokenConfig.secret);
      request.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException(messages.UNAUTHORIZED);
    }
  }
}

export class VerifyRefresh implements CanActivate{
async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
       const response = context.switchToHttp().getResponse();
    const token = request.cookies?.refresh_token;

    if (!token) {
      response.status(statusCodes.UNAUTHORIZED).json({
        status: false,
        message: messages.UNAUTHORIZED,
        tokenMissing:true
      });
      return false;
    }

    try {
      const payload = jwt.verify(token, refreshTokenConfig.secret);
      request.user = payload;
      return true;
    } catch (error) {
      response.status(statusCodes.SERVER_ERROR).json({
        status: false,
        message: messages.UNAUTHORIZED,
        invalidToken:true
      });
      return false;
    }
  }
}
