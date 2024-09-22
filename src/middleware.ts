import { NextRequest, NextResponse } from "next/server";

import { jwtVerify } from "jose";

import { env } from "../env";

const SECRET_KEY = new TextEncoder().encode(
  env.NEXT_PUBLIC_JWT_SECRET as string
);

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err: unknown) {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token");

  if (req.nextUrl.pathname === "/") {
    if (token) {
      const payload = await verifyToken(token.value);
      if (payload) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }
  }

  if (req.nextUrl.pathname === "/dashboard") {
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const payload = await verifyToken(token.value);
    if (!payload) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard"],
};
