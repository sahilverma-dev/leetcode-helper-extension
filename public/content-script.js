function getProblemData() {
  const problemTitle = document.title.replace(" - LeetCode", "").trim();

  const problemDescription =
    document.querySelector("[data-track-load=description_content]") || "";

  const editorElement = document.querySelector("#editor");
  const code = editorElement?.querySelector(".view-lines")
    ? editorElement?.querySelector(".view-lines")?.textContent?.trim()
    : "";
  const language =
    editorElement?.querySelector("button")?.textContent?.trim() || "";

  const problemDifficulty =
    document
      .querySelector(
        ".flexlayout__tab > div > div.flex.w-full.flex-1.flex-col.gap-4.overflow-y-auto.px-4.py-5 > div.flex.gap-1 > div"
      )
      .textContent?.trim() || "";

  return {
    title: problemTitle,
    content: problemDescription,
    code,
    language,
    difficulty: problemDifficulty,
  };
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getProblemData") {
    const data = getProblemData();
    chrome.runtime.sendMessage({
      type: "updateSidebar",
      data: data,
    });
  }
});

function extractCodeWithIndentation(htmlString) {
  // Create a temporary div to parse the HTML
  const div = document.createElement("div");
  div.innerHTML = htmlString;

  // Get all lines
  const lines = div.querySelectorAll(".view-line");

  // Process each line
  const codeLines = Array.from(lines).map((line) => {
    // Get the text content
    let text = line.textContent || "";

    // If the line is empty (just spaces or nothing), return an empty string
    if (!text.trim()) {
      return "";
    }

    return text;
  });

  // Join the lines with newlines
  return codeLines.join("\n");
}
