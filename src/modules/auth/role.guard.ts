import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { accessTokenConfig } from 'src/config/jwt.config';
import { messages } from 'src/utils/statusMessage';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {

    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();
    const token = request.cookies?.access_token;

    if (!token) {
      throw new UnauthorizedException(messages.UNAUTHORIZED);
    }
      const payload = jwt.verify(token, accessTokenConfig.secret) as any;
      request.user = payload;

      if (!requiredRoles) return true; 
      if (!payload.role || !requiredRoles.includes(payload.role)) {

        throw new ForbiddenException(messages.ACCESS_DENIED);
      }
      return true;
  }
}
