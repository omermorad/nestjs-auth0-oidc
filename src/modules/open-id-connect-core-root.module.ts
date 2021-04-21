import { DynamicModule, Global, Module, Provider, Type } from '@nestjs/common';
import {
  Auth0OidcBaseOptions,
  OIDCMandatoryOptionsFactory,
  OIDCModuleAsyncBaseOptions,
} from '../interfaces/auth0-oidc-module-options.interface';

@Module({})
@Global()
export class OpenIdConnectCoreRootModule {
  public static register(options: Auth0OidcBaseOptions): DynamicModule {
    const provider = {
      provide: 'OIDC_BASE_OPTIONS',
      useValue: options,
    };

    return {
      module: OpenIdConnectCoreRootModule,
      providers: [provider],
      exports: [provider],
    };
  }

  public static registerAsync(options: OIDCModuleAsyncBaseOptions): DynamicModule {
    return {
      module: OpenIdConnectCoreRootModule,
      imports: options.imports || [],
      providers: [...this.createAsyncProviders(options)],
    };
  }

  private static createAsyncProviders(options: OIDCModuleAsyncBaseOptions): Provider[] {
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

  private static createAsyncOptionsProvider(options: OIDCModuleAsyncBaseOptions): Provider {
    if (options.useFactory) {
      return {
        inject: options.inject || [],
        provide: 'OIDC_BASE_OPTIONS',
        useFactory: options.useFactory,
      };
    }

    const inject = [((options.useClass || options.useExisting) as unknown) as Type<OIDCMandatoryOptionsFactory>];

    return {
      provide: 'OIDC_BASE_OPTIONS',
      useFactory: async (optionsFactory: OIDCMandatoryOptionsFactory) =>
        await optionsFactory.createOidcMandatoryOptions(),
      inject,
    };
  }
}
