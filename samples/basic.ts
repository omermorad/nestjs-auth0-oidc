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

/*
 * You can use the `register` method if you want to add the basic required fields
 * of Auth0 SDK NOT from the environment variables
 * If you'll leave this one empty, it will automatically try to pull this fields
 * from the environment variables, read the documentation for more details:
 * https://github.com/auth0/express-openid-connect#documentation
 */
@Module({
  imports: [
    Auth0OpenidConnectModule.register({
      baseURL: '',
      secret: '',
      issuerBaseURL: '',
      clientID: '',
    }),
    FeatureModule,
  ],
})
class MainAppModule {}

async function createApplication() {
  return await NestFactory.create(MainAppModule);
}
