import setting from "@/model/settings.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { ownerId, businessName, supportEmail, knowledge } = await req.json();

    if (!ownerId) {
      return NextResponse.json(
        { message: "Owner id is required" },
        { status: 400 },
      );
    }

    const updatedSettings = await setting.findOneAndUpdate(
      { ownerId },
      // filter
      { ownerId, businessName, supportEmail, knowledge },
      // update
      { new: true, upsert: true },
      // upsert: return new doc & create if not exists
    );

    return NextResponse.json(updatedSettings);
  } catch (error) {
    return NextResponse.json(
      { message: `Settings error: ${error}` },
      { status: 500 },
    );
  }
}
