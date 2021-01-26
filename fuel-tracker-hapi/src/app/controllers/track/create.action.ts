import * as Boom from "@hapi/boom";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { database } from "../../../lib/database";
import logger from "../../../lib/logger";
import { Road } from "../../../lib/road";
import { Table } from "../../../lib/table";
import { Car } from "../../models/car";
import { Track } from "../../models/track";
import { TrackService } from "../../services/track.service";

const AVERAGE_CONSUMPTION_IN_CITY = 0.084;
const AVERAGE_CONSUMPTION_IN_ROAD = 0.055;
const CAR_ID = 1;

namespace TrackCreateAction {
  const updateCarWithLastTrip = (payload: any, updatedCar: Partial<Car>, car: Car): void => {
    updatedCar.tripState = car.tripState + payload.tripState;
    const averageConsumption = (payload.roadType === Road.City) ? AVERAGE_CONSUMPTION_IN_CITY : AVERAGE_CONSUMPTION_IN_ROAD;
    updatedCar.currentFuelLevel = (car.currentFuelLevel + payload.amountFilled) - (averageConsumption * (payload.tripState));
  }

  const updateCarWithoutLastTrip = (payload: any, updatedCar: Partial<Car>): void => {
    updatedCar.tripState = payload.tripState;
    updatedCar.currentFuelLevel = payload.amountFilled;
  }

  const getHasLastTrip = async (): Promise<boolean> => !!(await TrackService.getLastTripState());

  const updateCar = async (payload): Promise<void> => {
    const hasLastTrip: boolean = await getHasLastTrip();
    const car: Car = await database(Table.car).where({ id: CAR_ID }).first();
    const updatedCar: Partial<Car> = {};
    updatedCar.fuelPercent = (updatedCar.currentFuelLevel / car.tankSize) * 100;
    if (hasLastTrip) {
      updateCarWithLastTrip(payload, updatedCar, car);
    } else {
      updateCarWithoutLastTrip(payload, updatedCar);
    }
    await database(Table.car).update(updatedCar).where({ id: CAR_ID });
  }

  const createTrack = async (payload): Promise<Partial<Track>> => {
    const track: Partial<Track> = {};
    track.tripState = payload.tripState;
    track.roadType = payload.roadType;
    track.gasType = payload.gasType;
    track.amountFilled = payload.amountFilled;
    await database(Table.track).insert(track);
    return track;
  }

  export const run = async (request: Request, toolkit: ResponseToolkit) => {
    try {
      const payload = request.payload as Track;
      await updateCar(payload);
      const track: Partial<Track> = await createTrack(payload)
      return toolkit.response(track);
    } catch (error) {
      logger.error(error);
      throw Boom.badRequest('You will run out of fuel with these numbers.');
    }
  }
}

export {
  TrackCreateAction
}