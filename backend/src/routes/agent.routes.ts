import { Router } from 'express';
import { z } from 'zod';
import { getAgentRecommendation } from '../services/ai-agent.js';

export const agentRouter = Router();

const recommendationSchema = z.object({
  walletAddress: z.string().min(8),
  riskScore: z.number().min(0).max(100),
  flags: z.array(z.string()),
  category: z.string(),
  context: z.string().optional()
});

agentRouter.post('/recommend', async (req, res, next) => {
  try {
    const input = recommendationSchema.parse(req.body);
    const recommendation = await getAgentRecommendation(input);
    res.json(recommendation);
  } catch (error) {
    next(error as Error);
  }
});
