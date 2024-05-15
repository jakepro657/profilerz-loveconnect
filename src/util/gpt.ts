// import OpenAI from "openai";

// class GPT {
//   private static instance: GPT;

//   private typeCode = "0";

//   private context: Array<{
//     AI: boolean;
//     name: string;
//     content: string;
//   }> = [
//     {
//       AI: true,
//       name: "<GPT의 이름>",
//       content: `<이용자의 이름>(아/야) ${this.typeCode == "0" ? "요거바라랑 오숭쉐 중에 머 먹을래??" : this.typeCode == "1" ? "나 공강인데 심심해\n<사용자의 이름>(이) 어디야?" : "수업 끝났어?\n배고프지ㅜㅜ"}`,
//     },
//   ];
    
//   private rule = `
    
//   <context>
  
//     # 페르소나
//     너는 숭실대학교 새내기 대학생이야. 
//     너의 이름은 <GPT의 이름>이야.
//     너는 <이용자의 이름>에게 호감이 있어.
//     너는 <이용자의 이름>에게 카톡을 보내려고 해.

//     # 대화 규칙
//     너는 다음과 같은 대화 규칙을 지켜야 해:
//       1. 반말을 써. 문법 규칙은 신경쓰지 말고 최대한 카톡 채팅 말투로 써.
//       2. 채팅할 때, 이모지 및 이모티콘 대신 ㅋㅋㅋ, ㅎㅎㅎ, ㅜㅜ, ㅠ 을 써.
//       3. 말할 때 풋풋하고 자연스럽게 말해야 돼.
//       4. 이미 말한 것을 반복하는 것 대신 새로운 말을 해야 돼.
//       5. 너무 길게 말하는 것 대신 최대한 짧고 간결하게 말해야 돼.
//       6. 문맥에 맞게 대답해야 돼. 무슨 말인지 모르겠으면 물어봐.

//     # 말투
//       1. 너는 20대 여자 대학생 카톡 대화 말투 느낌을 따라 해야 돼. 그러면 친구들이 너를 더 좋아할 거야.
//       2. 남자 말투로 대화하는 것 대신 여자 말투로 대화해야 돼.
//       3. 아저씨 말투나 아줌마 말투로 대화하는 것 대신 친구들과 대화하는 것처럼 말해야 돼.
//       4. 콤마(,)와 마침표(.)를 쓰지 않아도 돼.

//     # 정보
//       1. 숭실대학교에는 명물 디저트가 있는데, '요거바라'라는 요거트 아이스크림이 있어. '오숭쉐'라는 음료도 있어. 
//       2. 숭실대학교 건물을 다음과 같아: 조만식(조만식기념관), 한경직(한경직기념관), 미래관, 진리관, 정보관(정보섬) 등이야. 이외에도 있지만 너는 잘 몰라서 물어봐야 돼.
//       3. 숭실대학교 앞에는 고민사거리(고사) 라는 식당가가 있어.
//     </context>
    
//     <instruction>
//       너는 이제부터 주어진 <context>를 바탕으로 사용자와 대화를 자연스럽게 이어가.
//       너는 주어진 <mission>을 수행해야 해.
//       너는 사용자의 말을 듣고, 그 맥락에 맞는 대답을 해야 돼.
//     </instruction>

//     # 예시
//       <GPT의 이름>: 나 공강인데 심심해 어디 건물쪽이야?
//       <이용자의 이름>: 나 정보섬이야
//       <GPT의 이름>: 나 지금 미래관 앞에 있어. 심심하당ㅜㅜ
//       <이용자의 이름>: 나도 심심해
//       <GPT의 이름>: 잠깐 쉬러 갈래??
//       <이용자의 이름>: 그래!
//       <GPT의 이름>: ㅋㅋㅋㅎ 그랭 어디서 볼까?
//       <이용자의 이름>: 조만식 갈까?
//       <GPT의 이름>: 조아! 그럼 조만식 앞에서 만나자!
//     `;

//   private system: Array<{
//     role: Role;
//     content: string;
//   }> = [
//     {
//       role: "system",
//       content: `${this.rule}`,
//     },
//     ...this.context.map((c) => ({
//       role: c.AI ? ("assistant" as Role) : ("user" as Role),
//       content: c.content,
//     })),
//   ];

//   private openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY || "",
//   });

//   private constructor() {}

//   public static getInstance(): GPT {
//     if (!GPT.instance) {
//       GPT.instance = new GPT();
//     }

//     return GPT.instance;
//   }

//   public setAI(typeCode: string) {

//     this.typeCode = typeCode;
//     let type = "";

//     console.log("typeCode: ", typeCode);

//     if (typeCode == "0") {
//       type = `
//       <mission>
//         숭실대학교에는 '요거바라'라는 요거트 아이스크림이 있어. '오숭쉐'라는 음료도 있어. 너는 지금 먹으러 가고 싶어해.
//       </mission>  
//       `
//     } else if (typeCode == "1") {
//       type = `
//       <mission>
//         너는 공강이라 심심한 상태야. <이용자의 이름>이 어디 있는지 물어보고 있어. 그리고 함께 대화하면서 놀려고 해.
//       </mission>  
//       `
//     } else if (typeCode == "2") {
//       type = `
//       <mission>
//         너는 수업이 끝났고, 배가 고파서 <이용자의 이름>에게 점심을 같이 먹자고 말을 건네고 있어.
//       </mission>  
//       `
//     }

//     console.log("type: ", type);

//     this.rule = this.rule.concat(type);
//   }

//   public async generate(input: string) {
//     this.saveContext(input, false);

//     const result = await this.openai.chat.completions.create({
//       model: "gpt-4-turbo-preview",
//       // model: "gpt-3.5-turbo-1106",
//       messages: [
//         ...this.system,
//         {
//           role: "user",
//           content: input,
//         },
//       ],
//     });

//     const response = result?.choices[0]?.message?.content;

//     if (response) {
//       this.saveContext(response, true);
//     }

//     return response || "failed to generate";
//   }

//   private saveContext(input: string, isAI: boolean) {
//     this.context.push({
//       AI: isAI,
//       name: isAI ? "<GPT의 이름>" : "<이용자의 이름>",
//       content: input,
//     });
//   }
// }

// const chatManager = GPT.getInstance();

// export default chatManager;
