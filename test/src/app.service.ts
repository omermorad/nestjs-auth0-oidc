import { HttpService, Injectable, Scope } from '@nestjs/common';
import { InjectOidcCtx } from 'src/common/oidc-body.decorator';
import { RequestContext } from 'express-openid-connect';

@Injectable({
  scope: Scope.REQUEST,
})
export class AppService {
  public constructor(@InjectOidcCtx() private readonly oidc: RequestContext, private readonly http: HttpService) {}

  public async accessExternalApi(): Promise<boolean> {
    const { token_type, isExpired, refresh } = this.oidc.accessToken;
    let { access_token } = this.oidc.accessToken;

    if (isExpired()) {
      ({ access_token } = await refresh());
    }

    await this.http.get('external-api', {
      headers: {
        Authorization: `${token_type} ${access_token}`,
      },
    });

    return true;
  }
}
