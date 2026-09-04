import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, COOKIE_VALUE } from "@/lib/auth";

// Protege o dashboard: sem cookie de sessao, volta para o login.
export function middleware(request: NextRequest) {
  const logado = request.cookies.get(COOKIE_NAME)?.value === COOKIE_VALUE;

  if (!logado) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
