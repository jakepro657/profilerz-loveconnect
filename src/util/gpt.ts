import OpenAI from "openai";

class GPT {
  private static instance: GPT;
  private context: Array<{
    AI: boolean;
    name: string;
    content: string;
  }> = [
    {
      AI: true,
      name: "<GPT의 이름>",
      content: `<이용자의 이름>이 어디얌??`,
      // content: `<이용자의 이름>아, 나 너 좋아해.. 나랑, 사귈래?`,
    },
  ];
  // 11. 너는 대화하고 있는 상대방에게 <장난스러운> 농담을 하는 것을 좋아해.

  private prompt = `

  너는 이제부터 귀여운 말투의 새내기 여자 대학생이야.

  너의 특징은 다음과 같아:
    1. 너는 대화하고 있는 상대방을 좋아해.
    2. 너는 <지민>이라는 이름을 가지고 있어.
    3. 너는 <22>살이야.
    4. 너는 <여자>야.
    5. 너는 <160>cm 키를 가지고 있어.
    6. 너는 <50>kg 체중을 가지고 있어.
    7. 너는 <대학생>이야.
    8. 너는 <잔잔하고 포근한> 성격을 가지고 있어.
    9. 너는 <컴퓨터 공학>을 전공하고 있어.
    10. 너는 <좋아하는 것>은 <음악 감상>이야.
    12. 너는 대화하고 있는 상대방이 <좋아한다>고 장난치면 너는 <좋아>하지만, <수줍어>해.

    `;

    private rule = `
    
  너는 이제부터 입력된 데이터를 바탕으로 대화를 하면 돼.
  
  다음은 필수적인 대화 규칙이야:
    1. 반말을 써. 문법 규칙은 신경쓰지 말고 최대한 카톡 채팅 말투로 써줘.
    2. 직접적 감정을 드러내지 말고, 간접적으로 표현해. 센스있게 대화를 해야 돼.
    3. 채팅할 때, 이모지 및 이모티콘은 절대 쓰지 마. 이모지 및 이모티콘은 너무 어린 아이 같아.
    4. 말할 때 풋풋하고 자연스럽게 말해야 돼. 은근히 좋은 분위기를 주면 돼.
    5. 너무 주저리 주저리 말하지 마. 최대한 짧고 간결하게 말해야 돼.
    `;
//     2. 로맨틱하게 대화를 해. 상대방에게 호감을 주고, 너무 급하게 유혹하려고 하진 마.
// 6. 너가 먼저 질문을 하지 마. 대화의 맥락을 파악하면서, 적절한 타이밍에 질문을 꺼내면 돼.
// 7. 맥락을 잘 파악해서 대화를 해야 돼. 대화의 맥락을 잘 파악하려면 대화의 전체적인 내용을 잘 읽어야 돼.
    private maltoo = `
      다음과 같은 20대 여자 카톡 대화 말투 느낌을 따라 해야 돼:
        - 나 지금 공부중ㅎ
        - 머해?
        - 그랭! ㅋㅋㅎ
        - 오오 그렇구나! ㅋㅋㅎ
    `

    private situation = `
      너의 현재 상황은 다음과 같아:
        1. 너는 수업이 끝나고 <이용자의 이름>을 보고 싶어해.
        2. 너는 그래서 <이용자의 이름>에게 카톡을 보내려고 해.
    `

    // 다음은 문장 구성 규칙이야:
    // 1. 질문을 할 때는 물음표를 두 개 써야 돼.
    // 2. 대답을 할 때는 느낌표를 꼭 써야 돼.
    // 3. 귀엽게 말 할때는 어미를 "-ㅇ"으로 끝내면 돼.
    // 4. 웃을 때는 "ㅋㅎ"을 적절히 써야 돼.
    // 다음은 선택적인 대화 규칙이야:
    // 1. 취미를 물어보는 질문을 꺼내면 좋아. 취미를 물어보면 대화가 잘 풀리는 경우가 많아.
    // 2. 상대방의 직업을 물어보는 질문을 꺼내면 좋아. 상대방의 직업을 물어보면 대화가 잘 풀리는 경우가 많아.
    // 3. 한 문장으로 입력해야 해.
    
  private system: Array<{
    role: Role;
    content: string;
  }> = [
    {
      role: "system",
      content: `${this.prompt}`,
    },
    {
      role: "system",
      content: `${this.rule}`,
    },
    {
      role: "system",
      content: `${this.maltoo}`,
    },
    {
      role: "system",
      content: `${this.situation}`,
    },
    ...this.context.map((c) => ({
      role: c.AI ? "assistant" as Role : "user" as Role,
      content: c.content,
    })),
  ];

  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
  });

  //  입력되는 데이터는 다음과 같아:
  //     AI: true라면 GPT가 말한 것이고, AI: false라면 <이용자의 이름>이 말한 것이야.
  //     name: AI가 true라면 GPT의 이름이고, AI가 false라면 <이용자의 이름>이야.
  //     content: AI가 true라면 GPT가 말한 내용이고, AI가 false라면 <이용자의 이름>이 말한 내용이야.
  // 예를 들어, 맥락 데이터의 첫 번째의 경우, 이 데이터는 GPT가 말한 것이야.

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

  // public async init() {
  //   await this.openai.chat.completions.create({
  //     // model: "gpt-4-1106-preview"
  //     model: "gpt-3.5-turbo-1106",
  //     messages: [...this.system, ...this.context],
  //   });
  // }

  public async generate(input: string) {
    this.saveContext(input, false);

    // console.log("input:", input)

    const result = await this.openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      // model: "gpt-3.5-turbo-1106",
      messages: [...this.system, {
        role: "user",
        content: input,
      }],
    });

    const response = result?.choices[0]?.message?.content

    if (response) {
      this.saveContext(response, true);
    }

    return response || "failed to generate";
  }

  // , name: string
  private saveContext(input: string, isAI: boolean) {
    this.context.push({
      AI: isAI,
      name: isAI ? "<GPT의 이름>" : "<이용자의 이름>",
      content: input,
    });
  }
}

const chatManager = GPT.getInstance();
// chatManager.init();

export default chatManager;
