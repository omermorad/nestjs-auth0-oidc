import { FactoryProvider, Scope } from '@nestjs/common';
import { RequestContext } from 'express-openid-connect';
import { Request } from 'express';

export const OidcRequestContextProvider: FactoryProvider<Promise<RequestContext>> = {
  provide: 'OIDC_REQUEST_CONTEXT_PROVIDER',
  useFactory: async (req: Request): Promise<RequestContext> => {
    const { refresh, isExpired } = req.oidc.accessToken;
    let { access_token } = req.oidc.accessToken;

    if (isExpired()) {
      ({ access_token } = await refresh());
      req.oidc.accessToken.access_token = access_token;
    }

    return req.oidc;
  },
  scope: Scope.REQUEST,
  inject: ['REQUEST'],
};
