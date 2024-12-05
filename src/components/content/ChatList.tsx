import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ChatCard from "./ChatCard";
import DeleteChatModal from "./DeleteChatModal";
import { Button } from "../ui/button";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import ChatSkeleton from "./ChatSkeleton";
import { Chat } from "./ChatBox";
import { cn } from "@/lib/utils";

interface Props {
  chats: Chat[];
  isLoading: boolean;
  onDeleteChat: () => void;
}

const ChatList: React.FC<Props> = ({ chats, isLoading, onDeleteChat }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const chatListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Scroll to the bottom of the chat list whenever chats change
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [chats]);

  if (chats.length === 0) {
    return (
      <div className="flex w-full h-full flex-col items-center justify-center gap-2">
        <p className="text-muted-foreground">No messages yet</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold">Chat History</h2>
        <Button
          variant="destructive"
          size="icon"
          onClick={() => setShowDeleteModal(true)}
          className="text-xs w-8 h-8 aspect-square px-0"
        >
          <Trash2Icon size={8} />
        </Button>
      </div>
      <div ref={chatListRef}>
        <AnimatePresence>
          {chats.map((chat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "flex",
                chat.by === "user" ? "justify-end" : "justify-start"
              )}
            >
              <ChatCard chat={chat} />
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && <ChatSkeleton />}
      </div>

      <DeleteChatModal
        open={showDeleteModal}
        onOpenChange={() => setShowDeleteModal(false)}
        onConfirm={() => {
          onDeleteChat();
          setShowDeleteModal(false);
          toast.success("Chat deleted successfully");
        }}
      />
    </div>
  );
};

export default ChatList;
