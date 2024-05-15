import OpenAI from "openai"
import prisma from '@/util/prisma';
import { PROMPT } from "@/util/openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    const json = await req.json();

    const { input, typeCode, chatId, username, gptname } = json as { input: string, typeCode: string, chatId: number, username: string, gptname: string };
    const previousMessages = await prisma.message.findMany({
        where: {
            chat: {
                id: chatId
            }
        },
    })

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY || "",
    });

    const messages: OpenAI.ChatCompletionMessageParam[] = previousMessages.map((m: Message) => {
        return {
            role: m.AI ? "assistant" : "user",
            content: m.content
        }
    })

    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content: PROMPT.replace("GPT_NAME", username).replace("USER_NAME", gptname)
            },
            ...messages,
            {
                role: "user",
                content: input
            }
        ]
    })
    
    return NextResponse.json({
        status: 200,
        message: response.choices[0].message.content,
        error: null
    })

}