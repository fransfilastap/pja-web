import type { DetailedHTMLProps, HTMLAttributes } from "react";

export type PreProps = DetailedHTMLProps<
  HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
>

export default function Pre({  children }: PreProps) {
  return (
      <pre className="mdx-code">{children}</pre>
  );
}
