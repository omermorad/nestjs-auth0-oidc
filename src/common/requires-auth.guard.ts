import { CanActivate, ExecutionContext } from '@nestjs/common';

export class RequiresAuth implements CanActivate {
  public async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    return req.oidc.isAuthenticated();
  }
}
