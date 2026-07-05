import { Router } from 'express';
import { z } from 'zod';
import { analyzeWalletRisk } from '../services/risk-engine.js';

export const riskRouter = Router();

const requestSchema = z.object({
  walletAddress: z.string().min(8),
  transactions: z.array(z.object({
    hash: z.string(),
    amount: z.number().nonnegative(),
    direction: z.enum(['inbound', 'outbound']),
    counterparty: z.string(),
    timestamp: z.string(),
    label: z.string().optional()
  })).default([]),
  context: z.string().optional()
});

riskRouter.post('/analyze', async (req, res, next) => {
  try {
    const payload = requestSchema.parse(req.body);
    const result = await analyzeWalletRisk(payload);
    res.json(result);
  } catch (error) {
    next(error as Error);
  }
});
