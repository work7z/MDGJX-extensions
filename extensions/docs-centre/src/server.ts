import { App } from '@/app';
import { MainRoute } from './routes/main.route';
import { logger } from './utils/logger';

try {
  console.log('run server.js'); 

  const app = new App([new MainRoute()]);

  app.listen();

} catch (e) {
  console.log('error: ' + e);
  logger.error(e);
}
