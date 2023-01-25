<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## 目录说明

```tree
├── src
│   ├── app.controller.spec.ts    针对控制器的单元测试。
│   ├── app.controller.ts         带有单个路由的基本控制器。| 常见功能是用来处理 http 请求以及调用 service 层的处理方法
│   ├── app.module.ts             T应用程序的根模块（root module）。| 根模块用于处理其他类的引用与共享。
│   ├── app.service.ts            具有单一方法的基本服务（service）。 method.| 封装通用的业务逻辑、与数据层的交互（例如数据库）、其他额外的一些三方请求
│   └── main.ts                   应用程序的入口文件，它使用核心函数 NestFactory 来创建 Nest 应用程序的实例。|	应用程序入口文件。它使用 NestFactory 用来创建 Nest 应用实例。
```

在后续开发项目的过程中，使用约定俗成的 `name.[type]` 规则来创建对应的类型文件，便于查找对应的模块。

## 控制器

`nest g co user` 快速生成一个用户的控制器。

如果不需要每一次生成 `spec` 文件，可以在根目录下的 `nest-cli.json` 添加如下配置，禁用测试用例生成，后续再使用 `CLI` 创建 `Controller` 或者 `Service` 类型文件的时候，将不会继续生成：

```json
"generateOptions": {
  "spec": false,
}
```

## REST API - Code

- 200 OK
- 304 Not Modified 协商缓存了
- 400 Bad Request 参数错误
- 401 Unauthorized token 错误
- 402 Forbidden referer origin 验证失败
- 404 Not Found 接口不存在
- 500 Internal Server Error 服务端错误
- 502 Bad Gateway 上游接口有问题或者服务有问题
