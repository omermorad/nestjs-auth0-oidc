import { DynamicModule, Global, Module, Provider, Type } from '@nestjs/common';
import { OIDCAuthOptionsFactory, OIDCModuleAsyncOptions } from '../interfaces/auth0-oidc-module-options.interface';

@Module({})
@Global()
export class OpenIdConnectCoreModule {
  public static register(options: OIDCModuleAsyncOptions): DynamicModule {
    const provider = {
      provide: 'OIDC_AUTH_OPTIONS',
      useValue: options,
    };

    return {
      module: OpenIdConnectCoreModule,
      providers: [provider],
      exports: [provider],
    };
  }

  public static registerAsync(options: OIDCModuleAsyncOptions): DynamicModule {
    return {
      module: OpenIdConnectCoreModule,
      imports: options.imports || [],
      providers: [...this.createAsyncProviders(options)],
    };
  }

  private static createAsyncProviders(options: OIDCModuleAsyncOptions): Provider[] {
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

  private static createAsyncOptionsProvider(options: OIDCModuleAsyncOptions): Provider {
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
