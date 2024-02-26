import React, { useState } from "react";

type Props = {
  nameHandler: (name: string) => void;
  closeHandler: () => void;
  isOpen: boolean;
  content: string;
};

function GuidePopUp({ nameHandler, closeHandler, isOpen, content }: Props) {
  const [name, setName] = useState("");

  const onChangeHandler = (e: any) => {
    setName(e.target.value);
  };

  const onSubmitHandler = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setName("");
      nameHandler(name);
      closeHandler();
    }

    // e.preventDefault()
  };

  return isOpen ? (
    <>
      <div className="z-50 absolute left-0 top-0 w-full h-full bg-black bg-opacity-20" />
      <div className="z-50 absolute drop-shadow-lg rounded-md top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-80 h-64 bg-white flex flex-col gap-4 justify-center items-center">
        <p className="text-xs font-bold">*처음 접속시, 새로고침을 해주세요</p>
        <p>{content}</p>
        <input
          className="w-64 h-10 border-2 text-center border-gray-300 rounded-md outline-none p-2"
          placeholder="(성 제외) 이름을 입력하세요."
          onChange={onChangeHandler}
          onKeyDown={onSubmitHandler}
        />
        <button
          onClick={onSubmitHandler}
          className="bg-orange-400 text-white rounded-md outline-none px-8 py-2"
        >
          확인
        </button>
      </div>
    </>
  ) : null;
}

export default GuidePopUp;
