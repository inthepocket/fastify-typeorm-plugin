'use strict'

const fp = require('fastify-plugin')
const { createConnection } = require('typeorm')

async function typeormConnector (fastify, options) {
  const { namespace } = options
  delete options.namespace

  const connection = options.connection || await createConnection(options)

  if (namespace) {
    if (!fastify.orm) {
      fastify.decorate('orm', connection)
    }

    if (fastify.orm[namespace]) {
      throw new Error(`Typeorm namespace already used: ${namespace}`)
    }

    fastify.orm[namespace] = connection

    fastify.addHook('onClose', async (instance, done) => {
      await instance.orm[namespace].close()
      done()
    })
  } else {
    fastify
      .decorate('orm', connection)
      .addHook('onClose', async (instance, done) => {
        await instance.orm.close()
        done()
      })
  }
}

module.exports = fp(typeormConnector, {
  fastify: '>= 1.0.0',
  name: 'fastify-typeorm'
})
