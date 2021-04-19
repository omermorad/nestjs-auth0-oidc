import {
  Auth0OpenIdConnectOptions,
  Auth0OpenIdConnectOptionsFactory,
} from 'src/interfaces/auth0-oidc-module-options.interface';

export class Auth0ConfigService implements Auth0OpenIdConnectOptionsFactory {
  public createAuth0OpenIdConnectOptions(): Auth0OpenIdConnectOptions {
    return {
      baseURL: 'string',
      clientID: 'string',
      issuerBaseURL: 'string',
      secret: '',
    };
  }
}
