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
  interface FastifyInstance<
    HttpServer = http.Server,
    HttpRequest = http.IncomingMessage,
    HttpResponse = http.ServerResponse
  > {
    orm: typeorm.Connection & fastifyTypeorm.FastifyTypeormNestedObject;
  }
}

declare let fastifyTypeorm: fastify.Plugin<
  http.Server,
  http.IncomingMessage,
  http.ServerResponse,
  fastifyTypeorm.FastifyTypeormOptions
>;

export = fastifyTypeorm;
