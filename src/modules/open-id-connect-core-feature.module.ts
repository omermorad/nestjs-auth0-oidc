import { DynamicModule, Module, Provider, Type } from '@nestjs/common';
import {
  Auth0OidcAuthOptions,
  OIDCAuthOptionsFactory,
  OIDCModuleAsyncAuthOptions,
} from '../interfaces/auth0-oidc-module-options.interface';
import { OidcRequestContextProvider } from '../providers/oidc-request-context.provider';

@Module({})
export class OpenIdConnectCoreFeatureModule {
  public static forFeature(options: Auth0OidcAuthOptions): DynamicModule {
    return {
      module: OpenIdConnectCoreFeatureModule,
      providers: [
        {
          provide: 'OIDC_AUTH_OPTIONS',
          useValue: options,
        },
        OidcRequestContextProvider,
      ],
      exports: [OidcRequestContextProvider],
    };
  }

  public static forFeatureAsync(options: OIDCModuleAsyncAuthOptions): DynamicModule {
    return {
      module: OpenIdConnectCoreFeatureModule,
      imports: options.imports || [],
      providers: [...this.createAsyncProviders(options)],
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
