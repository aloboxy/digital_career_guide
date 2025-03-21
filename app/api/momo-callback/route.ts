import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const payload = await request.json();

  console.log("from callback 1100:", payload);

  try {
    return NextResponse.json({ message: "Callback received" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Callback failed" }, { status: 500 });
  }
}
