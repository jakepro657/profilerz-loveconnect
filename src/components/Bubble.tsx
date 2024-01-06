import React from "react";
import { motion } from "framer-motion";

type Props = {
  name?: string;
  content: string;
  isAI?: boolean;
};

function Bubble({ name, content, isAI }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={isAI ? "self-start" : "self-end"}
    >
      <div
        className={`mx-1 flex ${
          isAI ? "justify-start" : "justify-end"
        } rounded-xl`}
      >
        {name}
      </div>
      <div
        className={`flex flex-grow justify-start items-center h-fit w-fit p-2 ${
          isAI ? "bg-orange-200 " : "bg-orange-300"
        } rounded-xl break-keep text-start`}
      >
        {content}
      </div>
    </motion.div>
  );
}

export default Bubble;
