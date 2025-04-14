import { type NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(request: NextRequest) {
  try {
    const { skills, experience, role } = await request.json();

    if (!skills || skills.length === 0) {
      return NextResponse.json(
        { error: "Skills are required to generate a roadmap" },
        { status: 400 }
      );
    }

    // Prepare the prompt for OpenAI
    const prompt = `
      Generate a detailed career development roadmap for someone interested in becoming a ${
        role || "professional"
      }.
      
      Current skills: ${skills.join(", ")}
      ${experience ? `Current experience: ${experience}` : ""}
      
      The roadmap should include:
      1. Short-term goals (next 3-6 months)
      2. Medium-term goals (6-18 months)
      3. Long-term goals (1.5-3 years)
      4. Specific skills to develop at each stage
      5. Recommended learning resources (courses, books, etc.)
      6. Potential career milestones to aim for
      7. Industry certifications that would be valuable
      
      Format the response in a structured way that can be easily displayed to the user.
    `;

    // Call OpenAI using Vercel AI SDK
    const result = await generateText({
      model: openai("gpt-4o"),
      prompt: prompt,
      temperature: 0.7,
      maxTokens: 1500,
    });

    return NextResponse.json({ roadmap: result.text });
  } catch (error) {
    console.error("Error generating roadmap:", error);
    return NextResponse.json(
      { error: "Failed to generate roadmap. Please try again." },
      { status: 500 }
    );
  }
}
