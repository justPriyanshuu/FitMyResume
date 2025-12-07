export const buildRewritePrompt = (text, job) => `
You are an expert ATS resume optimizer.

Rewrite the resume ONLY for the job below:
JOB DESCRIPTION:
${job}

Extract the following in STRICT JSON:

{
  "bullets": ["3-5 short ATS optimized bullet points only"],
  "summary": "2–3 sentence professional summary only"
}

RULES:
- DO NOT include personal info (name, email, phone, address, education).
- DO NOT repeat resume content.
- DO NOT include long paragraphs or entire resume blocks.
- ONLY give optimized ATS content.
- SUMMARY must be MAX 2–3 sentences.
- BULLETS must be crisp, action-driven, and job-focused.
- Output JSON ONLY, no extra text.
RESUME:
${text}
`;
