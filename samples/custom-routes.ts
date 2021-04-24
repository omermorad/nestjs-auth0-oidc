import { Controller, Get, Module, Res, UseGuards } from '@nestjs/common';
import {
  InjectOidcCtx,
  Auth0OpenidConnectModule,
  Auth0OidcAuthOptions,
  setupOidcAuth,
  OIDCAuthOptionsFactory,
  RequiresAuth,
} from '../src';
import { RequestContext } from 'express-openid-connect';
import { NestFactory } from '@nestjs/core';
import { Response } from 'express';

@Controller('/')
class FeatureController {
  public constructor(@InjectOidcCtx() private readonly oidc: RequestContext) {}

  @Get('/')
  public welcome() {
    return 'Welcome';
  }

  @Get('/profile')
  @UseGuards(RequiresAuth)
  public getProfile() {
    return `hello ${this.oidc.user.sub}`;
  }

  @Get('/login')
  public async login(@Res() res: Response) {
    await res.oidc.login({ returnTo: '/profile' });
  }

  @Get('/custom-logout')
  public customLogout() {
    return 'Bye!';
  }
}

class Auth0ConfigOptions implements OIDCAuthOptionsFactory {
  createOidcAuthOptions(): Auth0OidcAuthOptions {
    return {
      idpLogout: true,
      authRequired: false,
      routes: {
        login: false,
        postLogoutRedirect: '/custom-logout',
      },
    };
  }
}

@Module({})
class FeatureModule {}

@Module({
  imports: [
    FeatureModule,
    Auth0OpenidConnectModule.registerAsync({
      useClass: Auth0ConfigOptions,
    }),
  ],
  controllers: [FeatureController],
})
class MainAppModule {}

export async function createApplication() {
  const app = await NestFactory.create(MainAppModule);

  setupOidcAuth(app);

  return app;
}
