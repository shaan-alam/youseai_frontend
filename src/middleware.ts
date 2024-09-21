import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import { jwtVerify } from "jose";

import { env } from "../env";

const SECRET_KEY = new TextEncoder().encode(env.NEXT_PUBLIC_JWT_SECRET);

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token");

  console.log(token?.value);

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
