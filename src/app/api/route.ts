import chatManager from "@/util/gpt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  
  const json = await req.json();

  const { input, typeCode } = json as { input: string, typeCode: string };

  // if (!input) {
  //   return NextResponse.json({ "response": "input is empty" });
  // }

  chatManager.setAI(typeCode);

  const output = await chatManager.generate(input);

  return NextResponse.json({ "message": output });
  // return NextResponse.json({ "response": input });
}
