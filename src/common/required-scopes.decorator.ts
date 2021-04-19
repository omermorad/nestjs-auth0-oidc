import { UseGuards, SetMetadata, CustomDecorator } from '@nestjs/common';

export function UseAuth0Guard(): MethodDecorator {
  return UseGuards();
}

export const ROLES_KEY = 'roles';

export function RequiredScopes(...roles: string[]): CustomDecorator {
  return SetMetadata(ROLES_KEY, roles);
}
