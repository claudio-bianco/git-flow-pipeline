import express from 'express';

import healthRouter from './routes/health.js';
import versionRouter from './routes/version.js';
import echoRouter from './routes/echo.js';

export function createServer() {
  const app = express();
  app.use(express.json());

  app.use('/health', healthRouter);
  app.use('/version', versionRouter);
  app.use('/echo', echoRouter);

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
  });

  // error handler
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    console.error('[error]', err);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  return app;
}
