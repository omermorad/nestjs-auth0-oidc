import { RequestContext, ResponseContext } from 'express-openid-connect';

declare global {
  namespace Express {
    interface Request {
      oidc: RequestContext;
    }

    interface Response {
      oidc: ResponseContext;
    }
  }
}
