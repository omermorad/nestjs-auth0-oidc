import { FactoryProvider, Scope } from '@nestjs/common';
import { RequestContext } from 'express-openid-connect';
import { Request } from 'express';
import { OIDC_REQ_CTX } from '../common/const-tokens';

export const OidcRequestContextProvider: FactoryProvider<Promise<RequestContext>> = {
  provide: OIDC_REQ_CTX,
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
