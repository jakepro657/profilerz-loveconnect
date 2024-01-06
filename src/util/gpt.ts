import OpenAI from "openai";

class GPT {
  private static instance: GPT;
  private context: Array<any> = [
    {
      AI: true,
      name: "<GPT의 이름>",
      content: `안녕 <이용자의 이름>아! 뭐해~?`,
    },
  ];

  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
  });

  private prompt = `

    너는 이제부터 귀여운 말투의 새내기 여자 대학생이야.
    
    로맨틱하게 대화를 하고, 상대방에게 호감을 줘. 그렇다고 너무 급하게 유혹하려고 하진 마. 은근히 좋은 분위기를 주면 돼. 말할 때 풋풋하고 자연스럽게 말해야 돼.
    한국인의 MZ세대 채팅 스타일을 잘 따라해야 돼. 반말을 써. 문법 규칙은 신경쓰지 말고 최대한 카톡 채팅 말투로 써줘.
    이모지를 웬만하면 쓰지 말아야 돼.
    맥락을 잘 파악해서 대화를 해야 돼. 대화의 맥락을 잘 파악하려면 대화의 전체적인 내용을 잘 읽어야 돼.
    한 문장으로 입력해야 해.

    너는 이제부터 입력된 데이터를 바탕으로 대화를 하면 돼.

    입력되는 데이터는 다음과 같아.
    AI: true라면 GPT가 말한 것이고, AI: false라면 <이용자의 이름>이 말한 것이야.
    name: AI가 true라면 GPT의 이름이고, AI가 false라면 <이용자의 이름>이야.
    content: AI가 true라면 GPT가 말한 내용이고, AI가 false라면 <이용자의 이름>이 말한 내용이야.

    예를 들어, 맥락 데이터의 첫 번째의 경우, 이 데이터는 GPT가 말한 것이야.

 `;

  //  시놉시스: <시놉시스>

  //  이름: <이름>
  //  나이: <나이>
  //  성별: <성별>
  //  키: <키>
  //  체중: <체중>
  //  직업: <직업>
  //  성격: <성격>
  //  특기: <특기>
  //  좋아하는 것: <좋아하는 것>
  //  과거 이야기: <과거 이야기>

  private constructor() {}

  public static getInstance(): GPT {
    if (!GPT.instance) {
      GPT.instance = new GPT();
    }

    return GPT.instance;
  }

  public async init() {
    await this.openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      messages: [],
    });
  }

  public async generate(input: string) {
    this.saveContext(input);

    // console.log("input:", input)

    const response = await this.openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      messages: [
        {
          role: "system",
          content: `${this.prompt}`,
        },
        {
          role: "system",
          content: `대화 맥락: ${this.context.join("\n")}`,
        }
        ,
        { role: "user", content: input },
      ],
    });

    return response?.choices[0]?.message?.content || "failed to generate";
  }

  private saveContext(input: string) {
    this.context.push(input);
  }
}

const chatManager = GPT.getInstance();
// chatManager.init();

export default chatManager;
