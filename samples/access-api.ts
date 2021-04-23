import { RequestContext } from 'express-openid-connect';
import { Controller, Get, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { HttpService, Injectable, HttpModule, Scope } from '@nestjs/common';
import { Auth0OpenidConnectModule, OIDC_REQ_CTX, setupOidcAuth } from '../src';

const { API_PORT = 3002 } = process.env;

@Injectable({
  scope: Scope.REQUEST,
})
class FeatureService {
  public constructor(private readonly http: HttpService) {}

  public async fetchProducts(): Promise<any[]> {
    const { data } = await this.http.get(`http://localhost:${API_PORT}/products`).toPromise();
    return data;
  }
}

@Controller('/')
class SomeController {
  public constructor(private readonly service: FeatureService) {}

  @Get('/get-some-products')
  public async getProducts(): Promise<any[]> {
    return this.service.fetchProducts();
  }
}

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: (oidc: RequestContext) => {
        const { access_token, token_type } = oidc.accessToken;
        return {
          headers: {
            Authorization: `${token_type} ${access_token}`,
          },
        };
      },
      inject: [OIDC_REQ_CTX],
    }),
  ],
  controllers: [SomeController],
  providers: [FeatureService],
})
class FeatureModule {}

@Module({
  imports: [
    Auth0OpenidConnectModule.register({
      authorizationParams: {
        response_type: 'code',
        audience: 'https://api.example.com/products',
        scope: 'openid profile email offline_access read:products',
        prompt: 'consent',
      },
    }),
    FeatureModule,
  ],
})
class AppModule {}

export async function createApplication() {
  const app = await NestFactory.create(AppModule);

  setupOidcAuth(app);

  return app;
}
