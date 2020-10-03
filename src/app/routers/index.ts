import * as express from 'express';
import { router as user } from './user';
import { router as track } from './track';

const router = express.Router({ mergeParams: true });

const routes = [
  {
    path: '/user',
    router: user
  },
  {
    path: '/track',
    router: track
  }
];

routes.forEach(r => router.use(r.path, r.router));

export default router;
