import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();

  // You can save to database here — or write to log file
  console.log("🚀 Logged transaction:", data);

  return NextResponse.json({ success: true });
}
