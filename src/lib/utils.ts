import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractCodeWithIndentation(htmlString: string) {
  console.log(htmlString);

  return "code";
  // // Create a temporary div to parse the HTML
  // const div = document.createElement("div");
  // div.innerHTML = htmlString;

  // // Get all lines
  // const lines = div.querySelectorAll(".view-line");

  // // Process each line
  // const codeLines = Array.from(lines).map((line) => {
  //   // Get the text content and preserve indentation
  //   const text = line.textContent || "";

  //   // Get the style attribute to extract top position
  //   const style = line.getAttribute("style") || "";
  //   const topMatch = style.match(/top:(\d+)px/);

  //   // If line is empty and not at start of file, preserve empty line
  //   if (!text.trim() && topMatch) {
  //     return "";
  //   }

  //   // Remove any trailing whitespace but preserve leading indentation
  //   return text.replace(/\s+$/, "");
  // });

  // // Join the lines with newlines and clean up any extra blank lines
  // return codeLines
  //   .join("\n")
  //   .replace(/\n{3,}/g, "\n\n") // Replace 3+ newlines with 2
  //   .trim(); // Remove leading/trailing whitespace
}
