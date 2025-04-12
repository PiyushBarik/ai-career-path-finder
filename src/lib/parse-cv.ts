import OpenAI from "openai";

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Splits the provided text into chunks each of maximum specified length.
 * Uses newlines as natural dividers to avoid cutting sentences in half.
 */
function chunkText(text: string, maxLength: number): string[] {
  const paragraphs = text.split("\n");
  const chunks: string[] = [];
  let currentChunk = "";

  for (const para of paragraphs) {
    if (currentChunk.length + para.length < maxLength) {
      currentChunk += para + "\n";
    } else {
      chunks.push(currentChunk);
      currentChunk = para + "\n";
    }
  }

  if (currentChunk.trim().length > 0) {
    chunks.push(currentChunk);
  }

  return chunks;
}

export async function parseCV(formData: FormData): Promise<string[]> {
  try {
    const cvFile = formData.get("cv") as File;
    if (!cvFile) {
      throw new Error("CV file is required");
    }

    // Read the entire text from the file
    const text = await cvFile.text();

    // Split the text into chunks to avoid token limits.
    // Adjust maxChunkSize as needed (here set to 10,000 characters).
    const maxChunkSize = 10000;
    const chunks = chunkText(text, maxChunkSize);

    // Use a Set to collect unique skills from all chunks.
    const skillSet = new Set<string>();

    // Process each chunk individually
    for (const chunk of chunks) {
      const response = await openai.chat.completions.create({
        // Use a model with a larger context window if available
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "Extract all professional skills from the CV provided. Parse every section of the text carefully; ignore vague or generic phrases. Return only a comma-separated list of skills with no additional commentary.",
          },
          {
            role: "user",
            content: `Extract all professional skills from this text:\n\n${chunk}`,
          },
        ],
      });

      const chunkSkillsRaw = response.choices[0]?.message?.content || "";
      const chunkSkills = chunkSkillsRaw
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill.length > 0);

      chunkSkills.forEach((skill) => skillSet.add(skill));
    }

    // Return all unique skills as an array
    return Array.from(skillSet);
  } catch (error) {
    console.error("Error parsing CV:", error);
    throw error;
  }
}
