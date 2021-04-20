import {
  Auth0OpenIdConnectOptions,
  OIDCMandatoryOptionsFactory,
} from 'src/interfaces/auth0-oidc-module-options.interface';

export class Auth0ConfigService implements OIDCMandatoryOptionsFactory {
  public createOidcMandatoryOptions(): Auth0OpenIdConnectOptions {
    return {
      baseURL: 'string',
      clientID: 'string',
      issuerBaseURL: 'string',
      secret: '',
    };
  }
}
