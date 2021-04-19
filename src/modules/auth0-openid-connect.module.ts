import { DynamicModule, Module } from '@nestjs/common';
import { Auth0OpenIdConnectCoreModule } from 'src/modules/auth0-open-id-connect-core.module';
import {
  Auth0OpenIdConnectModuleAsyncOptions,
  Auth0OpenIdConnectOptions,
} from 'src/interfaces/auth0-oidc-module-options.interface';

@Module({})
export class Auth0OpenidConnectModule {
  public static register(options: Auth0OpenIdConnectOptions) {
    return {
      module: Auth0OpenidConnectModule,
      imports: [Auth0OpenIdConnectCoreModule.register(options)],
    };
  }

  public static registerAsync(options: Auth0OpenIdConnectModuleAsyncOptions): DynamicModule {
    return {
      module: Auth0OpenidConnectModule,
      imports: [Auth0OpenIdConnectCoreModule.registerAsync(options)],
    };
  }
}
