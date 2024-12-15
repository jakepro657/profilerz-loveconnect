"use client";
import { useState, useEffect, useRef, KeyboardEvent, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import Bubble from "@/components/Bubble";
import GuidePopUp from "@/components/GuidePopUp";


export default function Home() {
  const [computerName, setComputerName] = useState<string>("");
  const [myName, setMyName] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isSecondOpen, setIsSecondOpen] = useState<boolean>(false);
  const [callCount, setCallCount] = useState<number>(1);
  const [type, setType] = useState<number>(0);
  const [chatline, setChatline] = useState<string>("");
  const [toRenderText, setToRenderText] = useState<Message[]>([]);
  const [id, setId] = useState<string>("");
  const [chatId, setChatId] = useState<number>(0)
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setType(Math.floor(Math.random() * 3));
    generateUUID()
  }, []);

  useEffect(() => {
    generateChat()
    initialSet()
  }, [id])

  useEffect(() => {
    if (toRenderText.length > 0) {
      endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [toRenderText.length]);

  useEffect(() => {
    if (myName && computerName) {
      setToRenderText((prev: any) => [
        ...prev,
        {
          AI: true,
          name: computerName,
          content: generateInitialMessage(myName, type),
        },
      ]);
    }
  }, [myName, computerName]);

  const initialSet = async () => {
    await fetch("/api/v2/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: {
          content: `${name}! 你好~`,
          name: myName,
          AI: true
        },
        chatId: chatId,
        id: id,
      }),
    })
  }

  const generateUUID = async () => {
    const uuid = localStorage.getItem("ID")

    if (uuid) {
      setId(uuid)
    } else {
      const response = await fetch("/api/v2/user");

      const val = await response.json()

      localStorage.setItem("ID", val.message.identifier)

      setId(val.message.identifier)
    }
  }

  const clearCache = () => {
    localStorage.removeItem("ID")
    window.location.reload();
  }

  const generateChat = async () => {
    const response = await fetch("/api/v2/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id, type: "NEW" }),
    });

    const val = await response.json()

    setChatId(val.message)
  }

  const fetchAPI = async (text: string) => {
    // if (callCount > 5) {
    //   alert("채팅은 5번까지 가능해요! 고생하셨습니다 :)");
    //   window.location.reload();
    //   return;
    // }

    const res = await fetch("/api/v2/gpt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ typeCode: type.toString(), input: text, chatId: chatId, username: myName, gptname: computerName }),
    });

    const data = await res.json();
    setCallCount((prev: any) => prev + 1);
    return data;
  };

  const generateInitialMessage = (name: string, type: number): string => {
    const messages = [
      // `${name} 요거바라랑 오숭쉐 중에 머 먹을래??`,
      `${name}! 你好~`,
      // "수업 끝났어?\n배고프지ㅜㅜ",
    ];
    return messages[0];
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") onSubmitHandler(e);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setChatline(e.target.value);
  };

  const onSubmitHandler = async (e: FormEvent | KeyboardEvent) => {
    e.preventDefault();
    if (!chatline.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    const cleanedText = removeEmojis(chatline);
    pushText(cleanedText, false);
    setChatline("");

    const responseGPT = await fetchAPI(cleanedText);

    
    await fetch("/api/v2/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: {
          content: cleanedText,
          name: myName,
          AI: false
        },
        chatId: chatId,
        id: id,
      }),
    })

    if (responseGPT) {
      console.log(responseGPT.message)
      const splitSentence = splitString(responseGPT.message);
      splitSentence.forEach((sentence: string, index: number) => {
        setTimeout(() => pushText(sentence, true), 1500 * index);
      });
    }

    await fetch("/api/v2/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: {
          content: responseGPT.message,
          name: computerName,
          AI: true
        },
        chatId: chatId,
        id: id,
      }),
    })


  };

  const splitString = (inputString: string): string[] => {
    const regex = /[^ㅋㅎ!~.]*[ㅋㅎ!~.]*/g;
    return inputString?.match(regex)?.filter((s) => s.trim()) ?? [];
  };

  const removeEmojis = (text: string): string => {
    const emojis =
      /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07]|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
    return text.replace(emojis, "");
  };

  const pushText = (text: string, isAI: boolean) => {
    setToRenderText((prev: any) => [
      ...prev,
      { AI: isAI, name: isAI ? computerName : myName, content: text },
    ]);
  };

  return (
    <>
      <button className="fixed top-2 right-2 bg-orange-300 p-2 rounded-lg z-[60]" onClick={clearCache}>
        캐시 제거
      </button>
    <main className="select-none font-pretendard flex flex-col bg-sky-100 justify-center items-center h-screen w-screen">
      <GuidePopUp
        isOpen={isOpen}
        closeHandler={() => setIsOpen(false)}
        nameHandler={setMyName}
        content="당신의 이름은... (성 제외)"
      />
      <GuidePopUp
        isOpen={myName.length > 0 && computerName.length < 1}
        closeHandler={() => setIsSecondOpen(false)}
        nameHandler={setComputerName}
        content="대화 상대의 이름은... (성 제외)"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-full sm:w-[500px] bg-sky-100 overflow-y-scroll"
      >
        <div className="flex flex-col gap-2 w-full h-full text-center p-6">
          {toRenderText.map((text: any, i: any) => (
            <Bubble key={i} name={text.name} content={text.content} isAI={text.AI} />
          ))}
          <div ref={endOfMessagesRef} />
        </div>
      </motion.div>
      <div className="h-[15%] bg-sky-100" />
      <motion.div className="fixed bottom-0 flex w-screen sm:w-[500px]">
        <textarea
          className="w-full bg-white drop-shadow-lg resize-none"
          onChange={onChangeHandler}
          value={chatline}
          onKeyDown={handleKeyPress}
        />
        <button onClick={onSubmitHandler} className="bg-orange-300 drop-shadow-md font-bold w-16">
          {">"}
        </button>
      </motion.div>
    </main>
    </>
  );
}
