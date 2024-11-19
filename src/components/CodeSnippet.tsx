import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  solarizedlight,
  solarizedDarkAtom,
} from "react-syntax-highlighter/dist/esm/styles/prism";

import { ScrollArea } from "./ui/scroll-area";
import { useTheme } from "./providers/ThemeProvider";

interface Props {
  code: string;
  language: string;
  isDarkMode?: boolean;
}

const CodeSnippet: React.FC<Props> = ({ code, language }) => {
  const { theme } = useTheme();
  return (
    <ScrollArea className="w-[300px] rounded-xl overflow-auto h-[200px]">
      <SyntaxHighlighter
        language={language}
        style={theme === "dark" ? solarizedDarkAtom : solarizedlight}
      >
        {code}
      </SyntaxHighlighter>
    </ScrollArea>
  );
};

export default CodeSnippet;
