import { DynamicModule, Module } from '@nestjs/common';
import { Auth0OpenIdConnectCoreModule } from './auth0-open-id-connect-core.module';
import {
  Auth0OidcBaseOptions,
  Auth0OidcOptions,
  OpenIdConnectModuleAsyncOptions,
} from '../interfaces/auth0-oidc-module-options.interface';

@Module({})
export class Auth0OpenidConnectModule {
  public static register(options: Auth0OidcBaseOptions) {
    return {
      module: Auth0OpenidConnectModule,
      imports: [Auth0OpenIdConnectCoreModule.register(options)],
    };
  }

  public static registerAsync(options: OpenIdConnectModuleAsyncOptions): DynamicModule {
    return {
      module: Auth0OpenidConnectModule,
      imports: [Auth0OpenIdConnectCoreModule.registerAsync(options)],
    };
  }

  public static forFeature(options: Auth0OidcOptions) {
    return {
      module: Auth0OpenidConnectModule,
      imports: [Auth0OpenIdConnectCoreModule.forFeature(options)],
    };
  }

  public static forFeatureAsync(options: Auth0OidcOptions) {
    return {
      module: Auth0OpenidConnectModule,
      imports: [Auth0OpenIdConnectCoreModule.forFeatureAsync(options)],
    };
  }
}
