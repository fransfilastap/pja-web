import { ComponentPropsWithRef } from "react";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

export type CodeProps = DetailedHTMLProps<
  HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
>;

export default function Code({ children }: CodeProps) {
  return (
    <div className="mdx-code">
      <pre className="mdx-code__content">{children}</pre>
    </div>
  );
}
