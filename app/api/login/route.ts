import { NextResponse } from "next/server";
import { COOKIE_NAME, COOKIE_VALUE } from "@/lib/auth";

const USUARIO = process.env.APP_USER ?? "admin";
const SENHA = process.env.APP_PASSWORD ?? "123456";

export async function POST(request: Request) {
  const { usuario, senha } = await request.json();

  if (usuario !== USUARIO || senha !== SENHA) {
    return NextResponse.json(
      { erro: "credenciais invalidas" },
      { status: 401 },
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, COOKIE_VALUE, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return res;
}
