import { Inject } from '@nestjs/common';

export function InjectOidcCtx(): ParameterDecorator {
  return Inject('OIDC_REQ_CTX');
}
