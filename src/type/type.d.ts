type Role = "function" | "system" | "assistant" | "user";

interface Message {
    AI: boolean;
    name: string;
    content: string;
}

interface MessageInput {
    chatId: number;
    message: Message;
}