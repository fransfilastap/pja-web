"use client";

import { Clock24Regular } from "@fluentui/react-icons";
import { ComponentPropsWithoutRef } from "react";

export type ContentReadingTimeProps = ComponentPropsWithoutRef<"span">;
export default function ContentReadingTime({
  children,
  className,
  ...rest
}: ContentReadingTimeProps) {
  return (
    <span
      className="uppercase font-body font-[300] text-xs text-black inline-flex gap-1 items-center"
      {...rest}
    >
      <Clock24Regular />
      {children}
    </span>
  );
}
