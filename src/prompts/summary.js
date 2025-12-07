export const summaryPrompt = (text, job) => `
Write a short 2–3 line professional summary based on this resume.

Guidelines:
- Keep it concise.
- Highlight relevant skills for the job.
- Professional tone only.

Resume:
${text}

Job Description:
${job ?? "N/A"}

Return only the summary text.
`;
