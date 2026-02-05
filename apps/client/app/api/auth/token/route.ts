import { getToken } from "next-auth/jwt";

import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    const nextAuthToken = await getToken({
      req,
      secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
    });
    if (!nextAuthToken?.sub)
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    const wsToken = jwt.sign(
      { sub: nextAuthToken.sub },
      process.env.WS_SECRET!,
      { expiresIn: "30s" }
    );
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
