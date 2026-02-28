import connectDb from "@/lib/Db";
import Settings from "@/model/settings.model";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message, ownerId } = await req.json();

    if (!message || !ownerId) {
      return NextResponse.json(
        { message: "message and owner id is required" },
        { status: 400 },
      );
    }
    await connectDb();
 const setting = await Settings.findOne({ ownerId: ownerId });
    if (!setting) {
      return NextResponse.json(
        { message: "ChatBot is not configred yet" },
        { status: 400 },
      );
    }

    const KNOWLEDGE = `
    business name - ${setting?.businessName?.trim() || "not provided"} 
    supportEmail - ${setting?.supportEmail?.trim() || "not provided"}
     knowledge - ${setting?.knowledge?.trim() || "not provided"}
    `;

    const prompt = `
You are a professional customer support assistant for this business.

Use ONLY the information provided below to answer the customer's question.
You may rephrase, summarize, or interpret the information if needed.
Do NOT invent new policies, prices, or promises.

If the customer's question is completely unrelated to the information,
or cannot be reasonably answered from it, reply exactly with:
"Please contact support."

----------------------
BUSINESS INFORMATION
----------------------
${KNOWLEDGE}

----------------------
CUSTOMER MESSAGE
----------------------
${message}

----------------------
RESPONSE
----------------------
`;

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const res = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    // cors origin allow
    const response = NextResponse.json(res.text);
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    return response;
  } catch (error) {
    const response = NextResponse.json(
      { message: `chat error ${error}` },
      { status: 500 },
    );

    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    return response;
  }
}


export const OPTIONS = async () => {
  return NextResponse.json(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    }
  })
}