import { auth } from 'express-openid-connect';
import { ModuleMetadata, Type } from '@nestjs/common';

export type Auth0AuthMiddlware = typeof auth;
