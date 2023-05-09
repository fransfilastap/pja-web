import Link from "next/link";
import { ComponentPropsWithoutRef, FunctionComponent } from "react";

type CustomLinkProps = ComponentPropsWithoutRef<"a">;
const CustomLink: FunctionComponent<CustomLinkProps> = (props) => {
  const href = props.href;

  if (href?.startsWith("/")) {
    return (
      <Link
        href={href!}
        className="font-[500] no-underline text-[var(--primary-color)] hover:underline-offset-1 hover:underline"
      >
        {props.children}
      </Link>
    );
  }

  if (href?.startsWith("#")) {
    return <a {...props} />;
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="font-[500] no-underline text-[var(--primary-color)] hover:underline-offset-1 hover:underline"
      {...props}
    />
  );
};

export default CustomLink;
