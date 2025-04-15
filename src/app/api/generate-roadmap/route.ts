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

    // Prepare the prompt for OpenAI with improved formatting instructions
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
      
      IMPORTANT FORMATTING INSTRUCTIONS:
      - Use clear section headers for each time period (e.g., "Short-term Goals (Next 3-6 Months)")
      - Put each section header on its own line
      - After each section header, start a new line before listing goals
      - List goals as numbered items (e.g., "1. Master React.js")
      - Use separate sections for "Skills to Develop", "Recommended Learning Resources", "Career Milestones", and "Industry Certifications"
      - Each of these subsections should have its own header line
      - DO NOT include any markdown formatting like **, *, or __ in the output
      - Use plain text with clear section headers and numbered/bulleted lists
      - Keep the content well-structured with proper spacing between sections
      - Put each numbered item on its own line
      
      Example format:
      
      Short-term Goals (Next 3-6 Months)
      
      1. First goal
      2. Second goal
      
      Skills to Develop
      
      1. First skill
      2. Second skill
      
      Recommended Learning Resources
      
      1. First resource
      2. Second resource
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
