import { Request, Response, NextFunction } from 'express';
import { Track } from '../models/track';
import { database } from '../../lib/database';
import { Table } from '../../lib/table';
import trackSerializer from '../serializers/track';
import logger from '../../lib/logger';

export default {
  authorization: (req: Request, res: Response, next: NextFunction) => {
    next();
  },
  index: async (req: Request, res: Response) => {
    try {
      const tracks: Track[] = await database(Table.track).orderBy('id', 'desc');
      res.status(200).json(trackSerializer.index(tracks));
    } catch (error) {
      logger.error(error);
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
      logger.error(error);
      res.sendStatus(500);
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const track: Partial<Track> = {
        tripState: req.body.tripState,
        roadType: req.body.roadType,
        gasType: req.body.gasType,
        amountFilled: req.body.amountFilled
      };
      await database(Table.track).insert(track);
      res.sendStatus(200);
    } catch (error) {
      logger.error(error);
      res.sendStatus(500);
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const track: Track = await database(Table.track).where({ id: req.params.id }).first();
      if (track) {
        const updatedTrack: Partial<Track> = {
          tripState: req.body.tripState,
          roadType: req.body.roadType,
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
      logger.error(error);
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
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      logger.error(error);
      res.sendStatus(500);
    }
  }
};
