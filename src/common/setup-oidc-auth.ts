import { INestApplication } from '@nestjs/common';
import { Auth0AuthMiddlware } from '../types/auth0-oidc-types';

export function setupOidcAuth(app: INestApplication): void {
  const middleware = app.get('AUTH_MIDDLEWARE') as Auth0AuthMiddlware;
  // const baseOptions = app.get('OIDC_BASE_OPTIONS') || {};
  const options = app.get('OIDC_AUTH_OPTIONS');

  app.use(
    middleware({
      ...options,
    })
  );
}
