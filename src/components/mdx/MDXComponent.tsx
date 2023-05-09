import { useMDXComponent } from "next-contentlayer/hooks";
import RoundedImage from "./RoundedImage";
import CustomLink from "./CustomLink";
import { ComponentType } from "react";
import Pre from "./Pre";
import Code from "@/components/mdx/Code";
import { H1, H2, H3, H4, H5, H6 } from "./headings";

const embeddedComponent = {
  a: CustomLink,
  Image: RoundedImage,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  pre: Pre,
  code: Code,
};

interface MdxProps {
  code: string;
  components?: Record<string, ComponentType>;
}
export default function MDXComponent({ code, components }: MdxProps) {
  const Component = useMDXComponent(code);
  return (
    <article className="w-full leading-loose tracking-normal prose lg:w-2/3 font-body prose-blockquote:before:content-none prose-blockquote:after:content-none">
      <Component components={{ ...embeddedComponent, ...components }} />
    </article>
  );
}
