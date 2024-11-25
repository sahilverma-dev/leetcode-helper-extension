import { useEffect, useState } from "react";
import { ProblemData } from "@/types/problem";

import { Button } from "./ui/button";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { useBot } from "@/hooks/useBot";
import CodeSnippet from "./CodeSnippet";

// import { extractCodeWithIndentation } from "@/lib/utils";

interface Message {
  type: string;
  data: ProblemData;
}

const ProblemInfo = () => {
  const { problemData, setProblemData } = useBot();
  const [isLoading, setIsLoading] = useState(false);

  const updateProblemInfo = async () => {
    setIsLoading(true);
    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (!tab.id) {
        throw new Error("No active tab found");
      }

      const [{ result }] = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
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

          const problemTitle = document.title.replace(" - LeetCode", "").trim();

          const problemId =
            extractLeetCodeProblemName(document.location.href) || "";
          const problemDescription =
            document
              .querySelector("[data-track-load=description_content]")
              ?.textContent?.trim() || "";

          const editorElement = document.querySelector("#editor");

          const code = editorElement?.querySelector(".view-lines")
            ? extractCodeWithIndentation(
                editorElement
                  ?.querySelector(".view-lines")
                  ?.innerHTML?.trim() || ""
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
        },
      });

      if (result) {
        setProblemData({
          id: result.id,
          title: result.title,
          content: result.content,
          code: result?.code || "",
          language: result.language,
          difficulty: result.difficulty,
        });
        toast.success("Problem information updated");
      } else {
        toast.error("Failed to retrieve problem information");
      }
    } catch (error) {
      console.error("Error updating problem info:", error);
      toast.error("Failed to update problem information");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const messageListener = (
      message: Message,
      _: unknown,
      sendResponse: (response: { success: boolean }) => void
    ) => {
      if (message.type === "updateSidebar") {
        setProblemData(message.data);
        sendResponse({ success: true });
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);
    return () => chrome.runtime.onMessage.removeListener(messageListener);
  }, []);

  if (!problemData) {
    return (
      <div className="h-[calc(100vh-180px)] flex flex-col items-center justify-center p-2 text-center gap-2">
        <img
          src="/icons/icon128.png"
          alt="Leetcode Helper Bot"
          className="w-16 h-16 md:w-20 md:h-20"
        />
        <p className="text-muted-foreground">
          No problem information available.
          <br />
          You must load a problem to use this bot.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={updateProblemInfo}
          disabled={isLoading}
          className="gap-2"
        >
          <RefreshCw className={`${isLoading ? "animate-spin" : ""} h-4 w-4`} />
          Load Problem Information
        </Button>
      </div>
    );
  }

  return (
    <div className=" w-full">
      <div className="p-2 space-y-6">
        <div className="flex flex-row items-center justify-between gap-4">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-primary truncate">
              {problemData.title}
            </h2>
            <p className="text-xs text-red-500">
              Update information after you write or change something to get
              better and updated results.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={updateProblemInfo}
            disabled={isLoading}
            className="px-4 py-2 aspect-square text-base"
          >
            <RefreshCw
              size={20}
              className={`${isLoading ? "animate-spin" : ""}`}
            />
          </Button>
        </div>
        {problemData.difficulty && (
          <div className="mt-2 text-sm">
            <span className="font-semibold">Difficulty:</span>{" "}
            <span className={`font-medium `}>{problemData.difficulty}</span>
          </div>
        )}
        <div className="text-sm">{problemData.content}</div>
        <div>
          <h3 className="text-lg font-semibold mb-2">
            Your Code ({problemData.language})
          </h3>
          {problemData?.code && (
            <CodeSnippet
              code={problemData?.code}
              language={problemData.language}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemInfo;
