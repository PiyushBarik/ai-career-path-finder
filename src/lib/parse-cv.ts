import OpenAI from "openai";

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function parseCV(formData: FormData): Promise<string[]> {
  try {
    const cvFile = formData.get("cv") as File;

    if (!cvFile) {
      throw new Error("CV file is required");
    }

    // Convert file to text
    const text = await cvFile.text();

    // Use OpenAI to extract skills from the CV text
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that extracts professional skills from CV text.",
        },
        {
          role: "user",
          content: `Extract a list of professional skills from the following CV text. 
          Return ONLY the skills as a comma-separated list, with no additional text or formatting.
          Focus on technical skills, soft skills, tools, programming languages, and other professional competencies.
          
          CV Text:
          ${text}`,
        },
      ],
      temperature: 0.5,
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
