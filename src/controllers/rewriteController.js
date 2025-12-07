import { askLLM } from '../../llmClient.js';
import { bulletPrompt } from '../prompts/bullets.js';
import { summaryPrompt } from '../prompts/summary.js';

export const handleRewrite = async (req, res) => {
  const { text, job } = req.body;

  if (!text) return res.status(400).json({ error: 'text field required' });

  const bullets = await askLLM(bulletPrompt(text, job));
  const summary = await askLLM(summaryPrompt(text, job));

  res.json({
    bullets: bullets.split('/n').filter(Boolean),
    summary,
  });
};
