import Link from "next/link"
import { ComponentPropsWithoutRef, FunctionComponent } from "react"
import {Post} from "contentlayer/generated";
import {format, parseISO} from "date-fns";
import clsxm from "@/helpers/clsxm";

export interface BlogPostProps extends ComponentPropsWithoutRef<"a">{
    post:Post
}
const BlogPost:FunctionComponent<BlogPostProps> = ({post,className, ...rest}) => {
    return (
        <Link href={post.url} scroll={true}className={clsxm("cursor-pointer flex flex-col gap-2 p-8 rounded-lg shadow group bg-gray-50 shadow-gray-50/20", className)} {...rest}>
            <span className="uppercase font-body font-[300] text-xs text-black">{`${format(parseISO(post.date as string), "LLLL d, yyyy")} - ${post.timeToRead}`}</span>
            <h2 className="text-2xl font-medium group-hover:text-[#5941A9] transition duration-150">{ post.title }</h2>
            <p className="text-sm font-light">{ post.description }</p>
            <span className="font-serif text-[#5941A9]">Read More</span>
        </Link>
    )
}


export default BlogPost
