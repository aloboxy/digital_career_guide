import { getResetTime, resetApiLimit, getApiLimit } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import moment from "moment";

export async function GET() {
  const { userId } = auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  const resetTime = await getResetTime();

  if (moment().isSame(resetTime) || moment().isAfter(resetTime)) {
    const response = await resetApiLimit();
    return NextResponse.json(response);
  }

  const limit = await getApiLimit();

  return NextResponse.json(limit);
}
