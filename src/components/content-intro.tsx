import clsxm from "@/helpers/clsxm";
import { ComponentProps } from "react";

export default function ContentIntro({
  children,
  className,
  ...rest
}: ComponentProps<"p">) {
  return (
    <p
      className={clsxm("text-lg font-body font-[300] text-gray-500", className)}
      {...rest}
    >
      {children}
    </p>
  );
}
