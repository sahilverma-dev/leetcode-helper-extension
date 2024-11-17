import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import { motion } from "framer-motion";

// icons
import { FaUserCircle as UserIcon } from "react-icons/fa";
import { Button } from "../ui/button";
import { CopyIcon } from "lucide-react";
import { CheckIcon } from "lucide-react";
import { toast } from "sonner";

interface Props {
  by: "bot" | "user";
  type: "text" | "markdown";
  message: string;
}

const ChatCard: React.FC<Props> = ({ by, message, type }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    toast.success("Copied to clipboard");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "border bg-secondary mb-2 rounded-lg p-3 flex items-start w-full max-w-[90%] md:max-w-lg hover:bg-secondary/80 transition-colors shadow-sm dark:shadow-gray-800",
        by === "user" ? "flex-row-reverse ml-auto" : ""
      )}
    >
      <div
        className={cn("flex gap-3", by === "user" ? "flex-row-reverse" : "")}
      >
        {by === "bot" ? (
          <img
            src="/icons/icon128.png"
            alt="Leetcode Helper Bot"
            className="w-10 h-10 md:w-14 md:h-14 "
          />
        ) : (
          <div className="w-10 h-10 md:w-14 md:h-14">
            <UserIcon size={30} className="text-blue-600 dark:text-blue-300" />
          </div>
        )}
        <div
          className={cn(
            "flex flex-col flex-grow max-w-[calc(100%-52px)]",
            by === "user" ? "items-end" : "items-start"
          )}
        >
          <div className="flex items-center justify-between w-full mb-1">
            <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm">
              {by === "user" ? "You" : "Leetcode Helper Bot"}
            </p>
            {by === "bot" && (
              <Button
                onClick={handleCopy}
                size={"icon"}
                variant={"outline"}
                type="button"
                className="px-0 text-[8px] aspect-square"
              >
                {isCopied ? <CheckIcon size={5} /> : <CopyIcon size={5} />}
              </Button>
            )}
          </div>
          {type === "markdown" ? (
            <ReactMarkdown className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap break-words">
              {message}
            </ReactMarkdown>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap break-words">
              {message}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatCard;
