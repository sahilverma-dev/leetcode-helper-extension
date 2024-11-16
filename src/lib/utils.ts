import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractCodeWithIndentation(htmlString: string) {
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
