import { Track } from "./app/models/track";
import { database } from "./lib/database";
import { Table } from "./lib/table";
import Hapi from '@hapi/hapi';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import Blipp from 'blipp';
import trackSerializer from '../src/app/serializers/track';
import Boom from "@hapi/boom";
import Pack from '../package.json';
import Joi = require("joi");
import HapiSwagger from 'hapi-swagger';
const server = Hapi.server({
  port: 3001,
  host: '0.0.0.0',
  routes: {
    cors: {
      origin: ['*'],
      additionalHeaders: ['*']
    }
  }
});
(async () => {
  const swaggerOptions = {
    info: {
      title: 'Fuel Tracker API',
      description: 'Fuel Tracker API documentation',
      version: Pack.version
    },
    tags: [
      { name: 'track', description: 'Track the fuel state' },
    ],
    grouping: 'tags',
    sortEndpoints: 'ordered'
  };

  await server.register([
    Inert,
    Vision,
    Blipp,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ]);

  await server.register(require('./app/routes/track'), { routes: { prefix: '/track' } });
  await server.register(require('./app/routes/car'), { routes: { prefix: '/car' } });

  await server.start();
  console.log('Server running at:', server.info.uri);
})();

process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});