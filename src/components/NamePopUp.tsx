import React, { useState } from "react";

type Props = {
  nameHandler: (name: string) => void;
  closeHandler: () => void;
  isOpen: boolean;
};

function NamePopUp({ nameHandler, closeHandler, isOpen }: Props) {
  const [name, setName] = useState("");

  const onChangeHandler = (e: any) => {
    setName(e.target.value);
  };

  const onSubmitHandler = (e: any) => {
    setName("");
    nameHandler(name);
    closeHandler();
    // e.preventDefault()
  };

  return isOpen ? (
    <>
      <div className="z-50 absolute left-0 top-0 w-full h-full bg-black bg-opacity-20" />
      <div className="z-50 absolute drop-shadow-lg rounded-md top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-80 h-64 bg-white flex flex-col gap-4 justify-center items-center">
        <p>제 이름은...</p>
        <input
          className="w-64 h-10 border-2 text-center border-gray-300 rounded-md outline-none p-2"
          placeholder="이름을 입력하세요."
          onChange={onChangeHandler}
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

export default NamePopUp;
