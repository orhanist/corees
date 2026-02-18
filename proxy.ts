import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { env } from "@/lib/env";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: env.AUTH_SECRET,
  });

  if (!token?.userId) {
    const signInUrl = new URL("/auth/signin", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  if (pathname.startsWith("/admin/users") && token.role !== "SUPERADMIN") {
    return NextResponse.redirect(new URL("/admin/forbidden", request.url));
  }

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/forbidden") && !token.passkeyEnrolled) {
    const setupUrl = new URL("/auth/setup-passkey", request.url);
    setupUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(setupUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
