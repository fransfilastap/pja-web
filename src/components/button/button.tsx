import clsxm from "@/helpers/clsxm";
import { ComponentPropsWithoutRef } from "react";

export type ButtonProps = ComponentPropsWithoutRef<"button">;

export default function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      className={clsxm("px-5 py-2 text-white bg-black max-w-max", className)}
      {...rest}
    >
      {children}
    </button>
  );
}
