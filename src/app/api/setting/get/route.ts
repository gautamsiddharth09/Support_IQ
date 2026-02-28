import connectDb from "@/lib/Db";
import setting from "@/model/settings.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const ownerId = req.nextUrl.searchParams.get("ownerId")

    if (!ownerId) {
      return NextResponse.json(
        { message: "Owner id is required" },
        { status: 400 }
      );
    }

    await connectDb();

   
    const userSetting = await setting.findOne({ ownerId });

    return NextResponse.json(userSetting);
  } catch (error) {
    return NextResponse.json(
      { message: `Get Settings error: ${error}` },
      { status: 500 }
    );
  }
}