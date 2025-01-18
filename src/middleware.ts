import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define paths that don't require authentication
const publicPaths = ["/login", "/signup",];
const protectedPaths = ["/","/questions"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(pathname);
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }
  const isProtectedPath = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
  if (!isProtectedPath) {
    return NextResponse.next();
  } else {
    const token = request.cookies.get("token")?.value;
    if (token && pathname === "/") {
      const url = new URL("/questions", request.url);

      return NextResponse.redirect(url);
    }

    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const [header, payload, signature] = token.split(".");
      if (!header || !payload || !signature) {
        throw new Error("Invalid token structure");
      }

      return NextResponse.next();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("token");
      return response;
    }
  }
}

// Configure which routes the middleware should run on
export const config = {
  matcher: ["/", "/login","/questions"],
};
