import Container from "@/components/container";
import { allBlogs } from "contentlayer/generated";
import { notFound } from "next/navigation";
import MDXComponent from "@/components/mdx/MDXComponent";
import clsxm from "@/helpers/clsxm";
import TableOfContent from "@/components/mdx/TableOfContent";

export const generateStaticParams = async () =>
  allBlogs.map((post: any) => ({ slug: post._raw.flattenedPath }));
export const generateMetadata = ({ params }: any) => {
  const post = allBlogs.find(
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
  const post = allBlogs.find((post) => post._raw.flattenedPath === params.slug);

  if (!post) notFound();

  return (
    <Container className="p-10 mt-20">
      <h1 className="text-4xl py-3 text-transparent bg-clip-text bg-gradient-to-br from-[#FCAA43] from-5% via-[#943C30] via-20% to-[#5941A9] to-75% lg:text-6xl mb-10 tracking-normal font-heading font-[800] text-black">
        {post.title}
      </h1>
      <p className={"text-xl font-body font-[400] text-gray-400 mb-8"}>
        {post.description}
      </p>
      <div className="flex flex-col-reverse gap-3 lg:flex-row">
        <MDXComponent code={post.body.code} />
        <TableOfContent headings={post.headings} />
      </div>
    </Container>
  );
}
