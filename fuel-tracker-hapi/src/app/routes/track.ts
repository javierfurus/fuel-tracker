import { Request, Response, NextFunction } from 'express';
import { Track } from '../models/track';
import { database } from '../../lib/database';
import { Table } from '../../lib/table';
import trackSerializer from '../serializers/track';
import logger from '../../lib/logger';
import * as Boom from "@hapi/boom";
import { Road } from '../../lib/road';

export const plugin = {
  name: "TrackRoutes",
  register: async function (server, options) {

    server.route({
      method: 'GET',
      path: '/',
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
      path: '/latest',
      handler: async (request, h) => {
        try {
          const tracks: Track[] = await database(Table.track).orderBy('id', 'desc').limit(5).offset(0);
          return trackSerializer.index(tracks);
        } catch (error) {
          logger.error(error);
          throw Boom.unauthorized()
        }
      }
    });

    server.route({
      method: 'GET',
      path: '/totalTrip',
      handler: async (request, h) => {
        try {
          const lastTrip: Partial<Track> = await database.select('tripState').table(Table.track).orderBy('id', 'desc').first();
          if (lastTrip) {
            return h.response(lastTrip.tripState);
          } else {
            return h.response(0);
          }
        } catch (error) {
          logger.error(error);
          throw Boom.unauthorized()
        }
      }
    });
    server.route({
      method: 'GET',
      path: '/tripLeft',
      handler: async (request, h) => {
        try {
          const lastTrip: Partial<Track> = await database(Table.track).orderBy('id', 'desc').first();
          if (lastTrip) {
            const averageConsumption = (lastTrip.roadType === Road.City) ? 0.084 : 0.055;
            const tripLeft = (lastTrip.amountFilled / averageConsumption).toFixed(2);
            const roadType = lastTrip.roadType;
            return h.response({ tripLeft, roadType });
          } else {
            return h.response({ tripLeft: 0, roadType: 'No trip' });
          }
        } catch (error) {
          logger.error(error);
          throw Boom.unauthorized()
        }
      }
    });
    server.route({
      method: 'GET',
      path: '/{id}',
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
      method: 'DELETE',
      path: '/{id}',
      handler: async (request, h) => {
        const track: Track = await database(Table.track).where({ id: request.params.id }).first();
        try {
          if (track) {
            await database(Table.track)
              .where({ id: request.params.id })
              .delete();
            return h.response(track);
          } else {
            throw Boom.notFound();
          }
        } catch (error) {
          logger.error(error);
          throw Boom.notFound();
        }
      }
    })

    server.route({
      method: 'POST',
      path: '/',
      handler: async (request, h) => {
        try {
          const lastTrip: Partial<Track> = await database.select('tripState').from(Table.track).orderBy('id', 'desc').first();
          const lastFill: Partial<Track> = await database.select('amountFilled').from(Table.track).orderBy('id', 'desc').first();
          const payload = request.payload as Track;
          const track: Partial<Track> = {};
          if (lastTrip) {
            const averageConsumption = (payload.roadType === Road.City) ? 0.084 : 0.055;
            track.tripState = lastTrip.tripState + payload.tripState,
              track.roadType = payload.roadType,
              track.gasType = payload.gasType,
              track.amountFilled = (lastFill.amountFilled + payload.amountFilled) - (averageConsumption * (lastTrip.tripState + payload.tripState));
          } else {
            track.tripState = payload.tripState,
              track.roadType = payload.roadType,
              track.gasType = payload.gasType,
              track.amountFilled = payload.amountFilled
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
      method: 'PUT',
      path: '/{id}',
      handler: async (request, h) => {
        try {
          const track: Track = await database(Table.track).where({ id: request.params.id }).first();
          if (track !== null) {
            const payload = request.payload as Track;
            const updatedTrack: Partial<Track> = {
              tripState: payload.tripState,
              roadType: payload.roadType,
              gasType: payload.gasType,
              amountFilled: payload.amountFilled
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
  }
};
