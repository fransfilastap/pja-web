import clsxm from "@/helpers/clsxm";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export type TableProps = DetailedHTMLProps<
  HTMLAttributes<HTMLTableElement>,
  HTMLTableElement
>;

export default function Table({ children, className, ...rest }: TableProps) {
  return (
    <div className="w-full overflow-scroll">
      <table className={clsxm("table-auto", className)} {...rest}>
        {children}
      </table>
    </div>
  );
}
