import { Controller, Get, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { Auth0OpenidConnectModule } from 'src/modules/auth0-openid-connect.module';
import { Auth0OidcAuthMiddleware } from 'src/middleware/auth0-oidc-auth.middleware';
import { InjectOidcCtx } from 'src/common/oidc-ctx.decorator';
import { RequestContext } from 'express-openid-connect';
import { NestFactory } from '@nestjs/core';

@Controller('/')
class SomeController {
  public constructor(@InjectOidcCtx() private readonly oidc: RequestContext) {}

  @Get('/')
  public sayHello() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return `hello ${this.oidc.user.sub}`;
  }
}

@Module({
  imports: [
    Auth0OpenidConnectModule.forFeature({
      idpLogout: true,
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
