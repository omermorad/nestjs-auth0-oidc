import { Inject } from '@nestjs/common';
import { OIDC_REQ_CTX } from './const-tokens';

export function InjectOidcCtx(): ParameterDecorator {
  return Inject(OIDC_REQ_CTX);
}
