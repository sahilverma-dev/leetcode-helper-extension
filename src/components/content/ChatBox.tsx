import { motion } from "framer-motion";
import Header from "../Header";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { generateObject, LanguageModelV1 } from "ai";

import { ScrollArea } from "../ui/scroll-area";
import ChatList from "./ChatList";
import ChatForm from "../forms/ChatForm";
import { SYSTEM_PROMPT } from "@/constants/prompt";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Model, MODELS } from "@/constants/models";
import { Button } from "../ui/button";

interface UserChat {
  by: "user";
  message: string;
  type: "text";
}

interface BotChat {
  by: "bot";
  message: {
    feedback: string;
    hints?: string[] | undefined;
    snippet?: { code: string | undefined; language: string | undefined };
  };
  type: "markdown";
}

export type Chat = UserChat | BotChat;

const extractCodeWithIndentation = (htmlString: string) => {
  const div = document.createElement("div");
  div.innerHTML = htmlString;
  const lines = div.querySelectorAll(".view-line");
  const codeLines = Array.from(lines).map((line) => {
    const text = line.textContent || "";
    const style = line.getAttribute("style") || "";
    const topMatch = style.match(/top:(\d+)px/);
    if (!text.trim() && topMatch) {
      return "";
    }
    return text.replace(/\s+$/, "");
  });
  const codeWithIndentation = codeLines.join("\n");

  return codeWithIndentation;
};

const extractLeetCodeProblemName = (url: string): string | null => {
  // Check if it's a valid URL
  try {
    const urlObj = new URL(url);
    if (!urlObj.hostname.includes("leetcode.com")) {
      return null;
    }

    // Split the pathname and extract problem name
    const parts = urlObj.pathname.split("/").filter(Boolean);
    if (parts[0] !== "problems" || parts.length < 2) {
      return null;
    }

    return parts[1];
  } catch {
    return null;
  }
};

const getProblemData = () => {
  const problemTitle = document.title.replace(" - LeetCode", "").trim();

  const problemId = extractLeetCodeProblemName(document.location.href) || "";
  const problemDescription =
    document
      .querySelector("[data-track-load=description_content]")
      ?.textContent?.trim() || "";

  const editorElement = document.querySelector("#editor");

  const code = editorElement?.querySelector(".view-lines")
    ? extractCodeWithIndentation(
        editorElement?.querySelector(".view-lines")?.innerHTML?.trim() || ""
      )
    : "";

  const language =
    editorElement?.querySelector("button")?.textContent?.trim() || "";
  const problemDifficulty =
    document
      .querySelector(
        ".flexlayout__tab > div > div.flex.w-full.flex-1.flex-col.gap-4.overflow-y-auto.px-4.py-5 > div.flex.gap-1 > div"
      )
      ?.textContent?.trim() || "";

  return {
    id: problemId,
    title: problemTitle,
    content: problemDescription,
    // code: "",
    code: code,
    language,
    difficulty: problemDifficulty,
  };
};

const getModel = (modelName: Model, apiKey: string) => {
  if (modelName === "gemini_1.5_flash") {
    const google = createGoogleGenerativeAI({
      apiKey,
    });

    return google("gemini-1.5-flash");
  }

  if (modelName === "openai_3.5_turbo") {
    const openai = createOpenAI({
      apiKey,
    });

    return openai("gpt-3.5-turbo");
  }

  if (modelName === "openai_4o") {
    const openai = createOpenAI({
      apiKey,
    });

    return openai("gpt-4o");
  }

  if (modelName === "gemini_1.5_pro") {
    const google = createGoogleGenerativeAI({
      apiKey,
    });

    return google("gemini-1.5-pro");
  }

  if (modelName === "claude_3_haiku") {
    const claude = createAnthropic({
      apiKey,
    });

    return claude("claude-3-haiku-20240307");
  }

  if (modelName === "claude_3_sonnet") {
    const claude = createAnthropic({
      apiKey,
    });

    return claude("claude-3-5-sonnet-20241022");
  }
};

