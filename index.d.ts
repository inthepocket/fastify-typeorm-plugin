import * as http from 'http';
import * as fastify from 'fastify';
import * as typeorm from 'typeorm';

declare namespace fastifyTypeorm {
  interface FastifyTypeormNestedObject {
    [name: string]: typeorm.Connection;
  }

  interface FastifyTypeormOpts {
    connection?: typeorm.Connection;
    /**
     * Namespace
     */
    namespace?: string;
  }
  type FastifyTypeormOptions = typeorm.ConnectionOptions | FastifyTypeormOpts;
}

declare module 'fastify' {
  export interface FastifyInstance {
    orm: typeorm.Connection & fastifyTypeorm.FastifyTypeormNestedObject;
  }
}

declare const fastifyTypeorm: fastify.FastifyPluginCallback<fastifyTypeorm.FastifyTypeormOptions>;

export = fastifyTypeorm;
