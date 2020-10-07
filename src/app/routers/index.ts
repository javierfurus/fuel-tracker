import * as express from 'express';
import { router as track } from './track';

const router = express.Router({ mergeParams: true });

const routes = [
  {
    path: '/track',
    router: track
  }
];

routes.forEach(r => router.use(r.path, r.router));

export default router;
