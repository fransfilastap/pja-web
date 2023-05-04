import Link from "next/link"
import { ComponentPropsWithoutRef, FunctionComponent } from "react"
import {Post} from "contentlayer/generated";
import {format, parseISO} from "date-fns";

export interface BlogPostProps extends ComponentPropsWithoutRef<"div">{
    post:Post
}
const BlogPost:FunctionComponent<BlogPostProps> = ({post, ...rest}) => {
    return (
        <div className="flex flex-col gap-2 p-8 rounded-lg shadow bg-gray-50 shadow-gray-50/20" {...rest}>
            <span className="uppercase font-body font-[300] text-xs text-black">{`${format(parseISO(post.date as string), "LLLL d, yyyy")} - ${post.timeToRead}`}</span>
            <h2 className="text-2xl font-medium">{ post.title }</h2>
            <p className="text-sm font-light">{ post.description }</p>
            <Link href={post.url} className="font-serif text-[#5941A9]">Read More</Link>
        </div>
    )
}


export default BlogPost
