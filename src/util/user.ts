import { randomUUID } from "crypto";
import prisma from "./prisma";
import { NextResponse } from "next/server";

export async function GET() {

    const uuid = randomUUID()

    try {
        const user = await prisma.user.create({
            data: {
                identifier: uuid,
            }
        })
        return NextResponse.json({
            status: 200,
            message: {
                id: user.id,
                identifier: user.identifier
            },
            error: null
        })
    } catch (e) {
        return NextResponse.json({
            status: 400,
            message: "Bad Request",
            error: true,
        })
    }
}