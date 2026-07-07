import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { riskRouter } from './routes/risk.routes.js';
import { agentRouter } from './routes/agent.routes.js';
import { casperRouter } from './routes/casper.routes.js';

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_ORIGIN,
  process.env.FRONTEND_URL,
].filter(Boolean) as string[];

app.use(helmet());

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '1mb' }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.get('/', (_req, res) => {
  res.json({
    ok: true,
    service: 'caspersect-ai-backend',
    message: 'CasperSect AI backend is running',
  });
});

app.get('/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'caspersect-ai-backend',
    network: process.env.CASPER_NETWORK || 'testnet',
    chainName: process.env.CASPER_CHAIN_NAME || 'casper-test',
    contractHash: process.env.CASPER_CONTRACT_HASH,
  });
});

app.use('/api/risk', riskRouter);
app.use('/api/agent', agentRouter);
app.use('/api/casper', casperRouter);

app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(err);
    res.status(500).json({
      error: 'Internal server error',
      detail:
        process.env.NODE_ENV === 'production'
          ? 'Something went wrong'
          : err.message,
    });
  }
);

export default app;

if (process.env.NODE_ENV !== 'production') {
  const port = Number(process.env.PORT || 5050);

  app.listen(port, () => {
    console.log(`CasperSect AI backend listening on http://localhost:${port}`);
  });
}