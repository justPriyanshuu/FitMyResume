export const bulletPrompt = (text, job) => `
Rewrite the following resume content into 4–6 ATS-friendly bullet points.

Guidelines:
- Start bullets with strong action verbs.
- Use numbers or results whenever possible.
- Keep each bullet 1 line.
- Do NOT add details that aren't given.
- Keep it relevant to the job role.

Resume:
${text}

Job Description:
${job ?? 'N/A'}

Return only plain bullet points separated by new lines.
`;
