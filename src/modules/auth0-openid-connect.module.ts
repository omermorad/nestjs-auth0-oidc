import { DynamicModule, Global, Module } from '@nestjs/common';
import { OIDCAuthMiddlewareProvider } from '../providers/oidc-auth-middleware.provider';
import { OidcRequestContextProvider } from '../providers/oidc-request-context.provider';
import { OpenIdConnectCoreFeatureModule } from './open-id-connect-core-feature.module';
import { OpenIdConnectCoreRootModule } from './open-id-connect-core-root.module';
import {
  Auth0OidcBaseOptions,
  Auth0OidcAuthOptions,
  OIDCModuleAsyncBaseOptions,
  OIDCModuleAsyncAuthOptions,
} from '../interfaces/auth0-oidc-module-options.interface';

@Global()
@Module({
  providers: [OidcRequestContextProvider, OIDCAuthMiddlewareProvider],
  exports: [OidcRequestContextProvider, OIDCAuthMiddlewareProvider],
})
export class Auth0OpenidConnectModule {
  public static forRoot(options: Auth0OidcBaseOptions): DynamicModule {
    return {
      module: Auth0OpenidConnectModule,
      imports: [OpenIdConnectCoreRootModule.register(options)],
    };
  }

  public static forRootAsync(options: OIDCModuleAsyncBaseOptions): DynamicModule {
    return {
      module: Auth0OpenidConnectModule,
      imports: [OpenIdConnectCoreRootModule.registerAsync(options)],
    };
  }

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

  public static registerAsync(options: OIDCModuleAsyncAuthOptions): DynamicModule {
    return {
      module: Auth0OpenidConnectModule,
      imports: [OpenIdConnectCoreFeatureModule.forFeatureAsync(options)],
    };
  }
}
