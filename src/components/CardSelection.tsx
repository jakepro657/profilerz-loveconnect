"use client";
import React from "react";

type Props = {
  selected?: boolean;
  content: string;
  value: string;
  onClick: () => void;
  disabled?: boolean;
};

function CardSelection({ disabled, content, selected, value, onClick }: Props) {

  return (
    <button
      onClick={onClick}
      className={`${
        selected ? "bg-orange-200" : " bg-white"
      } w-full p-3 rounded-xl`}
      disabled={disabled}
    >
      {content}
    </button>
  );
}

export default CardSelection;
