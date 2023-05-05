import Link from "next/link";
import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import { Blog } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import clsxm from "@/helpers/clsxm";

export interface BlogPostProps extends ComponentPropsWithoutRef<"a"> {
  blog: Blog;
}
const BlogPost: FunctionComponent<BlogPostProps> = ({
  blog,
  className,
  ...rest
}) => {
  return (
    <Link
      href={blog.url}
      scroll={true}
      className={clsxm(
        "cursor-pointer flex flex-col gap-2 p-8 rounded-lg shadow group bg-gray-50 shadow-gray-50/20",
        className
      )}
      {...rest}
    >
      <span className="uppercase font-body font-[300] text-xs text-black">{`${format(
        parseISO(blog.date as string),
        "LLLL d, yyyy"
      )} - ${blog.timeToRead}`}</span>
      <h2 className="text-2xl font-medium group-hover:text-[#5941A9] transition duration-150">
        {blog.title}
      </h2>
      <p className="text-sm font-light">{blog.description}</p>
      <span className="font-serif text-[#5941A9]">Read More</span>
    </Link>
  );
};

export default BlogPost;
