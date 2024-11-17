import { useEffect, useState } from "react";
import ApiKeyModal from "./components/ApiKeyModal";
import { useBot } from "./hooks/useBot";
import ChatBox from "./components/ChatBox";
import NotValidPage from "./components/NotValidPage";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./components/ui/button";

const App = () => {
  const { isValidPage, apiKey } = useBot();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (apiKey) setShowModal(false);
  }, [apiKey]);

  if (!apiKey) {
    return (
      <div className="w-full h-dvh flex flex-col gap-3 items-center justify-center">
        <img
          src="/icons/icon128.png"
          alt="Leetcode Helper Bot"
          className="w-16 h-16 md:w-20 md:h-20"
        />
        <p className="text-red-500 p-4 text-center max-w-sm">
          Important: You cannot use this without a Gemini API key. Get your API
          key for free with limited credits from{" "}
          <a
            href="https://ai.google.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-500 hover:text-blue-600"
          >
            https://ai.google.dev/
          </a>
          .
        </p>
        <Button onClick={() => setShowModal(true)}>Add API Key</Button>

        <ApiKeyModal
          open={showModal}
          onOpenChange={() => setShowModal(!showModal)}
        />
      </div>
    );
  }

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={isValidPage ? "chatBox" : "notValidPage"}
        initial={{ opacity: 0, x: isValidPage ? -100 : 100, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: isValidPage ? 100 : -100, scale: 0.95 }}
        transition={{
          type: "spring",
          // stiffness: 400,
          // damping: 25,
          duration: 0.2,
        }}
      >
        {isValidPage ? <ChatBox /> : <NotValidPage />}
      </motion.div>
    </AnimatePresence>
  );
};
export default App;
