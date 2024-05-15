import { validateUser } from "@/util/func";
import prisma from "@/util/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { message, chatId, id, type } = await req.json() as MessageInput & { id: string, type: string };

    const validation = await validateUser(id)

    if (type == "NEW") {
    
        if (!validation) {
            return NextResponse.json({
                status: 401,
                message: "Unauthorized",
                error: true,
            })
        }
    
        const user = await prisma.user.findFirst({
            where: {
                identifier: id
            }
        })
    
        const chat = await prisma.chat.create({
            data: {
                user: {
                    connect: {
                        id: user?.id
                    }
                }
            }
        })
    
        return NextResponse.json({
            status: 200,
            message: chat.id,
            error: null
        })
    
    }

    if (validation) {
        const chat = await prisma.chat.findFirst({
            where: {
                id: chatId
            }
        })

        if (chat) {

            const messages = await prisma.message.create({
                data: {
                    content: message.content,
                    name: message.name,
                    AI: message.AI,
                    chatId: chat.id,
                },
            })

            return NextResponse.json({
                status: 200,
                message: {
                    chatInfo: chat,
                    messages: messages,
                },
                error: null
            })
        }


    } else {
        return NextResponse.json({
            status: 401,
            message: "Unauthorized",
            error: true,
        })
    }

    return NextResponse.json({
        status: 400,
        message: "Bad Request",
        error: true,
    })
}