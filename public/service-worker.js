chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({
    openPanelOnActionClick: true,
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    (changeInfo.status === "complete" || changeInfo.url) &&
    tab.url?.includes("leetcode.com/problems/")
  ) {
    chrome.tabs.sendMessage(tabId, { action: "getProblemData" });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "updateSidebar" && message.data) {
    chrome.runtime.sendMessage(message).catch((error) => {
      // Silently handle connection errors
    });
  } else if (message.type === "reloadProblemInfo" && sender.tab?.id) {
    chrome.tabs
      .sendMessage(sender.tab.id, { action: "getProblemData" })
      .then(() => sendResponse({ success: true }))
      .catch((error) => {
        console.error("Error reloading problem info:", error);
        sendResponse({ success: false, error: error.message });
      });
    return true; // Indicates that the response is sent asynchronously
  }
});
