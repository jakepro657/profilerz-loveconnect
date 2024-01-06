"use client";
import Bubble from "@/components/Bubble";
import { m, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [level, setLevel] = useState(0);

  const [isMounted, setIsMounted] = useState(false);

  const [computerName, setComputerName] = useState("은지");
  const [myName, setMyName] = useState("유빈");

  const [chatline, setChatline] = useState("");
  const [toRenderText, setToRenderText] = useState([
    {
      AI: true,
      name: computerName,
      content: `안녕 ${myName}아! 뭐해~?`,
    },
  ]);

  const fetchAPI = async (text: string) => {
    const res = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: text,
      }),
    });

    const data = await res.json();

    return data;
  };

  const onChangeHandler = (e: any) => {
    setChatline(e.target.value);
  };

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();

    if (chatline.length < 1) {
      alert("내용을 입력해주세요.");
      return;
    }

    pushText(chatline, false);

    const response = await fetchAPI(chatline);

    pushText(response.message, true);

    setChatline("");
  };

  const pushText = (txt: string, isAI: boolean) => {
    setToRenderText((state) => [
      ...state,
      {
        AI: isAI,
        name: isAI ? computerName : myName,
        content: txt,
      },
    ]);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main className="select-none font-pretendard flex justify-center items-center h-screen w-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className=" w-full sm:w-[500px] h-full bg-gradient-to-b from-sky-100 to-sky-50 drop-shadow-md overflow-y-scroll"
      >
        <div className="pb-[20%] flex flex-col w-full h-full text-center p-6">
          <div className="flex flex-col gap-2 h-full">
            {toRenderText.map((text, i) => (
              <Bubble
                key={i}
                name={text.name}
                content={text.content}
                isAI={text.AI}
              />
            ))}
          </div>
        </div>
      </motion.div>
      <motion.div className="fixed bottom-0 flex w-screen sm:w-[500px]">
        <textarea
          className="w-full bg-white drop-shadow-lg resize-none "
          onChange={onChangeHandler}
          value={chatline}
        />
        <button
          onClick={onSubmitHandler}
          className="bg-orange-300 drop-shadow-md font-bold w-16"
        >
          {">"}
        </button>
      </motion.div>
    </main>
  );
}
