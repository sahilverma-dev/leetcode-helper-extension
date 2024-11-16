import { useEffect, useState } from "react";
import { useBot } from "@/hooks/useBot";
import ChatCard from "./ChatCard";
import DeleteChatModal from "../DeleteChatModal";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import ChatSkeleton from "./ChatSkeleton";

interface Chat {
  by: "bot" | "user";
  message: string;
  type: "text" | "markdown";
}

const ChatList = () => {
  const { problemData } = useBot();
  const [chats, setChats] = useState<Chat[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (problemData?.id) {
      setIsLoading(true);
      chrome.storage.local.get([problemData.id], (result) => {
        setChats(result[problemData.id] || []);
        setIsLoading(false);
      });
    }
  }, [problemData?.id]);

  const handleDeleteChats = () => {
    if (problemData?.id) {
      chrome.storage.local.remove([problemData.id], () => {
        setChats([]);
        setShowDeleteModal(false);
        toast.success("Chat history cleared");
      });
    }
  };

  if (isLoading) {
    return <ChatSkeleton />;
  }

  if (chats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40 gap-2">
        <p className="text-muted-foreground">No messages yet</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-end">
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setShowDeleteModal(true)}
          className="gap-2"
        >
          <Trash2 size={16} />
          Clear Chat
        </Button>
      </div>
      {chats.map((chat, index) => (
        <ChatCard key={index} {...chat} />
      ))}
      <DeleteChatModal
        open={showDeleteModal}
        onOpenChange={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteChats}
      />
    </div>
  );
};

export default ChatList;
