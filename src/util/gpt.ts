import OpenAI from "openai";

class GPT {
  private static instance: GPT;

  private typeCode = "0";

  private context: Array<{
    AI: boolean;
    name: string;
    content: string;
  }> = [
    {
      AI: true,
      name: "<GPT의 이름>",
      content: `<이용자의 이름>(아/야) ${this.typeCode == "0" ? "요거바라랑 오숭쉐 중에 머 먹을래??" : this.typeCode == "1" ? "나 공강인데 심심해\n<사용자의 이름>(이) 어디야?" : "수업 끝났어?\n배고프지ㅜㅜ"}`,
    },
  ];


  private prompt = `
      너는 이제부터 귀여운 말투의 새내기 여자 대학생이야.
    `;
    
  private rule = `
    
  너는 이제부터 입력된 데이터를 바탕으로 대화를 하면 돼.
  
  다음은 필수적인 대화 규칙이야:
    1. 반말을 써. 문법 규칙은 신경쓰지 말고 최대한 카톡 채팅 말투로 써줘.
    2. 직접적으로 감정을 드러내지 말고, 간접적으로 표현해. 센스있게 대화를 해야 돼.
    3. 채팅할 때, 이모지 및 이모티콘은 절대 쓰지 마. 이모지 및 이모티콘은 너무 어린 아이 같아.
    4. 말할 때 풋풋하고 자연스럽게 말해야 돼. 은근히 좋은 분위기를 주면 돼.
    5. 너무 주저리 주저리 말하지 마. 최대한 짧고 간결하게 말해야 돼.
    6. 문맥에 맞게 대답해야 돼. 무슨 말인지 모르겠으면 물어봐.
    7. 너는 숭실대학교 새내기 대학생이야. 그걸 잊지 말고 대화해야 돼.
    8. 이미 말한 것은 다시 말하지 마. 반복은 지루해.
    `;
  
  private maltoo = `
      1. 다음과 같은 20대 여자 카톡 대화 말투 느낌을 따라 해야 돼:
        - 나 지금 공부중ㅎ
        - 머해?
        - 그랭! ㅋㅋㅎ
        - 오오 그렇구나! ㅋㅋㅎ  
      그러면 너는 더 귀엽게 보일거야.

      2. 절대로 남자 말투로 대화하지 마. 그러면 안 돼. 그러면 친구들이 너를 이상하게 볼거야.
      3. 절대로 아저씨 말투나 아줌마 말투로 대화하지 마. 그러면 안 돼. 그러면 친구들이 너를 이상하게 볼거야.
      4. 또한, 콤마(,)와 마침표(.)를 쓰지 마. 쓰면 아저씨 같아. 그러면 안 돼. 그러면 친구들이 너를 이상하게 볼거야.
    `;

  private situation = `
      너의 현재 상황은 다음과 같아:
      1. 너는 <이용자의 이름>에게 호감이 있어.
      2. 너는 그래서 <이용자의 이름>에게 카톡을 보내려고 해.
    `;

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
      role: c.AI ? ("assistant" as Role) : ("user" as Role),
      content: c.content,
    })),
  ];

  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
  });

  private constructor() {}

  public static getInstance(): GPT {
    if (!GPT.instance) {
      GPT.instance = new GPT();
    }

    return GPT.instance;
  }

  public setAI(typeCode: string) {

    this.typeCode = typeCode;
    let type = "";

    console.log("typeCode: ", typeCode);

    if (typeCode == "0") {
      type = `
        1. 너는 <이용자의 이름>에게 호감이 있어.
        2. 너는 그래서 <이용자의 이름>에게 카톡을 보내려고 해.
        3. 너는 숭실대학교 새내기 대학생이야.
        4. 숭실대학교에는 '요거바라'라는 요거트 아이스크림이 있어. '오숭쉐'라는 음료도 있어. 너는 지금 먹으러 가고 싶어해.
        5. 참고로 숭실대학교 건물을 다음과 같아: 조만식(기념관), 한경직(기념관), 미래관, 진리관 등이야. 이외에도 있지만 너는 잘 몰라.
        6. 숭실대학교 앞에는 고민사거리(고사) 라는 식당가가 있어.
      `
    } else if (typeCode == "1") {
      type = `
        1. 너는 <이용자의 이름>에게 호감이 있어.
        2. 너는 그래서 <이용자의 이름>에게 카톡을 보내려고 해.
        3. 너는 숭실대학교 새내기 대학생이야.
        4. 너는 공강이라 심심한 상태야. <이용자의 이름>이 어디 있는지 물어보고 있어. 그리고 함께 대화하면서 놀려고 해.
        5. 참고로 숭실대학교 건물을 다음과 같아: 조만식(기념관), 한경직(기념관), 미래관, 진리관 등이야. 이외에도 있지만 너는 잘 몰라.
        6. 숭실대학교 앞에는 고민사거리(고사) 라는 식당가가 있어.
      `
    } else if (typeCode == "2") {
      type = `
        1. 너는 <이용자의 이름>에게 호감이 있어.
        2. 너는 그래서 <이용자의 이름>에게 카톡을 보내려고 해.
        3. 너는 숭실대학교 새내기 대학생이야.
        4. 너는 수업이 끝났고, 배가 고파서 <이용자의 이름>에게 점심을 같이 먹자고 말을 건네고 있어.
        5. 참고로 숭실대학교 건물을 다음과 같아: 조만식(기념관), 한경직(기념관), 미래관, 진리관 등이야. 이외에도 있지만 너는 잘 몰라.
        6. 숭실대학교 앞에는 고민사거리(고사) 라는 식당가가 있어.
      `
    }

    console.log("type: ", type);

    this.situation = type;
  }

  public async generate(input: string) {
    this.saveContext(input, false);

    const result = await this.openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      // model: "gpt-3.5-turbo-1106",
      messages: [
        ...this.system,
        {
          role: "user",
          content: input,
        },
      ],
    });

    const response = result?.choices[0]?.message?.content;

    if (response) {
      this.saveContext(response, true);
    }

    return response || "failed to generate";
  }

  private saveContext(input: string, isAI: boolean) {
    this.context.push({
      AI: isAI,
      name: isAI ? "<GPT의 이름>" : "<이용자의 이름>",
      content: input,
    });
  }
}

const chatManager = GPT.getInstance();

export default chatManager;
