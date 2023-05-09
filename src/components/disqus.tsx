"use client";
import { DISQUS_SHORTNAME, PROD_URL } from "@/config/env";
import clsxm from "@/helpers/clsxm";
import { DiscussionEmbed } from "disqus-react";
import { ComponentPropsWithoutRef, FunctionComponent } from "react";

type DisqusProps = ComponentPropsWithoutRef<"div"> & {
  title: string;
  identifier: string;
  locale: string;
};

const Disqus: FunctionComponent<DisqusProps> = ({
  className,
  locale,
  identifier,
  title,
  ...props
}) => {
  return (
    <div
      className={clsxm(
        "w-full pt-20 mt-20 border-t border-gray-200",
        className
      )}
      {...props}
    >
      <DiscussionEmbed
        key={`${locale}`}
        shortname={DISQUS_SHORTNAME!}
        config={{
          title: `${title}`,
          url: `${PROD_URL}/${identifier}`,
          identifier: `${identifier}`,
          language: locale,
        }}
      />
    </div>
  );
};

export default Disqus;
