import { ConfigParams } from 'express-openid-connect';
import { ModuleMetadata, Type } from '@nestjs/common';

export type Auth0ConfigMandatory = 'baseURL' | 'clientID' | 'issuerBaseURL' | 'secret';
export type Auth0OidcConfig = ConfigParams;
export type Auth0OidcBaseOptions = Required<Pick<Auth0OidcConfig, Auth0ConfigMandatory>>;
export type Auth0OidcOptions = Omit<Auth0OidcConfig, Auth0ConfigMandatory>;

export interface Auth0OpenIdConnectOptionsFactory {
  createAuth0OpenIdConnectOptions(): Promise<Auth0OidcOptions> | Auth0OidcOptions;
}

export interface OpenIdConnectModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<Auth0OpenIdConnectOptionsFactory>;
  useExisting?: Type<Auth0OpenIdConnectOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<Auth0OidcOptions> | Auth0OidcOptions;
}
