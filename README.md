# 


[![Package Version](https://img.shields.io/npm/v/fastify-typeorm.svg)](https://npm.im/fastify-typeorm)
[![Build Status](https://travis-ci.org/inthepocket/fastify-typeorm-plugin.svg?branch=master)](https://travis-ci.org/inthepocket/fastify-typeorm-plugin)
[![Greenkeeper badge](https://badges.greenkeeper.io/inthepocket/fastify-typeorm-plugin.svg)](https://greenkeeper.io/)
[![Coverage Status](https://coveralls.io/repos/github/inthepocket/fastify-typeorm-plugin/badge.svg?branch=master)](https://coveralls.io/github/inthepocket/fastify-typeorm-plugin?branch=master)

Fastify plugin for TypeORM for sharing the same TypeORM connection in every part of your server.
Under the hood the official [TypeORM](https://www.npmjs.com/package/typeorm) module is used.

## Install

```sh
npm install fastify-typeorm
```

## Usage

Add it to your project with `register` and you are done!
The plugin accepts the [same connection options](https://typeorm.io/#/connection-options) as the TypeORM client.

```js
const fastify = require('fastify')();

const user = require('./entity/user');

fastify.register(require('fastify-typeorm'), {
  type: 'sqlite',
  database: './mydb.sql',
});

fastify.get('/users', async function(req, reply) {
  const users = await this.orm
    .getRepository(User)
    .createQueryBuilder('user')
    .getMany();

  return users;
});

fastify.listen(3000, err => {
  if (err) throw err;
});
```

If you won't pass config, it will use `typeorm` default [createConnection](https://typeorm.io/#/connection/creating-a-new-connection) mechanism:

```js
const fastify = require('fastify')();

const user = require('./entity/user');

fastify.register(require('fastify-typeorm-plugin'));

fastify.get('/users', async function(req, reply) {
  const users = await this.orm
    .getRepository(User)
    .createQueryBuilder('user')
    .getMany();

  return users;
});

fastify.listen(3000, err => {
  if (err) throw err;
});
```

You can also pass in an existing connection:

```js
const { createConnection } = require('typeorm');

const fastify = require('fastify')();
const connection = await createConnection({
  type: 'sqlite',
  database: './mydb.sql',
});
fastify.register(require('fastify-typeorm'), {
  connection,
});
```

## Team

- Glenn Bostoen <https://github.com/gboston> <https://twitter.com/gbostoen>
- Jonas Goderis <https://github.com/jonasgoderis> <https://twitter.com/JonasGoderis>

## License

Licensed under [MIT](./LICENSE).
