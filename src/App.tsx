import { useEffect, useState } from "react";
import ApiKeyModal from "./components/ApiKeyModal";
import { useBot } from "./hooks/useBot";
import ChatBox from "./components/ChatBox";
import NotValidPage from "./components/NotValidPage";

import { motion, AnimatePresence } from "framer-motion";

const App = () => {
  const { isValidPage, apiKey } = useBot();

  const [showModal, setShowModal] = useState(!apiKey);

  useEffect(() => {
    if (apiKey) setShowModal(false);
  }, [apiKey]);

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
      <ApiKeyModal
        open={showModal}
        onOpenChange={() => setShowModal(!showModal)}
      />
    </AnimatePresence>
  );
};
export default App;
