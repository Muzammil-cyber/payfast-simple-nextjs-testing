import { NextRequest } from "next/server";

export async function POST(res: NextRequest) {
  console.log("POST CHECKOUT", await res.json());
}

export async function GET(res: NextRequest) {
  console.log("GET CHECKOUT", await res.json());
}
