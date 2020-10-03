import { Request, Response, NextFunction } from 'express';
import { Track } from '../models/track';
import { database } from '../../lib/database';
import { Table } from '../../lib/table';
import { Gas } from '../../lib/gas';
import { Roads } from '../../lib/roads'
import trackSerializer from '../serializers/track';
const roadTypeChecker = (roadType) => {
  switch (roadType) {
    case 'city':
      return Roads.City;
    case 'motorway':
      return Roads.Motorway;
    case 'highway': 
      return Roads.Highway;
    default:
        throw new Error('Wrong road type has been added!');
  }
}
const gasTypeChecker = (gasType) => {
  switch (gasType) {
    case 'diesel':
      return Gas.Diesel;
    case 'og85plus':
      return Gas.OG85P;
    case 'og90plus': 
      return Gas.OG90P;
    default:
      throw new Error('Wrong gas type has been added!');
  }
}
export default {
  authorization: (req: Request, res: Response, next: NextFunction) => {
    next();
  },
  index: async (req: Request, res: Response) => {
    try {
      const tracks: Array<Track> = await database(Table.track).select();
      res.status(200).json(trackSerializer.index(tracks));
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },
  show: async (req: Request, res: Response) => {
    try {
      const track: Track = await database(Table.track).where({ id: req.params.id }).first();
      if (track) {
        res.status(200).json(trackSerializer.show(track));
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const track: Partial<Track> = {
        date: req.query.date,
        tripState: req.query.tripState,
        roadType: roadTypeChecker(req.query.roadType),
        gasType: gasTypeChecker(req.query.gasType),
        amountFilled: req.query.amountFilled
      };
      await database(Table.track).insert(track);
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const track: Track = await database(Table.track).where({ id: req.params.id }).first();
      if (track) {
        const updatedTrack: Partial<Track> = {
            date: req.body.date,
            tripState: req.body.tripState,
            roadType: roadTypeChecker(req.query.roadType),
            gasType: req.body.gasType,
            amountFilled: req.body.amountFilled
          };
        await database(Table.track)
          .where({ id: req.params.id })
          .update(updatedTrack);
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },

  destroy: async (req: Request, res: Response) => {
    try {
      const track: Track = await database(Table.track).where({ id: req.params.id }).first();
      if (track) {
        await database(Table.track)
          .where({ id: req.params.id })
          .delete();
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
};
