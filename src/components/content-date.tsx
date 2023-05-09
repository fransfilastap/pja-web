"use client";

import { CalendarLtr24Regular } from "@fluentui/react-icons";
import { IsoDateTimeString } from "contentlayer/core";
import { format, parseISO } from "date-fns";
import { ComponentPropsWithoutRef } from "react";

export type ContentDateProps = ComponentPropsWithoutRef<"span"> & {
  date: IsoDateTimeString | string;
};
export default function ContentDate({ date, ...rest }: ContentDateProps) {
  return (
    <span
      className="uppercase font-body font-[300] text-xs text-black inline-flex gap-1 items-center"
      {...rest}
    >
      <CalendarLtr24Regular />
      {`${format(parseISO(date), "LLLL d, yyyy")}`}
    </span>
  );
}
