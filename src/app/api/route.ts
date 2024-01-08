import chatManager from "@/util/gpt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  
  const json = await req.json();

  const { input } = json as { input: string };

  // if (!input) {
  //   return NextResponse.json({ "response": "input is empty" });
  // }

  const output = await chatManager.generate(input);

  return NextResponse.json({ "message": output });
  // return NextResponse.json({ "response": input });
}
