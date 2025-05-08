import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname, origin } = req.nextUrl;
    const { token } = req.nextauth;

    if (pathname.startsWith("/dashboard") && !token) {
      return NextResponse.redirect(`${origin}/auth/login`);
    }

    if (pathname.startsWith("/auth/login") && token) {
      return NextResponse.redirect(`${origin}`);
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/auth/login"],
};