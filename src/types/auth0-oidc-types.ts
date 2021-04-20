import { auth } from 'express-openid-connect';

export type Auth0AuthMiddlware = typeof auth;
