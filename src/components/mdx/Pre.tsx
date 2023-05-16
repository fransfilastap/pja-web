import { DetailedHTMLProps, HTMLAttributes } from "react";
import clsx from "clsx";
import { parseBoolean } from "@/lib/utils";
import CopyButton from "./copy-button";

export type PreProps = DetailedHTMLProps<
  HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
> & {
  "data-language"?: string;
  "data-raw"?: string;
  "data-copy"?: string;
  "data-title"?: string;
  "data-footer"?: string;
};

export default function Pre({ children, className, style, ...rest }: PreProps) {
  const dataLang = rest["data-language"];
  const withFooter = rest["data-footer"]
    ? parseBoolean(rest["data-footer"])
    : false;
  const withTitle = rest["data-title"]?.replace(/['"]+/g, "");
  const withCopy = rest["data-copy"] ? parseBoolean(rest["data-copy"]) : false;
  const rawCode = rest["data-copy"] ?? "";

  return (
    <div className="overflow-hidden bg-white border rounded-lg border-zinc-100">
      {withTitle && (
        <div className="flex text-[0.8rem] justify-between items-center flex-row w-full gap-2 py-2 px-4 rounded-none bg-gray-50">
          <span className="font-[600] w-full overflow-x-clip text-ellipsis">
            {withTitle}
          </span>
          {withCopy && <CopyButton rawCode={rawCode} />}
        </div>
      )}
      <pre className={clsx("bg-white my-0 px-4", className)} {...rest}>
        {children}
      </pre>
      {withFooter && (
        <div className="flex text-[0.8rem] justify-end flex-row w-full gap-2 py-2 px-4 rounded-t-none rounded-b-lg bg-gray-50">
          <span className="uppercase">{dataLang}</span>
        </div>
      )}
    </div>
  );
}
