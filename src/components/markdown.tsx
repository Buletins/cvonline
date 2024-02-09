import ReactMarkdown from "react-markdown";

interface MarkdownProps {
  children: string;
}

export default function Markdown({ children }: MarkdownProps) {
  return (
    <ReactMarkdown
      className="flex w-full flex-col gap-4"
      components={{
        p: (props) => (
          <p
            className="text-sm leading-tight tracking-tight text-muted-foreground"
            {...props}
          />
        ),
        ul: (props) => (
          <ul
            className="flex list-inside list-disc flex-col gap-2"
            {...props}
          />
        ),
        li: (props) => (
          <li
            className="text-sm leading-tight tracking-tight text-muted-foreground"
            {...props}
          />
        ),
        a: (props) => (
          <a className="text-green-500 underline" target="_blank" {...props} />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
