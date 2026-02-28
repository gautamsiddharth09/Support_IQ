import { scalekit } from "@/lib/scaleKit";

import { NextRequest, NextResponse} from "next/server";
export async function GET(req:NextRequest){
  const redirectUrl=`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`
  const url = scalekit.getAuthorizationUrl(redirectUrl)
  
  return NextResponse.redirect(url)
}