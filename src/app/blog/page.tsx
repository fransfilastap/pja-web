import Container from "@/components/container";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import featuredPost from '../../../public/media/featured-post.jpg'

export const metadata: Metadata = {
    title: 'Blog',
    description: 'About Frans Filasta Pratama'
}

export default function Page() {
    return (
        <Container className='my-20'>
            <div className="flex flex-col items-start justify-between gap-2 my-10 md:flex-row ">
                <h2 className="font-[600] p-5 text-7xl font-heading text-transparent bg-clip-text bg-gradient-to-br from-[#FCAA43] from-5% via-[#943C30] via-20% to-[#5941A9] to-75%">Blog</h2>
                <p className="text-sm font-light">My Thought, experiments, and tutorial</p>
            </div>
            <FeaturedPost/>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <BlogPost />
                <BlogPost />
                <BlogPost/>
            </div>
        </Container>
    )
}

function FeaturedPost() {
    return (
        <div className="relative my-10 border">
            <Image src={featuredPost} alt="featured post"/>
            <h5 className="absolute block p-1 text-xs font-light text-black bg-white left-6 top-6">Featured</h5>
        </div>
    )
}

function BlogPost() {
    return (
        <article className="flex flex-col gap-2 p-8 rounded-lg shadow bg-gray-50 shadow-gray-50/20">
            <span className="uppercase font-body font-[300] text-xs text-black">feb 13, 2023 - 2 min read</span>
            <h2 className="text-2xl font-medium">the widespread adoption of remote work</h2>
            <p className="font-light">Remote work trends include focusing on employee mental health, investing in virtual collaboration tools, prioritizing productivity, and hiring geograp</p>
            <Link href={"#"} className="font-serif text-[#5941A9]">Read More</Link>
        </article>
    )
}