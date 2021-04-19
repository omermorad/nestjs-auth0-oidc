import { Controller, Get, MiddlewareConsumer, Module, NestModule, Res } from '@nestjs/common';
import { Auth0OpenidConnectModule } from 'src/modules/auth0-openid-connect.module';
import { Auth0OidcAuthMiddleware } from 'src/middleware/auth0-oidc-auth.middleware';
import { InjectOidcCtx } from 'src/common/oidc-ctx.decorator';
import { RequestContext } from 'express-openid-connect';
import { NestFactory } from '@nestjs/core';
import { Response } from 'express';

@Controller('/')
class SomeController {
  public constructor(@InjectOidcCtx() private readonly oidc: RequestContext) {}

  @Get('/')
  public welcome() {
    return 'Welcome';
  }

  @Get('/profile')
  public getProfile() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
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

@Module({
  imports: [
    Auth0OpenidConnectModule.forFeature({
      idpLogout: true,
      authRequired: false,
      routes: {
        // Pass custom options to the login method by overriding the default login route
        login: false,
        // Pass a custom path to the postLogoutRedirect to redirect users to a different
        // path after login, this should be registered on your authorization server.
        postLogoutRedirect: '/custom-logout',
      },
    }),
  ],
  providers: [SomeController],
})
class FeatureModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Auth0OidcAuthMiddleware).forRoutes('*');
  }
}

@Module({
  imports: [Auth0OpenidConnectModule, FeatureModule],
})
class MainAppModule {}

async function createApplication() {
  return await NestFactory.create(MainAppModule);
}
