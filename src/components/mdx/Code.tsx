import { DetailedHTMLProps, HTMLAttributes } from "react";
export type CodeProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
>;
export default function Code({ children, ...rest }: CodeProps) {
  return <code {...rest}>{children}</code>;
}
