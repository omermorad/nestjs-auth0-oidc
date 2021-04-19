import { Provider, Configuration } from 'oidc-provider';

const config: Configuration = {
  clients: [
    {
      client_id: 'test-express-openid-connect-client-id',
      client_secret: 'test-express-openid-connect-client-secret',
      token_endpoint_auth_method: 'client_secret_basic',
      response_types: ['id_token', 'code', 'code id_token'],
      grant_types: ['implicit', 'authorization_code', 'refresh_token'],
      redirect_uris: [`http://localhost:3000/callback`],
      post_logout_redirect_uris: ['http://localhost:3000', 'http://localhost:3000/custom-logout'],
    },
  ],
  formats: {
    AccessToken: 'jwt',
  },
  audiences() {
    return 'https://api.example.com/products';
  },
  scopes: ['openid', 'offline_access', 'read:products'],
  findAccount(ctx, id) {
    return {
      accountId: id,
      claims: () => ({ sub: id }),
    };
  },
};

const PORT = process.env.PROVIDER_PORT || 3001;

const OIDCProvider = new Provider(`http://localhost:${PORT}`, config);

// Monkey patch the provider to allow localhost and http redirect uris
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const { invalidate: orig } = OIDCProvider.Client.Schema.prototype;

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
OIDCProvider.Client.Schema.prototype.invalidate = function invalidate(message, code) {
  if (code === 'implicit-force-https' || code === 'implicit-forbid-localhost') {
    return;
  }
  orig.call(this, message);
};

export default OIDCProvider;
