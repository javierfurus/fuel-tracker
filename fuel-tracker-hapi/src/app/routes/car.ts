import { Request, Response, NextFunction } from 'express';
import { Track } from '../models/track';
import { database } from '../../lib/database';
import { Table } from '../../lib/table';
import carSerializer from '../serializers/car';
import logger from '../../lib/logger';
import * as Boom from "@hapi/boom";
import { Road } from '../../lib/road';
import { Car } from '../models/car';

export const plugin = {
    name: "CarRoutes",
    register: async function (server, options) {

        server.route({
            method: 'GET',
            path: '/',
            handler: async (request, h) => {
                try {
                    const car: Car = await database(Table.car).orderBy('id', 'desc').first();
                    return car;
                } catch (error) {
                    logger.error(error);
                    throw Boom.unauthorized()
                }
            }
        });

    }
};
