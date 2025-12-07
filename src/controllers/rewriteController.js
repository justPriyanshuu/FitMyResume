import { askLLM } from '../../llmClient.js';
import { rewritePrompt } from '../prompts/rewrite.js';

export const handleRewrite = async (req, res) => {
  const { text, job } = req.body;

  if (!text || !job) return res.status(400).json({ error: 'text and job fields required' });

  const prompt = rewritePrompt(text, job);
  const output = await askLLM(prompt);

  const sections = output.split('SUMMARY:');

  const bulletsPart = sections[0]?.replace('BULLETS:', '').trim();
  const summaryPart = sections[1]?.trim();

  const bullets = bulletsPart
    ?.split('\n')
    .map((b) => b.trim())
    .filter((b) => b.startsWith('-') || b.startsWith('•'));

  res.json({
    bullets,
    summary: summaryPart,
    raw: output,
  });
};