interface ChatBoxProps {
  onClose: () => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ onClose }) => {
  const [chats, setChats] = useState<Chat[]>([]);

  const [selectedModel, setSelectedModel] = useState<string>(MODELS[0].model);

  const scrollEleRef = useRef<HTMLDivElement>(null);

  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    chrome.storage.local.get(["model"], (result) => {
      setSelectedModel(result.model || null);
    });
  }, []);

  useEffect(() => {
    if (selectedModel) {
      chrome.storage.local.get([selectedModel], (result) => {
        setApiKey(result[selectedModel] || "");
      });
    }
  }, [selectedModel]);

  const problemData = getProblemData();

  useEffect(() => {
    if (problemData?.id) {
      chrome.storage.local.get([problemData.id], (result) => {
        const existingChats = result[problemData.id] || [];
        setChats(existingChats);
      });
    }
  }, [problemData?.id]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (message: string) => {
      const systemPromptModified = SYSTEM_PROMPT.replace(
        "{{problem_statement}}",
        problemData?.content as string
      )
        .replace("{{problem_difficulty}}", problemData?.difficulty as string)
        .replace("{{programming_language}}", problemData?.language as string)
        .replace("{{user_code}}", problemData?.code as string)
        .replace("{{user_message}}", message);

      const currentModel = MODELS.find(
        (model) => model.model === selectedModel
      );

      const model = getModel(currentModel?.name as Model, apiKey);

      const { object } = await generateObject({
        model: model as LanguageModelV1,
        schema: z.object({
          feedback: z.string(),
          hints: z
            .array(z.string())
            .max(2, "You can only provide up to 2 hints.")
            .optional()
            .describe("max 2 hints"),
          snippet: z
            .object({
              code: z.string(),
              language: z.string(),
            })
            .optional()
            .describe("Code snippet should be in format."),
        }),
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: systemPromptModified,
              },
            ],
          },
        ],
      });

      return object;
    },

    onSuccess: (data: {
      feedback: string;
      hints?: string[] | undefined;
      snippet?: { code: string | undefined; language: string | undefined };
    }) => {
      // console.log(data);

      if (problemData?.id) {
        chrome.storage.local.get([problemData.id], (result) => {
          const existingChats = result[problemData.id] || [];
          const newChats = [
            ...existingChats,
            {
              by: "bot",
              message: data,
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
          message: {
            feedback: data.feedback,
            hints: data.hints,
            snippet: data.snippet,
          },
          type: "markdown",
        },
      ]);
    },

    onError: (error) => {
      // console.log(error);
      if (error?.message.startsWith("API key not valid.")) {
        setChats((chats) => [
          ...chats,
          {
            by: "bot",
            message: {
              feedback: error.message,
            },
            type: "markdown",
          },
        ]);
      }
      toast.error(error?.message || "Something went wrong");
    },
  });

  const handleDeleteChats = () => {
    setChats([]);

    if (problemData?.id) {
      chrome.storage.local.remove(problemData.id);
    }
  };

  const onSend = (message: string) => {
    setChats((prevChats) => {
      const updatedChats: Chat[] = [
        ...prevChats,
        {
          by: "user",
          message,
          type: "text",
        },
      ];
      // Save updated chat history to Chrome storage
      if (problemData?.id) {
        chrome.storage.local.set({ [problemData.id]: updatedChats });
      }
      return updatedChats;
    });

    mutate(message);
  };

  useEffect(() => {
    if (scrollEleRef.current) {
      scrollEleRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);

  return (
    <motion.div
      layout
      layoutId="background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed z-50 bottom-8 right-8 bg-background backdrop-blur border shadow-xl rounded-xl h-auto w-[400px] "
    >
      <Header selectedModel={selectedModel} onChangeModel={setSelectedModel} />
      {selectedModel && apiKey ? (
        <>
          <ScrollArea className="p-2 text-sm flex flex-col h-[500px] overflow-y-scroll items-center gap-2">
            <ChatList
              chats={chats}
              onDeleteChat={handleDeleteChats}
              isLoading={isPending}
            />
            <div ref={scrollEleRef} />
          </ScrollArea>
          <ChatForm onSend={onSend} isLoading={isPending} />
        </>
      ) : (
        <div className="h-[500px] flex flex-col items-center text-center justify-center gap-4">
          <img
            src="https://emojiisland.com/cdn/shop/products/Thinking_Face_Emoji_large.png?v=1571606036"
            className="w-32 object-cover aspect-square"
            alt=""
          />
          <p>
            Hmmmmm! Seems like you didn't <br /> set your API key yet.
          </p>
          <Button
            className="rounded-full"
            onClick={() => {
              // open popup
              onClose();
              chrome.runtime.sendMessage({ action: "openPopup" });
            }}
          >
            Set it now
          </Button>
        </div>
      )}
    </motion.div>
  );
};
export default ChatBox;
