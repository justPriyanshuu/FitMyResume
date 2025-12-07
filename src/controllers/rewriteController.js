import { askLLM } from '../../llmClient.js';

function buildRewritePrompt(text, job) {
  return `
You are an expert resume evaluator.

JOB DESCRIPTION:
${job}

RESUME:
${text}

Your task is NOT to rewrite the resume text.

Instead:
- "bullets" must contain 3–5 short, clear sentences describing what the candidate should improve or add in order to better match the job description.
- Each bullet MUST be a plain string in the array (no objects, no nested fields).
- "summary" must be 2–3 sentences describing what the candidate is already strong in and what important skills or experience they are missing for this job.

Return ONLY valid JSON that can be parsed by JavaScript JSON.parse(), with this exact shape:

{
  "bullets": ["improvement point 1", "improvement point 2", "improvement point 3"],
  "summary": "2–3 sentence evaluation summary only"
}

RULES:
- Do NOT include personal info (name, email, phone, address).
- Do NOT paste the whole resume.
- "bullets" MUST be an array of plain strings only.
- "summary" must be MAX 2–3 sentences.
- NO comments, NO trailing commas, NO text before or after the JSON.
`;
}

function extractJson(raw) {
  // 1) If it's already an object, just return it
  if (typeof raw === 'object' && raw !== null) {
    return raw;
  }

  // 2) If it's not a string, we can't parse it as JSON
  if (typeof raw !== 'string') {
    console.error('extractJson: raw is not a string:', typeof raw);
    return null;
  }

  // Helper: clean common issues (smart quotes, weird whitespace)
  const clean = (s) =>
    s
      .trim()
      // replace “ ” with "
      .replace(/[\u201C\u201D]/g, '"')
      // replace ‘ ’ with '
      .replace(/[\u2018\u2019]/g, "'");

  const tryParse = (s, label) => {
    try {
      return JSON.parse(s);
    } catch (e) {
      console.error(`JSON.parse failed (${label}):`, e.message);
      return null;
    }
  };

  // 3) Try parsing raw as-is
  let parsed = tryParse(raw, 'raw');
  if (parsed) return parsed;

  // 4) Try extracting the first {...} block
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) {
    console.error('extractJson: no { } block found');
    return null;
  }

  const block = match[0];

  // 5) Try parsing the block as-is
  parsed = tryParse(block, 'block');
  if (parsed) return parsed;

  // 6) Try parsing a cleaned version of the block
  const cleanedBlock = clean(block);
  parsed = tryParse(cleanedBlock, 'cleaned block');
  if (parsed) return parsed;

  return null;
}

export const handleRewrite = async (req, res) => {
  const { text, job } = req.body;

  if (!text || !job) {
    return res.status(400).json({ error: 'text and job fields required' });
  }

  try {
    const prompt = buildRewritePrompt(text, job);
    const raw = await askLLM(prompt);

    console.log('LLM raw output:', raw, 'type:', typeof raw);

    const parsed = extractJson(raw);

    if (!parsed || !Array.isArray(parsed.bullets) || typeof parsed.summary !== 'string') {
      console.error('AI output not in expected format:', parsed);
      return res.status(500).json({
        error: 'AI output was not in expected JSON format',
        raw,
      });
    }

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
