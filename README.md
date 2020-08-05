<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
  
  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

An <a href="https://aws.amazon.com/sqs/" target="blank">AWS SQS</a> module for <a href="http://nestjs.com" target="blank">Nest</a>.

## Installation

/!\ Not yet published /!\

```bash
$ npm i --save nestjs-aws-sqs
```

## Quick start

To consume data for a specific queue, you need to register it using the `SQSModule`, and provide a consumer class.

The consumer class is basically a class implementing the SQSMessageHandler interface, and decorated with `@SQSConsumer`. The `@SQSConsumer` annotation simply takes the name of the queue to consume.

For example:

```TS
// imports...

@SQSConsumer('test')
export class TestConsumer implements SQSMessageHandler {
  handleMessage(message: SQS.Message): void {
    console.log(`I received a message : ${message.Body}`);
  }
}

@Module({
  imports: [
    SQSModule.register([
      { name: 'test' }
    ])
  ],
  providers: [TestConsumer]
})
export class AppModule {}
```
The consumer can provide an async `handleMessage` method aswell:
```TS
@SQSConsumer('test')
export class TestConsumer implements SQSMessageHandler {
  constructor (private readonly myAwesomeService: MyAwesomeService) {}

  async handleMessage(message: SQS.Message): Promise<void> {
    await this.myAwesomeService.processMessage(body);
  }
}
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Yann Kaiser]()
- Maintainers - [Yann Kaiser]()
- Website - [https://nestjs.com](https://nestjs.com/)

## License

  Nest is [MIT licensed](LICENSE).
