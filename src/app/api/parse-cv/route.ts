import { NextRequest, NextResponse } from "next/server";
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

    const skills = await parseCV(formData);

    return NextResponse.json({ skills });
  } catch (error) {
    console.error("Error parsing CV:", error);
    return NextResponse.json({ error: "Failed to parse CV" }, { status: 500 });
  }
}
