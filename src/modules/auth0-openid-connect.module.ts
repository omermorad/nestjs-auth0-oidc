import { DynamicModule, Module } from '@nestjs/common';
import { OpenIdConnectCoreFeatureModule } from './open-id-connect-core-feature.module';
import { OpenIdConnectCoreRootModule } from './open-id-connect-core-root.module';
import {
  Auth0OidcBaseOptions,
  Auth0OidcAuthOptions,
  OIDCModuleAsyncBaseOptions,
  OIDCModuleAsyncAuthOptions,
} from '../interfaces/auth0-oidc-module-options.interface';

@Module({})
export class Auth0OpenidConnectModule {
  public static register(options: Auth0OidcBaseOptions) {
    return {
      module: Auth0OpenidConnectModule,
      imports: [OpenIdConnectCoreRootModule.register(options)],
    };
  }

  public static registerAsync(options: OIDCModuleAsyncBaseOptions): DynamicModule {
    return {
      module: Auth0OpenidConnectModule,
      imports: [OpenIdConnectCoreRootModule.registerAsync(options)],
    };
  }

  public static forFeature(options: Auth0OidcAuthOptions) {
    return {
      module: Auth0OpenidConnectModule,
      imports: [OpenIdConnectCoreFeatureModule.forFeature(options)],
    };
  }

  public static forFeatureAsync(options: OIDCModuleAsyncAuthOptions) {
    return {
      module: Auth0OpenidConnectModule,
      imports: [OpenIdConnectCoreFeatureModule.forFeatureAsync(options)],
    };
  }
}
