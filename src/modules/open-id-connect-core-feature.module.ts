import { DynamicModule, Module, Provider, Type } from '@nestjs/common';
import { OIDCAuthOptionsFactory, OIDCModuleAsyncAuthOptions } from '../interfaces/auth0-oidc-module-options.interface';
import { OIDCAuthMiddlewareProvider } from '../providers/oidc-auth-middleware.provider';
import { OidcRequestContextProvider } from '../providers/oidc-request-context.provider';

@Module({
  providers: [OidcRequestContextProvider, OIDCAuthMiddlewareProvider],
  exports: [OidcRequestContextProvider, OIDCAuthMiddlewareProvider],
})
export class OpenIdConnectCoreFeatureModule {
  public static forFeatureAsync(options: OIDCModuleAsyncAuthOptions): DynamicModule {
    return {
      module: OpenIdConnectCoreFeatureModule,
      imports: options.imports || [],
      providers: [...this.createAsyncProviders(options), OidcRequestContextProvider],
      exports: [],
    };
  }

  private static createAsyncProviders(options: OIDCModuleAsyncAuthOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    const { useClass } = options;

    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(options: OIDCModuleAsyncAuthOptions): Provider {
    if (options.useFactory) {
      return {
        inject: options.inject || [],
        provide: 'OIDC_AUTH_OPTIONS',
        useFactory: options.useFactory,
      };
    }

    const inject = [((options.useClass || options.useExisting) as unknown) as Type<OIDCAuthOptionsFactory>];

    return {
      provide: 'OIDC_AUTH_OPTIONS',
      useFactory: async (optionsFactory: OIDCAuthOptionsFactory) => await optionsFactory.createOidcAuthOptions(),
      inject,
    };
  }
}
