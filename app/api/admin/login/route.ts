import { NextRequest, NextResponse } from "next/server";
import {
  validatePassword,
  createToken,
  COOKIE_NAME,
  TOKEN_MAX_AGE,
} from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password || !validatePassword(password)) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    const token = createToken();

    const response = NextResponse.json({ success: true });
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: TOKEN_MAX_AGE,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}
