[![ISC license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![npm version](http://img.shields.io/npm/v/nestjs-auth0-oidc.svg?style=flat)](https://npmjs.org/package/nestjs-pact "View this project on npm")
[![Codecov Coverage](https://img.shields.io/codecov/c/github/omermorad/nestjs-auth0-oidc/master.svg?style=flat-square)](https://codecov.io/gh/omer-morad-ni/nestjs-pact)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)


<p align="center">
  <img src="logo.png" alt="Auth0 NestJS OpenID Connect Logo" width="500" />

  <h3 align="center">
    Auth0 NestJS OpenID Connect
  </h3>

  <p align="center">
    <strong>Just a Nice Wrapper for 'express-openid-connect' from Auth0</strong>
  </p>
</p>

## Table Of Contents
- [Installation](#installation)
- [Fully Working Example](#fully-working-example)
- [What is this package?](#what-is-this-package?)
- [License](#license)
- [Acknowledgements](#acknowledgements)


## Installation

```bash
npm i nestjs-auth0-oidc express-openid-connect
```

Notice that `express-openid-connect` is a peer dependency

## Fully Working Example
[See the fully working end-to-end examples of NestJS and Auth0 Open ID Connect](https://github.com/pact-foundation/pact-js/tree/master/examples)

## What is this package?

**At September 17, 2020, Auth0 announced the release of new SDK,** `express-opennid-connect`,
which is _"a new Node.js SDK that makes it super easy to add OpenID Connect authentication to your Express apps"_, [Here is a link to the official announcement](https://auth0.com/blog/auth0-s-express-openid-connect-sdk/)

This package enables you to use `express-openid-connect` (hands: 'oidc') in your NestJS application. \
It supports the Auth0 OpenID Connect middleware and suggests a built in use of required scopes.


#### What’s Going to Happen to `passport-auth0`?
According to Auth0, nothing is going to happen with it. But they DO recommend to use
`express-openid-connect` if you are creating a new project, from Auth0 official announcement:

**_We recommend considering using `express-openid-connect`, as it will be our target for all innovation for web sign-in on the Node.js platform for the foreseeable future._**


## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgements

- [Auth0 (express-openid-connect)](https://github.com/pact-foundation/pact-js)
- [NestJS](https://github.com/nestjs/nest)
