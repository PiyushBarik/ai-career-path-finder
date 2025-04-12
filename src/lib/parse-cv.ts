import OpenAI from "openai";

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to truncate text to a reasonable size
function truncateText(text: string, maxLength = 15000): string {
  if (text.length <= maxLength) return text;

  // Take the first part of the document which likely contains the most relevant information
  const firstPart = text.substring(0, maxLength * 0.7);

  // Take the last part to capture recent experience/education
  const lastPart = text.substring(text.length - maxLength * 0.3);

  return `${firstPart}\n...[Content truncated for length]...\n${lastPart}`;
}

export async function parseCV(formData: FormData): Promise<string[]> {
  try {
    const cvFile = formData.get("cv") as File;

    if (!cvFile) {
      throw new Error("CV file is required");
    }

    // Convert file to text
    const text = await cvFile.text();

    // Truncate the text to avoid token limits
    const truncatedText = truncateText(text);

    // Use a more efficient prompt
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Use 3.5 turbo which is more efficient for this task
      messages: [
        {
          role: "system",
          content:
            "Extract professional skills from the CV text. Return ONLY a comma-separated list of skills, with no additional text or formatting.",
        },
        {
          role: "user",
          content: `Extract the key professional skills from this CV. Focus on technical skills, tools, programming languages, and professional competencies. Return ONLY a comma-separated list of skills (no explanations or categories):\n\n${truncatedText}`,
        },
      ],
      temperature: 0.3, // Lower temperature for more focused extraction
      max_tokens: 500, // Limit output tokens
    });

    // Get the extracted skills from the response
    const extractedSkills = response.choices[0]?.message?.content || "";

    // Parse the comma-separated list into an array
    const skills = extractedSkills
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);

    return skills;
  } catch (error) {
    console.error("Error parsing CV:", error);
    throw error;
  }
}
