import { ConfigParams } from 'express-openid-connect';
import { ModuleMetadata, Type } from '@nestjs/common';

type Auth0ConfigMandatory = 'baseURL' | 'clientID' | 'issuerBaseURL' | 'secret';
type Auth0OidcConfig = ConfigParams;

interface OIDCModuleAsyncOptions<TOptionsFactory, TOptions> extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<TOptionsFactory>;
  useExisting?: Type<TOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<TOptions> | TOptions;
}

export type Auth0OidcBaseOptions = Required<Pick<Auth0OidcConfig, Auth0ConfigMandatory>>;
export type Auth0OidcAuthOptions = Omit<Auth0OidcConfig, Auth0ConfigMandatory>;

export interface OIDCMandatoryOptionsFactory {
  createOidcMandatoryOptions(): Promise<Auth0OidcAuthOptions> | Auth0OidcAuthOptions;
}

export interface OIDCAuthOptionsFactory {
  createOidcAuthOptions(): Promise<Auth0OidcAuthOptions> | Auth0OidcAuthOptions;
}

export type OIDCModuleAsyncBaseOptions = OIDCModuleAsyncOptions<OIDCAuthOptionsFactory, Auth0OidcBaseOptions>;
export type OIDCModuleAsyncAuthOptions = OIDCModuleAsyncOptions<OIDCMandatoryOptionsFactory, Auth0OidcAuthOptions>;
