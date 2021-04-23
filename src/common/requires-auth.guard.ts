import { CanActivate, ExecutionContext, UseGuards } from '@nestjs/common';
import { OpenidRequest, requiresAuth } from 'express-openid-connect';

export function RequiresAuth(requiresLoginCheck?: (req: OpenidRequest) => boolean): MethodDecorator & ClassDecorator {
  class RequiresAuthGuard implements CanActivate {
    public canActivate(context: ExecutionContext) {
      const req = context.switchToHttp().getRequest();
      const res = context.switchToHttp().getRequest();
      const next = context.switchToHttp().getNext()();

      requiresAuth(requiresLoginCheck)(req, res, next);
      return true;
    }
  }

  return UseGuards(RequiresAuthGuard);
}
