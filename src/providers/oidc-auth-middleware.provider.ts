import { ValueProvider } from '@nestjs/common';
import { auth } from 'express-openid-connect';
import { Auth0AuthMiddlware } from '../types/auth0-oidc-types';

export const OIDCAuthMiddlewareProvider: ValueProvider<Auth0AuthMiddlware> = {
  provide: 'AUTH_MIDDLEWARE',
  useValue: auth,
};
