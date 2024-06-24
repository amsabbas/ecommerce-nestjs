import { CanActivate, ExecutionContext, Injectable,ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';
import { RequestUser } from './request-user';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles?.length) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const { user }: { user: RequestUser } = req;

    if(!requiredRoles.includes(user.role))
      throw new ForbiddenException("You don't have the required role to access this API")

    return requiredRoles.includes(user.role);
  }
}
