import Container from "@/components/container";
import {allPosts} from "contentlayer/generated";
import {notFound} from "next/navigation";
import {Mdx} from "@/components/Mdx";

export const generateStaticParams = async () =>
    allPosts.map((post:any) => ({ slug: post._raw.flattenedPath }));
export const generateMetadata = ({ params }: any) => {
    const post = allPosts.find(
        (post: any) => post._raw.flattenedPath === params.slug
);
    return { title: post?.title, description: post?.description };
};

export default function BlogPostLayout({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {

    const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)

    if (!post) notFound()

    return (
        <Container className='p-10 my-20'>
            <h1 className="text-4xl py-3 text-transparent bg-clip-text bg-gradient-to-br from-[#FCAA43] from-5% via-[#943C30] via-20% to-[#5941A9] to-75% lg:text-6xl mb-10 tracking-normal font-body font-[500] text-black">
                {post.title}
            </h1>
            <p className={'text-xl font-body font-[500] text-gray-600 my-8'}>{post.description}</p>
            <Mdx code={post.body.code} />
        </Container>
    )
}
