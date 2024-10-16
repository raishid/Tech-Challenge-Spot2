import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { get } from "@/providers/acortar";
export async function middleware(request: NextRequest) {
  const { pathname } = new URL(request.url);

  if (pathname === "/") {
    return NextResponse.next();
  }

  const shortenCode = pathname.replace("/", "");
  try {
    const redirectUrl = await get(shortenCode);
    console.log(redirectUrl);
    
    if (redirectUrl.url) {
      return NextResponse.redirect(redirectUrl.url, { status: 301 });
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      return NextResponse.next();

    }
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
