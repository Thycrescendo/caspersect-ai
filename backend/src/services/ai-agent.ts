import OpenAI from 'openai';

export type RecommendationInput = {
  walletAddress: string;
  riskScore: number;
  flags: string[];
  category: string;
  context?: string;
};

export async function getAgentRecommendation(input: RecommendationInput) {
  const fallback = {
    agent: 'CasperSect Risk Agent',
    action: input.riskScore >= 75 ? 'Escalate and record scan on-chain' : 'Record scan and monitor',
    explanation: `The wallet is categorized as ${input.category}. ${input.flags.length ? input.flags.join('; ') : 'No major risk flags were detected.'}`,
    nextSteps: [
      'Create a deterministic scan evidence hash',
      'Submit the scan result to the Casper scan registry contract',
      'Monitor this wallet for future changes'
    ]
  };

  if (!process.env.OPENAI_API_KEY) return fallback;

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const completion = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    temperature: 0.2,
    messages: [
      { role: 'system', content: 'You are CasperSect Risk Agent. Return concise JSON with action, explanation, and nextSteps. Do not invent blockchain facts.' },
      { role: 'user', content: JSON.stringify(input) }
    ],
    response_format: { type: 'json_object' }
  });

  try {
    const parsed = JSON.parse(completion.choices[0]?.message?.content || '{}');
    return { ...fallback, ...parsed, agent: 'CasperSect Risk Agent' };
  } catch {
    return fallback;
  }
}
