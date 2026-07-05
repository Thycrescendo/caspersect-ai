import { Router } from 'express';
import { z } from 'zod';
import { createScanPayload, recordLocalScan, listLocalScans } from '../services/casper-service.js';

export const casperRouter = Router();

const payloadSchema = z.object({
  walletAddress: z.string().min(8),
  riskScore: z.number().int().min(0).max(100),
  category: z.string(),
  summary: z.string(),
  flags: z.array(z.string()).default([])
});

casperRouter.post('/scan-payload', async (req, res, next) => {
  try {
    const input = payloadSchema.parse(req.body);
    res.json(await createScanPayload(input));
  } catch (error) {
    next(error as Error);
  }
});

casperRouter.post('/record-local', async (req, res, next) => {
  try {
    const result = await recordLocalScan(req.body);
    res.json(result);
  } catch (error) {
    next(error as Error);
  }
});

casperRouter.get('/scans', (_req, res) => {
  res.json({ scans: listLocalScans() });
});
