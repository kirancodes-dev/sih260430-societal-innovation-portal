import { NextResponse } from "next/server";
import { classifySocietalProblem } from "@/lib/ai-classifier";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, district, block } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required for AI triage analysis." },
        { status: 400 }
      );
    }

    const classification = await classifySocietalProblem(
      title,
      description,
      district || "ranchi",
      block
    );

    return NextResponse.json(classification);
  } catch (error) {
    console.error("API Classify error:", error);
    return NextResponse.json(
      { error: "Failed to perform AI classification." },
      { status: 500 }
    );
  }
}
