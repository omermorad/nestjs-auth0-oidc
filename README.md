[![ISC license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![npm version](http://img.shields.io/npm/v/nestjs-auth0-oidc.svg?style=flat)](https://npmjs.org/package/nestjs-auth0-oidc "View this project on npm")
[![Codecov Coverage](https://img.shields.io/codecov/c/github/omermorad/nestjs-auth0-oidc/master.svg?style=flat-square)](https://codecov.io/gh/omermorad/nestjs-auth0-oidc)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)


<p align="center">
  <img src="logo.png" alt="Auth0 NestJS OpenID Connect Logo" width="400" />

  <h3 align="center">
    Auth0 NestJS OpenID Connect
  </h3>

  <p align="center">
    <strong>Just a Nice Wrapper for Auth0 'express-openid-connect' npm package</strong>
  </p>
</p>

## Table Of Contents
- [Installation](#installation)
- [Fully Working Example](#fully-working-examples)
- [What is this package?](#what-is-this-package?)
- [License](#license)
- [Acknowledgements](#acknowledgements)


## Installation

```bash
npm i nestjs-auth0-oidc express-openid-connect
```

Notice that `express-openid-connect` is a peer dependency

## Fully Working Examples
You can browse the full, end-to-end, working examples of NestJS and Auth0 Open ID Connect [in the docs section](https://github.com/omermorad//tree/master/samples).

You can also [navigate to the samples folder]() where there are a few samples
of the different options that Auth0 suggest in their SDK.


## What is this package?

**At September 17, 2020, Auth0 announced the release of a new SDK: `express-opennid-connect`**,
which is _"a new Node.js SDK that makes it super easy to add OpenID Connect authentication to your Express apps"_, [Here is a link to the official announcement](https://auth0.com/blog/auth0-s-express-openid-connect-sdk/)

#### So what is this package all about?
This package enables you to use `express-openid-connect` (hereinafter: 'oidc') in your NestJS application. \
It supports all the features Auth0 OIDC suggests in the official SDK: `auth()` middleware and protected routes using guards.

#### What about `passport-auth0`?
According to Auth0, nothing is going to happen to `passport-auth0`.
But they **do recommend** to use `express-openid-connect` SDK if you are about
to create a new project and start from scratch.

From Auth0 official announcement: \
**_We recommend considering using `express-openid-connect`, as it will be our target for all innovation for web sign-in on the Node.js platform for the foreseeable future._**

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgements

- [Auth0 (express-openid-connect)](https://github.com/auth0/express-openid-connect)
- [NestJS](https://github.com/nestjs/nest)
