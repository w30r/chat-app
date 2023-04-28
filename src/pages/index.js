import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [chats, setChats] = useState([{ text: "hey", senderID: 1 }]);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [chats]);

  const handleAddChat = () => {
    const inputValue = inputRef.current.value.trim();
    if (inputValue !== "") {
      const newChat = {
        text: inputValue,
        senderID: 2,
      };

      setChats([...chats, newChat]);
      inputRef.current.value = "";
    }
  };

  const handleAddChat2 = () => {
    const newChat = {
      text: "Mende kau?",
      senderID: 1,
    };

    setChats([...chats, newChat]);
  };

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleAddChat();
    }
  }

  const ChatList = () => {
    return (
      <AnimatePresence>
        <div
          className="overflow-y-auto bg-gray-200/10 flex flex-col h-[600px] p-12 rounded-lg shadow-xl scroll-behavior-auto "
          ref={chatContainerRef}
        >
          {chats.map((chat, index) =>
            chat.senderID == 2 ? (
              <h1
                key={index}
                className="bg-blue-700/40 font-normal p-4 rounded-2xl shadow-sm shadow-white/10 mb-2 text-right"
              >
                {chat.text}
              </h1>
            ) : (
              <h1
                key={index}
                className="bg-green-700/40 font-normal p-4 rounded-2xl shadow-sm shadow-white/10 mb-2 flex-wrap"
              >
                {chat.text}
              </h1>
            )
          )}
        </div>
      </AnimatePresence>
    );
  };
  return (
    <motion.div
      className="mt-4 w-1/2 mx-auto h-screen flex-col flex"
      initial={{ opacity: 0, y: 300 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <h1 className="bg-white/20 rounded-full w-1/3 text-center font-bold text-3xl py-6 mx-auto">
        Chat App
      </h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        id="chats"
        className="flex flex-col mt-6"
      >
        <ChatList />
      </motion.div>

      <div id="typeHere" className="flex absolute bottom-0 w-1/2">
        <input
          type="text"
          id="default-input"
          ref={inputRef}
          onKeyDown={handleKeyDown}
          className="bg-gray-50 outline-none border mr-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <button
          type="button"
          className="text-white outline-none self-center bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          onClick={handleAddChat}
        >
          Send
        </button>
        <button
          type="button"
          className="text-white outline-none self-center bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          onClick={handleAddChat2}
        >
          Receive
        </button>
      </div>
    </motion.div>
  );
}
