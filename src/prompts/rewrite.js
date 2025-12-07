export const rewritePrompt = (resume, job) => `
Rewrite the following resume content to match this job description.

You must return:
1. 4–6 ATS-friendly bullet points (short, action verbs, measurable impact)
2. A 2–3 line professional summary tailored to the job

Rules:
- Do NOT hallucinate new skills.
- Use keywords from the job description when appropriate.
- Keep it professional and concise.
- Output format MUST be:

BULLETS:
- ...
- ...
- ...

SUMMARY:
...

Resume:
${resume}

Job Description:
${job ?? "N/A"}
`;
