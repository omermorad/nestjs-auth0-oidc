import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { Auth0ConfigService } from 'test/src/auth0-config.service';
import { Auth0OpenidConnectModule } from 'src/modules/auth0-openid-connect.module';
import { Auth0OidcAuthMiddleware } from 'src/middleware/auth0-oidc-auth.middleware';

@Module({
  imports: [
    Auth0OpenidConnectModule.forRootAsync({
      useClass: Auth0ConfigService,
    }),
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(Auth0OidcAuthMiddleware).forRoutes('*');
  }
}
