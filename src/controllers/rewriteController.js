import { askLLM } from '../../llmClient.js';

function buildRewritePrompt(text, job) {
  return `
You are an expert ATS resume optimizer.

JOB DESCRIPTION:
${job}

RESUME:
${text}

Return ONLY valid JSON with this shape:

{
  "bullets": ["3-5 short ATS optimized bullet points only"],
  "summary": "2–3 sentence professional summary only"
}

RULES:
- Do NOT include personal info (name, email, phone, education, address).
- Do NOT paste the whole resume.
- SUMMARY must be MAX 2–3 sentences.
- BULLETS must be short, action-driven, and job-focused.
- NO extra text outside JSON.
`;
}

// Try to extract JSON even if the model wraps it with text
function extractJson(text) {
  try {
    // if it's pure JSON
    return JSON.parse(text);
  } catch {
    // try to grab the first {...} block
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return null;
    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  }
}

export const handleRewrite = async (req, res) => {
  const { text, job } = req.body;

  if (!text || !job) {
    return res.status(400).json({ error: 'text and job fields required' });
  }

  try {
    const prompt = buildRewritePrompt(text, job);
    const raw = await askLLM(prompt); // raw string from LLM

    console.log('LLM raw output:', raw); // helpful in backend logs

    const parsed = extractJson(raw);

    if (!parsed || !Array.isArray(parsed.bullets) || !parsed.summary) {
      return res.status(500).json({
        error: 'AI output was not in expected JSON format',
        raw: raw,
      });
    }

    // This is what your frontend expects
    return res.json({
      bullets: parsed.bullets,
      summary: parsed.summary,
      raw,
    });
  } catch (err) {
    console.error('rewrite error:', err);
    return res.status(500).json({ error: 'Rewrite failed' });
  }
};
