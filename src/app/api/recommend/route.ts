import { NextRequest, NextResponse } from "next/server";
import { industrySkills, courses } from "@/lib/data";
import { getRecommendations } from "@/lib/recommendation-model";

export async function POST(request: NextRequest) {
  try {
    const { skills } = await request.json();

    if (!skills || !Array.isArray(skills)) {
      return NextResponse.json(
        { error: "Skills must be provided as an array" },
        { status: 400 }
      );
    }

    const recommendations = getRecommendations(skills, industrySkills, courses);

    return NextResponse.json({ recommendations });
  } catch (error) {
    console.error("Error in recommendation API:", error);
    return NextResponse.json(
      { error: "Failed to generate recommendations" },
      { status: 500 }
    );
  }
}
