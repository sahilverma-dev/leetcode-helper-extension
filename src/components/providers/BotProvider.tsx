import { BotContext } from "@/context/BotContext";
import { useEffect, useState, useCallback } from "react";
import Loading from "../Loading";

const BotProvider = ({ children }: React.PropsWithChildren) => {
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isValidPage, setIsValidPage] = useState(false);

  const checkValidPage = useCallback((url: string | undefined) => {
    return url?.includes("leetcode.com/problems/") ?? false;
  }, []);

  const updateTabInfo = useCallback(
    (tab: chrome.tabs.Tab) => {
      setIsLoading(false);
      setIsValidPage(checkValidPage(tab.url));
    },
    [checkValidPage]
  );

  useEffect(() => {
    const initializeState = async () => {
      const storedApiKey = localStorage.getItem("apiKey");
      if (storedApiKey) {
        setApiKey(storedApiKey);
      }

      const [activeTab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      updateTabInfo(activeTab);
    };

    initializeState();

    const onTabActivated = async (activeInfo: chrome.tabs.TabActiveInfo) => {
      const tab = await chrome.tabs.get(activeInfo.tabId);
      updateTabInfo(tab);
    };

    const onTabUpdated = async (
      _: number,
      changeInfo: chrome.tabs.TabChangeInfo,
      tab: chrome.tabs.Tab
    ) => {
      if (changeInfo.status === "complete") {
        updateTabInfo(tab);
      }
    };

    chrome.tabs.onActivated.addListener(onTabActivated);
    chrome.tabs.onUpdated.addListener(onTabUpdated);

    return () => {
      chrome.tabs.onActivated.removeListener(onTabActivated);
      chrome.tabs.onUpdated.removeListener(onTabUpdated);
    };
  }, [updateTabInfo]);

  return (
    <BotContext.Provider
      value={{
        apiKey,
        setApiKey,
        isLoading,
        setIsLoading,
        isValidPage,
        setIsValidPage,
      }}
    >
      {isLoading ? <Loading /> : children}
    </BotContext.Provider>
  );
};

export default BotProvider;
