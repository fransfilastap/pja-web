import { FunctionComponent, ComponentPropsWithoutRef } from "react";
import { BlogHeading } from "@/contentlayer/document/Blog";
import clsxm from "@/helpers/clsxm";

export type TableOfContentProps = ComponentPropsWithoutRef<"nav"> & {
  headings: BlogHeading[];
};

const TableOfContent: FunctionComponent<TableOfContentProps> = ({
  headings,
  className,
  ...rest
}) => {
  if (headings.length <= 0) return <div></div>;

  return (
    <div className="w-full lg:w-1/3">
      <nav
        aria-label="Table of contents"
        className={clsxm("toc", className)}
        {...rest}
      >
        <div className={clsxm("toc--head")}>
          <h2 className="font-[600] text-lg font-heading ">Table of Content</h2>
        </div>
        <ol className="toc--list">
          {headings.map((heading, i) => (
            <li key={i}>
              <TableOfContentsLink
                active={false}
                level={heading.level}
                slug={heading.slug}
                title={heading.title}
                key={i}
              />
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default TableOfContent;

export interface TableOfContentsLinkProps extends BlogHeading {
  active: boolean;
}
function TableOfContentsLink({
  title,
  level,
  slug,
  active = false,
}: TableOfContentsLinkProps) {
  return (
    <a
      className={clsxm("toc--link", {
        "toc--link__depth-3": level == 3,
        "toc--link__active": active,
      })}
      href={`#${slug}`}
    >
      <span>{title}</span>
    </a>
  );
}
