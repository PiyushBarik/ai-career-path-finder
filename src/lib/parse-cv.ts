import OpenAI from "openai";

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to truncate text to a reasonable size
function truncateText(text: string, maxLength = 15000): string {
  if (text.length <= maxLength) return text;

  // Capture the first part and the last part to preserve context
  const firstPart = text.substring(0, maxLength * 0.7);
  const lastPart = text.substring(text.length - maxLength * 0.3);
  return `${firstPart}\n...[Content truncated for length]...\n${lastPart}`;
}

export async function parseCV(formData: FormData): Promise<string[]> {
  try {
    const cvFile = formData.get("cv") as File;

    if (!cvFile) {
      throw new Error("CV file is required");
    }

    // Convert file to text and truncate if necessary
    const text = await cvFile.text();
    const truncatedText = truncateText(text);

    // Use GPT-4 with an updated prompt that covers all disciplines.
    const response = await openai.chat.completions.create({
      model: "o1",
      messages: [
        {
          role: "system",
          content:
            "Extract all professional skills from the CV provided. Carefully review every section of the CV, including technical, soft, and discipline-specific skills and frame works that ware capable in. Only extract skills that are explicitly mentioned; ignore vague or generic phrases. Return only a comma-separated list of skills, with no additional commentary. If there is a section with techinal skils make sure you extract the information from there as well",
        },
        {
          role: "user",
          content: `Extract all professional skills from this CV:\n\n${truncatedText}`,
        },
      ],
    });

    // Get the extracted skills from the response
    const extractedSkillsRaw = response.choices[0]?.message?.content || "";

    // Parse the comma-separated list into an array; no filtering is done here to allow a wide range of skills.
    const extractedSkills = extractedSkillsRaw
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);

    return extractedSkills;
  } catch (error) {
    console.error("Error parsing CV:", error);
    throw error;
  }
}
