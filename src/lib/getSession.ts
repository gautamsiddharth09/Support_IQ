
import { cookies } from "next/headers";
import { scalekit } from "./scaleKit";

export async function getSession() {
  const cookieStore  = await cookies();
  const token = cookieStore .get("access_token")?.value;

  if (!token) return null;

  try {
    // Validate token with ScaleKit
    const result: any = await scalekit.validateToken(token);
    const user = await scalekit.user.getUser(result.sub);
    return user;
  } catch (error) {
    console.error("Session validation error:", error);

    // Delete invalid token
    // cookieStore.delete("access_token");
    return null;
  }
}