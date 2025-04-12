import { type NextRequest, NextResponse } from "next/server";
import { parseCV } from "@/lib/parse-cv";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const cvFile = formData.get("cv") as File;

    if (!cvFile) {
      return NextResponse.json(
        { error: "CV file is required" },
        { status: 400 }
      );
    }

    // Check file size before processing (limit to 5MB)
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (cvFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error:
            "File size exceeds the 5MB limit. Please upload a smaller file.",
        },
        { status: 400 }
      );
    }

    try {
      const skills = await parseCV(formData);
      return NextResponse.json({ skills });
    } catch (error: any) {
      console.error("Error parsing CV:", error);

      // If a rate limit error occurs, provide default skills for demo purposes
      if (error.code === "rate_limit_exceeded") {
        return NextResponse.json(
          {
            error:
              "The CV is too large to process. Please try a smaller file or try again later.",
            skills: ["JavaScript", "React", "TypeScript", "HTML", "CSS"],
          },
          { status: 200 }
        );
      }

      return NextResponse.json(
        {
          error:
            "Failed to parse CV. Please try again or enter skills manually.",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in parse-cv route:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
