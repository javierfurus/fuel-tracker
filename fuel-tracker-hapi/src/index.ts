import { Track } from "./app/models/track";
import { database } from "./lib/database";
import { Table } from "./lib/table";
import * as Hapi from '@hapi/hapi';
import trackSerializer from '../src/app/serializers/track';
import * as Boom from "@hapi/boom";
import logger from "./lib/logger";
import { join } from "path";
import Joi = require("@hapi/joi");
const init = async () => {

  const server = Hapi.server({
    port: 3010,
    host: '0.0.0.0'
  });

  server.route({
    method: 'GET',
    path: '/track',
    handler: async (request, h) => {
      try {
        const tracks: Track[] = await database(Table.track).orderBy('id', 'desc');
        return trackSerializer.index(tracks);
      } catch (error) {
        logger.error(error);
        throw Boom.unauthorized()
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/track/{id}',
    handler: async (request, h) => {
      const id = request.params.id;
      try {
        const track: Track = await database(Table.track).where({ id: request.params.id }).first();
        return trackSerializer.show(track);
      } catch (error) {
        logger.error(error);
        throw Boom.notFound();
      }
    }
  })

  server.route({
    method: 'POST',
    path: '/track',
    handler: async (request, h) => {
      try {
        const payload = request.payload as Track;
        const track: Partial<Track> = {
          tripState: payload.tripState,
          roadType: payload.roadType,
          gasType: payload.gasType,
          amountFilled: payload.amountFilled
        };
        await database(Table.track).insert(track);
        return h.response(track);
      } catch (error) {
        logger.error(error);
        throw Boom.notFound();
      }
    }
  })

  server.route({
    method: 'POST',
    path: '/track/{id}',
    handler: async (request, h) => {
      try {
        const track: Track = await database(Table.track).where({ id: request.params.id }).first();
        if (track !== null) {
          const payload = request.payload as Track;
          const updatedTrack: Partial<Track> = {
            tripState: payload.tripState,
            roadType: payload['roadType'],
            gasType: payload['gasType'],
            amountFilled: payload['amountFilled']
          };
          await database(Table.track)
            .where({ id: request.params.id })
            .update(updatedTrack);
          return h.response(updatedTrack)
        } else {
          throw Boom.notFound()
        }
      } catch (error) {
        logger.error(error);
        throw Boom.badRequest();
      }
    }
  })

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});

init();