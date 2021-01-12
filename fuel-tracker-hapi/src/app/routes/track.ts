import { Request, Response, NextFunction } from 'express';
import { Track } from '../models/track';
import { database } from '../../lib/database';
import { Table } from '../../lib/table';
import trackSerializer from '../serializers/track';
import logger from '../../lib/logger';
import * as Boom from "@hapi/boom";
import { Road } from '../../lib/road';
import { Car } from '../models/car';

export const plugin = {
  name: "TrackRoutes",
  register: async function (server, options) {

    server.route({
      method: 'GET',
      path: '/',
      handler: async (request, h) => {
        try {
          const trackedData: Track[] = await database(Table.track).orderBy('id', 'desc');
          if (trackedData) {
            return trackSerializer.index(trackedData);
          } else {
            throw Boom.notFound()
          }
        } catch (error) {
          logger.error(error);
          throw Boom.badRequest()
        }
      }
    });

    server.route({
      method: 'GET',
      path: '/latest',
      handler: async (request, h) => {
        try {
          const trackedData: Track[] = await database(Table.track).orderBy('id', 'desc').limit(5).offset(0);
          if (trackedData) {
            return trackSerializer.index(trackedData);
          } else {
            throw Boom.notFound()
          }
        } catch (error) {
          logger.error(error);
          throw Boom.badRequest()
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
          throw Boom.badRequest()
        }
      }
    });
    server.route({
      method: 'GET',
      path: '/tripLeft',
      handler: async (request, h) => {
        try {
          const lastTrip: Partial<Track> = await database(Table.track).orderBy('id', 'desc').first();
          const car: Car = await database(Table.car).where('id', 1).first()
          if (lastTrip) {
            const averageConsumption = (lastTrip.roadType === Road.City) ? 0.084 : 0.055;
            const tripLeft = (car.currentFuelLevel / averageConsumption).toFixed(2);
            const roadType = lastTrip.roadType;
            return h.response({ tripLeft, roadType });
          } else {
            return h.response({ tripLeft: 0, roadType: 'No trip' });
          }
        } catch (error) {
          logger.error(error);
          throw Boom.badRequest()
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
          if (track) {
            return trackSerializer.show(track);
          } else {
            throw Boom.notFound()
          }
        } catch (error) {
          logger.error(error);
          throw Boom.badRequest();
        }
      }
    })

    server.route({
      method: 'DELETE',
      path: '/{id}',
      handler: async (request, h) => {
        const track: Track = await database(Table.track).where({ id: request.params.id }).first();
        const car: Car = await database(Table.car).where('id', 1).first();
        const updatedCar: Partial<Car> = {}
        try {
          if (track) {
            await database(Table.track)
              .where({ id: request.params.id })
              .delete();
            const averageConsumption = (track.roadType === Road.City) ? 0.084 : 0.055;
            updatedCar.currentFuelLevel = (track.amountFilled > 0) ? (car.currentFuelLevel - track.amountFilled) : (car.currentFuelLevel + (averageConsumption * track.tripState));
            updatedCar.tripState = car.tripState - track.tripState;
            updatedCar.fuelPercent = (updatedCar.currentFuelLevel / car.tankSize) * 100;
            await database(Table.car).update(updatedCar).where('id', 1);
            return h.response(track);
          } else {
            throw Boom.notFound();
          }
        } catch (error) {
          logger.error(error);
          throw Boom.badRequest();
        }
      }
    })

    server.route({
      method: 'POST',
      path: '/',
      handler: async (request, h) => {
        try {
          const lastTrip: Partial<Track> = await database.select('tripState').from(Table.track).orderBy('id', 'desc').first();
          const payload = request.payload as Track;
          const track: Partial<Track> = {};
          const car: Car = await database(Table.car).where('id', 1).first();
          const updatedCar: Partial<Car> = {};
          if (lastTrip) {
            const averageConsumption = (payload.roadType === Road.City) ? 0.084 : 0.055;
            track.tripState = payload.tripState,
              track.roadType = payload.roadType,
              track.gasType = payload.gasType,
              track.amountFilled = payload.amountFilled,
              updatedCar.tripState = car.tripState + payload.tripState,
              updatedCar.currentFuelLevel = (car.currentFuelLevel + payload.amountFilled) - (averageConsumption * (payload.tripState)),
              updatedCar.fuelPercent = (updatedCar.currentFuelLevel / car.tankSize) * 100
          } else {
            track.tripState = payload.tripState,
              track.roadType = payload.roadType,
              track.gasType = payload.gasType,
              track.amountFilled = payload.amountFilled,
              updatedCar.tripState = payload.tripState,
              updatedCar.currentFuelLevel = payload.amountFilled,
              updatedCar.fuelPercent = (updatedCar.currentFuelLevel / car.tankSize) * 100
          };
          await database(Table.car).update(updatedCar).where('id', 1);
          await database(Table.track).insert(track);
          return h.response(track);
        } catch (error) {
          logger.error(error);
          throw Boom.badRequest('You will run out of fuel with these numbers.');
        }
      }
    })

    server.route({
      method: 'PUT',
      path: '/{id}',
      handler: async (request, h) => {
        try {
          const track: Track = await database(Table.track).where({ id: request.params.id }).first();
          const car: Car = await database(Table.car).where('id', 1).first();
          if (track !== null) {
            const payload = request.payload as Track;
            const updatedTrack: Partial<Track> = {}
            const updatedCar: Partial<Car> = {};
            updatedTrack.tripState = payload.tripState,
              updatedTrack.roadType = payload.roadType,
              updatedTrack.gasType = payload.gasType,
              updatedTrack.amountFilled = payload.amountFilled,
              updatedCar.currentFuelLevel = (payload.amountFilled - track.amountFilled) + car.currentFuelLevel,
              updatedCar.tripState = (payload.tripState - track.tripState) + car.tripState,
              updatedCar.fuelPercent = (updatedCar.currentFuelLevel / car.tankSize) * 100
            await database(Table.track)
              .where({ id: request.params.id })
              .update(updatedTrack);
            await database(Table.car).update(updatedCar).where('id', 1);
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
