import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { XIcon } from "lucide-react";
import ChatBox from "./ChatBox";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Content = () => {
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    window.onkeydown = (e) => {
      if (e.key === "Escape") {
        setShowChat(false);
      }

      if ((e.key === "k" && e.metaKey) || (e.key === "k" && e.ctrlKey)) {
        setShowChat((state) => !state);
      }
    };
  }, []);
  return (
    <AnimatePresence mode="wait">
      {showChat && <ChatBox onClose={() => setShowChat(false)} />}
      {!showChat && (
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              layout
              layoutId="background"
              className="fixed bottom-4 right-4 bg-background p-2 border shadow-xl rounded-xl aspect-square"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              onClick={() => setShowChat(true)}
            >
              <motion.img
                layout
                layoutId="icon"
                src="https://raw.githubusercontent.com/sahilverma-dev/leetcode-helper-extension/refs/heads/main/public/icons/icon128.png"
                alt="Leetcode Helper Bot"
                className="w-6 h-6"
              />
            </motion.button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Open Leetcode Helper</p>
          </TooltipContent>
        </Tooltip>
      )}
      {showChat && (
        <motion.button
          className="fixed z-50 bottom-4 right-4 bg-primary text-black p-2 rounded-full aspect-square"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          onClick={() => setShowChat(false)}
        >
          <XIcon size={15} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default Content;
