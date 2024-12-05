import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

import { Chat } from "./ChatBox";

interface Props {
  chat: Chat;
}

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SyntaxHighlighter } from "../ui/syntax-highlighter";
import { ScrollArea } from "../ui/scroll-area";

const ChatCard: React.FC<Props> = ({ chat }) => {
  //   const [isCopied, setIsCopied] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "border bg-secondary mb-2 w-[300px] rounded-lg p-3 flex items-start hover:bg-secondary/80 transition-colors shadow-sm dark:shadow-gray-800"
      )}
    >
      <div
        className={cn(
          "flex gap-3",
          chat.by === "user" ? "flex-row-reverse" : ""
        )}
      >
        <div
          className={cn(
            "flex flex-col ",
            chat.by === "user" ? "items-end" : "items-start"
          )}
        >
          {chat.type === "markdown" ? (
            <>
              <ReactMarkdown className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap break-words">
                {chat.message.feedback}
              </ReactMarkdown>
              <Accordion type="multiple" className="w-full">
                {chat.message.hints?.map((hint, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>Hint {index + 1}</AccordionTrigger>
                    <AccordionContent>{hint}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              {chat.message.snippet?.code && chat.message.snippet.language && (
                <ScrollArea className="w-[270px] h-[300px] overflow-auto rounded-xl">
                  <SyntaxHighlighter
                    code={chat.message.snippet.code}
                    language={chat.message.snippet.language}
                  />
                </ScrollArea>
              )}
            </>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap break-words">
              {chat.message}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatCard;
