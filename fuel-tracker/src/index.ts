import * as express from 'express';
import * as createMiddleware from 'swagger-express-middleware';
import { SwaggerMiddleware } from 'swagger-express-middleware';
import router from './app/routers';
import logger from './lib/logger'
const app = express();
const { PORT = 3000 } = process.env;

createMiddleware('config/swagger.json', app, (err, middleware: SwaggerMiddleware) => {
  if (err) {
    logger.error(err);
  }

  app.use(
    middleware.metadata(),
    middleware.CORS(),
    middleware.parseRequest(),
    middleware.validateRequest()
  );

  app.use(express.json());
  app.use(router);

  app.listen(PORT, () => {
    logger.info(`server started at http://localhost:${PORT}`);
  });
});