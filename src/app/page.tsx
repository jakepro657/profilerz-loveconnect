"use client";
import Bubble from "@/components/Bubble";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [level, setLevel] = useState(0);

  const [isMounted, setIsMounted] = useState(false);

  const [computerName, setComputerName] = useState("지민");
  const [myName, setMyName] = useState("유빈");

  const [chatline, setChatline] = useState("");
  const [toRenderText, setToRenderText] = useState([
    {
      AI: true,
      name: computerName,
      content: `${myName}이 어디얌??`,
      // content: `${myName}아, 나 너 좋아해.. 나랑, 사귈래?`,
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
    setChatline("");
    e.preventDefault();

    if (chatline.length < 1) {
      alert("내용을 입력해주세요.");
      return;
    }

    pushText(chatline, false);

    const response = await fetchAPI(chatline);

    pushText(response.message, true);

  };

  const pushText = (txt: string, isAI: boolean) => {

    function remove(tmp: string) {
      const emojis = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
      return tmp.replace(emojis, '');
    }

    txt = remove(txt);

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
        className="pt-[5%] mb-[10%]  w-full sm:w-[500px] h-full bg-gradient-to-b from-sky-100 to-sky-50 drop-shadow-md overflow-y-scroll"
      >
        <div className="flex flex-col w-full h-full text-center p-6">
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
