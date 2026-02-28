
// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { scalekit } from "./lib/scaleKit";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    await scalekit.validateToken(token);
    return NextResponse.next();
  } catch {
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete("access_token"); // ✅ allowed here
    return response;
  }
}

export const config = {
  matcher: "/dashboard/:path*",
};










// import { NextRequest, NextResponse } from "next/server";
// import { scalekit } from "./lib/scaleKit";

// export async function middleware(req: NextRequest) {
//   const token = req.cookies.get("access_token")?.value;

//   if (!token) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   try {
//     await scalekit.validateToken(token);
//     return NextResponse.next();
//   } catch {
//     const response = NextResponse.redirect(new URL("/login", req.url));
//     response.cookies.delete("access_token"); 
//     return response;
//   }
// }

// export const config = {
//   matcher: "/dashboard/:path*",
// };