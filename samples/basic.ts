import { Controller, Get, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { RequestContext } from 'express-openid-connect';
import { Auth0OpenidConnectModule, InjectOidcCtx, setupOidcAuth } from '../src';

@Controller('/')
class AppController {
  public constructor(@InjectOidcCtx() private readonly oidc: RequestContext) {}

  @Get('/')
  public sayHello() {
    return `hello ${this.oidc.user.sub}`;
  }
}

@Module({
  imports: [
    Auth0OpenidConnectModule.register({
      idpLogout: true,
    }),
  ],
  controllers: [AppController],
})
class MainAppModule {}

export async function createApplication() {
  const app = await NestFactory.create(MainAppModule);

  setupOidcAuth(app);

  return app;
}
