'use strict'

const { test } = require('tap')
const Fastify = require('fastify')
const { createConnection } = require('typeorm')
const fastifyORM = require('./index')

test('Postgres available', async t => {
  const fastify = Fastify()
  fastify.register(fastifyORM, {
    config: {
      host: 'localhost',
      type: 'postgres',
      port: '5432',
      password: '',
      database: 'postgres',
      username: 'postgres'
    }
  })

  await fastify.ready()
  t.strictEqual(fastify.orm.name, 'default')
  await fastify.close()
})

test('with unreachable db', async t => {
  const fastify = Fastify()
  fastify.register(fastifyORM, { config: { host: 'localhost', type: 'orm' } })

  try {
    await fastify.ready()
    t.fail('should not boot successfully')
  } catch (err) {
    t.ok(err)
    await fastify.close()
  }
})

test('namespaced', async t => {
  const fastify = Fastify()
  fastify.register(fastifyORM, {
    config: {
      host: 'localhost',
      type: 'postgres',
      port: '5432',
      password: '',
      database: 'postgres',
      username: 'postgres'
    },
    namespace: 'cluster'
  })

  await fastify.ready()
  t.strictEqual(fastify.orm.cluster.name, 'default')
  await fastify.close()
})

test('custom client', async t => {
  const connection = await createConnection({
    host: 'localhost',
    type: 'postgres',
    port: '5432',
    password: '',
    database: 'postgres',
    username: 'postgres'
  })

  const fastify = Fastify()
  fastify.register(fastifyORM, { connection })

  await fastify.ready()
  t.strictEqual(fastify.orm.name, 'default')
  await fastify.close()
})
