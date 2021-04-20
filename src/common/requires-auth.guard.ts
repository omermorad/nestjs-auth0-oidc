import { CanActivate, ExecutionContext, Injectable, UseGuards } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/common/required-scopes.decorator';
import { OpenidRequest, requiresAuth } from 'express-openid-connect';
import { Request } from 'express';

export function RequiresAuth(requiresLoginCheck?: (req: OpenidRequest) => boolean) {
  class RequiresAuthGuard implements CanActivate {
    public canActivate(context: ExecutionContext) {
      const req = context.switchToHttp().getRequest();
      const res = context.switchToHttp().getRequest();
      const next = context.switchToHttp().getNext()();

      requiresAuth(requiresLoginCheck)(req, res, next);
    }
  }

  return UseGuards(RequiresAuthGuard);
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
