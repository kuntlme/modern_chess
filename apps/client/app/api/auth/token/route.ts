import { NextRequest } from "next/server";

import jwt from "jsonwebtoken";

import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id)
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });

    const wsToken = jwt.sign({ sub: session.user.id }, process.env.WS_SECRET!, {
      expiresIn: "30s",
    });
    return new Response(JSON.stringify({ wsToken }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ error: "Failed to retrieve token" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
