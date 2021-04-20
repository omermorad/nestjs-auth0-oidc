import { Controller, Get, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { Auth0OpenidConnectModule } from 'src/modules/auth0-openid-connect.module';
import { Auth0OidcAuthMiddleware } from 'src/middleware/auth0-oidc-auth.middleware';
import { RequestContext } from 'express-openid-connect';
import { NestFactory } from '@nestjs/core';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { HttpModule } from '@nestjs/common/http/http.module';
import { Scope } from '@nestjs/common/interfaces/scope-options.interface';
import { HttpService } from '@nestjs/common/http/http.service';

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

  @Get('/')
  public async getProducts(): Promise<string> {
    const products = await this.service.fetchProducts();
    return `Products: ${products.map(({ name }) => name).join(', ')}`;
  }
}

@Module({
  imports: [
    Auth0OpenidConnectModule.forFeature({
      authorizationParams: {
        response_type: 'code',
        audience: 'https://api.example.com/products',
        scope: 'openid profile email offline_access read:products',
        prompt: 'consent',
      },
    }),
    HttpModule.registerAsync({
      useFactory: (oidc: RequestContext) => {
        const { access_token, token_type } = oidc.accessToken;
        return {
          headers: {
            Authorization: `${token_type} ${access_token}`,
          },
        };
      },
      inject: ['OIDC_REQ_CTX'],
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
