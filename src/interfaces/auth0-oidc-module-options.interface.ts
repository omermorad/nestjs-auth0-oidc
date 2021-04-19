import { ConfigParams } from 'express-openid-connect';
import { ModuleMetadata, Type } from '@nestjs/common';

export type Auth0OidcConfig = ConfigParams;
export type Auth0OpenIdConnectOptions = Auth0OidcConfig;

export interface Auth0OpenIdConnectOptionsFactory {
  createAuth0OpenIdConnectOptions(): Promise<Auth0OpenIdConnectOptions> | Auth0OpenIdConnectOptions;
}

export interface Auth0OpenIdConnectModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<Auth0OpenIdConnectOptionsFactory>;
  useExisting?: Type<Auth0OpenIdConnectOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<Auth0OpenIdConnectOptions> | Auth0OpenIdConnectOptions;
}
