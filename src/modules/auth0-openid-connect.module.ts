import { DynamicModule, Global, Module } from '@nestjs/common';
import { OIDCAuthMiddlewareProvider } from '../providers/oidc-auth-middleware.provider';
import { OidcRequestContextProvider } from '../providers/oidc-request-context.provider';
import { Auth0OidcAuthOptions, OIDCModuleAsyncOptions } from '../interfaces/auth0-oidc-module-options.interface';
import { OpenIdConnectCoreModule } from './open-id-connect-core.module';

@Global()
@Module({
  providers: [OidcRequestContextProvider, OIDCAuthMiddlewareProvider],
  exports: [OidcRequestContextProvider, OIDCAuthMiddlewareProvider],
})
export class Auth0OpenidConnectModule {
  public static register(options: Auth0OidcAuthOptions): DynamicModule {
    const providers = [
      {
        provide: 'OIDC_AUTH_OPTIONS',
        useValue: options,
      },
      OidcRequestContextProvider,
      OIDCAuthMiddlewareProvider,
    ];

    return {
      module: Auth0OpenidConnectModule,
      providers,
      exports: providers,
    };
  }

  public static registerAsync(options: OIDCModuleAsyncOptions): DynamicModule {
    return {
      module: Auth0OpenidConnectModule,
      imports: [OpenIdConnectCoreModule.registerAsync(options)],
    };
  }
}
