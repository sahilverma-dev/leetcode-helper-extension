import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { useState } from "react";

// icons
import { FaRobot as BotIcon, FaUserCircle as UserIcon } from "react-icons/fa";
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
    <div
      className={cn(
        "border bg-secondary mb-2 rounded-lg p-3 flex items-start w-auto max-w-[90%] md:max-w-lg hover:bg-secondary/80 transition-colors shadow-sm dark:shadow-gray-800",
        by === "user" ? "flex-row-reverse ml-auto" : ""
      )}
    >
      <div
        className={cn("flex gap-3", by === "user" ? "flex-row-reverse" : "")}
      >
        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-full overflow-hidden">
          {by === "user" ? (
            <UserIcon size={24} className="text-blue-600 dark:text-blue-300" />
          ) : (
            <BotIcon size={24} className="text-green-600 dark:text-green-300" />
          )}
        </div>
        <div
          className={cn(
            "flex flex-col flex-grow max-w-[calc(100%-52px)]",
            by === "user" ? "items-end" : "items-start"
          )}
        >
          <div className="flex items-center justify-between w-full mb-1">
            <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm">
              {by === "user" ? "You" : "AI Assistant"}
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
    </div>
  );
};

export default ChatCard;
