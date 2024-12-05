import { Highlight, themes, type Language } from "prism-react-renderer";
import { cn } from "@/lib/utils";

interface SyntaxHighlighterProps {
  code: string;
  language: Language;
  className?: string;
}

export function SyntaxHighlighter({
  code,
  language,
  className,
}: SyntaxHighlighterProps) {
  return (
    <Highlight theme={themes.nightOwl} code={code} language={language}>
      {({
        className: defaultClassName,
        style,
        tokens,
        getLineProps,
        getTokenProps,
      }) => (
        <pre
          className={cn(
            defaultClassName,
            "p-4 rounded-lg overflow-auto",
            className
          )}
          style={style}
        >
          {tokens.map((line, i) => (
            <div
              key={i}
              {...getLineProps({ line, key: i })}
              className="table-row"
            >
              <span className="table-cell text-right pr-4 select-none opacity-50">
                {i + 1}
              </span>
              <span className="table-cell">
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </span>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
