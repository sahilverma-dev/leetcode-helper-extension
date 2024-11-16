import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import "prism-theme-github/themes/prism-theme-github-dark.css";

import { ScrollArea } from "./ui/scroll-area";

interface Props {
  code: string;
  language: string;
}

const CodeSnippet: React.FC<Props> = ({ code, language }) => {
  return (
    <ScrollArea className="w-full rounded-xl overflow-y-scroll h-[200px]">
      <SyntaxHighlighter language={language}>{code}</SyntaxHighlighter>
    </ScrollArea>
  );
};

export default CodeSnippet;
