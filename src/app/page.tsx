"use client";
import Bubble from "@/components/Bubble";
import GuidePopUp from "@/components/GuidePopUp";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [computerName, setComputerName] = useState("");
  const [myName, setMyName] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [isSecondOpen, setIsSecondOpen] = useState(false);
  const endOfMessagesRef = useRef<any>(null);
  const [callCount, setCallCount] = useState(1);
  const [type, setType] = useState(0);

  const [chatline, setChatline] = useState("");
  const [toRenderText, setToRenderText] = useState<
    Array<{
      AI: boolean;
      name: string;
      content: string;
    }>
  >([]);

  const fetchAPI = async (text: string) => {

    if (callCount > 5) {
      alert("채팅은 5번까지 가능해요! 고생하셨습니다 :)");
      window.location.reload();
      return;
    }

    const res = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        typeCode: type, // 0, 1, 2 중 랜덤 하나 선택
        input: text,
      })
    })

    const data = await res.json();
    setCallCount((prev) => prev + 1);

    return data;
  };

  useEffect(() => {
    setType(Math.floor(Math.random() * 3))
  }, [])

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [toRenderText.length]);

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      onSubmitHandler(e);
    }
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

    const splitSentence = splitString(response.message);
    splitSentence?.forEach((sentence: string) => {
      setTimeout(() => {
        pushText(sentence, true);
      }, 1500);
    });
    // pushText(response.message, true);
  };

  const splitString = (inputString: string) => {
    const regex = /[^ㅋㅎ!~.]*[ㅋㅎ!~.]*/g;
    return inputString
      .match(regex)
      ?.filter((s) => s != " " && s.trim().length > 0);
  };

  const pushText = (txt: string, isAI: boolean) => {
    function remove(tmp: string) {
      const emojis =
        /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
      return tmp.replace(emojis, "");
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
    if (myName.length < 1) return;
    if (computerName.length < 1) return;

    setToRenderText((state) => [
      ...state,
      {
        AI: true,
        name: computerName,
        content: `${myName} ${type == 0 ? "요거바라랑 오숭쉐 중에 머 먹을래??" : type == 1 ? `나 공강인데 심심해\n 어디 건물쪽이야?` : "수업 끝났어?\n배고프지ㅜㅜ"}`,
      },  
    ]);
  }, [myName, computerName]);

  return (
    <main className="select-none font-pretendard flex flex-col bg-sky-100 justify-center items-center h-screen w-screen">
      <GuidePopUp
        isOpen={isOpen}
        closeHandler={() => setIsOpen(false)}
        nameHandler={(name: string) => setMyName(name)}
        content="당신의 이름은... (성 제외)"
      />
      <GuidePopUp
        isOpen={myName.length > 0 && computerName.length < 1}
        closeHandler={() => setIsSecondOpen(false)}
        nameHandler={(name: string) => setComputerName(name)}
        content="대화 상대의 이름은... (성 제외)"
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="w-full h-full sm:w-[500px] bg-sky-100 overflow-y-scroll"
      >
        <div className="flex flex-col gap-2 w-full h-full text-center p-6">
          {toRenderText.map((text, i) => (
            <Bubble
              key={i}
              name={text.name}
              content={text.content}
              isAI={text.AI}
            />
          ))}
        </div>
        <div ref={endOfMessagesRef} />
      </motion.div>
      <div
        className="h-[15%] bg-sky-100"
      />
      <motion.div
        className="fixed bottom-0 flex w-screen sm:w-[500px]"
      >
        <textarea
          className="w-full bg-white drop-shadow-lg resize-none "
          onChange={onChangeHandler}
          value={chatline}
          onKeyDown={handleKeyPress}
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
