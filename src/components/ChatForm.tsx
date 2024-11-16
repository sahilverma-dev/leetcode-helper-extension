// import { OpenAI } from "openai";
// import { useBot } from "@/hooks/useBot";
// import { SYSTEM_PROMPT } from "@/constants/prompt";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SendIcon } from "lucide-react";

const ChatForm = () => {
  //   const { apiKey } = useBot();

  //   const handleChatSend = async (userMessage: string) => {
  //     const systemPromptModified = SYSTEM_PROMPT.replace(
  //       "{{problem_statement}}",
  //       context.problemStatement
  //     )
  //       .replace("{{programming_language}}", context.programmingLanguage)
  //       .replace("{{user_code}}", extractedCode);

  //     const openAi = new OpenAI({
  //       apiKey,
  //       dangerouslyAllowBrowser: true,
  //     });

  //     const apiResponse = await openAi.chat.completions.create({
  //       model: "chatgpt-4o-latest",
  //       response_format: { type: "json_object" },
  //       messages: [
  //         { role: "system", content: systemPromptModified },
  //         ...chatHistory.map(
  //           (chat) =>
  //             ({
  //               role: chat.role,
  //               content: chat.message,
  //             } as ChatCompletionMessageParam)
  //         ),
  //         { role: "user", content: userMessage },
  //       ],
  //     });
  //   };

  return (
    <div className="flex items-center gap-2 w-full">
      <Input placeholder="How can I help you?" className="flex-grow text-sm" />
      <Button size={"sm"} className="px-0 aspect-square text-sm">
        <SendIcon />
      </Button>
    </div>
  );
};
export default ChatForm;
