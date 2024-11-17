import ChatList from "./chat/ChatList";

import ChatForm from "./ChatForm";
import { ScrollArea } from "./ui/scroll-area";
import Header from "./header";
import ProblemInfo from "./ProblemInfo";
import { useBot } from "@/hooks/useBot";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useMutation } from "@/hooks/useMutation";
import { SYSTEM_PROMPT } from "@/constants/prompt";
import { GoogleGenerativeAI } from "@google/generative-ai";

export interface Chat {
  by: "bot" | "user";
  message: string;
  type: "text" | "markdown";
}

const ChatBox = () => {
  const { problemData, apiKey } = useBot();
  const [chats, setChats] = useState<Chat[]>([]);

  const { mutate, isLoading } = useMutation({
    mutationFn: () => {
      const systemPromptModified = SYSTEM_PROMPT.replace(
        "{{problem_statement}}",
        problemData?.content as string
      )
        .replace("{{problem_difficulty}}", problemData?.difficulty as string)
        .replace("{{programming_language}}", problemData?.language as string)
        .replace("{{user_code}}", problemData?.code as string);

      const genAI = new GoogleGenerativeAI(apiKey);

      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });

      const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      };

      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });

      return chatSession.sendMessage(systemPromptModified);
    },

    onSuccess: (data) => {
      const response = data.response.text();
      if (problemData?.id) {
        chrome.storage.local.get([problemData.id], (result) => {
          const existingChats = result[problemData.id] || [];
          const newChats = [
            ...existingChats,
            {
              by: "bot",
              message: response,
              type: "markdown",
            },
          ];
          chrome.storage.local.set({ [problemData.id]: newChats });
        });
      }
      setChats((prevChats) => [
        ...prevChats,
        {
          by: "bot",
          message: response,
          type: "markdown",
        },
      ]);
      toast.success("Message sent successfully");
    },

    onError: (error) => {
      console.log(error);
      toast.error("Something went wrong");
    },
  });

  useEffect(() => {
    if (problemData?.id) {
      console.log(problemData);
      chrome.storage.local.get([problemData.id], (result) => {
        console.log(result);
        setChats(result[problemData.id] || []);
      });
    }
  }, [problemData?.id]);

  const onSend = (message: string) => {
    if (problemData?.id) {
      setChats((prevChats) => [
        ...prevChats,
        {
          by: "user",
          message,
          type: "text",
        },
      ]);

      chrome.storage.local.get([problemData.id], (result) => {
        const existingChats = result[problemData.id] || [];
        const newChats = [
          ...existingChats,
          {
            by: "user",
            message,
            type: "text",
          },
        ];
        chrome.storage.local.set({ [problemData.id]: newChats });
      });

      mutate(message);
    }
  };

  const handleDeleteChats = () => {
    if (problemData?.id) {
      chrome.storage.local.remove([problemData.id], () => {
        setChats([]);
        toast.success("Chat history cleared");
      });
    }
  };

  return (
    <div className="w-full h-dvh flex flex-col gap-2 p-2">
      <div className="border rounded-lg flex-grow">
        <Header />
        <ScrollArea
          className="p-2 text-sm flex flex-col items-center gap-2"
          style={{
            height: "calc( 100vh - 115px)",
          }}
        >
          <ProblemInfo />
          {problemData && (
            <ChatList
              chats={chats}
              onDeleteChat={() => {
                handleDeleteChats();
              }}
              isLoading={isLoading}
            />
          )}
        </ScrollArea>
      </div>
      {problemData && <ChatForm onSend={onSend} isLoading={isLoading} />}
    </div>
  );
};
export default ChatBox;
