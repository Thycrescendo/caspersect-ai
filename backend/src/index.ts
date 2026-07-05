import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { riskRouter } from './routes/risk.routes.js';
import { agentRouter } from './routes/agent.routes.js';
import { casperRouter } from './routes/casper.routes.js';

const app = express();
const port = Number(process.env.PORT || 5050);

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000' }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'caspersect-ai-backend', network: process.env.CASPER_NETWORK || 'testnet' });
});

app.use('/api/risk', riskRouter);
app.use('/api/agent', agentRouter);
app.use('/api/casper', casperRouter);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error', detail: err.message });
});

app.listen(port, () => {
  console.log(`CasperSect AI backend listening on http://localhost:${port}`);
});
