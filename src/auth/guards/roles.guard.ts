import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // We always get an array of roles
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request?.user;
    const hasRole = roles?.includes(user?.role);
    if (!hasRole) {
      throw new UnauthorizedException(
        'No tienes permisos para realizar esta acción',
      );
    }
    return hasRole;
  }
}
