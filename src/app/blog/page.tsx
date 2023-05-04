import Container from "@/components/container";
import { Metadata } from "next";
import FeaturedPost from "@/components/featured-post";
import BlogPost from "@/components/blog-post";
import {allPosts} from "contentlayer/generated";
import featureCover from "../../../public/media/featured-post.jpg"
import {compareDesc, format} from "date-fns";

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Read my thoughts on software development, design, and more.'
}

export default async function Page() {

    const posts = allPosts.sort((a, b) =>
        compareDesc(new Date(a.date as string), new Date(b.date as string))
    );

    return (
        <Container className='p-6 my-20'>
            <div className="flex flex-col items-start justify-between gap-2">
                <h2 className="font-[600] py-5 text-7xl font-heading text-transparent bg-clip-text bg-gradient-to-br from-[#FCAA43] from-5% via-[#943C30] via-20% to-[#5941A9] to-75%">Blog</h2>
                <p className="text-sm font-light">My Thought, experiments, and tutorial</p>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {posts.map((post,i)=>
                    <BlogPost key={i}
                        post={post} />)}
            </div>
        </Container>
    )
}






