import { RequestContext } from 'express-openid-connect';
import { NestFactory } from '@nestjs/core';
import { Controller, Get, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { Auth0OpenidConnectModule, Auth0OidcAuthMiddleware, InjectOidcCtx, RequiresAuth } from '../src';

@Controller('/')
class SomeController {
  public constructor(@InjectOidcCtx() private readonly oidc: RequestContext) {}

  @Get('/')
  public renderSomething(): string {
    return '<a href="/admin">Admin Section</a>';
  }

  @Get('/admin')
  @RequiresAuth()
  public admin(): string {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return `Hello ${this.oidc.user.sub}, this is the admin section.`;
  }
}

@Module({
  imports: [
    Auth0OpenidConnectModule.forFeature({
      authRequired: false,
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
