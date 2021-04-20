import { DynamicModule, Module, Provider, Type } from '@nestjs/common';
import {
  Auth0OidcBaseOptions,
  OpenIdConnectModuleAsyncOptions,
  Auth0OpenIdConnectOptionsFactory,
} from '../interfaces/auth0-oidc-module-options.interface';
import { OidcRequestContextProvider } from '../providers/oidc-request-context.provider';

@Module({})
export class Auth0OpenIdConnectCoreModule {
  public static register(options: Auth0OidcBaseOptions): DynamicModule {
    return {
      module: Auth0OpenIdConnectCoreModule,
      exports: [],
      providers: [OidcRequestContextProvider],
    };
  }

  public static registerAsync(options: OpenIdConnectModuleAsyncOptions): DynamicModule {
    return {
      module: Auth0OpenIdConnectCoreModule,
      exports: [],
      imports: options.imports,
      providers: [...this.createAsyncProviders(options)],
    };
  }

  private static createAsyncProviders(options: OpenIdConnectModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return this.createAsyncOptionsProviders(options);
    }

    const { useClass } = options;

    return [
      ...this.createAsyncOptionsProviders(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  private static createAsyncOptionsProviders(options: PactConsumerModuleAsyncOptions): Provider[] {
    if (options.useFactory) {
      return [
        {
          provide: PactModuleProviders.ConsumerOptions,
          useFactory: async () => {
            const { consumer } = await options.useFactory();
            return consumer;
          },
          inject: options.inject || [],
        },
        {
          provide: PactModuleProviders.PublicationOptions,
          useFactory: async () => {
            const { publication } = await options.useFactory();
            return publication;
          },
          inject: options.inject || [],
        },
      ];
    }

    const inject = [(options.useClass || options.useExisting) as Type<Auth0OpenIdConnectOptions>];

    return [
      {
        provide: PactModuleProviders.ConsumerOptions,
        useFactory: async (optionsFactory: Auth0OpenIdConnectOptionsFactory) => {
          const { consumer } = await optionsFactory.createAuth0OpenIdConnectOptions();

          return consumer;
        },
        inject,
      },
      {
        provide: PactModuleProviders.PublicationOptions,
        useFactory: async (optionsFactory: Auth0OpenIdConnectOptionsFactory) => {
          const { publication } = await optionsFactory.createAuth0OpenIdConnectOptions();

          return publication;
        },
        inject,
      },
    ];
  }
}
