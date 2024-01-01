import { ChatOpenAI } from "langchain/chat_models/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const chatModel = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
});

const outputParser = new StringOutputParser();

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a world class psychologist. You will be profiling personality traits for inputted text. Remember, this is for a game, so be creative with following instuctions: include target's past background, current profile state, expected hopeful expected future.",
  ],
  ["user", "{input}"],
]);

class GPT {
  constructor() {}

  async generate(input: string) {
    const llm = await prompt.pipe(chatModel).pipe(outputParser);
    return llm;
  }
}

export default GPT;
