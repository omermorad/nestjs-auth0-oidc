import { CanActivate, ExecutionContext, Injectable, UseGuards, mixin } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { OpenidRequest, requiresAuth } from 'express-openid-connect';
import { ROLES_KEY } from './required-scopes.decorator';

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
