import { useMDXComponent } from "next-contentlayer/hooks";
import RoundedImage from "./RoundedImage";
import CustomLink from "./CustomLink";
import { ComponentType } from "react";
import Code from "./Code";

const embededComponent = {
  a: CustomLink,
  Image: RoundedImage,
  pre: Code,
};

interface MdxProps {
  code: string;
  components?: Record<string, ComponentType>;
}
export default function MDXComponent({ code, components }: MdxProps) {
  const Component = useMDXComponent(code);
  return (
    <article className="leading-loose tracking-normal prose prose-lg font-body">
      <Component components={{ ...embededComponent, ...components }} />
    </article>
  );
}
