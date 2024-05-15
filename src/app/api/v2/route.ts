

export async function POST(req: Request) {
    const { message, chatId } = await req.json() as MessageInput;


}